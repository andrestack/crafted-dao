'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";

interface OverheadsCardProps {
  dailyOverheads?: string | number | Array<string> | null | undefined;
}

export function OverheadsCard({ dailyOverheads }: OverheadsCardProps) {
  let cleanedDailyOverheads: number = 0; // Initialize to 0 as fallback

  // Handle different types of dailyOverheads
  if (dailyOverheads === null || dailyOverheads === undefined) {
    
    cleanedDailyOverheads = 0;
  } else if (Array.isArray(dailyOverheads) && dailyOverheads.length > 0) {
    
    const firstValue = dailyOverheads[0]; // Extract the first value from the array
    cleanedDailyOverheads = parseFloat(firstValue.replace(/[$,]/g, "")) || 0;
  } else if (typeof dailyOverheads === "string") {
    
    cleanedDailyOverheads = parseFloat(dailyOverheads.replace(/[$,]/g, "")) || 0; // Handle string with $ and commas
  } else if (typeof dailyOverheads === "number") {
    cleanedDailyOverheads = dailyOverheads; // If it's already a number, use it directly
  } else {
    
    cleanedDailyOverheads = 0; // Fallback to 0 for unexpected cases
  }

  
  return (
    <Card className="w-full max-w-md bg-white border border-crafted-orange">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-league-spartan-bold text-crafted-orange">Overheads</h2>
          <Receipt className="w-8 h-8 text-crafted-orange" />
        </div>
        <div className="text-4xl font-bold text-crafted-black mb-1">
          ${cleanedDailyOverheads.toFixed(2)} {/* Display with two decimal places */}
        </div>
        <div className="text-sm text-gray-600">daily</div>
      </CardContent>
    </Card>
  );
}
