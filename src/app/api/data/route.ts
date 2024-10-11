import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";
import fs from "fs/promises";


export async function GET() {
  console.log("Received a GET request to /api/route")
  try {
   
    const credentialsPath = path.join(process.cwd(), "streetcred.json");
    const credentials = await fs.readFile(credentialsPath, "utf-8");

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "Overview!A1:O35";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows?.length) {
      return NextResponse.json({ data: rows });
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
