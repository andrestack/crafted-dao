'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Receipt } from "lucide-react"

interface OverheadsCardProps {
  dailyOverheads?: number
}

export function OverheadsCard({ dailyOverheads}: OverheadsCardProps) {
  

  return (
    <Card className="w-full max-w-md bg-white border border-crafted-orange">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-league-spartan-bold text-crafted-orange">Overheads</h2>
          <Receipt className="w-8 h-8 text-crafted-orange" />
        </div>
        <div className="text-4xl font-bold text-crafted-black mb-1">{dailyOverheads}</div>
        <div className="text-sm text-gray-600">daily</div>
      </CardContent>
    </Card>
  )
}