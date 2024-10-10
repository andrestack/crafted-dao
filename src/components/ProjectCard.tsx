import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{project.name}</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${project.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
          ${project.profit.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">{project.profit >= 0 ? "Profit" : "Loss"}</p>
      </CardContent>
    </Card>
  );
}