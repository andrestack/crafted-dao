'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Employee {
  name: string;
  email: string;
  availableProfit: number;
}

export function ProfitAvailableCard({ employees = [] }: { employees?: Employee[] }) {
  const defaultEmployees: Employee[] = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", availableProfit: 1999 },
    { name: "Jackson Lee", email: "jackson.lee@email.com", availableProfit: 39 },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", availableProfit: 299 },
    { name: "William Kim", email: "william.kim@email.com", availableProfit: 99 },
    { name: "Sofia Davis", email: "sofia.davis@email.com", availableProfit: 699 },
  ]

  const displayEmployees = employees.length > 0 ? employees : defaultEmployees

  return (
    <Card className="w-full max-w-md bg-white border border-orange-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-500">Employee Profit Withdrawal</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {displayEmployees.map((employee, index) => (
            <div key={index} className="flex items-center mb-4 last:mb-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?text=${employee.name.charAt(0)}`} alt={employee.name} />
                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium text-black">{employee.name}</p>
                <p className="text-xs text-gray-600">{employee.email}</p>
              </div>
              <div className="ml-auto font-medium text-black">
                ${employee.availableProfit.toFixed(2)}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}