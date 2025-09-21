import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung für Tech Teddy nach § 5 TMG.",
  alternates: {
    canonical: "https://tech-teddy.de/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Impressum</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">Angaben gemäß § 5 TMG und Verantwortlich für den Inhalt.</p>
      </header>

      <section className="space-y-2 text-sm text-muted-foreground">
        <p>Tech Teddy – ein Projekt der Muster Digital UG (haftungsbeschränkt)</p>
        <p>Beispielstraße 12</p>
        <p>10115 Berlin</p>
        <p>Deutschland</p>
      </section>

      <section className="space-y-2 text-sm text-muted-foreground">
        <p>
          Kontakt: <a className="text-primary hover:underline" href="mailto:hallo@tech-teddy.de">hallo@tech-teddy.de</a>
        </p>
        <p>Telefon: +49 (0)30 1234 5678</p>
      </section>

      <section className="space-y-2 text-sm text-muted-foreground">
        <p>Geschäftsführung: Jana Beispiel</p>
        <p>Handelsregister: Amtsgericht Berlin-Charlottenburg, HRB 123456</p>
        <p>USt-ID: DE123456789</p>
      </section>

      <section className="space-y-2 text-xs text-muted-foreground">
        <p>Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV: Jana Beispiel (Adresse wie oben).</p>
        <p>Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr/</p>
      </section>
    </div>
  );
}
