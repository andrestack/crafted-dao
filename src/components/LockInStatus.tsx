// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";

// interface LockInStatusProps {
//   daysLeft: number;
//   progressPercentage: number;
// }


// export const LockInStatus: React.FC<LockInStatusProps> = ({ daysLeft, progressPercentage }) => {
//   const lockInPeriodEnd = new Date("2024-12-01T00:00:00");
//   const now = new Date();
//   const daysLeft = Math.ceil((lockInPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
//   //const progressPercentage = 100 - (daysLeft / 90) * 100; // Assuming 90-day lock-in period
  
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Lock-in Period Status</CardTitle>
//         <CardDescription>Time remaining until profits can be accessed</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mt-4">
//           <Progress value={progressPercentage} className="h-2 w-full" />
//           <p className="mt-2 text-sm text-muted-foreground">{daysLeft} days left until lock-in period ends</p>
//         </div>
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold">Options after lock-in period:</h3>
//           <ul className="mt-2 list-inside list-disc">
//             <li>Withdraw your profit share</li>
//             <li>Reinvest in existing projects</li>
//             <li>Invest in new projects</li>
//           </ul>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
