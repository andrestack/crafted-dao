"use client";

import { ColumnDef } from "@tanstack/react-table";
import { JobData } from "@/interfaces";
//import { useState } from "react";

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "profitable":
      return "bg-green-100 text-green-800";
    case "unprofitable":
      return "bg-red-100 text-red-800";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to format status text
const formatStatus = (status: string): string => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatCurrency = (value: string): string => {
  const cleanValue = value.replace(/[$,]/g, "");
  const number = parseFloat(cleanValue) || 0;
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const columns: ColumnDef<JobData>[] = [
  {
    accessorKey: "name",
    header: () => (
      <span className="text-xl font-league-spartan-bold">Job Name</span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-xl font-league-spartan-bold">Status</span>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(
            status
          )}`}
        >
          {formatStatus(status)}
        </span>
      );
    },
  },
  {
    accessorKey: "teamProfitShare",
    className: "text-center",
    header: () => (
      <span className="text-xl font-league-spartan-bold">
        Team Profit Share
      </span>
    ),
    cell: ({ row }) => {
      const value = row.getValue("teamProfitShare") as string;
      return (
        <div className="text-left">
          <span>${formatCurrency(value)}</span>
        </div>
      );
    },
  },
];
