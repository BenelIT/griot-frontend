"use client";

import { BookOpen, Languages, TrendingUp, Clock } from "lucide-react";

import type { Word } from "@/interfaces/word.interface";
import { StatCard } from "./StatCard";

interface Props {
  words: Word[];
}

export const StatsCards = ({ words }: Props) => {
  const totalWords = words.length;

  const uniqueLanguages = new Set(
    words.flatMap(
      (word) =>
        word.translations?.map((translation) => translation.language) ?? [],
    ),
  ).size;

  const totalTranslations = words.reduce(
    (acc, word) => acc + (word.translations?.length ?? 0),
    0,
  );

  const recentWords = words.filter((word) => {
    const diff = Date.now() - new Date(word.createdAt).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
      <StatCard
        label="Total Words"
        value={totalWords}
        icon={BookOpen}
        variant="secondary"
      />

      {/* Languages */}
      <StatCard
        label="Languages"
        value={uniqueLanguages}
        icon={Languages}
        variant="secondary"
      />

      {/* Translations */}
      <StatCard
        label="Translations"
        value={totalTranslations}
        icon={TrendingUp}
        variant="secondary"
      />

      {/* This Week */}
      <StatCard
        label="This Week"
        value={recentWords}
        icon={Clock}
        variant="secondary"
      />
    </div>
  );
};
