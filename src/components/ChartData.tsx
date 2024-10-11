import { Bar, Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  id: number
  name: string;
  profit: number;
}

interface TeamMember {
  id: number;
  name: string;
  profitShare: number;
}

export function ChartData({ projects, teamMembers }: { projects: Project[], teamMembers: TeamMember[] }) {
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

  const pieChartData = {
    labels: teamMembers.map((member) => member.name),
    datasets: [
      {
        data: teamMembers.map((member) => member.profitShare),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Profit Share Distribution in $</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={pieChartData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}