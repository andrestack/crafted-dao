import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";
import fs from "fs/promises";

export async function GET() {
  console.log("Received a GET request to /api/route");
  try {
    const credentialsPath = path.join(process.cwd(), "streetcred.json");
    const credentials = await fs.readFile(credentialsPath, "utf-8");

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { message: "SPREADSHEET_ID environment variable is not set" },
        { status: 500 }
      );
    }

    const profitBankRange = "Overview!E3:J34";
    const treasuryTotalValue = "Overview!N14:O17";
    const overHeadRange = "Overview!C34";

    const [profitBankResponse, treasuryResponse, overheadResponse] =
      await Promise.all([
        sheets.spreadsheets.values.get({
          spreadsheetId,
          range: profitBankRange,
        }),
        sheets.spreadsheets.values.get({
          spreadsheetId,
          range: treasuryTotalValue,
        }),
        sheets.spreadsheets.values.get({
          spreadsheetId,
          range: overHeadRange,
        }),
      ]);

    const profitBankRows = profitBankResponse.data.values;
    const treasuryTotalRows = treasuryResponse.data.values;
    const overheadRows = overheadResponse.data.values;

    if (!profitBankRows || !treasuryTotalRows || !overheadRows) {
      return NextResponse.json(
        { message: "Incomplete data received from data source" },
        { status: 500 }
      );
    }

    //extract first row
    const names = profitBankRows[0];

    // dynamically locate the headers by searching for keywords in rows
    const headers = profitBankRows.map((row) => row[0]);

    // find each row indeces for each metric dynamically
    const profitStakedIndex = headers.findIndex(
      (header) => header && header.includes("Profit Staked")
    );
    const profitAvailableIndex = headers.findIndex(
      (header) => header && header.includes("Available Now")
    );
    const jobsCompletedIndex = headers.findIndex(
      (header) => header && header.includes("# Jobs Completed")
    );

    if (
      profitStakedIndex === -1 ||
      profitAvailableIndex === -1 ||
      jobsCompletedIndex === -1
    ) {
      return NextResponse.json(
        { message: "Required headers not found in the spreadsheet" },
        { status: 500 }
      );
    }

    //dynamically retrieve the rows based on their index

    const profitStakedRow = profitBankRows[profitStakedIndex];
    const profitAvailableRow = profitBankRows[profitAvailableIndex];
    const jobsCompletedRow = profitBankRows[jobsCompletedIndex];

    if (!profitStakedRow || !profitAvailableRow || !jobsCompletedRow) {
      return NextResponse.json(
        { message: "Required data rows not found in the spreadsheet" },
        { status: 500 }
      );
    }

    //create a structure response by mapping the data by name
    const structuredData = names.map((name, index) => ({
      name,
      profitStaked: profitStakedRow ? profitStakedRow[index] : null,
      profitAvailable: profitAvailableRow ? profitAvailableRow[index] : null,
      jobsCompleted: jobsCompletedRow ? jobsCompletedRow[index] : null,
      treasuryTotal: treasuryTotalRows ? treasuryTotalRows[index] : null,
      overhead: overheadRows ? overheadRows[index] : null,
    }));

    if (structuredData?.length) {
      return NextResponse.json({ data: structuredData });
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
