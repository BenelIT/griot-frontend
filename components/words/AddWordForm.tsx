import { Plus, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LANGUAGES } from "@/interfaces/word.interface";
import { useState } from "react";

export const AddWordForm = () => {
  const [meaning, setMeaning] = useState([{ id: 1, language: "", text: "" }]);

  const addMeaning = () => {
    setMeaning([...meaning, { id: Date.now(), language: "", text: "" }]);
  };

  return (
    <Card className="border border-griot-sand/50 bg-griot-cream">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-bold font-serif text-lg text-griot-teal">
          <Sparkles className="h-5 w-5 text-griot-teal" />
          Add New Word
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Word Section */}
          <div className="space-y-2">
            <Label className="text-sm font-sans text-griot-dark">Word</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="word"
                autoFocus
                placeholder="Enter the word..."
                className="flex-1 border border-griot-sand/50 bg-griot-cream text-griot-dark placeholder:text-griot-gray/50 focus-visible:ring-griot-teal"
              />

              <Select>
                <SelectTrigger
                  className="w-full sm:w-45 border border-griot-sand/50 bg-griot-cream text-griot-dark 
                focus-visible:ring-griot-teal cursor-pointer"
                >
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-griot-cream">
                  {LANGUAGES.map((lang) => (
                    <SelectItem
                      key={lang.code}
                      value={lang.code}
                      className="hover:bg-griot-teal/10 focus:bg-griot-teal-dark/20"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`fi fi-${lang.countryCode}`} />
                        <span>{lang.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meaning Section */}
          <div className="space-y-2">
            <Label className="text-sm font-sans text-griot-dark">Meaning</Label>
            <div className="flex flex-col gap-3">
              {meaning.map((item, index) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex gap-2 flex-1">
                    <Input
                      placeholder="Meaning..."
                      className="flex-1 border border-griot-sand/50 bg-griot-cream text-griot-dark placeholder:text-griot-gray/50 focus-visible:ring-griot-teal"
                    />
                    {index === meaning.length - 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={addMeaning}
                        className="shrink-0 bg-griot-teal hover:bg-griot-teal-dark border-griot-teal"
                      >
                        <Plus className="h-4 w-4 text-griot-cream" />
                        <span className="sr-only">Add meaning</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-griot-teal text-griot-cream font-serif font-bold hover:bg-griot-teal-dark transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Word
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
