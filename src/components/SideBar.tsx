"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Paintbrush, HelpCircle } from "lucide-react";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  value: string;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <Home className="mr-2 h-4 w-4" />, value: "dashboard" },
  { label: "FAQs", icon: <HelpCircle className="mr-2 h-4 w-4" />, value: "faq" },
  // Add more items here
];

interface SidebarProps {
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
}

export function Sidebar({ activeMenuItem, setActiveMenuItem }: SidebarProps) {
  return (
    <aside className="hidden w-64 flex-col bg-crafted-black text-crafted-white lg:flex">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Paintbrush className="h-6 w-6" />
          <span className="text-2xl font-league-spartan-bold">Crafted DAO</span>
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