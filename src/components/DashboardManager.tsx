"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Menu, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TeamMemberPanel from "./TeamMemberPanel";
import DaoDashboard from "./DaoDashboard";
import { PersonData } from "@/interfaces";
import { Sidebar } from "./SideBar";

export default function DashboardManager() {
  const [data, setData] = useState<PersonData[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("home"); // Changed from "overview" to "home"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("API response:", result);

        // Assuming the API returns an array of person data
        const formattedData = result.data.map(
          (person: Omit<PersonData, "id">, index: number) => ({
            ...person,
            id: person.id || `person-${index}`, // Use existing id or generate one
          })
        );

        console.log("Formatted data:", formattedData);
        setData(formattedData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMemberSelect = (memberId: string) => {
    console.log("DashboardManager - Selected member ID:", memberId);
    setSelectedMember(memberId);
  };

  const getFilteredData = () => {
    console.log("Current data:", data);
    console.log("Selected member:", selectedMember);
    if (selectedMember === "home") {
      return data;
    }
    const filtered = data.filter((person) => person.id === selectedMember);
    console.log("Filtered data:", filtered);
    if (filtered.length > 0) {
      return filtered; // Return filtered data as an array
    }

    // If no match, return an empty array instead of null or undefined
    return [];
  };

  const filteredData = getFilteredData();

  useEffect(() => {
    console.log("DashboardManager - Updated selectedMember:", selectedMember);
    console.log("DashboardManager - Updated filteredData:", filteredData);
  }, [selectedMember, filteredData]);

  const globalTreasury = data[0]?.treasuryTotal || [];
  const globalOverhead = data[0]?.overhead || [];


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TeamMemberPanel
            data={data}
            selectedMember={selectedMember}
            onMemberSelect={handleMemberSelect}
          />
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
                  <Paintbrush className="h-6 w-6" />
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
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <DaoDashboard
            data={filteredData}
            globalTreasury={globalTreasury}
            globalOverhead={globalOverhead}
            selectedMemberId={selectedMember}
          />
        </main>
      </div>
    </div>
  );
}
