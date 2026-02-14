"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
// import { getWords } from "@/lib/word-store"
import type { Word } from "@/interfaces/word.interface";

// import { HangmanGame } from "@/components/games/hangman"
// import { MultipleChoiceGame } from "@/components/games/multiple-choice"
// import { ScrambleGame } from "@/components/games/scramble"
// import { SpeedRoundGame } from "@/components/games/speed-round"
// import { MemoryMatchGame } from "@/components/games/memory-match"
// import { LanguageSelector } from "@/components/games/language-selector"
import { HangmanGame } from "@/app/(word)/games/hangman/page";
import { getWords } from "@/lib/word-store";
import { GAMES } from "@/config/games";
import { LanguageSelector } from "@/components/games/LanguageSelector";
import { MultipleChoiceGame } from "./multiple-choice/page";
import { ScrambleGame } from "./scramble/page";
import { SpeedRoundGame } from "./speedRound/page";
import { MemoryMatchGame } from "./MemoryMatch/page";

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Hard: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

type PageStep = "menu" | "language" | "playing";

export default function JuegosPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<PageStep>("menu");
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    setWords(getWords());
    setMounted(true);
  }, []);

  const eligibleWords = useMemo(
    () => words.filter((w) => w.translations?.length ?? 0 > 0),
    [words],
  );

  const filteredWords = useMemo(() => {
    if (!selectedLanguage) return eligibleWords;
    return eligibleWords.filter((w) =>
      w.translations?.some((t) => t.language === selectedLanguage),
    );
  }, [eligibleWords, selectedLanguage]);

  const selectedGame = GAMES.find((g) => g.id === selectedGameId) ?? null;

  const handleSelectGame = useCallback((gameId: string) => {
    setSelectedGameId(gameId);
    setStep("language");
  }, []);

  const handleSelectLanguage = useCallback((langCode: string) => {
    setSelectedLanguage(langCode);
    setStep("playing");
  }, []);

  const handleBackToMenu = useCallback(() => {
    setStep("menu");
    setSelectedGameId(null);
    setSelectedLanguage(null);
  }, []);

  const handleBackToLanguage = useCallback(() => {
    setStep("language");
    setSelectedLanguage(null);
  }, []);

  // --- Step: Playing a game ---
  if (step === "playing" && selectedGameId && selectedLanguage) {
    return (
      <div className="min-h-screen bg-griot-cream">
        <main className="mx-auto max-w-4xl px-6 py-8">
          <Button
            variant="ghost"
            onClick={handleBackToLanguage}
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Cambiar Idioma
          </Button>

          {selectedGameId === "hangman" && (
            <HangmanGame
              words={filteredWords}
              language={selectedLanguage}
              onBack={handleBackToMenu}
            />
          )}
          {selectedGameId === "multiple-choice" && (
            <MultipleChoiceGame
              words={filteredWords}
              language={selectedLanguage}
              onBack={handleBackToMenu}
            />
          )}
          {selectedGameId === "scramble" && (
            <ScrambleGame
              words={filteredWords}
              language={selectedLanguage}
              onBack={handleBackToMenu}
            />
          )}
          {selectedGameId === "speed-round" && (
            <SpeedRoundGame
              words={filteredWords}
              language={selectedLanguage}
              onBack={handleBackToMenu}
            />
          )}
          {selectedGameId === "memory-match" && (
            <MemoryMatchGame
              words={filteredWords}
              language={selectedLanguage}
              onBack={handleBackToMenu}
            />
          )}
        </main>
      </div>
    );
  }

  // --- Step: Language selection ---
  if (step === "language" && selectedGame) {
    return (
      <div className="min-h-screen bg-griot-cream mx-auto ">
        <LanguageSelector
          words={eligibleWords}
          gameTitle={selectedGame.title}
          minWords={selectedGame.minWords}
          onSelect={handleSelectLanguage}
          onBack={handleBackToMenu}
        />
      </div>
    );
  }

  // --- Step: Game menu ---
  return (
    <main className="min-h-screen bg-griot-cream ">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif text-griot-teal">
          Vocabulary Games
        </h1>
        <p className="mt-1 text-sm text-griot-gray font-sans">
          Practice your words with {eligibleWords.length} words available
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => {
          const hasEnough = eligibleWords.length >= game.minWords;
          return (
            <Card
              key={game.id}
              className={`group relative overflow-hidden border border-griot-sand/50 bg-griot-cream transition-all ${
                hasEnough
                  ? "cursor-pointer hover:border-griot-teal/50 hover:shadow-primary/10 transition-all hover:shadow-xl hover:scale-[1.02]"
                  : "opacity-50"
              }`}
              onClick={() => hasEnough && handleSelectGame(game.id)}
              role={hasEnough ? "button" : undefined}
              tabIndex={hasEnough ? 0 : undefined}
            >
              <CardContent className="relative flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-griot-teal/10">
                    <game.icon className="h-5 w-5 text-griot-teal" />
                  </div>

                  <Badge
                    variant="outline"
                    className={`text-[10px] font-semibold uppercase tracking-wider ${difficultyColors[game.difficulty]}`}
                  >
                    {game.difficulty}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-griot-teal font-serif">
                    {game.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-griot-gray font-sans">
                    {game.description}
                  </p>
                </div>
                {!hasEnough && (
                  <p className="text-xs text-destructive">
                    You need at least {game.minWords} words.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
