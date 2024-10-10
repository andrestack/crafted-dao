"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Home, Package2 } from "lucide-react";

interface SidebarProps {
  activeMenuItem: string;
  setActiveMenuItem: (item: string) => void;
}

export function Sidebar({ activeMenuItem, setActiveMenuItem }: SidebarProps) {
  return (
    <aside className="hidden w-64 flex-col bg-gray-800 text-white lg:flex">
      <div className="flex h-16 items-center px-4">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>Crafted DAO</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Button
          variant={activeMenuItem === "dashboard" ? "secondary" : "ghost"}
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
    </aside>
  );
}