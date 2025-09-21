# Tech Teddy

Tech Teddy ist ein mobiles Portal mit Online-Rechnern, Konvertern und Generatoren für die DACH-Region. Das Projekt basiert auf Next.js 15, nutzt den App Router und wird vollständig als statisches HTML exportiert. Dadurch lässt sich der Build ohne Node.js-Laufzeit auf Plattformen wie GitHub Pages oder klassischem Webspace hosten.

## Entwicklung

```bash
npm install
npm run dev
```

Die Entwicklungsumgebung läuft standardmäßig auf `http://localhost:3000`.

## Produktion & statischer Export

```bash
npm run build
```

Durch die Konfiguration `output: "export"` schreibt Next.js den statischen Build in den Ordner `out/`. Der Inhalt dieses Ordners kann direkt auf GitHub Pages, Ionos-Webspace oder einen anderen statischen Hoster hochgeladen werden.

### GitHub Pages

1. Repository bauen: `npm run build`
2. Den Inhalt von `out/` in den `gh-pages`-Branch kopieren (z. B. via [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages)).
3. Optional eine `CNAME`-Datei mit `tech-teddy.de` im Build ausliefern, um die Domain zu verknüpfen.

### Klassisches Webhosting

1. `npm run build`
2. Alle Dateien aus `out/` per FTP/SFTP hochladen
3. Sicherstellen, dass der Webserver `index.html` in Unterverzeichnissen ausliefert und statische Assets aus `/_next/static/` erreichbar sind.

## Konfiguration

Optional lassen sich Analytics über folgende Umgebungsvariablen aktivieren:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

## Datenquellen

- Wechselkurse: [api.exchangerate.host](https://api.exchangerate.host/) (liefert EZB-Daten). Die Kurse werden im Browser 24 h zwischengespeichert und bei Ausfällen bis zu 48 h als Fallback genutzt.
