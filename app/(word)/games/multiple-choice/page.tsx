"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LayoutGrid, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";
import { TitleGame } from "@/components/games/TitleGame";

interface MultipleChoiceGameProps {
  words: Word[];
  language: string;
  onBack: () => void;
}

const TOTAL_QUESTIONS = 10;

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQuestion(words: Word[], language: string) {
  const shuffled = shuffle(words);
  const correct = shuffled[0];
  const langTranslations =
    correct.translations?.filter((t) => t.language === language) || [];
  const translation =
    langTranslations[Math.floor(Math.random() * langTranslations.length)];

  const others = shuffled.slice(1, 4).map((w) => w.word);
  const options = shuffle([correct.word, ...others]);

  return { correct, translation, options };
}

export function MultipleChoiceGame({
  words,
  language,
}: MultipleChoiceGameProps) {
  const [question, setQuestion] = useState(() =>
    generateQuestion(words, language),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);

  const langInfo = LANGUAGES.find((l) => l.code === language);
  const isCorrect = selected === question.correct.word;
  const answered = selected !== null;

  const nextQuestion = useCallback(() => {
    if (round >= TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }
    setQuestion(generateQuestion(words, language));
    setSelected(null);
    setRound((r) => r + 1);
  }, [round, words, language]);

  useEffect(() => {
    if (!answered) return;
    if (isCorrect) setScore((s) => s + 1);
  }, [answered, isCorrect]);

  function restart() {
    setQuestion(generateQuestion(words, language));
    setSelected(null);
    setScore(0);
    setRound(1);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div className="space-y-6">
        <TitleGame
          title={"Multiple Choice"}
          langInfo={langInfo}
          round={round}
          totalQuestions={TOTAL_QUESTIONS}
          icon={<LayoutGrid className="h-6 w-6 text-griot-teal" />}
        />

        <Card className="border-griot-sand/50 border bg-griot-cream">
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <div
              className={`flex h-25 w-25 p-15 items-center justify-center rounded-full ${
                pct >= 70 ? "bg-emerald-500/15" : "bg-amber-500/15"
              }`}
            >
              <span
                className={`text-3xl font-bold ${
                  pct >= 70 ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {pct}%
              </span>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-griot-teal font-serif">
                {pct >= 90
                  ? "Excellent!"
                  : pct >= 70
                    ? "Very good!"
                    : pct >= 50
                      ? "Nice try!"
                      : "Keep practicing!"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {score} out of {TOTAL_QUESTIONS} correct
              </p>
            </div>
            <Button
              onClick={restart}
              className="gap-2 bg-griot-teal text-griot-cream hover:bg-griot-teal-dark font-sans font-bold"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <TitleGame
        title={"Multiple Choice"}
        langInfo={langInfo}
        round={round}
        totalQuestions={TOTAL_QUESTIONS}
        icon={<LayoutGrid className="h-6 w-6 text-griot-teal" />}
      />

      <Progress
        value={(round / TOTAL_QUESTIONS) * 100}
        className="h-2 bg-griot-teal/20 rounded-full mb-6 [&>div]:bg-griot-teal-dark"
      />

      <Card className="border-griot-sand/50 border bg-griot-cream">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-sm font-normal text-muted-foreground">
            What does this word mean?
          </CardTitle>
          <p className="text-center text-3xl font-bold text-griot-teal font-serif">
            {question.translation.value}
          </p>
        </CardHeader>

        <CardContent className="space-y-3 pb-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const isThisCorrect = option === question.correct.word;
              const isThisSelected = option === selected;
              let style =
                "border-griot-teal-dark/50 border bg-griot-teal cursor-pointer font-bold font-sans text-griot-cream hover:bg-griot-teal-dark";

              if (answered) {
                if (isThisCorrect) {
                  style =
                    "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                } else if (isThisSelected && !isThisCorrect) {
                  style =
                    "border-destructive/50 bg-destructive/10 text-destructive";
                } else {
                  style =
                    "border-border bg-griot-teal/10 text-muted-foreground";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => !answered && setSelected(option)}
                  disabled={answered}
                  className={`flex items-center justify-between rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all ${style} disabled:cursor-not-allowed`}
                >
                  <span>{option}</span>
                  {answered && isThisCorrect && (
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                  )}
                  {answered && isThisSelected && !isThisCorrect && (
                    <XCircle className="h-5 w-5 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="flex justify-center pt-3">
              <Button
                onClick={nextQuestion}
                className="gap-2 bg-griot-teal text-griot-cream hover:bg-griot-teal-dark font-sans font-bold"
              >
                {round >= TOTAL_QUESTIONS ? "View Results" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
