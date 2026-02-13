"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shuffle, RotateCcw, Trophy, XCircle, ArrowRight } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

interface ScrambleGameProps {
  words: Word[];
  language: string;
  onBack: () => void;
}

function shuffleString(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join("");
  if (result === str && str.length > 1) return shuffleString(str);
  return result;
}

function pickRandom(words: Word[], language: string) {
  const word = words[Math.floor(Math.random() * words.length)];
  const langTranslations =
    word.translations?.filter((t) => t.language === language) ?? [];
  const translation =
    langTranslations[Math.floor(Math.random() * langTranslations.length)];
  return { word, translation };
}

export function ScrambleGame({ words, language }: ScrambleGameProps) {
  const [current, setCurrent] = useState(() => pickRandom(words, language));
  const [scrambled, setScrambled] = useState(() =>
    shuffleString(current.word.word.toLowerCase()),
  );
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">(
    "playing",
  );
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const answer = current.word.word.toLowerCase();
  const langInfo = LANGUAGES.find((l) => l.code === language);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (status !== "playing" || !guess.trim()) return;

      if (guess.trim().toLowerCase() === answer) {
        setStatus("correct");
        setScore((s) => s + 1);
        setTotalRounds((t) => t + 1);
      } else {
        setStatus("wrong");
        setTotalRounds((t) => t + 1);
      }
    },
    [guess, answer, status],
  );

  function nextRound() {
    const next = pickRandom(words, language);
    setCurrent(next);
    setScrambled(shuffleString(next.word.word.toLowerCase()));
    setGuess("");
    setStatus("playing");
    setShowHint(false);
  }

  useEffect(() => {
    setScrambled(shuffleString(current.word.word.toLowerCase()));
  }, [current]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Shuffle className="h-5 w-5 text-primary" />
            Letras Mezcladas
          </h2>
          <p className="text-sm text-muted-foreground">
            Practicando en{" "}
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>
        <Badge variant="secondary" className="font-mono text-sm">
          {score}/{totalRounds}
        </Badge>
      </div>

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-sm font-normal text-muted-foreground">
            Traduccion en{" "}
            <span className="font-semibold text-foreground">
              {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
              {langInfo?.label}
            </span>
          </CardTitle>
          <p className="text-center text-2xl font-bold text-primary">
            {current.translation.value}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {scrambled.split("").map((ch, i) => (
              <div
                key={`${ch}-${i}`}
                className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border bg-secondary text-lg font-bold uppercase text-foreground"
              >
                {ch}
              </div>
            ))}
          </div>

          {showHint && status === "playing" && (
            <p className="text-center text-sm text-muted-foreground">
              Pista: la palabra empieza con{" "}
              <span className="font-bold text-primary">
                {answer.charAt(0).toUpperCase()}
              </span>{" "}
              y tiene {answer.length} letras
            </p>
          )}

          {status === "playing" ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Escribe la palabra..."
                className="flex-1 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <Button
                type="submit"
                disabled={!guess.trim()}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Comprobar</span>
              </Button>
            </form>
          ) : null}

          {status === "playing" && !showHint && (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                Mostrar pista
              </Button>
            </div>
          )}

          {status !== "playing" && (
            <div
              className={`flex items-center justify-center gap-3 rounded-xl p-4 ${
                status === "correct"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {status === "correct" ? (
                <Trophy className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-semibold">
                {status === "correct"
                  ? "Correcto!"
                  : `La palabra era: ${current.word.word}`}
              </span>
            </div>
          )}

          {status !== "playing" && (
            <div className="flex justify-center">
              <Button
                onClick={nextRound}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <RotateCcw className="h-4 w-4" />
                Siguiente Ronda
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
