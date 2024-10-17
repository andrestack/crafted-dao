import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export function ProjectCard({ data }) {
  const projectData = data.slice(1, 5).map((employee) => {
    return {
      name: employee.name,
      jobsCompleted: employee.jobsCompleted,
    };
  });

  

  return (
    <>
      <div className="flex flex-row gap-4 w-full mt-4">
        {projectData.map((employee, index) => (
          <Card
            key={index}
            className="w-full max-w-md bg-white border border-crafted-orange"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                key={index}
                className="text-lg font-league-spartan-bold font-crafted-orange"
              >
                {employee.name}
              </CardTitle>
              <Activity className="h-4 w-4 text-crafted-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-crafted-black">
                {employee.jobsCompleted}
              </div>
              <p className="text-xs text-muted-foreground">
                projects completed
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
