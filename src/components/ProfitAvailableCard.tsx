import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
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
import { PersonData } from "@/interfaces";

const icons = [User, Briefcase, Coffee, Book, Pen, Laptop, Phone, Camera];

interface ProfitAvailableCardProps {
  data: PersonData[]; // Assuming it uses the same data structure
}

export function ProfitAvailableCard({ data }: ProfitAvailableCardProps) {
  console.log("ProfitAvailableCard - Data:", data);

  const dataArray = Array.isArray(data)
    ? data.filter(
        (person): person is PersonData =>
          person && person.profitAvailable !== undefined
      ) // Type guard to ensure person is of type PersonData
    : data && "profitAvailable" in data // Check if data is not null and has profitAvailable
    ? [data as PersonData] // Cast data to PersonData
    : [];

  const displayEmployees = dataArray.slice(0, 5).map((employee) => {
    const rawValue = employee.profitAvailable || "$0"; // Fallback to "$0" if missing

    // Handle different types of rawValue, similar to other components
    let cleanedValue: number = 0;

    if (typeof rawValue === "string") {
      // Clean string values by removing $ and commas
      cleanedValue = parseFloat(rawValue.replace(/[$,]/g, "")) || 0;
    } else if (typeof rawValue === "number") {
      // If it's already a number, use it directly
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

    return {
      ...employee,
      availableProfit: cleanedValue,
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
          {/* <Button className="text-lg font-league-spartan-bold">
            Available in 30 days
          </Button> */}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
