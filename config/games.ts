import { Skull, LayoutGrid, Shuffle, Timer, Layers } from "lucide-react";

import { GameDef } from "@/interfaces/games.interface";

export const GAMES: GameDef[] = [
  {
    id: "hangman",
    title: "Hangman",
    description:
      "You are shown the translation and must guess the original word letter by letter. You have 6 attempts.",
    icon: Skull,
    minWords: 1,
    difficulty: "Medium",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    description:
      "You are shown a translation and must choose the correct word from four options.",
    icon: LayoutGrid,
    minWords: 4,
    difficulty: "Easy",
    color: "from-sky-500/20 to-sky-500/5",
  },
  {
    id: "scramble",
    title: "Word Scramble",
    description:
      "The letters of the word are scrambled. Rearrange them to form the correct word.",
    icon: Shuffle,
    minWords: 1,
    difficulty: "Medium",
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: "speed-round",
    title: "Speed Round",
    description:
      "Answer as many translations as you can in 60 seconds. Type the correct word as quickly as possible.",
    icon: Timer,
    minWords: 3,
    difficulty: "Hard",
    color: "from-rose-500/20 to-rose-500/5",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description:
      "Flip the cards to match words with their translations. Find all the pairs.",
    icon: Layers,
    minWords: 4,
    difficulty: "Easy",
    color: "from-violet-500/20 to-violet-500/5",
  },
];
