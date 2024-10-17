import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Briefcase,
  Coffee,
  Book,
  Pen,
  Laptop,
  Phone,
  Camera,
} from "lucide-react";

const icons = [User, Briefcase, Coffee, Book, Pen, Laptop, Phone, Camera];

interface ProfitAvailableCardProps {
  data: PersonData[]; // Assuming it uses the same data structure
}

export function ProfitAvailableCard({ data }: ProfitAvailableCardProps) {
  // Extract and clean the available profit data
  const displayEmployees = data.slice(1, 5).map((employee) => {
    const rawValue = employee.profitAvailable || "$0"; // Fallback to "$0" if missing
    const cleanedValue = rawValue.replace(/[$,]/g, ""); // Remove $ sign and commas
    const availableProfit = parseFloat(cleanedValue); // Parse cleaned value into a float

    return {
      ...employee,
      availableProfit,
    };
  });

  
  return (
    <Card className="w-full max-w-md bg-white border border-crafted-orange">
      <CardHeader>
        <CardTitle className="text-2xl font-league-spartan-bold text-crafted-orange">
          Employee Profit Available
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {displayEmployees.map((employee, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div key={index}>
                <div className="flex items-center py-4">
                  <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium text-black">
                      {employee.name}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-black">
                    ${employee.availableProfit.toFixed(2)}
                  </div>
                </div>
                {index < displayEmployees.length - 1 && (
                  <Separator className="bg-orange-200" />
                )}
              </div>
            );
          })}
        </ScrollArea>
        <CardFooter className="flex justify-center">
          <Button className="text-lg font-league-spartan-bold">Available in 30 days</Button>
        </CardFooter>
      </CardContent>
    </Card>

    
  );
}
