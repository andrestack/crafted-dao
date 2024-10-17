'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Coins } from "lucide-react"

interface TreasuryCardProps {
  treasuryTotal?: number
}


export function TreasuryCard({ treasuryTotal}: TreasuryCardProps) {
  

  return (
    <Card className="w-full max-w-md bg-white shadow-[0_0_15px_5px_rgba(251,146,60,0.2)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-league-spartan-bold text-crafted-orange">Treasury</h2>
          <Coins className="w-8 h-8 text-crafted-orange" />
        </div>
        <div className="text-4xl font-bold text-crafted-black mb-1">{treasuryTotal}</div>
        <div className="text-sm text-crafted-black">total</div>
      </CardContent>
    </Card>
  )
}