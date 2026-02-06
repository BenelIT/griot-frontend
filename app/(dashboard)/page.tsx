import { StatsCards } from "@/components/Stats/StatsCards";
import { words } from "@/mock/words.mock";

export default function Home() {
  return (
    <div className="min-h-screen bg-verbum-cream">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <StatsCards words={words} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* <AddWordForm onAdd={handleAddWord} /> */}
            </div>
            <div>{/* <LanguageChart words={words} /> */}</div>
          </div>
          <h1>Welcome to Verbum</h1>
          {/* <WordList words={words} onDelete={handleDeleteWord} /> */}
        </div>
      </main>
    </div>
  );
}
