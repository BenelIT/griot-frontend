import { Word } from "@/interfaces/word.interface";

export const words: Word[] = [
  {
    id: "1",
    word: "Hello",
    translations: [
      { language: "fr", value: "Bonjour" },
      { language: "de", value: "Hallo" },
      { language: "it", value: "Ciao" },
    ],
    meaning: "A greeting used when meeting someone.",
    tags: [
      { id: "1", name: "greeting" },
      { id: "2", name: "common" },
    ],
    createdAt: "2026-02-01T12:00:00Z",
  },
  {
    id: "2",
    word: "Goodbye",
    translations: [
      { language: "es", value: "Adiós" },
      { language: "fr", value: "Au revoir" },
    ],
    meaning: "Used when leaving someone.",
    tags: [{ id: "3", name: "farewell" }],
    createdAt: "2026-02-02T12:00:00Z",
  },
  {
    id: "3",
    word: "Car",
    translations: [
      { language: "es", value: "Coche" },
      { language: "fr", value: "Voiture" },
      { language: "ko", value: "자동차" },
      { language: "zh", value: "汽车" },
    ],
    meaning: "A vehicle with four wheels used for transportation.",
    tags: [
      { id: "4", name: "transportation" },
      { id: "5", name: "vehicle" },
    ],
    createdAt: "2026-02-02T12:00:00Z",
  },
  {
    id: "4",
    word: "House",
    translations: [
      { language: "es", value: "Casa" },
      { language: "fr", value: "Maison" },
      { language: "ru", value: "Дом" },
      { language: "zh", value: "房子" },
    ],
    meaning: "A building for human habitation.",
    tags: [
      { id: "6", name: "housing" },
      { id: "7", name: "building" },
    ],
    createdAt: "2026-02-02T12:00:00Z",
  },
  {
    id: "5",
    word: "Book",
    translations: [
      { language: "es", value: "Libro" },
      { language: "fr", value: "Livre" },
    ],
    meaning: "A written or printed work consisting of pages bound together.",
    tags: [
      { id: "8", name: "reading" },
      { id: "9", name: "literature" },
    ],
    createdAt: "2026-02-11T12:00:00Z",
  },
  {
    id: "6",
    word: "Water",
    translations: [
      { language: "es", value: "Agua" },
      { language: "fr", value: "Eau" },
    ],
    meaning:
      "A transparent, tasteless, odorless, and nearly colorless chemical substance.",
    tags: [
      { id: "10", name: "liquid" },
      { id: "11", name: "essential" },
    ],
    createdAt: "2026-01-02T12:00:00Z",
  },
];
