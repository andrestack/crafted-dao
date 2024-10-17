"use client";

import { useState } from "react";
import Link from "next/link";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController } from "chart.js";
import { Clock, Home, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ProjectCard } from "./ProjectCard";
import { LockInStatus } from "./LockInStatus"; 
import { ChartData } from "./PieChartData"; 
import { Sidebar } from "./SideBar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController);

export function DaoDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const projects = [
    { id: 1, name: "Project A", complete: 50 },
    { id: 2, name: "Project B", complete: 100 },
    { id: 3, name: "Project C", complete: 25 },
  ];

  const teamMembers = [
    { id: 1, name: "Alice", avatar: "/avatars/01.png", profitShare: 2500 },
    { id: 2, name: "Bob", avatar: "/avatars/02.png", profitShare: 2000 },
    { id: 3, name: "Charlie", avatar: "/avatars/03.png", profitShare: 1500 },
    { id: 4, name: "Diana", avatar: "/avatars/04.png", profitShare: 1000 },
  ];

  const lockInPeriodEnd = new Date("2024-12-01T00:00:00");
  const now = new Date();
  const daysLeft = Math.ceil((lockInPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = 100 - (daysLeft / 90) * 100; // Assuming 90-day lock-in period

  const renderContent = () => {
    switch (activeMenuItem) {
      case "dashboard":
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <ChartData projects={projects} teamMembers={teamMembers} />
          </>
        );
      case "lock-in":
        return <LockInStatus daysLeft={daysLeft} progressPercentage={progressPercentage} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6">
        <h1 className="text-2xl font-bold">{activeMenuItem === "lock-in" ? "Lock-in Period Status" : "Dashboard Overview"}</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-card">
              <nav className="grid gap-2 py-4">
                <Link href="#" className="flex items-center gap-2 px-3 py-2 text-lg font-semibold">
                  <Package2 className="h-6 w-6" />
                  <span>Crafted DAO</span>
                </Link>
                <Button variant={activeMenuItem === "dashboard" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveMenuItem("dashboard")}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant={activeMenuItem === "lock-in" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveMenuItem("lock-in")}>
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