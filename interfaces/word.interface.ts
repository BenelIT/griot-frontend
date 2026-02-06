export interface Translation {
  language: string;
  value: string;
}

export interface Word {
  id: string;
  word: string;
  translations: Translation[];
  createdAt: string;
}
