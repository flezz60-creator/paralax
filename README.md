# Jean-Paul-Stube – Originalinhalte im neuen Design

Dieses Repository bietet eine moderne, parallax-basierte Überarbeitung der Website der **Jean-Paul-Stube G.Amato**. Die Texte,
Bilder sowie Speise- und Getränkekarte stammen unverändert von der bisherigen Seite; lediglich die Gestaltung, Typografie und
Interaktionen orientieren sich an hochwertigen Referenzen wie promeat.chipsa.design, lepainquotidien.com und skylinebarvenice.it.
Der neue Auftritt kombiniert warme Farbflächen, mehrlagige Scroll-Effekte und 3D-Elemente mit einer klaren, redaktionellen
Seitenstruktur.

## Struktur

```
.
├── index.html              # Onepager mit allen Inhalten der Startseite
├── special.html            # Separater Bereich für Events & geschlossene Gesellschaften
├── impressum.html          # Rechtliche Hinweise gemäß Originalseite
├── assets/
│   └── data/
│       └── menu.json       # Originale Speise- und Getränkekarte als JSON-Datenquelle
├── styles/
│   └── main.css            # Globales Styling, Farb- & Animationskonzept
└── scripts/
    └── main.js             # Navigation, Parallax-/Tilt-Effekte und dynamische Kartenanzeige
```

## Entwicklung

Die Seite ist vollständig statisch und benötigt kein Build-Setup. Um das Ergebnis lokal zu prüfen, reicht ein beliebiger
Webbrowser. Optional kann ein lokaler Webserver genutzt werden, z. B.:

```bash
python -m http.server
```

und anschließend `http://localhost:8000` im Browser öffnen.

## Besondere Merkmale

* **Originalinhalte bewahrt** – sämtliche Texte, Öffnungszeiten, Kontaktangaben, Rezensionen sowie die komplette Speise- und
  Getränkekarte entsprechen der bisherigen Website.
* **Mehrlagige Parallax-Bühnen** – Hero, Story- und Event-Abschnitte arbeiten mit tiefenwirksamen Layern, sanften Glow-Overlays
  und 3D-Tilt auf Karten und Galerien.
* **Kuratiertes Storytelling** – Über-uns-, Info- und Event-Sektionen setzen die Originaltexte in neuen Split-Layouts, Collagen
  und Bildwelten mit Originalfotos in Szene.
* **Datengetriebene Speise- & Getränkekarte** – `assets/data/menu.json` speist die dynamischen Food- und Drink-Sektionen
  inklusive Sticky-Kategorien und Akkordeon für Getränke.
* **Konsistenter Auftritt auf Unterseiten** – Events (`special.html`) und Impressum (`impressum.html`) übernehmen Header,
  Parallax-Hero und Kontaktsektion, sodass alle Inhalte der Ursprungsseite weiterhin erreichbar bleiben.

Alle Texte sind weiterhin in deutscher Sprache gehalten.
