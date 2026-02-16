"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skull, RotateCcw, Trophy, XCircle } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

interface HangmanGameProps {
  words: Word[];
  language: string;
  onBack: () => void;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const MAX_ERRORS = 6;

function pickRandom(words: Word[], language: string) {
  const word = words[Math.floor(Math.random() * words.length)];
  const langTranslations =
    word.translations?.filter((t) => t.language === language) ?? [];
  const translation =
    langTranslations[Math.floor(Math.random() * langTranslations.length)];
  return { word, translation };
}

export function HangmanGame({ words, language }: HangmanGameProps) {
  const [current, setCurrent] = useState(() => pickRandom(words, language));
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);

  const answer = current.word.word.toLowerCase();
  const errors = [...guessed].filter((l) => !answer.includes(l)).length;
  const won = answer.split("").every((ch) => ch === " " || guessed.has(ch));
  const lost = errors >= MAX_ERRORS;
  const gameOver = won || lost;

  const langInfo = LANGUAGES.find((l) => l.code === language);

  const handleGuess = useCallback(
    (letter: string) => {
      if (gameOver || guessed.has(letter)) return;
      setGuessed((prev) => new Set(prev).add(letter));
    },
    [gameOver, guessed],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (ALPHABET.includes(key)) handleGuess(key);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess]);

  useEffect(() => {
    if (won) {
      setScore((s) => s + 1);
      setTotalRounds((t) => t + 1);
    } else if (lost) {
      setTotalRounds((t) => t + 1);
    }
  }, [won, lost]);

  function nextRound() {
    setCurrent(pickRandom(words, language));
    setGuessed(new Set());
  }

  const hangmanParts = [
    <circle
      key="head"
      cx="200"
      cy="80"
      r="20"
      className="stroke-foreground"
      strokeWidth="3"
      fill="none"
    />,
    <line
      key="body"
      x1="200"
      y1="100"
      x2="200"
      y2="160"
      className="stroke-foreground"
      strokeWidth="3"
    />,
    <line
      key="left-arm"
      x1="200"
      y1="120"
      x2="170"
      y2="145"
      className="stroke-foreground"
      strokeWidth="3"
    />,
    <line
      key="right-arm"
      x1="200"
      y1="120"
      x2="230"
      y2="145"
      className="stroke-foreground"
      strokeWidth="3"
    />,
    <line
      key="left-leg"
      x1="200"
      y1="160"
      x2="175"
      y2="195"
      className="stroke-foreground"
      strokeWidth="3"
    />,
    <line
      key="right-leg"
      x1="200"
      y1="160"
      x2="225"
      y2="195"
      className="stroke-foreground"
      strokeWidth="3"
    />,
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-griot-teal font-serif">
            <Skull className="h-6 w-6 text-griot-teal" />
            Hangman
          </h2>
          <p className="text-xs text-griot-gray font-sans">
            Practicing in{" "}
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>
        <Badge variant="secondary" className="text-sm font-mono">
          {score}/{totalRounds}
        </Badge>
      </div>

      <Card className=" bg-griot-cream border-griot-sand/50 shadow-sm">
        <CardHeader className="">
          <p className="text-center text-2xl font-bold text-primary">
            {current.translation.value}
          </p>
        </CardHeader>
        <CardContent className="">
          <div className="flex justify-center mb-5">
            <svg className="w-70 h-55 lg:w-55 lg:h-42.5" viewBox="60 0 280 220">
              <line
                x1="100"
                y1="210"
                x2="250"
                y2="210"
                className="stroke-muted-foreground"
                strokeWidth="3"
              />
              <line
                x1="140"
                y1="210"
                x2="140"
                y2="30"
                className="stroke-muted-foreground"
                strokeWidth="3"
              />
              <line
                x1="140"
                y1="30"
                x2="200"
                y2="30"
                className="stroke-muted-foreground"
                strokeWidth="3"
              />
              <line
                x1="200"
                y1="30"
                x2="200"
                y2="60"
                className="stroke-muted-foreground"
                strokeWidth="3"
              />
              {hangmanParts.slice(0, errors)}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            {answer.split("").map((ch, i) => (
              <div
                key={`${ch}-${i}`}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border-2 text-lg font-bold uppercase transition-all ${
                  ch === " "
                    ? "border-transparent"
                    : guessed.has(ch) || gameOver
                      ? "border-primary/40 bg-griot-teal text-griot-cream"
                      : "border-border bg-griot-teal/10 text-transparent"
                }`}
              >
                {ch === " "
                  ? ""
                  : guessed.has(ch) || gameOver
                    ? ch.toUpperCase()
                    : "_"}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="flex gap-1">
              {Array.from({ length: MAX_ERRORS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-6 rounded-full transition-all ${
                    i < errors ? "bg-destructive" : "bg-griot-teal-dark/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {gameOver && (
            <div
              className={`flex items-center justify-center gap-3 rounded-xl p-4 mt-5 mb-5 ${
                won
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {won ? (
                <Trophy className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-semibold">
                {won ? "Correct!" : `The word was: ${current.word.word}`}
              </span>
            </div>
          )}

          {!gameOver ? (
            <div className="flex flex-wrap mt-5 justify-center gap-1.5">
              {ALPHABET.map((letter) => {
                const isGuessed = guessed.has(letter);
                const isCorrect = answer.includes(letter) && isGuessed;
                const isWrong = !answer.includes(letter) && isGuessed;
                return (
                  <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={isGuessed}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold uppercase transition-all ${
                      isCorrect
                        ? "bg-griot-teal text-griot-cream"
                        : isWrong
                          ? "bg-destructive/15 text-destructive/50"
                          : "bg-griot-teal/20 cursor-pointer text-griot-dark hover:bg-griot-teal/50"
                    } disabled:cursor-not-allowed`}
                    aria-label={`Letra ${letter}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                onClick={nextRound}
                className="gap-2 bg-griot-teal text-griot-cream hover:bg-griot-teal/80 font-sans font-bold"
              >
                <RotateCcw className="h-4 w-4" />
                Next Round
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
