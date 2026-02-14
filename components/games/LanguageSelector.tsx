"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

interface LanguageSelectorProps {
  words: Word[];
  gameTitle: string;
  minWords: number;
  onSelect: (languageCode: string) => void;
  onBack: () => void;
}

export function LanguageSelector({
  words,
  gameTitle,
  minWords,
  onSelect,
  onBack,
}: LanguageSelectorProps) {
  const languageCounts = new Map<string, number>();

  for (const word of words) {
    for (const t of word.translations || []) {
      languageCounts.set(t.language, (languageCounts.get(t.language) || 0) + 1);
    }
  }

  const availableLanguages = LANGUAGES.filter((lang) =>
    languageCounts.has(lang.code),
  ).map((lang) => ({
    ...lang,
    wordCount: languageCounts.get(lang.code) || 0,
    hasEnough: (languageCounts.get(lang.code) || 0) >= minWords,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8 sm:h-9 sm:w-9 text-griot-dark hover:text-griot-teal bg-griot-teal/10 hover:bg-griot-teal/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h2 className="flex items-center gap-2 text-xl sm:text-3xl font-bold text-griot-teal font-serif">
            <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-griot-teal" />
            Choose a language
          </h2>
          <p className="text-xs sm:text-sm text-griot-gray font-sans">
            Select the language you want to practice in{" "}
            <span className="font-medium text-griot-dark font-sans">
              {gameTitle}
            </span>
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {availableLanguages.map((lang) => (
          <Card
            key={lang.code}
            className={`group relative overflow-hidden border border-griot-sand/50 bg-griot-cream transition-all ${
              lang.hasEnough
                ? "cursor-pointer hover:border-griot-teal/50 transition-all hover:shadow-xl hover:scale-[1.02] hover:shadow-primary/5"
                : "opacity-40"
            }`}
            onClick={() => lang.hasEnough && onSelect(lang.code)}
            role={lang.hasEnough ? "button" : undefined}
            tabIndex={lang.hasEnough ? 0 : undefined}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <span className="text-3xl" role="img" aria-label={lang.label}>
                <span className={`fi fi-${lang.countryCode}`} />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-griot-teal-dark font-sans">
                  {lang.label}
                </p>
                <p className="text-xs text-griot-gray font-sans">
                  {lang.wordCount} {lang.wordCount === 1 ? "word" : "words"}
                </p>
              </div>
              {lang.hasEnough ? (
                <Badge
                  variant="secondary"
                  className="bg-griot-teal/10 text-griot-teal-dark border-griot-teal/20 text-xs"
                >
                  Available
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs bg-griot-gray/20">
                  Min. {minWords}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
