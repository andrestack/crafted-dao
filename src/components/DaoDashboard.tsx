"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";
import { Clock, Home, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
//import { LockInStatus } from "./LockInStatus";
import { Sidebar } from "./SideBar";
import { TreasuryCard } from "./TreasuryCard";
import { OverheadsCard } from "./OverheadsCard";
import { ChartData } from "./PieChartData";
import { ProfitAvailableCard } from "./ProfitAvailableCard";
import { ProjectCard } from "./ProjectCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
);

interface PersonData {
  name: string;
  profitStaked: string | null;
  profitAvailable: string | null;
  jobsCompleted: string | null;
  treasuryTotal: string | null;
  overhead: string | number | null;
}

export function DaoDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [data, setData] = useState<PersonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <OverheadsCard dailyOverheads={data[0]?.overhead} />
                <TreasuryCard treasuryTotal={data[0]?.treasuryTotal} />
                <ChartData data={data} />

                <ProfitAvailableCard data={data} />
              </div>
            </div>
            <div className="flex justify-between ">
              <ProjectCard data={data} />
            </div>
          </>
        );
      // case "lock-in":
      //   return (
      //     <LockInStatus
      //       daysLeft={30} // Replace with actual value
      //       progressPercentage={50} // Replace with actual value
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <h1 className="text-2xl font-bold">
            {activeMenuItem === "lock-in"
              ? "Lock-in Period Status"
              : "Dashboard Overview"}
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-card">
              <nav className="grid gap-2 py-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span>Crafted DAO</span>
                </Link>
                <Button
                  variant={
                    activeMenuItem === "dashboard" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveMenuItem("dashboard")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeMenuItem === "lock-in" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveMenuItem("lock-in")}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Lock-in Period
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
