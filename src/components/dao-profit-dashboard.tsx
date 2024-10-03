"use client";

import { useState } from "react";
import Link from "next/link";
import { Bar, Pie } from "react-chartjs-2";
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
import {
  Activity,
  // ChevronLeft,
  // ChevronRight,
  CircleUser,
  Clock,
  Home,
  Menu,
  Package2,
  //Search,
  //Users,
} from "lucide-react";

//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

export function DaoProfitDashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  // Mock data for the dashboard
  const projects = [
    { id: 1, name: "Project A", profit: 50000 },
    { id: 2, name: "Project B", profit: -10000 },
    { id: 3, name: "Project C", profit: 30000 },
  ];

  const teamMembers = [
    { id: 1, name: "Alice", avatar: "/avatars/01.png", profitShare: 2500 },
    { id: 2, name: "Bob", avatar: "/avatars/02.png", profitShare: 2000 },
    { id: 3, name: "Charlie", avatar: "/avatars/03.png", profitShare: 1500 },
    { id: 4, name: "Diana", avatar: "/avatars/04.png", profitShare: 1000 },
  ];

  const lockInPeriodEnd = new Date("2024-12-01T00:00:00");
  const now = new Date();
  const timeLeft = lockInPeriodEnd.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  const progressPercentage = 100 - (daysLeft / 90) * 100; // Assuming 90-day lock-in period

  const barChartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: "Profit/Loss",
        data: projects.map((project) => project.profit),
        backgroundColor: projects.map((project) =>
          project.profit >= 0
            ? "rgba(34, 197, 94, 0.6)"
            : "rgba(239, 68, 68, 0.6)"
        ),
        borderColor: projects.map((project) =>
          project.profit >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: teamMembers.map((member) => member.name),
    datasets: [
      {
        data: teamMembers.map((member) => member.profitShare),

        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case "dashboard":
        return (
          <>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Lock-in Period Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-2 w-full" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {daysLeft} days left until lock-in period ends. Earlier
                  withdrawals are subject to a 50% penalty.
                </p>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {project.name}
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-2xl font-bold ${
                        project.profit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ${project.profit.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {project.profit >= 0 ? "Profit" : "Loss"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Project Performance</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Bar
                    data={barChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Profit Share Distribution in $</CardTitle>
                </CardHeader>
                <CardContent>
                  <Pie data={pieChartData} />
                </CardContent>
              </Card>
            </div>
          </>
        );
      // case "projects":
      //   return (
      //     <Card>
      //       <CardHeader>
      //         <CardTitle>Projects</CardTitle>
      //         <CardDescription>Detailed view of all projects</CardDescription>
      //       </CardHeader>
      //       <CardContent>
      //         {projects.map((project) => (
      //           <div
      //             key={project.id}
      //             className="mb-4 flex items-center justify-between"
      //           >
      //             <div>
      //               <h3 className="text-lg font-semibold">{project.name}</h3>
      //               <p
      //                 className={`text-sm ${
      //                   project.profit >= 0 ? "text-green-600" : "text-red-600"
      //                 }`}
      //               >
      //                 {project.profit >= 0 ? "Profit" : "Loss"}: $
      //                 {Math.abs(project.profit).toLocaleString()}
      //               </p>
      //             </div>
      //             <Button variant="outline">View Details</Button>
      //           </div>
      //         ))}
      //       </CardContent>
      //     </Card>
      //   );
      // case "team":
      //   return (
      //       <Card>
      //         <CardHeader>
      //           <CardTitle>Team Members</CardTitle>
      //           <CardDescription>
      //             Profit shares for each team member
      //           </CardDescription>
      //         </CardHeader>
      //         <CardContent>
      //           {teamMembers.map((member) => (
      //               <div
      //                 key={member.id}
      //                 className="mb-4 flex items-center justify-between"
      //               >
      //                 <div className="flex items-center">
      //                   <Avatar className="h-10 w-10">
      //                     <AvatarImage src={member.avatar} alt={member.name} />
      //                     <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      //                   </Avatar>
      //                   <div className="ml-4">
      //                     <p className="text-sm font-medium leading-none">
      //                       {member.name}
      //                     </p>
      //                     <p className="text-sm text-muted-foreground">
      //                       Profit Share: ${member.profitShare.toLocaleString()}
      //                     </p>
      //                   </div>
      //                 </div>
      //                 <Button variant="outline">View Details</Button>
      //               </div>
      //             ))}
      //           </CardContent>
      //         </Card>
      //       );
      case "lock-in":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Lock-in Period Status</CardTitle>
              <CardDescription>
                Time remaining until profits can be accessed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <Progress value={progressPercentage} className="h-2 w-full" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {daysLeft} days left until lock-in period ends
                </p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold">
                  Options after lock-in period:
                </h3>
                <ul className="mt-2 list-inside list-disc">
                  <li>Withdraw your profit share</li>
                  <li>Reinvest in existing projects</li>
                  <li>Invest in new projects</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - hidden on mobile, visible on larger screens */}
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
          {/* <Button
            variant={activeMenuItem === "projects" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveMenuItem("projects")}
          >
            <Package2 className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Button
            variant={activeMenuItem === "team" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveMenuItem("team")}
          >
            <Users className="mr-2 h-4 w-4" />
            Team Members
          </Button> */}
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

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          {/* Burger menu - visible only on mobile */}
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
                {/* <Button
                  variant={
                    activeMenuItem === "projects" ? "secondary" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveMenuItem("projects")}
                >
                  <Package2 className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button
                  variant={activeMenuItem === "team" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveMenuItem("team")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Team Members
                </Button> */}
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
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {/* Commented out search functionality
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="mb-4 text-2xl font-bold">
            {activeMenuItem === "lock-in" && "Lock-in Period Status"}
            {activeMenuItem === "projects" && "Projects"}
            {activeMenuItem === "team" && "Team Members"}
            {activeMenuItem === "dashboard" && "Dashboard Overview"}
          </h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
