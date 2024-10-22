import React from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonData } from "@/interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDataProps {
  data: PersonData | PersonData[];
}

export function PieChartData({ data }: ChartDataProps) {
  console.log("PieChartData - Data:", data);
  
  // Ensure data is an array and filter out values without 'profitStaked'
  const dataArray = Array.isArray(data) ? data.filter(person => person && person.profitStaked) : (data && data.profitStaked ? [data] : []);

  // Extract names and profitStaked values from the data array
  const names = dataArray.map((person) => person.name);
  const profitStaked = dataArray.slice(0, 4).map((person) => {
    const rawValue = person.profitStaked || 0; // Handle undefined or null
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
    } else if (
      typeof rawValue === "object" &&
      rawValue !== null &&
      "value" in rawValue
    ) {
      // Handle the case where rawValue is an object, and extract its value
      const value = rawValue.value;
      cleanedValue =
        typeof value === "string"
          ? parseFloat(value.replace(/[$,]/g, "")) || 0
          : typeof value === "number"
          ? value
          : 0;
    } else {
      // Fallback to 0 for unexpected cases
      cleanedValue = 0;
    }

    return cleanedValue;
  });

  
  const pieChartData = {
    labels: names,
    datasets: [
      {
        data: profitStaked,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full grid gap-4 md:grid-cols-2">
      
        <Card className="col-span-3 w-full max-w-md bg-white border border-crafted-orange">
          <CardHeader>
            <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
            Profit Staked in $
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={pieChartData} />
          </CardContent>
        </Card>
     
    </div>
  );
}
