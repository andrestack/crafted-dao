import { Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



interface TeamMember {
  id: number;
  name: string;
  profitShare: number;
}

export function ChartData({ teamMembers }: { teamMembers: TeamMember[] }) {
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
        <Card className="col-span-3 w-full max-w-md bg-white border border-crafted-orange">
          <CardHeader>
            <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">Profit Staked in $</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={pieChartData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
