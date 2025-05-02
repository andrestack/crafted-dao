"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectsData } from "@/interfaces";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { ProfitCard } from "./components/ProfitCard";
import { quotes } from "@/quotes";
import { useEffect, useState } from "react";

interface ProjectsProps {
  data: ProjectsData;
}

export default function Projects({ data }: ProjectsProps) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Get the current date (reset to midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Use the date as a seed to select a quote
    const daysSinceEpoch = Math.floor(today.getTime() / (24 * 60 * 60 * 1000));
    const quoteIndex = daysSinceEpoch % quotes.length;

    setQuote(quotes[quoteIndex]);
  }, []);

  if (!data) {
    //console.log("Projects - No data received", data);
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="hidden md:block text-5xl font-league-spartan-bold text-crafted-orange italic">
          &ldquo;{quote}&rdquo;
        </h3>
        <ProfitCard
          totalProfit={data.totalProfit || "0"}
          smallJobProfit={data.smallJobProfit || "0"}
        />
      </div>
      <Card className="w-full bg-white border border-crafted-orange">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
            All Jobs
          </CardTitle>
      <div className="md:hidden">
        <h3 className="text-2xl font-league-spartan-bold text-muted-foreground italic text-center py-4">
          &ldquo;{quote}&rdquo;
        </h3>
      </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data.jobs || []} />
        </CardContent>
      </Card>
    </div>
  );
}
