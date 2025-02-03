"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TeamMemberPanel from "./TeamMemberPanel";
import DaoDashboard from "./DaoDashboard";
import { PersonData } from "@/interfaces";
import { Sidebar } from "./SideBar";
import LoadingSpinner from "./LoadingSpinner";
//import FAQ from "@/components/FAQ/FAQ";
import ChatButton from "@/components/FAQ/ChatButton";

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

        // Assuming the API returns an array of person data
        const formattedData = result.data.map(
          (person: Omit<PersonData, "id">, index: number) => ({
            ...person,
            id: `person-${index}`, // Generate a new ID based on the index
          })
        );
        console.log("Formatted data:", formattedData);
        setData(formattedData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMemberSelect = (memberId: string) => {
    setSelectedMember(memberId);
  };

  const getFilteredData = () => {
    if (selectedMember === "home") {
      return data;
    }
    const filtered = data.filter((person) => person.id === selectedMember);

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
    return (
      <div className="flex justify-center gap-2 items-center h-screen">
        <LoadingSpinner />
        <span className="text-crafted-black text-lg font-league-spartan-bold">
          Loading
        </span>
      </div>
    );
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
        <header className="sticky top-0 z-10 flex h-16 items-center justify-start gap-3 border-b bg-background px-4 md:px-6">
          <TeamMemberPanel
            data={data}
            selectedMember={selectedMember}
            onMemberSelect={handleMemberSelect}
          />

          <ChatButton />

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
                  className="flex items-center justify-center gap-2 px-3 py-2 text-lg font-semibold"
                >
                  <Logo />
                  {/* <span>Crafted DAO</span> */}
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
                {/* <Button
                  variant={activeMenuItem === "faq" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveMenuItem("faq")}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  FAQ Section
                </Button> */}
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
          {/* {activeMenuItem === "faq" ? (
            <FAQ /> // Render the FAQ component when activeMenuItem is "faq"
          ) : (
            <DaoDashboard
              data={filteredData}
              globalTreasury={globalTreasury}
              globalOverhead={globalOverhead}
              selectedMemberId={selectedMember}
            />
          )} */}
        </main>
      </div>
    </div>
  );
}
