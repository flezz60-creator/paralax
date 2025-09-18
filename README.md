# Jean-Paul Stube – Redesign

Dieses Repository enthält eine neu gestaltete, statische Website für die Pizzeria **Jean-Paul Stube** in Wunsiedel.
Die Gestaltung orientiert sich an zeitgemäßen Fine-Dining-Auftritten wie den Beispielen promeat.chipsa.design,
lepainquotidien.com und skylinebarvenice.it.

## Struktur

```
.
├── index.html         # Einstiegsseite mit allen Sektionen
├── styles/
│   └── main.css       # Globales Styling, Farb- & Typografie-Konzept
├── scripts/
│   └── main.js        # Interaktionen (Mobile-Navigation, Newsletter-Feedback)
└── assets/
    └── images/        # Platzhalterordner für eigene Bilder
```

## Entwicklung

Die Seite ist vollständig statisch und benötigt kein Build-Setup. Um das Ergebnis lokal zu prüfen, reicht ein beliebiger
Webbrowser. Optional kann ein lokaler Webserver genutzt werden, z. B.:

```bash
python -m http.server
```

und anschließend `http://localhost:8000` im Browser öffnen.

## Inhalte

* **Hero & Storytelling** – Bühne für Marke, Philosophie und Highlights.
* **Signature Dishes** – Kuratierte Auswahl der Speisen mit Highlight-Badges.
* **Experience & Events** – Fokus auf Atmosphäre, Private Dining und Catering.
* **Testimonials & Newsletter** – Vertrauensbildende Elemente und Lead-Formular.
* **Kontakt & Karte** – Öffnungszeiten, Adresse und eingebettete Google-Maps-Karte.

Alle Texte sind in deutscher Sprache gehalten, passend zur bestehenden Kommunikation der Pizzeria.
