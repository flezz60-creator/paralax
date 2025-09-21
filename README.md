# Tech Teddy – Statische Toolsammlung

Dieses Repository enthält die komplette Tech-Teddy-Webseite als rein statische HTML-, CSS- und JavaScript-Dateien. Alle Rechner funktionieren ohne Node.js-Build oder Server-Komponenten und lassen sich direkt auf GitHub Pages oder klassischem Webspace (z. B. IONOS) betreiben.

## Highlights

- **Sofort einsatzbereit:** Dateien einfach ins Repository kopieren oder per FTP hochladen.
- **Mobile-first:** Responsive Layouts und Dark Mode ohne externe Fonts.
- **Offline-tauglich:** Sobald die Dateien im Browser zwischengespeichert wurden, laufen viele Tools auch ohne Internet.
- **EZB-Währungsrechner:** Holt Referenzkurse direkt aus dem EZB-Feed und cached sie lokal für 24 h.
- **Teilen per URL:** Die meisten Rechner schreiben Eingaben als Query-Parameter, damit Ergebnisse teilbar bleiben.

## Ordnerstruktur

```
assets/           Globale Styles und JavaScript-Module
images/           Illustrationen (SVG)
tools/            Tool-Seiten (z. B. Prozentrechner, Währungsrechner …)
wissen/           Wissenshubs & Tabellen
quiz/             Allgemeinwissen-Quiz ohne Backend
impressum/        Rechtliche Pflichtseiten
robots.txt        Suchmaschinen-Steuerung
sitemap.xml       Liste aller veröffentlichten Seiten
```

## Deployment auf GitHub Pages

1. Repository forken oder clonen.
2. Dateien in den `main`-Branch pushen.
3. In den Repository-Settings unter **Pages** den Branch `main` und das Verzeichnis `/` auswählen.
4. Nach wenigen Minuten ist die Seite unter `https://<username>.github.io/<repo>/` erreichbar.

## Deployment auf klassischem Webspace

1. ZIP-Archiv des Repos erstellen oder direkt per FTP hochladen.
2. Sicherstellen, dass die Dateien im Document-Root (z. B. `/tech-teddy.de/`) liegen.
3. Fertig – PHP/Node/Composer sind nicht notwendig.

## Anpassungen

- **Farben & Branding:** In `assets/css/styles.css` lassen sich Farben und Schriften anpassen.
- **Tool-Inhalte:** Metadaten zu den Rechnern stehen in `assets/js/tool-data.js`.
- **Berechnungen:** Formeln liegen in `assets/js/calculations.js` und können dort erweitert werden.

## Lizenz

Die Inhalte sind für Demonstrationszwecke gedacht. Bitte rechtliche Vorgaben (Impressum/Datenschutz) vor Livegang anpassen.
