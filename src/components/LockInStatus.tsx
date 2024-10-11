import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


interface LockInStatusProps {
  daysLeft: number;
  progressPercentage: number;
}

export function LockInStatus({ daysLeft, progressPercentage }: LockInStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lock-in Period Status</CardTitle>
        <CardDescription>Time remaining until profits can be accessed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-2 w-full" />
          <p className="mt-2 text-sm text-muted-foreground">{daysLeft} days left until lock-in period ends</p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Options after lock-in period:</h3>
          <ul className="mt-2 list-inside list-disc">
            <li>Withdraw your profit share</li>
            <li>Reinvest in existing projects</li>
            <li>Invest in new projects</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}