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
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Volver</span>
        </Button>
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Globe className="h-5 w-5 text-primary" />
            Elige un idioma
          </h2>
          <p className="text-sm text-muted-foreground">
            Selecciona en que idioma quieres practicar en{" "}
            <span className="font-medium text-foreground">{gameTitle}</span>
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {availableLanguages.map((lang) => (
          <Card
            key={lang.code}
            className={`group relative overflow-hidden border-border bg-card transition-all ${
              lang.hasEnough
                ? "cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                : "opacity-40"
            }`}
            onClick={() => lang.hasEnough && onSelect(lang.code)}
            role={lang.hasEnough ? "button" : undefined}
            tabIndex={lang.hasEnough ? 0 : undefined}
            onKeyDown={(e) => {
              if (lang.hasEnough && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelect(lang.code);
              }
            }}
          >
            <CardContent className="flex items-center gap-4 p-5">
              <span className="text-3xl" role="img" aria-label={lang.label}>
                <span>{lang?.label}</span>
              </span>
              <div className="flex-1">
                <p className="font-semibold text-card-foreground">
                  {lang.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lang.wordCount}{" "}
                  {lang.wordCount === 1 ? "palabra" : "palabras"}
                </p>
              </div>
              {lang.hasEnough ? (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 text-xs"
                >
                  Disponible
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Min. {minWords}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {availableLanguages.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <Globe className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No tienes palabras con traducciones todavia. Agrega algunas desde
              el dashboard.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
