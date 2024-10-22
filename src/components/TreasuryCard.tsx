'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

// Allow treasuryTotal to be string, number, array, null, or undefined
interface TreasuryCardProps {
  treasuryTotal?: string | number | Array<string> | null | undefined;
}

export function TreasuryCard({ treasuryTotal }: TreasuryCardProps) {
  
  let cleanedTreasuryTotal: number = 0; // Initialize as 0

  // Handle different types of treasuryTotal
  if (treasuryTotal === null || treasuryTotal === undefined) {
    
    cleanedTreasuryTotal = 0;
  } else if (Array.isArray(treasuryTotal) && treasuryTotal.length > 0) {
    
    // Assume the first element is the relevant value
    const firstValue = treasuryTotal[0];
    cleanedTreasuryTotal = parseFloat(firstValue.replace(/[$,]/g, "")) || 0;
  } else if (typeof treasuryTotal === "string") {
    
    const cleanedValue = parseFloat(treasuryTotal.replace(/[$,]/g, ""));
    cleanedTreasuryTotal = isNaN(cleanedValue) ? 0 : cleanedValue;
  } else if (typeof treasuryTotal === "number") {
    cleanedTreasuryTotal = treasuryTotal;
  } else {
    
    cleanedTreasuryTotal = 0; // Fallback to 0 for unexpected cases
  }

  
  return (
    <Card className="w-full max-w-md bg-crafted-orange shadow-[0_0_10px_5px_rgba(0,0,0,0.5)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-league-spartan-bold text-crafted-black">Treasury</h2>
          <Coins className="w-8 h-8 text-crafted-white" />
        </div>
        <div className="text-4xl font-bold text-crafted-black mb-1">
          ${cleanedTreasuryTotal.toFixed(2)} {/* Safely call toFixed now */}
        </div>
        <div className="text-sm text-crafted-black">total</div>
      </CardContent>
    </Card>
  );
}
