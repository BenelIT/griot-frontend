"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Timer, RotateCcw, Trophy, Play, Zap } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

interface SpeedRoundGameProps {
  words: Word[];
  language: string;
  onBack: () => void;
}

const GAME_DURATION = 60;

function pickRandom(words: Word[], language: string) {
  const word = words[Math.floor(Math.random() * words.length)];
  const langTranslations =
    word.translations?.filter((t) => t.language === language) ?? [];
  const translation =
    langTranslations[Math.floor(Math.random() * langTranslations.length)];
  return { word, translation };
}

export function SpeedRoundGame({ words, language }: SpeedRoundGameProps) {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">(
    "idle",
  );
  const [current, setCurrent] = useState(() => pickRandom(words, language));
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const answer = current.word.word.toLowerCase();
  const langInfo = LANGUAGES.find((l) => l.code === language);

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setGameState("finished");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  function startGame() {
    setGameState("playing");
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTotalAttempts(0);
    setCurrent(pickRandom(words, language));
    setGuess("");
    setFeedback(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (gameState !== "playing" || !guess.trim()) return;

      setTotalAttempts((t) => t + 1);

      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }

      if (guess.trim().toLowerCase() === answer) {
        setScore((s) => s + 1);
        setStreak((s) => {
          const newStreak = s + 1;
          setBestStreak((b) => Math.max(b, newStreak));
          return newStreak;
        });
        setFeedback("correct");
      } else {
        setStreak(0);
        setFeedback("wrong");
      }

      setCurrent(pickRandom(words, language));
      setGuess("");

      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
      }, 600);
    },
    [guess, answer, gameState, words, language],
  );

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  if (gameState === "idle") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Timer className="h-5 w-5 text-primary" />
            Contrarreloj
          </h2>
          <p className="text-sm text-muted-foreground">
            Practicando en{" "}
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                Tienes 60 segundos
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Se mostrara una traduccion en{" "}
                {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
                {langInfo?.label} y debes escribir la palabra original lo mas
                rapido posible
              </p>
            </div>
            <Button
              onClick={startGame}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              <Play className="h-5 w-5" />
              Comenzar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === "finished") {
    const accuracy =
      totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
    return (
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Timer className="h-5 w-5 text-primary" />
            Contrarreloj
          </h2>
          <p className="text-sm text-muted-foreground">
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{score}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                palabras correctas
              </p>
            </div>

            <div className="grid w-full max-w-sm grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-lg font-bold text-foreground">
                  {totalAttempts}
                </p>
                <p className="text-xs text-muted-foreground">Intentos</p>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-lg font-bold text-foreground">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Precision</p>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-lg font-bold text-foreground">
                  {bestStreak}
                </p>
                <p className="text-xs text-muted-foreground">Mejor racha</p>
              </div>
            </div>

            <Button
              onClick={startGame}
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
            <Timer className="h-5 w-5 text-primary" />
            Contrarreloj
          </h2>
          <p className="text-sm text-muted-foreground">
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <Badge variant="secondary" className="gap-1 text-sm">
              <Zap className="h-3 w-3 text-primary" />
              {streak} racha
            </Badge>
          )}
          <Badge variant="secondary" className="font-mono text-sm">
            {score} pts
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tiempo restante</span>
          <span
            className={`font-mono font-bold ${
              timeLeft <= 10 ? "text-destructive" : "text-foreground"
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <Progress
          value={(timeLeft / GAME_DURATION) * 100}
          className="h-2.5 bg-secondary"
        />
      </div>

      <Card
        className={`border-border bg-card transition-colors ${
          feedback === "correct"
            ? "border-emerald-500/50"
            : feedback === "wrong"
              ? "border-destructive/50"
              : ""
        }`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-sm font-normal text-muted-foreground">
            Traduccion en{" "}
            <span className="font-semibold text-foreground">
              {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
              {langInfo?.label}
            </span>
          </CardTitle>
          <p className="text-center text-3xl font-bold text-primary">
            {current.translation.value}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Escribe la palabra..."
              className="flex-1 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              autoFocus
              autoComplete="off"
            />
            <Button
              type="submit"
              disabled={!guess.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
