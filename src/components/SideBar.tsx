"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PieChart, Paintbrush } from "lucide-react";
import { Logo } from "@/components/ui/logo";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  value: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <PieChart className="mr-2 h-4 w-4" />,
    value: "dashboard",
  },
  {
    label: "Projects",
    icon: <Paintbrush className="mr-2 h-4 w-4" />,
    value: "projects",
  },
  // Add more items here
];

interface SidebarProps {
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
}

export function Sidebar({ activeMenuItem, setActiveMenuItem }: SidebarProps) {
  return (
    <aside className="hidden w-64 flex-col bg-crafted-black text-crafted-white lg:flex">
      <div className="flex h-32 items-center justify-center px-4 overflow-auto">
        <Link href="/" className="">
          <Logo className="" />
          {/* <span className="text-2xl font-league-spartan-bold"> DAO</span> */}
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => (
          <Button
            key={item.value}
            variant={activeMenuItem === item.value ? "crafted" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveMenuItem(item.value)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
