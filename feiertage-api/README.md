# FeiertagsAPI - DACH Holiday & Business Days API

Eine einfache, zuverlässige API für Feiertage und Arbeitstage in Deutschland, Österreich und der Schweiz.

## Features

- 🇩🇪 🇦🇹 🇨🇭 Feiertage für DE, AT, CH (2024-2030)
- 📅 Arbeitstage-Berechnung zwischen zwei Daten
- 🌉 Brückentage-Identifikation
- ⚡ Schnelle Responses (< 50ms)
- 🔑 API-Key basierte Authentifizierung
- 📊 Usage-Tracking & Dashboard

## API Endpoints

### `GET /api/holidays`
Gibt Feiertage für ein bestimmtes Land und Jahr zurück.

**Query Parameters:**
- `country` (required): `de`, `at`, `ch`
- `year` (optional): 2024-2030, default: aktuelles Jahr
- `state` (optional): Bundesland/Kanton (z.B. `BY`, `ZH`)

**Example:**
```bash
curl -H "X-API-Key: your-api-key" \
  "https://feiertage-api.vercel.app/api/holidays?country=de&year=2025"
```

### `POST /api/businessdays`
Berechnet Arbeitstage zwischen zwei Daten.

**Body:**
```json
{
  "country": "de",
  "start": "2025-01-01",
  "end": "2025-12-31",
  "state": "BY"
}
```

### `GET /api/next-holiday`
Gibt den nächsten Feiertag zurück.

## Pricing

- **Free:** 100 Requests/Monat
- **Pro:** €9/Monat - 10.000 Requests
- **Business:** €29/Monat - 100.000 Requests

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS
- **Backend:** Vercel Serverless Functions
- **Payment:** Stripe
- **Hosting:** Vercel

## Deployment

```bash
npm install
vercel
```

## License

MIT
