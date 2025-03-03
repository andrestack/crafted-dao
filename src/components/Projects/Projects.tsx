"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectsData } from "@/interfaces";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { ProfitCard } from "./components/ProfitCard";

interface ProjectsProps {
  data: ProjectsData;
}

export default function Projects({ data }: ProjectsProps) {
 

  if (!data) {
    console.log("Projects - No data received");
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ProfitCard
          totalProfit={data.totalProfit || "0"}
          smallJobProfit={data.smallJobProfit || "0"}
        />
      </div>
      <Card className="w-full bg-white border border-crafted-orange">
        <CardHeader>
          <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
            All Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data.jobs || []} />
        </CardContent>
      </Card>
    </div>
  );
}
