// import { Bar } from "react-chartjs-2";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export function BarChartData({ data }: { data: any }) {
//   // Ensure data is an array and has elements
//   if (!Array.isArray(data) || data.length === 0) {
//     console.error("Invalid or empty data provided to BarChartData");
//     return <p>No data available for the chart</p>;
//   }

//   // Extract names and profitAvailable values from the data array, skipping the header row if present
//   const chartData = data.slice(data[0].name === "name" ? 1 : 0).map((person) => ({
//     name: person.name,
//     profitAvailable: parseFloat(person.profitAvailable)
//   })).filter(item => !isNaN(item.profitAvailable));

//   console.log("Processed chartData:", chartData);

//   if (chartData.length === 0) {
//     console.error("No valid data for rendering the chart after processing");
//     return <p>No valid data available for the chart</p>;
//   }

//   const barChartData = {
//     labels: chartData.map(item => item.name),
//     datasets: [
//       {
//         label: "Profit Available",
//         data: chartData.map(item => item.profitAvailable),
//         backgroundColor: chartData.map(item => 
//           item.profitAvailable >= 0 ? "rgba(34, 197, 94, 0.6)" : "rgba(239, 68, 68, 0.6)"
//         ),
//         borderColor: chartData.map(item => 
//           item.profitAvailable >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
//         ),
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
//       <Card className="col-span-4 w-full bg-white border border-crafted-orange">
//         <CardHeader>
//           <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
//             Profit Available in $
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Bar 
//             data={barChartData} 
//             options={{ 
//               responsive: true, 
//               maintainAspectRatio: false,
//               plugins: { 
//                 legend: { display: false } 
//               },
//               scales: {
//                 y: {
//                   beginAtZero: true
//                 }
//               }
//             }} 
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
