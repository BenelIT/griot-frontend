"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, RotateCcw, Trophy, Eye } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";
import { TitleGame } from "@/components/games/TitleGame";

interface MemoryMatchGameProps {
  words: Word[];
  language: string;
  onBack: () => void;
}

interface MemoryCard {
  id: string;
  content: string;
  label: string;
  pairId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateCards(words: Word[], language: string): MemoryCard[] {
  const shuffled = shuffle(words);
  const selected = shuffled.slice(0, 6);
  const cards: MemoryCard[] = [];
  const langInfo = LANGUAGES.find((l) => l.code === language);

  for (const word of selected) {
    const langTranslations =
      word.translations?.filter((t) => t.language === language) ?? [];
    const translation =
      langTranslations[Math.floor(Math.random() * langTranslations.length)];
    const pairId = word.id;

    cards.push({
      id: `word-${word.id}`,
      content: word.word,
      label: "Palabra",
      pairId,
      isFlipped: false,
      isMatched: false,
    });

    cards.push({
      id: `trans-${word.id}`,
      content: translation.value,
      label: `${langInfo?.countryCode || ""} ${langInfo?.label || language}`,
      pairId,
      isFlipped: false,
      isMatched: false,
    });
  }

  return shuffle(cards);
}

export function MemoryMatchGame({ words, language }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>(() =>
    generateCards(words, language),
  );
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const langInfo = LANGUAGES.find((l) => l.code === language);
  const totalPairs = cards.length / 2;
  const finished = matches === totalPairs && totalPairs > 0;

  const handleFlip = useCallback(
    (id: string) => {
      if (isChecking) return;
      const card = cards.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;
      if (flippedIds.length >= 2) return;

      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)),
      );
      setFlippedIds((prev) => [...prev, id]);
    },
    [cards, flippedIds, isChecking],
  );

  useEffect(() => {
    if (flippedIds.length !== 2) return;

    setIsChecking(true);
    setMoves((m) => m + 1);

    const [first, second] = flippedIds;
    const firstCard = cards.find((c) => c.id === first);
    const secondCard = cards.find((c) => c.id === second);

    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c,
          ),
        );
        setMatches((m) => m + 1);
        setFlippedIds([]);
        setIsChecking(false);
      }, 500);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c,
          ),
        );
        setFlippedIds([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedIds, cards]);

  function restart() {
    setCards(generateCards(words, language));
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
  }

  if (finished) {
    const efficiency =
      totalPairs > 0 ? Math.round((totalPairs / moves) * 100) : 0;
    return (
      <div>
        <TitleGame
          title={"Memory Match"}
          icon={<Layers className="h-5 w-5 text-griot-teal" />}
          langInfo={langInfo}
        />

        <Card className="border-griot-sand/50 border bg-griot-cream">
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <div className="flex h-25 w-25 items-center justify-center rounded-full bg-griot-teal/10">
              <Trophy className="h-12 w-12 text-griot-teal" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-griot-teal font-serif">
                All the pairs have been found!
              </p>
              <p className="mt-1 text-sm text-griot-gray font-sans">
                {matches} pairs in {moves} moves
              </p>
            </div>

            <div className="grid w-full max-w-xs grid-cols-2 gap-4 text-center">
              <div className="rounded-xl bg-griot-teal p-3">
                <p className="text-lg font-bold text-griot-cream">{moves}</p>
                <p className="text-xs text-griot-cream font-bold font-sans">
                  Moves
                </p>
              </div>
              <div className="rounded-xl bg-griot-teal p-3">
                <p className="text-lg font-bold font-sans text-griot-cream">
                  {efficiency}%
                </p>
                <p className="text-xs text-griot-cream font-bold font-sans">
                  Efficiency
                </p>
              </div>
            </div>

            <Button
              onClick={restart}
              className="gap-2 p-4 bg-griot-teal text-griot-cream font-serif text-sm font-bold hover:bg-griot-teal-dark hover:scale-[1.02] transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Jugar de Nuevo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleGame
          title={"Memory Match"}
          langInfo={langInfo}
          icon={<Layers className="h-5 w-5 text-griot-teal" />}
        />
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-sm text-griot-dark font-sans"
          >
            <Eye className="mr-1 h-3 w-3" />
            {moves}
          </Badge>
          <Badge
            variant="secondary"
            className="font-sans text-sm text-griot-dark"
          >
            {matches}/{totalPairs}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((card) => {
          const isRevealed = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              disabled={isRevealed || isChecking}
              className={`relative flex min-h-25 flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3 text-center 
                transition-all duration-300 ${
                  card.isMatched
                    ? "border-griot-teal-dark/50 bg-griot-teal"
                    : isRevealed
                      ? "border-griot-teal-dark/50 bg-griot-teal"
                      : "cursor-pointer  bg-griot-teal-dark/30 border-griot-teal/30 hover:border-griot-teal/30 hover:bg-griot-teal-dark/50 hover:scale-104"
                }`}
              aria-label={isRevealed ? card.content : "Card face down"}
            >
              {isRevealed ? (
                <>
                  <span className="text-lg font-bold text-griot-cream">
                    {card.content}
                  </span>
                </>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-griot-teal">
                  <span className="text-lg font-bold text-griot-cream">?</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={restart}
          className="gap-2 bg-griot-teal mt-4 text-griot-cream font-bold font-sans 
          hover:bg-griot-teal-dark hover:scale-[1.02] transition-all hover:text-griot-cream "
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>
      </div>
    </div>
  );
}
