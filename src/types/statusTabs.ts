export interface StatusTabConfig {
  id: string;
  label: string;
  iconName: string;
  color: string;
  description: string;
  count?: number;
}

export type StatusTabType = "jobs" | "applicants";
