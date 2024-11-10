"use client";

import { TreasuryCard } from "./TreasuryCard";
import { OverheadsCard } from "./OverheadsCard";
import { PieChartData } from "./PieChartData";
import { ProfitAvailableCard } from "./ProfitAvailableCard";
import { ProjectCard } from "./ProjectCard";
import { Logo } from "@/components/ui/logo";

import { PersonData } from "@/interfaces";

interface DaoDashboardProps {
  data: PersonData[]; // All members' data, including global data
  selectedMemberId: string;
  globalTreasury: string | number | Array<string> | null | undefined;
  globalOverhead: string | number | Array<string> | null | undefined;
}

export default function DaoDashboard({
  data,
  selectedMemberId,
  globalTreasury,
  globalOverhead,
}: DaoDashboardProps) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  console.log("DaoDashboard - Data:", data);
  console.log("DaoDashboard - selectedMemberId:", selectedMemberId);

  // Extract individual team member data (everything after the global data)
  //const teamData = data.slice(1);
  //console.log("DaoDashboard - Team Data:", teamData);

  // Find the selected member, or use all team data for overview
  const selectedMember =
    selectedMemberId === "home"
      ? null // No specific member selected
      : data.find((member) => member.id === selectedMemberId); // Find the specific member

  console.log("DaoDashboard - Selected Member:", selectedMember);

  return (
    <>
      <div className="flex justify-center md:hidden mb-5">
        <Logo className="h-20 w-20" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Always display global data for Overheads and Treasury */}
          <TreasuryCard treasuryTotal={globalTreasury} />
          <OverheadsCard dailyOverheads={globalOverhead} />

          {/* Display team data for "home" (all members) or the selected member's data */}
          <PieChartData
            data={
              selectedMemberId === "home"
                ? data.slice(1)
                : selectedMember
                ? [selectedMember]
                : []
            }
          />
          <ProfitAvailableCard
            data={
              selectedMemberId === "home"
                ? data.slice(1)
                : selectedMember
                ? [selectedMember]
                : []
            }
          />
        </div>

        <div>
          <ProjectCard
            data={
              selectedMemberId === "home"
                ? data.slice(1)
                : selectedMember
                ? [selectedMember]
                : []
            }
          />
        </div>

        {/* Pass the team data or selected member data to the ProjectCard component */}
      </div>
     
    </>
  );
}
