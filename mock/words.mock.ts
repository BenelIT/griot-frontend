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
    createdAt: "2026-02-01T12:00:00Z",
  },
  {
    id: "2",
    word: "Goodbye",
    translations: [
      { language: "es", value: "Adiós" },
      { language: "fr", value: "Au revoir" },
    ],
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
    createdAt: "2026-02-02T12:00:00Z",
  },
  {
    id: "5",
    word: "Book",
    translations: [
      { language: "es", value: "Libro" },
      { language: "fr", value: "Livre" },
    ],
    createdAt: "2026-02-02T12:00:00Z",
  },
  {
    id: "6",
    word: "Water",
    translations: [
      { language: "es", value: "Agua" },
      { language: "fr", value: "Eau" },
    ],
    createdAt: "2026-02-02T12:00:00Z",
  },
];
