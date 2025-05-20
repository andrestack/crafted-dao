"use client";

import { useState, useMemo, useEffect } from "react";
import { Home } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PersonData } from "@/interfaces";
import { LucideIcon } from "lucide-react";

interface TeamMemberPanelProps {
  data: PersonData[];
  selectedMember: string;
  onMemberSelect: (memberId: string) => void;
}

export default function TeamMemberPanel({
  data,
  selectedMember,
  onMemberSelect,
}: TeamMemberPanelProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const teamMembers = useMemo(
    () => [
      {
        id: "home",
        name: "Overview",
        icon: Home as LucideIcon,
        profitStaked: 0,
        profitAvailable: 0,
        jobsCompleted: 0,
        treasuryTotal: 0,
        overhead: 0,
        jobs: [],
        smallJobProfit: "0",
        totalProfit: "0",
      },
      ...data.slice(1, 8).map((person) => ({
        id: person.id,
        name: person.name,
        icon: person.icon,
        profitStaked: person.profitStaked || 0,
        profitAvailable: person.profitAvailable || 0,
        jobsCompleted: person.jobsCompleted || 0,
        treasuryTotal: person.treasuryTotal || 0,
        overhead: person.overhead || 0,
        jobs: person.jobs || [],
        smallJobProfit: person.smallJobProfit || "0",
        totalProfit: person.totalProfit || "0",
      })),
    ],
    [data]
  );

  const selectedMemberData: PersonData | undefined = useMemo(
    () =>
      teamMembers.find((member) => member.id === selectedMember) ||
      teamMembers[0],
    [teamMembers, selectedMember]
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // console.log("TeamMemberPanel - Selected member:", selectedMember);
      // console.log("TeamMemberPanel - Selected member data:", selectedMemberData);
    }
  }, [selectedMember, selectedMemberData]);

  const handleMemberSelect = (memberId: string) => {
    //console.log("TeamMemberPanel - Selecting member:", memberId);
    onMemberSelect(memberId);
    setOpen(false);
  };

  const renderButton = () => (
    <Button variant="outline" className="w-[150px] justify-center">
      {selectedMemberData?.icon && (
        <selectedMemberData.icon className="mr-2 h-4 w-4" />
      )}
      {selectedMemberData?.name}
    </Button>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{renderButton()}</PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <MemberList
            teamMembers={teamMembers}
            onMemberSelect={handleMemberSelect}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{renderButton()}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <MemberList
            teamMembers={teamMembers}
            onMemberSelect={handleMemberSelect}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function MemberList({
  teamMembers,
  onMemberSelect,
}: {
  teamMembers: Array<{ id: string; name: string; icon?: React.ElementType }>;
  onMemberSelect: (memberId: string) => void;
}) {
  return (
    <Command>
      {/* <CommandInput placeholder="Filter members..." /> */}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {teamMembers.map((member) => (
            <CommandItem
              key={member.id}
              value={member.id}
              onSelect={() => {
                //console.log("MemberList - Selected:", member.id);
                onMemberSelect(member.id);
              }}
            >
              {member.icon && <member.icon className="mr-2 h-4 w-4" />}
              {member.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
