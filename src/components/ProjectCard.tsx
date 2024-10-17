import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface Project {
  id: number;
  name: string;
  complete: number;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <>
    
    <Card className="w-full max-w-md bg-white border border-crafted-orange">
    
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-league-spartan-bold">Billy Bob</CardTitle>
        <Activity className="h-4 w-4 text-crafted-orange" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-crafted-black">
          {project.complete}
        </div>
        <p className="text-xs text-muted-foreground">projects completed</p>
      </CardContent>
    </Card>
  </>
  );
}