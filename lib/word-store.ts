"use client";

import type { Word } from "@/interfaces/word.interface";
import { words } from "@/mock/words.mock";

const STORAGE_KEY = "linguavault-words";

export function getWords(): Word[] {
  if (typeof window === "undefined") return words;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    return words;
  }
  return JSON.parse(stored);
}

export function saveWords(words: Word[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}
