import { Card, CardContent } from "@/components/ui/card";

interface ProfitCardProps {
  totalProfit: string;
  smallJobProfit: string;
}

export function ProfitCard({ totalProfit, smallJobProfit }: ProfitCardProps) {
  return (
    <Card className="w-72 bg-white border border-crafted-orange">
      <CardContent className="pt-6 space-y-4">
        <div>
          <p className="text-lg font-black font-league-spartan-bold mb-1">
            Total Profit of Jobs
          </p>
          <p className="text-2xl font-bold text-crafted-orange">
            {totalProfit}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium  mb-1">
            Small Job Profit
          </p>
          <p className="text-lg text-crafted-orange">{smallJobProfit}</p>
        </div>
      </CardContent>
    </Card>
  );
}
