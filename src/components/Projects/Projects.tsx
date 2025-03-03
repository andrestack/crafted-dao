"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobData } from "@/interfaces";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

interface ProjectsProps {
  data: JobData[];
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <Card className="w-full bg-white border border-crafted-orange">
      <CardHeader>
        <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
          Projects Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
