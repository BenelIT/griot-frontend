"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LayoutGrid, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

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
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <LayoutGrid className="h-5 w-5 text-primary" />
            Opcion Multiple
          </h2>
          <p className="text-sm text-muted-foreground">
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center gap-6 py-12">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full ${
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
              <p className="text-lg font-semibold text-foreground">
                {pct >= 90
                  ? "Excelente!"
                  : pct >= 70
                    ? "Muy bien!"
                    : pct >= 50
                      ? "Buen intento!"
                      : "Sigue practicando!"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {score} de {TOTAL_QUESTIONS} correctas
              </p>
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
            <LayoutGrid className="h-5 w-5 text-primary" />
            Opcion Multiple
          </h2>
          <p className="text-sm text-muted-foreground">
            Practicando en{" "}
            {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
            {langInfo?.label}
          </p>
        </div>
        <Badge variant="secondary" className="font-mono text-sm">
          {round}/{TOTAL_QUESTIONS}
        </Badge>
      </div>

      <Progress
        value={(round / TOTAL_QUESTIONS) * 100}
        className="h-2 bg-secondary"
      />

      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-sm font-normal text-muted-foreground">
            Que palabra significa en{" "}
            <span className="font-semibold text-foreground">
              {<span className={`fi fi-${langInfo?.countryCode} text-xs`} />}{" "}
              {langInfo?.label}
            </span>
          </CardTitle>
          <p className="text-center text-3xl font-bold text-primary">
            {question.translation.value}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 pb-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const isThisCorrect = option === question.correct.word;
              const isThisSelected = option === selected;
              let style =
                "border-border bg-secondary text-foreground hover:border-primary/50 hover:bg-accent";

              if (answered) {
                if (isThisCorrect) {
                  style =
                    "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                } else if (isThisSelected && !isThisCorrect) {
                  style =
                    "border-destructive/50 bg-destructive/10 text-destructive";
                } else {
                  style = "border-border bg-secondary/50 text-muted-foreground";
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
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {round >= TOTAL_QUESTIONS
                  ? "Ver Resultados"
                  : "Siguiente Pregunta"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
