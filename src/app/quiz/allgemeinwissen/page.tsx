import type { Metadata } from "next";
import Link from "next/link";
import { ResultCard } from "@/components/tools/result-card";

export const metadata: Metadata = {
  title: "Quiz Allgemeinwissen",
  description: "Teste dein Wissen mit zufälligen Fragen aus Geschichte, Technik und Alltag.",
  alternates: {
    canonical: "https://tech-teddy.de/quiz/allgemeinwissen",
  },
};

export default function QuizAllgemeinwissenPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Quiz Allgemeinwissen</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">Das Quiz-Modul wird derzeit entwickelt. Schon bald findest du hier dynamische Fragepakete mit Auswertung und Ranglisten.</p>
      </header>
      <ResultCard title="Warteliste">
        <p className="text-sm text-muted-foreground">
          Du möchtest benachrichtigt werden, sobald das Quiz live geht? Schreib uns an {" "}
          <Link className="text-primary hover:underline" href="mailto:hallo@tech-teddy.de">
            hallo@tech-teddy.de
          </Link>
          .
        </p>
      </ResultCard>
    </div>
  );
}
