import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANGUAGES } from "@/interfaces/word.interface";
import type { Word } from "@/interfaces/word.interface";
import { BarChart3, Languages } from "lucide-react";

interface Props {
  words: Word[];
}

export const LanguageChart = ({ words }: Props) => {
  const languageCounts: Record<string, number> = {};

  for (const word of words) {
    for (const translation of word.translations ?? []) {
      languageCounts[translation.language] =
        (languageCounts[translation.language] ?? 0) + 1;
    }
  }

  const sortedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCount = Math.max(...sortedLanguages.map(([, count]) => count), 1);

  if (sortedLanguages.length === 0) {
    return (
      <Card className="bg-griot-cream border border-griot-sand/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-griot-teal">
            <BarChart3 className="h-5 w-5 text-griot-teal" />
            Top Languages
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-griot-teal/10 p-4">
              <Languages className="h-8 w-8 text-griot-teal" />
            </div>
            <p className="mb-2 text-sm font-medium font-sans text-griot-dark">
              No statistics yet
            </p>
            <p className="text-xs text-griot-gray max-w-50">
              Start adding words to see your language progress
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-griot-sand/50 bg-griot-cream py-1 gap-5">
      <CardHeader className="mt-5">
        <CardTitle className="flex items-center gap-2 text-lg font-bold font-serif text-griot-teal">
          <BarChart3 className="h-5 w-5 text-griot-teal" />
          Top Languages
        </CardTitle>
      </CardHeader>

      <CardContent className="mb-3">
        <div className="space-y-3">
          {sortedLanguages.map(([code, count]) => {
            const lang = LANGUAGES.find((language) => language.code === code);
            const percentage = (count / maxCount) * 100;

            return (
              <div key={code} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-griot-dark">
                    <span className={`fi fi-${lang?.countryCode} text-xs`} />
                    <span>{lang?.label || code}</span>
                  </span>
                  <span className="font-mono text-xs text-griot-gray">
                    {count}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-griot-sand/20">
                  <div
                    className="h-full rounded-full bg-griot-teal transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
