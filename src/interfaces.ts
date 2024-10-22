import { LucideIcon } from "lucide-react";

export interface PersonData {
  icon: LucideIcon;
  id: string;
  name: string;
  profitStaked: string | number | Array<string> | null | undefined;
  profitAvailable: string | number | Array<string> | null | undefined;
  jobsCompleted: string | number | Array<string> | null | undefined;
  treasuryTotal: string | number | Array<string> | null | undefined;
  overhead: string | number | Array<string> | null | undefined;
}
