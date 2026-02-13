"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, RotateCcw, Trophy, Eye } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

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
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Layers className="h-5 w-5 text-primary" />
            Memoria
          </h2>
          <p className="text-sm text-muted-foreground">
            <span className={`fi fi-${langInfo?.countryCode} text-xs`} />{" "}
            {langInfo?.label}
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                Todas las parejas encontradas!
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {matches} pares en {moves} movimientos
              </p>
            </div>

            <div className="grid w-full max-w-xs grid-cols-2 gap-4 text-center">
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-lg font-bold text-foreground">{moves}</p>
                <p className="text-xs text-muted-foreground">Movimientos</p>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-lg font-bold text-foreground">
                  {efficiency}%
                </p>
                <p className="text-xs text-muted-foreground">Eficiencia</p>
              </div>
            </div>

            <Button
              onClick={restart}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Layers className="h-5 w-5 text-primary" />
            Memoria
          </h2>
          <p className="text-sm text-muted-foreground">
            Practicando en{" "}
            <span className={`fi fi-${langInfo?.countryCode} text-xs`} />{" "}
            {langInfo?.label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-sm">
            <Eye className="mr-1 h-3 w-3" />
            {moves}
          </Badge>
          <Badge variant="secondary" className="font-mono text-sm">
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
              className={`relative flex min-h-[100px] flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all duration-300 ${
                card.isMatched
                  ? "border-primary/40 bg-primary/10"
                  : isRevealed
                    ? "border-foreground/20 bg-secondary"
                    : "cursor-pointer border-border bg-card hover:border-primary/30 hover:bg-accent"
              }`}
              aria-label={isRevealed ? card.content : "Carta boca abajo"}
            >
              {isRevealed ? (
                <>
                  <span className="text-xs text-muted-foreground">
                    {card.label}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {card.content}
                  </span>
                </>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <span className="text-lg font-bold text-muted-foreground">
                    ?
                  </span>
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
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
