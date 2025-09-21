import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zum Datenschutz bei Tech Teddy, inklusive Analytics, Cookies und Betroffenenrechte.",
  alternates: {
    canonical: "https://tech-teddy.de/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Datenschutz</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">Wir informieren transparent über Datenverarbeitung, Rechtsgrundlagen und deine Rechte.</p>
      </header>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">1. Verantwortlicher</h2>
        <p>Tech Teddy – Muster Digital UG (haftungsbeschränkt), Beispielstraße 12, 10115 Berlin, E-Mail: hallo@tech-teddy.de</p>
      </section>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">2. Nutzungsdaten & Server-Logs</h2>
        <p>
          Beim Aufruf unserer Seiten werden technische Nutzungsdaten (IP-Adresse in anonymisierter Form, Browsertyp, Datum/Uhrzeit) vom Hosting-Anbieter zu Sicherheitszwecken verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb).
        </p>
      </section>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">3. Analyse & Consent</h2>
        <p>
          Optional setzen wir Google Analytics (GA4) oder Plausible ein, um die Nutzung anonymisiert zu analysieren. Die Tools werden erst nach deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) geladen. Die Zustimmung kannst du jederzeit über die Consent-Leiste widerrufen.
        </p>
        <p>IP-Adressen werden gekürzt; es werden keine personenbezogenen Profile erstellt.</p>
      </section>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">4. Cookies & Speicher</h2>
        <p>
          Wir verwenden funktionale Cookies/LocalStorage-Einträge, um deine Tool-Einstellungen (z. B. letzte Eingaben) sowie den Consent-Status zu speichern. Diese Daten dienen ausschließlich der Komfortfunktion.
        </p>
      </section>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">5. Drittanbieter</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Hosting & CDN: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
          <li>Analytics: Google Ireland Ltd., Plausible Insights OÜ (EU)</li>
          <li>FX-Daten: exchangerate.host (EU-basierter Service auf Basis von EZB-Daten)</li>
        </ul>
      </section>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">6. Rechte der Betroffenen</h2>
        <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Datenübertragbarkeit (Art. 15–20 DSGVO). Zudem kannst du einer Verarbeitung aus berechtigtem Interesse widersprechen (Art. 21 DSGVO) oder eine Einwilligung widerrufen.</p>
        <p>Anfragen richten sich bitte an: <Link className="text-primary hover:underline" href="mailto:privacy@tech-teddy.de">privacy@tech-teddy.de</Link>.</p>
      </section>

      <section className="space-y-3 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">7. Aufbewahrung</h2>
        <p>Server-Logs werden in der Regel nach 7 Tagen gelöscht, sofern keine Sicherheitsrelevanz besteht. Analysedaten werden aggregiert gespeichert.</p>
      </section>
    </div>
  );
}
