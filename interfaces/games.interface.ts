import type { LucideIcon } from "lucide-react";

export interface GameDef {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  minWords: number;
  difficulty: "Easy" | "Medium" | "Hard";
  color: string;
}
