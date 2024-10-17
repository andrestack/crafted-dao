import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";

interface Project {
  id: number;
  name: string;
  profit: number;
}

export default function BarChart({ projects }: { projects: Project[] }) {
    const barChartData = {
      labels: projects.map((project) => project.name),
      datasets: [
        {
          label: "Profit/Loss",
          data: projects.map((project) => project.profit),
          backgroundColor: projects.map((project) =>
            project.profit >= 0 ? "rgba(34, 197, 94, 0.6)" : "rgba(239, 68, 68, 0.6)"
          ),
          borderColor: projects.map((project) =>
            project.profit >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
          ),
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Project Performance</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </CardContent>
      </Card>
    );
  }