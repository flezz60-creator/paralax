# FeiertagsAPI - Setup Anleitung für Windows

## 📦 Installation und Deployment (5 Minuten)

### Schritt 1: Repository clonen

```powershell
# Öffne PowerShell oder Git Bash
cd C:\Users\Flezz\Documents  # oder ein anderer Ordner

# Clone das Repository von GitHub
git clone https://github.com/flezz60-creator/feiertage-api.git
cd feiertage-api
```

### Schritt 2: Dateien extrahieren

1. Entpacke `feiertage-api-complete.tar.gz` (z.B. mit 7-Zip oder WinRAR)
2. Kopiere **alle Dateien und Ordner** in das geclonte `feiertage-api` Verzeichnis
3. Überschreibe existierende Dateien (z.B. README.md)

### Schritt 3: Zu GitHub pushen

```powershell
cd feiertage-api

# Alle Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "feat: Complete FeiertagsAPI - DACH Holiday & Business Days API"

# Zu GitHub pushen
git push -u origin main
```

---

## 🚀 Deployment auf Vercel (2 Minuten)

### Option 1: Vercel CLI (Terminal)

```powershell
# 1. Node.js installieren (falls noch nicht vorhanden)
# Download: https://nodejs.org/

# 2. Dependencies installieren
npm install

# 3. Vercel CLI installieren (einmalig)
npm install -g vercel

# 4. Deployment starten
vercel

# Folge den Prompts:
# - Set up and deploy? Y
# - Which scope? [Dein Account]
# - Link to existing project? N
# - Project name? feiertage-api
# - Directory? ./ (Enter)
# - Overwrite settings? N (Enter)
```

### Option 2: Vercel Dashboard (Einfacher!)

1. Gehe zu https://vercel.com und logge dich ein
2. Click **"Add New..."** → **"Project"**
3. **Import** das GitHub Repository `feiertage-api`
4. Click **"Deploy"**
5. **Fertig!** Nach ~60 Sekunden ist die API live

**Deine API URL:**
```
https://feiertage-api.vercel.app
```

---

## 🧪 API testen

### Im Browser:
```
https://feiertage-api.vercel.app/api/holidays?country=de&year=2025
```

### Mit curl (PowerShell):
```powershell
curl "https://feiertage-api.vercel.app/api/holidays?country=de&year=2025"
```

### Mit JavaScript:
```javascript
fetch('https://feiertage-api.vercel.app/api/holidays?country=de&year=2025')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 💳 Stripe-Integration (Optional)

Für echte Zahlungen benötigst du einen Stripe-Account:

1. Erstelle Account auf https://stripe.com
2. Gehe zu **Developers** → **API Keys**
3. Kopiere die Keys
4. In Vercel: **Project Settings** → **Environment Variables**
5. Füge hinzu:
   - `STRIPE_SECRET_KEY` = sk_test_...
   - `STRIPE_PUBLISHABLE_KEY` = pk_test_...

Detaillierte Anleitung: siehe `DEPLOYMENT.md`

---

## 📊 Projektstruktur

```
feiertage-api/
├── api/                    # 5 Serverless API Endpoints
│   ├── holidays.js         # GET /api/holidays
│   ├── businessdays.js     # POST /api/businessdays
│   ├── is-holiday.js       # GET /api/is-holiday
│   ├── next-holiday.js     # GET /api/next-holiday
│   └── states.js           # GET /api/states
├── data/                   # Feiertage-Datenbank
│   ├── holidays-de.json    # Deutschland (16 Bundesländer)
│   ├── holidays-at.json    # Österreich
│   └── holidays-ch.json    # Schweiz (26 Kantone)
├── lib/                    # Business Logic
│   └── holidays.js
├── public/                 # Frontend
│   ├── index.html          # Landing Page
│   ├── docs.html           # API Dokumentation
│   ├── dashboard.html      # User Dashboard
│   └── assets/css/styles.css
├── vercel.json             # Vercel Config
├── package.json
├── README.md
└── DEPLOYMENT.md           # Ausführliche Deployment-Anleitung
```

---

## 📚 Wichtige Links

- **GitHub Repository:** https://github.com/flezz60-creator/feiertage-api
- **API Docs:** https://feiertage-api.vercel.app/docs.html
- **Dashboard:** https://feiertage-api.vercel.app/dashboard.html
- **Vercel:** https://vercel.com
- **Stripe:** https://stripe.com

---

## 🎯 Nächste Schritte

1. ✅ Repository clonen und Dateien kopieren
2. ✅ Zu GitHub pushen
3. ✅ Auf Vercel deployen
4. ⏳ Custom Domain verbinden (optional)
5. ⏳ Stripe einrichten (optional)
6. ⏳ Erste Nutzer gewinnen
7. ⏳ Marketing starten (Reddit, Product Hunt)

---

## 💰 Monetarisierung

**Preise:**
- Free: €0/Monat - 100 Requests
- Pro: €9/Monat - 10.000 Requests
- Business: €29/Monat - 100.000 Requests

**Realistisches Ziel Jahr 1:** €700-1.200/Monat

---

## 🆘 Support

Bei Fragen oder Problemen:
1. Prüfe `DEPLOYMENT.md` für Details
2. Prüfe `README.md` für API-Infos
3. Öffne ein GitHub Issue

---

## ✅ Checkliste

- [ ] Repository gecloned
- [ ] Dateien kopiert
- [ ] Zu GitHub gepusht
- [ ] Auf Vercel deployed
- [ ] API getestet
- [ ] Custom Domain (optional)
- [ ] Stripe Setup (optional)
- [ ] Launch auf Product Hunt (später)

**Viel Erfolg! 🚀**
