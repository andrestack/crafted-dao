import { Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonData } from "@/interfaces";

interface ChartDataProps {
data: PersonData[];

}

export function ChartData({ data }: ChartDataProps) {
  // Extract names and profitStaked values from the data array
  const names = data.slice(1, 5).map((person) => person.name);
  const profitStaked = data.slice(1, 5).map((person) => {
    const rawValue = person.profitStaked || 0; // Handle undefined or null
  
    // Handle different types of rawValue, including objects
    let cleanedValue: number = 0;
  
    if (typeof rawValue === "string") {
      // Clean string values by removing $ and commas
      cleanedValue = parseFloat(rawValue.replace(/[$,]/g, "")) || 0;
    } else if (typeof rawValue === "number") {
      // If it's a number, use it as-is
      cleanedValue = rawValue;
    } else if (Array.isArray(rawValue) && rawValue.length > 0) {
      // If it's an array, clean the first element as a string
      cleanedValue = parseFloat(rawValue[0].replace(/[$,]/g, "")) || 0;
    } else if (typeof rawValue === "object" && rawValue !== null && 'value' in rawValue) {
      // Handle the case where rawValue is an object, and extract its value
      const value = rawValue.value;
      cleanedValue = typeof value === "string"
        ? parseFloat(value.replace(/[$,]/g, "")) || 0
        : typeof value === "number" ? value : 0;
    } else {
      // Fallback to 0 for unexpected cases
      cleanedValue = 0;
    }
  
    return cleanedValue;
  });



  // const isValidData = profitStaked.every(
  //   (value) => typeof value === "number" && !isNaN(value)
  // );

  // if (!isValidData) {
  //   console.error("Invalid data for profit staked:", profitStaked);
  //   return <p>Invalid data for rendering the chart</p>;
  // }

  const pieChartData = {
    labels: names, // Labels for each slice of the pie chart (names of the people)
    datasets: [
      {
        data: profitStaked,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ], // Add more colors if there are more people
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ], // Add more borders if necessary
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="w-full grid gap-4 md:grid-cols-2">
        <Card className="col-span-3 w-full max-w-md bg-white border border-crafted-orange">
          <CardHeader>
            <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
              Profit Staked in $
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Render the combined pie chart */}
            <Pie data={pieChartData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
