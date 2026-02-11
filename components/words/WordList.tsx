"use client";

import { useMemo, useState } from "react";
import { Search, Trash2, BookOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";

interface WordListProps {
  words: Word[];
}

export const WordList = ({ words }: WordListProps) => {
  const [query, setQuery] = useState("");

  const filteredWords = useMemo(() => {
    const queryLower = query.toLowerCase().trim();

    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(queryLower) ||
        w.translations.some((t) => t.value.toLowerCase().includes(queryLower)),
    );
  }, [words, query]);

  function getLangInfo(code: string) {
    return LANGUAGES.find((language) => language.code === code);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-EN", {
      day: "numeric",
      month: "short",
    });
  }

  return (
    <Card className="border border-griot-sand/50 bg-griot-cream mt-6">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-griot-teal">
            <BookOpen className="h-5 w-5 shrink-0" />
            <span className="truncate">Vocabulary</span>
            <Badge
              variant="outline"
              className="rounded-md border-griot-teal/20 bg-griot-teal/5 px-2 py-0.5 text-xs font-sans text-griot-teal-dark shrink-0"
            >
              {words.length}
            </Badge>
          </CardTitle>

          <div className="relative w-full sm:w-64 sm:max-w-xs">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-griot-teal pointer-events-none" />
            <Input
              placeholder="Search for words..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-griot-sand/50 bg-griot-cream pl-9 text-griot-dark placeholder:text-griot-gray/70 focus-visible:ring-griot-teal w-full"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredWords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-griot-teal/10 p-4">
              <BookOpen className="h-12 w-12 text-griot-teal" />
            </div>
            <p className="text-sm font-medium text-card-foreground">
              {words.length === 0
                ? "There are still no words."
                : "No results found"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {words.length === 0
                ? "Add your first word using the form."
                : "Try another search term"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-griot-teal font-serif font-bold">
                    Word
                  </TableHead>
                  <TableHead className="text-griot-teal font-serif font-bold">
                    Translations
                  </TableHead>
                  <TableHead className="text-right text-griot-teal font-serif font-bold">
                    Date
                  </TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredWords.map((word) => (
                  <TableRow key={word.id} className="border-border">
                    <TableCell className="font-semibold font-sans text-griot-dark">
                      {word.word}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {word.translations.map((t) => {
                          const lang = getLangInfo(t.language);
                          return (
                            <Badge
                              key={t.language}
                              variant="outline"
                              className="border-border text-xs text-griot-gray font-sans"
                            >
                              <span
                                className={`fi fi-${lang?.countryCode} text-xs`}
                              />
                              {t.value}
                            </Badge>
                          );
                        })}
                      </div>
                    </TableCell>

                    <TableCell className="text-right text-xs text-griot-gray font-sans">
                      {formatDate(word.createdAt)}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-griot-gray hover:text-destructive"
                        aria-label={`Delete ${word.word}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
