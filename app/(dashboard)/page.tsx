"use client";

import { useState } from "react";
import { ChevronDown, BarChart3 } from "lucide-react";

import { AddWordForm } from "@/components/words/AddWordForm";
import { LanguageChart } from "@/components/words/LanguageChart";
import { StatsCards } from "@/components/Stats/StatsCards";
import { Word } from "@/interfaces/word.interface";
import { words } from "@/mock/words.mock";
import { WordList } from "@/components/words/WordList";

export default function Home() {
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="min-h-screen bg-griot-cream">
      <main className="mx-auto max-w-7xl px-3 py-3">
        {/* Stats section */}
        <div className="space-y-4 sm:space-y-6 mb-6">
          {/* Collapsible button only on mobile devices */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowStats(!showStats)}
              className="w-full flex items-center justify-between px-4 py-3 bg-griot-cream border border-griot-sand/40 
                          rounded-lg shadow-sm active:scale-[0.98] transition-all duration-200 ease-out"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-griot-teal" />
                <span className="text-sm font-sans text-griot-dark">
                  View Stats
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-griot-gray transition-transform duration-300 ease-in-out ${
                  showStats ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out py-3 overflow-hidden ${
                showStats
                  ? "grid-rows-[1fr] opacity-100 mt-3"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="min-h-0">
                <StatsCards words={words} />
              </div>
            </div>
          </div>

          {/* Stats cards visible on larger screens */}
          <div className="hidden sm:block">
            <StatsCards words={words} />
          </div>
        </div>

        {/* Words section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <AddWordForm />
          </div>
          <div>
            <LanguageChart words={words} />
          </div>
        </div>

        <WordList words={words} />
      </main>
    </div>
  );
}
