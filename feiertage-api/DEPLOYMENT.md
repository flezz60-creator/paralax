# Deployment Guide - FeiertagsAPI

## 🚀 Deployment auf Vercel (Empfohlen)

### Voraussetzungen
- GitHub-Account
- Vercel-Account (kostenlos bei [vercel.com](https://vercel.com))

### Schritt 1: Repository auf GitHub pushen

```bash
cd feiertage-api
git init
git add .
git commit -m "Initial commit - FeiertagsAPI"
git remote add origin https://github.com/DEIN-USERNAME/feiertage-api.git
git push -u origin main
```

### Schritt 2: Mit Vercel verbinden

1. Gehe zu [vercel.com](https://vercel.com) und logge dich ein
2. Klicke auf "New Project"
3. Importiere dein GitHub-Repository
4. Vercel erkennt automatisch die `vercel.json` Konfiguration
5. Klicke auf "Deploy"

### Schritt 3: Fertig! 🎉

Nach ca. 1 Minute ist deine API live unter:
```
https://feiertage-api.vercel.app
```

---

## 💳 Stripe-Integration einrichten (Optional)

### 1. Stripe-Account erstellen
- Registriere dich bei [stripe.com](https://stripe.com)
- Hole dir deine API-Keys (Dashboard → Developers → API Keys)

### 2. Environment Variables in Vercel setzen

Gehe zu deinem Vercel-Projekt → Settings → Environment Variables und füge hinzu:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Produkte in Stripe erstellen

Erstelle drei Subscriptions in Stripe:
- **Free**: €0/Monat (für Tracking)
- **Pro**: €9/Monat
- **Business**: €29/Monat

Notiere die Price IDs.

### 4. Checkout-Endpoint erstellen

Datei: `api/create-checkout-session.js`

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { plan } = req.query;

  const prices = {
    pro: 'price_YOUR_PRO_PRICE_ID',
    business: 'price_YOUR_BUSINESS_PRICE_ID'
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: prices[plan],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/dashboard.html?success=true`,
      cancel_url: `${req.headers.origin}/dashboard.html?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

### 5. Webhook-Handler erstellen

Datei: `api/webhook.js`

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed':
      // Update user's plan in database
      break;
    case 'invoice.payment_succeeded':
      // Extend subscription
      break;
    case 'customer.subscription.deleted':
      // Downgrade to free plan
      break;
  }

  res.json({ received: true });
};
```

---

## 🗄️ Datenbank hinzufügen (für User-Management)

### Option 1: Supabase (Empfohlen für Start)

1. Erstelle ein Projekt auf [supabase.com](https://supabase.com)
2. Erstelle eine `users` Tabelle:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free',
  requests_count INTEGER DEFAULT 0,
  requests_limit INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_api_key ON users(api_key);
```

3. Environment Variable in Vercel:
```
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_KEY=YOUR-ANON-KEY
```

### Option 2: MongoDB Atlas

1. Erstelle Cluster auf [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Connection String in Vercel:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/feiertage-api
```

---

## 🔐 API-Key-Validierung implementieren

Datei: `lib/apikey.js`

```javascript
// Validiere API-Key und prüfe Rate Limit
async function validateApiKey(apiKey) {
  // Connect to database
  // Check if key exists
  // Check request count vs limit
  // Increment request count
  // Return user data
}

module.exports = { validateApiKey };
```

Integriere in jeden API-Endpoint:

```javascript
const { validateApiKey } = require('../lib/apikey');

module.exports = async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API-Key required' });
  }

  const user = await validateApiKey(apiKey);

  if (!user) {
    return res.status(401).json({ error: 'Invalid API-Key' });
  }

  if (user.requests_count >= user.requests_limit) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  // ... rest of endpoint logic
};
```

---

## 📊 Analytics hinzufügen

### Google Analytics
```html
<!-- In public/index.html, docs.html, dashboard.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics
- Aktiviere in Vercel Project Settings → Analytics
- Kostenlos für bis zu 100k Page Views/Monat

---

## 🎯 Marketing & Launch

### 1. SEO optimieren
- [x] Meta-Tags (bereits implementiert)
- [x] Sitemap.xml
- [x] robots.txt
- [ ] Schema.org Markup für API-Seite

### 2. Launch-Strategie

**Tag 1-7: Beta-Launch**
- Poste auf Reddit (r/webdev, r/selfhosted)
- Product Hunt Launch vorbereiten
- Erste 10 Nutzer manuell onboarden

**Tag 8-30: Public Launch**
- Product Hunt Launch
- Twitter/X Post mit Demo
- LinkedIn-Artikel
- Dev.to Blog-Post

**Tag 31+: Growth**
- SEO-Content schreiben (z.B. "Feiertage Deutschland 2025")
- API-Partner finden (HR-Software, Kalender-Apps)
- Newsletter starten

### 3. Erste Nutzer gewinnen

**Kostenlose Kanäle:**
- Reddit (r/SideProject, r/IMadeThis)
- Hacker News "Show HN"
- Dev.to + Hashnode Blog
- Twitter Dev-Community
- LinkedIn Posts

**Bezahlte Kanäle (später):**
- Google Ads (Keywords: "Feiertage API", "Holiday API Germany")
- Reddit Ads
- Product Hunt Featured Spot

---

## 📈 Monetarisierung steigern

### 1. Freemium-Optimierung
- Free-Tier bewusst begrenzen (100 Requests)
- Upsell-Prompts bei 80% Nutzung
- Email bei Limit-Erreichen mit Upgrade-Link

### 2. B2B-Fokus
- Erstelle Enterprise-Plan (€199/Monat)
- Biete Custom Endpoints an
- Whitelabel-Option für große Kunden

### 3. Zusätzliche Einnahmen
- Affiliate-Links zu HR-Software
- Werbung auf Doku-Seite
- Gesponserte API-Beispiele

---

## 🛠️ Wartung & Updates

### Feiertage aktualisieren
- Jährlich neue Daten in `data/holidays-*.json` hinzufügen
- Script für automatische Updates schreiben

### Performance überwachen
- Vercel Analytics
- Sentry für Error-Tracking
- Uptime-Monitoring (z.B. UptimeRobot)

### Support
- Email-Support via support@domain.de
- GitHub Issues für Bug-Reports
- Discord-Community für Pro-Nutzer

---

## ✅ Launch-Checkliste

- [ ] Repository auf GitHub
- [ ] Deployment auf Vercel
- [ ] Custom Domain verbinden (optional)
- [ ] SSL-Zertifikat (automatisch via Vercel)
- [ ] Stripe-Integration
- [ ] Datenbank Setup
- [ ] API-Key-Validierung
- [ ] Rate Limiting
- [ ] Analytics
- [ ] Impressum/Datenschutz Seiten
- [ ] Email-Service (z.B. SendGrid)
- [ ] Product Hunt-Seite vorbereiten
- [ ] Social Media Posts vorbereiten
- [ ] Erste 10 Beta-Tester

---

## 💰 Realistisches Umsatz-Ziel (Monat 1-6)

**Monat 1:**
- 50 Registrierungen
- 2 Pro-Nutzer (€18)
- 0 Business-Nutzer
- **Umsatz: €18**

**Monat 3:**
- 200 Registrierungen
- 10 Pro-Nutzer (€90)
- 2 Business-Nutzer (€58)
- **Umsatz: €148**

**Monat 6:**
- 500 Registrierungen
- 25 Pro-Nutzer (€225)
- 5 Business-Nutzer (€145)
- **Umsatz: €370**

**Monat 12:**
- 1.000 Registrierungen
- 50 Pro-Nutzer (€450)
- 10 Business-Nutzer (€290)
- **Umsatz: €740**

**Jahr 2:** Mit B2B-Focus und SEO-Wachstum realistisch **€1.500-2.500/Monat**

---

## 🎓 Learnings & Iteration

Nach den ersten 100 Nutzern:
1. Analytics auswerten
2. User-Feedback sammeln
3. Most-used Endpoints identifizieren
4. Features priorisieren
5. Pricing anpassen falls nötig

Viel Erfolg! 🚀
