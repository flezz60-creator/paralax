export const CLUSTERS = {
  'cluster-a': {
    title: 'Rechner & Konverter',
    description: 'Mathe-, Finanz- und Umrechnungstools mit sofortigem Ergebnis.',
  },
  'cluster-b': {
    title: 'Text & Kreativ-Tools',
    description: 'Generatoren für Content, Code und Produktivität.',
  },
  'cluster-c': {
    title: 'Kalender & Alltag',
    description: 'Planer, Zeithilfen und Wissenshubs für jeden Tag.',
  },
};

export const tools = [
  {
    slug: 'prozentrechner',
    name: 'Prozentrechner',
    shortDescription: 'Berechne Prozentwert, Prozentsatz oder Grundwert sekundenschnell.',
    description:
      'Der Tech-Teddy-Prozentrechner hilft bei Rabatten, Mehrwertsteuer und Notenberechnung. Eingaben werden live ausgewertet und lassen sich teilen.',
    seoTitle: 'Prozentrechner – Prozentwert, Prozentsatz & Grundwert',
    seoDescription:
      'Kostenlosen Prozentrechner nutzen: Prozentwert, Prozentsatz oder Grundwert sofort berechnen. Ideal für Rabatte, Steuern und Dreisatz.',
    cluster: 'cluster-a',
    category: 'Mathe & Schule',
    keywords: ['Prozentrechner', 'Rabatt berechnen', 'Prozentsatz'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['dreisatz', 'durchschnitt', 'zinseszins'],
    examples: [
      {
        title: 'Rabatt im Handel',
        description: 'Auf 250 € Listenpreis werden 20 % Rabatt gewährt. Der Prozentwert beträgt 50 € und der Verkaufspreis 200 €.',
      },
      {
        title: 'Mehrwertsteuer',
        description: 'Ein Nettobetrag von 1.680 € zuzüglich 19 % MwSt. ergibt einen Bruttobetrag von 1.999,20 €.',
      },
      {
        title: 'Notenberechnung',
        description: 'Bei 38 von 50 Punkten liegt der Prozentsatz bei 76 % – gut für eine 2 im deutschen Schulsystem.',
      },
    ],
    faqs: [
      {
        question: 'Wie berechne ich den Prozentwert?',
        answer: 'Multipliziere den Grundwert mit dem Prozentsatz geteilt durch 100: P = G · (p / 100).',
      },
      {
        question: 'Wie kann ich den Prozentsatz bestimmen?',
        answer: 'Teile den Prozentwert durch den Grundwert und multipliziere das Ergebnis mit 100: p = (P / G) · 100.',
      },
      {
        question: 'Was ist der Unterschied zwischen Prozent und Promille?',
        answer: 'Bei Promille werden Werte durch 1000 statt durch 100 geteilt. Ein Promille entspricht 0,1 Prozent.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'brutto-netto',
    name: 'Brutto-Netto-Rechner',
    shortDescription: 'Vereinfachter Brutto-Netto-Rechner für Angestellte inkl. Steuerklassen.',
    description:
      'Der Brutto-Netto-Rechner liefert eine Näherung für das Nettogehalt in Deutschland. Es fließen Steuerklasse, Sozialabgaben und pauschale Freibeträge ein.',
    seoTitle: 'Brutto-Netto-Rechner 2025 – Netto schnell abschätzen',
    seoDescription:
      'Nettoeinkommen mit vereinfachtem Brutto-Netto-Rechner berechnen. Steuerklasse wählen, Abzüge abschätzen und Ergebnisse teilen.',
    cluster: 'cluster-a',
    category: 'Finanzen',
    keywords: ['Brutto Netto', 'Netto berechnen', 'Steuerklasse'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'FinanceApplication',
    related: ['prozentrechner', 'zinseszins', 'waehrungsrechner'],
    examples: [
      {
        title: 'Steuerklasse I',
        description: '3.500 € Brutto pro Monat führen zu rund 2.250 € Netto – inklusive pauschaler Sozialabgaben.',
      },
      {
        title: 'Steuerklasse III',
        description: '6.000 € Brutto mit Steuerklasse III ergeben ca. 4.350 € Netto im vereinfachten Modell.',
      },
    ],
    faqs: [
      {
        question: 'Wie genau ist der vereinfachte Brutto-Netto-Rechner?',
        answer:
          'Der Rechner nutzt pauschale Abzüge für Steuern und Sozialversicherung. Individuelle Faktoren wie Kirchensteuer oder Krankenkassen-Zusätze werden nicht berücksichtigt.',
      },
      {
        question: 'Welche Steuerklassen stehen zur Auswahl?',
        answer: 'Die Klassen I bis VI können gewählt werden. Jede Klasse erhält einen typischen Abzugssatz, um das Netto grob zu schätzen.',
      },
      {
        question: 'Kann ich Sonderzahlungen berücksichtigen?',
        answer: 'Sonderzahlungen wie Urlaubs- oder Weihnachtsgeld sind nicht enthalten und sollten separat kalkuliert werden.',
      },
    ],
    status: 'live',
    ymyDisclaimer:
      'Keine Steuerberatung: Die Ergebnisse dienen als grobe Orientierung. Verbindliche Auskünfte erteilen Steuerberater:innen oder Finanzbehörden.',
  },
  {
    slug: 'zinseszins',
    name: 'Zinseszins-Rechner',
    shortDescription: 'Berechne Endkapital, Einzahlungen und Zinsgewinne mit flexibler Verzinsung.',
    description:
      'Der Zinseszins-Rechner unterstützt Einmalanlagen und regelmäßige Sparraten. Das Ergebnis zeigt Endkapital, Eigenanteil und Zinsertrag.',
    seoTitle: 'Zinseszins-Rechner – Sparplan & Anlage simulieren',
    seoDescription:
      'Sparziele planen: Startkapital, Zinssatz, Laufzeit und Sparrate eingeben. Der Tech-Teddy-Zinseszins-Rechner zeigt das Endkapital in Echtzeit.',
    cluster: 'cluster-a',
    category: 'Finanzen',
    keywords: ['Zinseszins', 'Sparplan', 'Finanzrechner'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'FinanceApplication',
    related: ['prozentrechner', 'brutto-netto', 'waehrungsrechner'],
    examples: [
      {
        title: 'Langfristiger ETF-Sparplan',
        description: '100 € monatlich bei 6 % Rendite über 20 Jahre ergeben ein Endkapital von rund 46.200 €.',
      },
      {
        title: 'Einmalanlage',
        description: '10.000 € mit 4 % Verzinsung über 15 Jahre wachsen auf ca. 17.986 € an.',
      },
    ],
    faqs: [
      {
        question: 'Was bedeutet Verzinsung pro Jahr?',
        answer: 'Der Zinssatz wird standardmäßig als Jahreszins verstanden. Über die Perioden-Einstellung lässt sich monatliche oder tägliche Verzinsung simulieren.',
      },
      {
        question: 'Wie wirkt sich eine Sparrate aus?',
        answer: 'Regelmäßige Beiträge erhöhen sowohl den Eigenanteil als auch den Zinseszinseffekt, weil jeder Beitrag mitverzinst wird.',
      },
    ],
    status: 'live',
    ymyDisclaimer:
      'Keine Anlageberatung: Vergangene Renditen sind keine Garantie für die Zukunft. Entscheidungen bitte kritisch prüfen.',
  },
  {
    slug: 'bmi',
    name: 'BMI-Rechner',
    shortDescription: 'Berechne deinen Body-Mass-Index inklusive WHO-Klassifikation.',
    description:
      'Der BMI-Rechner stellt Größe und Gewicht ins Verhältnis. Zusätzlich werden WHO-Grenzwerte für Erwachsene angezeigt.',
    seoTitle: 'BMI-Rechner – Körpergewicht schnell einschätzen',
    seoDescription:
      'BMI in Sekunden berechnen: Größe und Gewicht eingeben, WHO-Kategorie erhalten und Wissenswertes rund um den Body-Mass-Index nachlesen.',
    cluster: 'cluster-a',
    category: 'Gesundheit',
    keywords: ['BMI', 'Körpergewicht', 'WHO'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'MedicalWebPage',
    related: ['kalorienverbrauch', 'durchschnitt'],
    examples: [
      {
        title: 'Beispiel',
        description: '80 kg bei 1,80 m Körpergröße ergeben einen BMI von 24,7 – Normalgewicht laut WHO.',
      },
    ],
    faqs: [
      {
        question: 'Ist der BMI für alle Personen geeignet?',
        answer: 'Der BMI ist ein Richtwert für Erwachsene. Für Kinder, Schwangere oder sehr muskulöse Personen sollten alternative Kennzahlen genutzt werden.',
      },
      {
        question: 'Welche Kategorien gibt es?',
        answer: 'Die WHO unterscheidet unter anderem Untergewicht, Normalgewicht, Übergewicht und verschiedene Adipositas-Grade.',
      },
    ],
    status: 'live',
    ymyDisclaimer:
      'Kein medizinischer Rat. Für individuelle Einschätzungen bitte ärztlichen Rat einholen.',
  },
  {
    slug: 'kalorienverbrauch',
    name: 'Kalorienverbrauch-Rechner',
    shortDescription: 'Grundumsatz nach Mifflin-St Jeor und Gesamtenergieverbrauch berechnen.',
    description:
      'Der Kalorienrechner ermittelt Grundumsatz und Gesamtbedarf anhand von Mifflin-St Jeor und dem ausgewählten Aktivitätslevel (PAL).',
    seoTitle: 'Kalorienverbrauch berechnen – Grundumsatz & Gesamtbedarf',
    seoDescription:
      'Gewicht, Größe, Alter und Aktivitätslevel eingeben und sofort Kalorienbedarf schätzen. Geeignet für Alltag, Diät und Sport.',
    cluster: 'cluster-a',
    category: 'Gesundheit',
    keywords: ['Kalorienverbrauch', 'Grundumsatz', 'PAL'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'MedicalWebPage',
    related: ['bmi', 'prozentrechner'],
    examples: [
      {
        title: 'Bürojob',
        description: '68 kg, 172 cm, 32 Jahre, PAL 1,4 → Grundumsatz 1.420 kcal, Gesamtbedarf rund 1.990 kcal.',
      },
      {
        title: 'Handwerk',
        description: '85 kg, 180 cm, 38 Jahre, PAL 1,8 → Grundumsatz 1.770 kcal, Gesamtbedarf etwa 3.180 kcal.',
      },
    ],
    faqs: [
      {
        question: 'Was bedeutet PAL?',
        answer: 'Die Physical-Activity-Level-Skala (PAL) beschreibt, wie aktiv eine Person ist. Höhere Werte bedeuten höheren Energieverbrauch.',
      },
      {
        question: 'Sind Sporteinheiten enthalten?',
        answer: 'Sport kann über einen höheren PAL-Faktor einfließen. Für genaue Trainingspläne eignen sich zusätzliche Tracker.',
      },
    ],
    status: 'live',
    ymyDisclaimer:
      'Kein Ersatz für ärztlichen Rat. Werte stellen Näherungen für gesunde Erwachsene dar.',
  },
  {
    slug: 'dreisatz',
    name: 'Dreisatz-Rechner',
    shortDescription: 'Direkter und umgekehrter Dreisatz mit sofortigem Ergebnis.',
    description:
      'Vergleiche Mengen, Preise oder Zeiten sekundenschnell. Der Dreisatz-Rechner unterstützt direkte und inverse Proportionen.',
    seoTitle: 'Dreisatz-Rechner – direkte & inverse Proportion',
    seoDescription:
      'Dreisatz online lösen: Grundmenge und Vergleichswerte eingeben, Ergebnis sofort erhalten und Beispiele für Alltag & Schule sehen.',
    cluster: 'cluster-a',
    category: 'Mathe & Schule',
    keywords: ['Dreisatz', 'Proportionalität', 'Rechner'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['prozentrechner', 'durchschnitt'],
    examples: [
      {
        title: 'Rezepte skalieren',
        description: 'Für 4 Portionen werden 600 g Nudeln benötigt. Für 7 Portionen ergibt sich eine Menge von 1.050 g.',
      },
      {
        title: 'Baustelle',
        description: '3 Arbeiter schaffen eine Aufgabe in 10 Tagen. Wie lange brauchen 5 Arbeiter? Im inversen Dreisatz sind es 6 Tage.',
      },
    ],
    faqs: [
      {
        question: 'Wann nutze ich den inversen Dreisatz?',
        answer: 'Immer dann, wenn eine Größe steigt, während die andere sinkt – zum Beispiel mehr Personal reduziert die Arbeitszeit.',
      },
      {
        question: 'Kann ich negative Werte eingeben?',
        answer: 'Für klassische Dreisatzaufgaben sollten nur positive Werte verwendet werden.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'durchschnitt',
    name: 'Durchschnittsrechner',
    shortDescription: 'Arithmetisches Mittel, Median und Streuung aus einer Zahlenliste.',
    description:
      'Gib Zahlen kommasepariert ein und erhalte arithmetisches Mittel, Median und Standardabweichung. Ideal für Schule und Büro.',
    seoTitle: 'Durchschnitt berechnen – Mittelwert & Median',
    seoDescription:
      'Durchschnitt einfach berechnen: Zahlen eingeben, Mittelwert, Median und Streuung sofort anzeigen lassen.',
    cluster: 'cluster-a',
    category: 'Mathe & Schule',
    keywords: ['Durchschnitt', 'Mittelwert', 'Median'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['prozentrechner', 'dreisatz'],
    examples: [
      {
        title: 'Notendurchschnitt',
        description: 'Noten 1,7 – 2,3 – 2,0 ergeben einen Durchschnitt von 2,0.',
      },
      {
        title: 'Projektkosten',
        description: 'Kosten 1.200 €, 950 € und 1.550 € → Mittelwert 1.233,33 €.',
      },
    ],
    faqs: [
      {
        question: 'Wie trenne ich Werte?',
        answer: 'Nutze Komma, Semikolon oder Zeilenumbruch. Dezimalzahlen funktionieren mit Komma oder Punkt.',
      },
      {
        question: 'Wofür eignet sich die Standardabweichung?',
        answer: 'Sie zeigt, wie stark Werte um den Mittelwert streuen. Kleine Werte bedeuten geringe Schwankung.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'zeit-umrechner',
    name: 'Zeit-Umrechner',
    shortDescription: 'Millisekunden, Sekunden, Minuten, Stunden, Tage, Wochen, Jahre umrechnen.',
    description:
      'Umrechnungstabellen für Zeitdauern mit sofortigem Ergebnis, inklusive praktischer Presets für Alltag und Technik.',
    seoTitle: 'Zeit umrechnen – Sekunden, Minuten, Stunden & mehr',
    seoDescription:
      'Zeiteinheiten komfortabel umrechnen: ms, s, min, h, Tage, Wochen und Jahre. Perfekt für Technik, Arbeit und Freizeit.',
    cluster: 'cluster-a',
    category: 'Umrechnungen',
    keywords: ['Zeit umrechnen', 'Sekunden in Minuten', 'Stunden in Tage'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'Utility',
    related: ['geschwindigkeit', 'durchschnitt'],
    examples: [
      {
        title: 'Reaktionszeit',
        description: '450 ms entsprechen 0,45 Sekunden.',
      },
      {
        title: 'Arbeitswoche',
        description: '40 Stunden sind 2.400 Minuten oder 2,38 % eines Jahres.',
      },
    ],
    faqs: [
      {
        question: 'Kann ich mehrere Ergebnisse gleichzeitig sehen?',
        answer: 'Ja, das Tool zeigt alle Zielwerte parallel an.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'geschwindigkeit',
    name: 'Geschwindigkeit-Umrechner',
    shortDescription: 'km/h, mph, m/s und Knoten miteinander vergleichen.',
    description:
      'Auto, Flugzeug oder Sport: Der Geschwindigkeitsrechner macht Einheiten transparent und liefert sofort Ergebnisse.',
    seoTitle: 'Geschwindigkeit umrechnen – km/h, mph, m/s, Knoten',
    seoDescription:
      'Geschwindigkeitseinheiten umrechnen und vergleichen. Ideal für Verkehr, Reise und Sport.',
    cluster: 'cluster-a',
    category: 'Umrechnungen',
    keywords: ['km/h in mph', 'Geschwindigkeit umrechnen'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'Utility',
    related: ['zeit-umrechner', 'laenge'],
    examples: [
      {
        title: 'Autobahn',
        description: '130 km/h entsprechen 80,8 mph.',
      },
      {
        title: 'Marathon',
        description: 'Eine Pace von 4:30 min/km entspricht 13,3 km/h bzw. 3,7 m/s.',
      },
    ],
    faqs: [
      {
        question: 'Welche Einheit ist für Läufer sinnvoll?',
        answer: 'm/s eignet sich für Physik und Sport, km/h für den Alltag. Beide werden angezeigt.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'temperatur',
    name: 'Temperatur-Umrechner',
    shortDescription: 'Grad Celsius, Fahrenheit und Kelvin blitzschnell umrechnen.',
    description:
      'Backofen, Wetter oder Physikunterricht: Mit dem Temperaturumrechner lassen sich alle gängigen Einheiten direkt vergleichen.',
    seoTitle: 'Temperatur umrechnen – °C, °F, Kelvin',
    seoDescription:
      'Temperaturrechner für Alltag & Schule: Celsius, Fahrenheit und Kelvin gleichzeitig darstellen.',
    cluster: 'cluster-a',
    category: 'Umrechnungen',
    keywords: ['Temperatur umrechnen', 'Celsius Fahrenheit'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'Utility',
    related: ['waehrungsrechner', 'laenge'],
    examples: [
      {
        title: 'Gefrierpunkt',
        description: '0 °C entsprechen 32 °F und 273,15 K.',
      },
      {
        title: 'Backofen',
        description: '180 °C Umluft ≈ 356 °F.',
      },
    ],
    faqs: [
      {
        question: 'Ab welcher Temperatur beginnt Kelvin?',
        answer: '0 Kelvin entspricht dem absoluten Nullpunkt und liegt bei -273,15 °C.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'laenge',
    name: 'Länge-Umrechner',
    shortDescription: 'Meter, Inch, Fuß, Meilen und mehr vergleichen.',
    description:
      'Der Länge-Umrechner deckt Alltag, Schule und Werkstatt ab. Ergebnisse werden mit sechs Nachkommastellen dargestellt.',
    seoTitle: 'Längeneinheiten umrechnen – Meter, Inch, Fuß, Meilen',
    seoDescription:
      'Zoll in Zentimeter, Fuß in Meter oder Kilometer in Meilen berechnen. Alle Werte parallel sehen.',
    cluster: 'cluster-a',
    category: 'Umrechnungen',
    keywords: ['Länge umrechnen', 'inch cm', 'feet meter'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'Utility',
    related: ['gewicht', 'volumen'],
    examples: [
      {
        title: 'Holzzuschnitt',
        description: '1 inch entspricht 2,54 Zentimetern.',
      },
      {
        title: 'Strecke',
        description: '1 Meile sind 1,609 Kilometer.',
      },
    ],
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen Yard und Meter?',
        answer: 'Ein Yard entspricht 0,9144 Metern. Die Einheit wird vor allem im angloamerikanischen Raum verwendet.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'gewicht',
    name: 'Gewicht-Umrechner',
    shortDescription: 'Kilogramm, Pfund, Unzen und Milligramm komfortabel umrechnen.',
    description:
      'Der Gewichtsrechner eignet sich für Küche, Labor und Logistik. Alle relevanten Einheiten lassen sich kombinieren.',
    seoTitle: 'Gewicht umrechnen – Kilogramm, Pfund, Unzen',
    seoDescription:
      'Gewichtseinheiten miteinander vergleichen. Ergebnisse mit hoher Präzision abrufen und teilen.',
    cluster: 'cluster-a',
    category: 'Umrechnungen',
    keywords: ['Gewicht umrechnen', 'Pfund in kg', 'Unzen Gramm'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'Utility',
    related: ['volumen', 'kalorienverbrauch'],
    examples: [
      {
        title: 'Backen',
        description: '1 lb entspricht 453,59 g.',
      },
      {
        title: 'Paketversand',
        description: '2,5 kg entsprechen 5,51 lb.',
      },
    ],
    faqs: [
      {
        question: 'Was ist eine US-Unze?',
        answer: 'Eine Avoirdupois-Unze entspricht 28,35 Gramm.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'volumen',
    name: 'Volumen-Umrechner',
    shortDescription: 'Liter, Milliliter, Cups, Gallonen und mehr.',
    description:
      'Rezepte oder Laborwerte? Der Volumenrechner wandelt zwischen allen gängigen Einheiten um.',
    seoTitle: 'Volumen umrechnen – Liter, Milliliter, Cups, Gallonen',
    seoDescription:
      'Von Millilitern zu Cups oder Gallonen: Alle Volumeneinheiten sofort vergleichen.',
    cluster: 'cluster-a',
    category: 'Umrechnungen',
    keywords: ['Volumen umrechnen', 'ml in l', 'cup liter'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'Utility',
    related: ['gewicht', 'laenge'],
    examples: [
      {
        title: 'Rezept',
        description: '250 ml entsprechen 1,04 Cups.',
      },
      {
        title: 'Aquarium',
        description: '80 Liter sind 21,13 Gallonen.',
      },
    ],
    faqs: [
      {
        question: 'Was ist ein Cup?',
        answer: 'In US-Rezepten entspricht ein Cup etwa 240 Millilitern.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'waehrungsrechner',
    name: 'Währungsrechner (EZB)',
    shortDescription: 'Euro-Basis mit tagesaktuellen EZB-Referenzkursen umrechnen.',
    description:
      'Der Tech-Teddy-Währungsrechner nutzt die EZB-Referenzkurse. Ergebnisse lassen sich speichern und teilen.',
    seoTitle: 'Währungsrechner – EUR, USD, CHF & mehr (EZB)',
    seoDescription:
      'Euro-Beträge in Sekunden umrechnen. Kurse stammen von der Europäischen Zentralbank und werden täglich aktualisiert.',
    cluster: 'cluster-a',
    category: 'Finanzen',
    keywords: ['Währungsrechner', 'EUR USD', 'EZB Wechselkurs'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'FinanceApplication',
    related: ['temperatur', 'prozentrechner', 'zinseszins'],
    examples: [
      {
        title: 'Urlaub',
        description: '500 € entsprechen – abhängig vom Kurs – rund 540 USD.',
      },
      {
        title: 'Schweiz',
        description: '1.000 € → etwa 950 CHF (EZB-Referenzkurs).',
      },
    ],
    faqs: [
      {
        question: 'Wie häufig aktualisieren sich die Kurse?',
        answer: 'Die EZB stellt an Bankarbeitstagen Referenzkurse bereit, meist gegen 16:00 Uhr MEZ.',
      },
      {
        question: 'Welche Basis nutzt der Rechner?',
        answer: 'Der Euro ist die Basiswährung. Umgekehrte Umrechnungen sind möglich.',
      },
    ],
    status: 'live',
    ymyDisclaimer: 'Keine Finanzberatung. Kurse dienen zur Orientierung und können von Bankangeboten abweichen.',
  },
  {
    slug: 'primfaktorzerlegung',
    name: 'Primfaktorzerlegung',
    shortDescription: 'Zerlege Zahlen in Primfaktoren und leite Teiler sofort ab.',
    description:
      'Der Primfaktorzerleger stellt natürliche Zahlen als Produkt aus Primzahlen dar und berechnet Teileranzahl, Teilersumme sowie Euler-φ.',
    seoTitle: 'Primfaktorzerlegung – Primzahlen, Teiler & Euler-φ',
    seoDescription:
      'Primfaktorzerlegung online: Primfaktoren, Anzahl und Summe der Teiler sowie Euler-φ in Echtzeit berechnen. Ideal für Schule und Studium.',
    cluster: 'cluster-a',
    category: 'Mathe & Schule',
    keywords: ['Primfaktorzerlegung', 'Primzahlen', 'Teiler berechnen'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['potenz-wurzel', 'bruchrechner', 'dreisatz'],
    examples: [
      {
        title: 'Zahl 360',
        description: '360 = 2^3 × 3^2 × 5. Daraus ergeben sich 24 Teiler und eine Teilersumme von 1170.',
      },
      {
        title: 'Primzahltest',
        description: '997 liefert nur sich selbst als Faktor – der Rechner erkennt die Primzahl und φ(997) = 996.',
      },
    ],
    faqs: [
      {
        question: 'Welche Zahlen können zerlegt werden?',
        answer: 'Eingegeben werden natürliche Zahlen ab 2. Der Rechner arbeitet ganzzahlig ohne Rest.',
      },
      {
        question: 'Wie berechnet sich die Teileranzahl?',
        answer: 'Aus den Exponenten der Primfaktoren: (e₁+1)·(e₂+1)·… liefert die Anzahl aller Teiler.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'potenz-wurzel',
    name: 'Potenz- & Wurzelrechner',
    shortDescription: 'Berechne Potenzen und n-te Wurzeln inklusive wissenschaftlicher Darstellung.',
    description:
      'Der Potenz- & Wurzelrechner unterstützt beliebige reelle Exponenten, zeigt wissenschaftliche Notation und prüft Ergebnisse rückwärts.',
    seoTitle: 'Potenzrechner & Wurzelrechner – Exponenten online berechnen',
    seoDescription:
      'Potenzen und Wurzeln sekundenschnell berechnen: Basis und Exponent wählen, Ergebnis als Zahl und in wissenschaftlicher Schreibweise anzeigen lassen.',
    cluster: 'cluster-a',
    category: 'Mathe & Schule',
    keywords: ['Potenzrechner', 'Wurzelrechner', 'Exponent'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['primfaktorzerlegung', 'bruchrechner', 'dreisatz'],
    examples: [
      {
        title: 'Zinseszins vorbereiten',
        description: '1,035^12 ≈ 1,511 zeigt das Wachstum eines monatlichen Zinsfaktors von 3,5 % nach einem Jahr.',
      },
      {
        title: 'Kubikwurzel',
        description: '∛125 ergibt 5 – nützlich beim Umrechnen von Volumen in Kantenlängen.',
      },
    ],
    faqs: [
      {
        question: 'Unterstützt der Rechner negative Basen?',
        answer: 'Ja, solange der Exponent ganzzahlig ist. Für nicht ganzzahlige Exponenten werden nur reelle Ergebnisse ausgegeben.',
      },
      {
        question: 'Was bedeutet wissenschaftliche Schreibweise?',
        answer: 'Das Ergebnis wird als Zahl zwischen 1 und 10 mit Zehnerpotenz dargestellt, z. B. 1,23 × 10^5.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'bruchrechner',
    name: 'Bruchrechner',
    shortDescription: 'Addiere, subtrahiere, multipliziere oder dividiere Brüche mit Kürzung.',
    description:
      'Der Bruchrechner führt Grundrechenarten auf Zähler/Nenner aus, kürzt automatisch und zeigt Dezimal- sowie gemischte Darstellung.',
    seoTitle: 'Bruchrechner – Brüche online kürzen & rechnen',
    seoDescription:
      'Brüche addieren, subtrahieren, multiplizieren oder dividieren: Ergebnis als gekürzten Bruch, Dezimalzahl und gemischte Zahl anzeigen.',
    cluster: 'cluster-a',
    category: 'Mathe & Schule',
    keywords: ['Bruchrechner', 'Bruch kürzen', 'Bruchrechnung'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['dreisatz', 'durchschnitt', 'potenz-wurzel'],
    examples: [
      {
        title: 'Addieren',
        description: '1/3 + 1/6 = 1/2. Der Rechner kürzt automatisch.',
      },
      {
        title: 'Gemischte Zahl',
        description: '7/3 ergibt 2 1/3 als gemischte Darstellung und 2,333… als Dezimalzahl.',
      },
    ],
    faqs: [
      {
        question: 'Werden Ergebnisse immer gekürzt?',
        answer: 'Ja, der Rechner ermittelt den größten gemeinsamen Teiler und kürzt vollständig.',
      },
      {
        question: 'Wie gehe ich mit negativen Brüchen um?',
        answer: 'Negative Werte können im Zähler oder Nenner eingegeben werden, das Vorzeichen wird automatisch korrekt platziert.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'flaeche',
    name: 'Fläche-Umrechner',
    shortDescription: 'Quadratmeter in ha, ft², Acre und mehr umrechnen.',
    description:
      'Der Flächenumrechner beherrscht metrische und imperiale Einheiten – ideal für Baupläne, Immobilien und Landwirtschaft.',
    seoTitle: 'Fläche umrechnen – m², ha, Acre, ft²',
    seoDescription:
      'Kostenloser Flächenrechner: Quadratmeter, Hektar, Acre, Quadratfuß und weitere Einheiten sofort umrechnen.',
    cluster: 'cluster-a',
    category: 'Konverter',
    keywords: ['Fläche umrechnen', 'Quadratmeter', 'Acre'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['dreiecks-flaeche', 'volumen', 'laenge'],
    examples: [
      {
        title: 'Immobilien',
        description: '120 m² entsprechen 0,012 ha – hilfreich für Grundstücksangaben.',
      },
      {
        title: 'Holzbau',
        description: 'Ein Dach von 650 ft² sind rund 60,4 m².',
      },
    ],
    faqs: [
      {
        question: 'Welche Einheiten stehen zur Verfügung?',
        answer: 'Neben m², km² und cm² sind auch Hektar, Acre, Quadratfuß und Quadratzoll hinterlegt.',
      },
      {
        question: 'Wie präzise wird gerundet?',
        answer: 'Ergebnisse werden standardmäßig auf sechs Nachkommastellen gerundet.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'energie',
    name: 'Energie-Umrechner',
    shortDescription: 'Joule, Kilowattstunden, Kalorien oder eV mit wenigen Klicks umrechnen.',
    description:
      'Der Energie-Umrechner deckt physikalische und alltagsnahe Einheiten ab – vom Stromverbrauch bis zur Ernährung.',
    seoTitle: 'Energie umrechnen – Joule, kWh, Kalorien & mehr',
    seoDescription:
      'Energieeinheiten online umrechnen: Joule, Kilowattstunden, Kalorien, BTU oder Elektronenvolt im Nu vergleichen.',
    cluster: 'cluster-a',
    category: 'Konverter',
    keywords: ['Energie umrechnen', 'Kilowattstunde', 'Kalorien'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['temperatur', 'gewicht', 'volumen'],
    examples: [
      {
        title: 'Haushaltsstrom',
        description: '1 kWh entsprechen 3,6 Millionen Joule.',
      },
      {
        title: 'Ernährung',
        description: '250 kcal sind rund 1.047 kJ.',
      },
    ],
    faqs: [
      {
        question: 'Sind thermische und elektrische Einheiten enthalten?',
        answer: 'Ja, neben Joule und Kalorien gibt es Wattstunden, Kilowattstunden, BTU und Elektronenvolt.',
      },
      {
        question: 'Kann ich negative Werte eingeben?',
        answer: 'Der Umrechner arbeitet mit absoluten Energiewerten – negative Eingaben werden auf 0 gesetzt.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'dreiecks-flaeche',
    name: 'Dreiecksflächen-Rechner',
    shortDescription: 'Fläche aus Grundseite, Seitenlängen oder Winkel berechnen.',
    description:
      'Der Dreiecksflächen-Rechner kombiniert Grundformel, Heron-Verfahren und Winkelberechnung – inklusive Umfang und Zusatzinformationen.',
    seoTitle: 'Dreiecksfläche berechnen – Grundseite, Heron & Winkel',
    seoDescription:
      'Dreiecksfläche online berechnen: Eingabe von Grundseite und Höhe, drei Seiten oder zwei Seiten mit eingeschlossenem Winkel.',
    cluster: 'cluster-a',
    category: 'Geometrie',
    keywords: ['Dreiecksfläche', 'Heron', 'Geometrie Rechner'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'EducationalApplication',
    related: ['flaeche', 'potenz-wurzel', 'dreisatz'],
    examples: [
      {
        title: 'Bauzeichnung',
        description: 'Grundseite 8 m und Höhe 3 m liefern 12 m² Dachfläche.',
      },
      {
        title: 'Heron-Formel',
        description: 'Seiten 5, 6, 7 cm ergeben rund 14,7 cm² Fläche.',
      },
    ],
    faqs: [
      {
        question: 'Kann ich Winkel in Grad eingeben?',
        answer: 'Ja, der eingeschlossene Winkel wird in Grad erwartet und intern in Bogenmaß umgerechnet.',
      },
      {
        question: 'Erhalte ich auch den Umfang?',
        answer: 'Bei bekannten Seiten wird der Umfang zusätzlich ausgegeben.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'zeichen-zaehler',
    name: 'Zeichen-Zähler',
    shortDescription: 'Zählt Zeichen, Wörter, Zeilen und liefert Lesezeit-Schätzungen.',
    description:
      'Der Zeichen-Zähler analysiert Texte live – inklusive Zeichen mit/ohne Leerzeichen, Wortanzahl, Sätze, längstem Wort und Lesezeit.',
    seoTitle: 'Zeichen-Zähler – Zeichen & Wörter online zählen',
    seoDescription:
      'Textanalyse für Content und Social Media: Zeichen, Wörter, Zeilen und Lesezeit in Echtzeit ermitteln.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['Zeichen zählen', 'Word Count', 'Textanalyse'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['wort-zaehler', 'gross-klein', 'json-formatter'],
    examples: [
      {
        title: 'Instagram-Caption',
        description: 'Prüfe, ob deine 2.200 Zeichen pro Beitrag eingehalten werden.',
      },
      {
        title: 'Blogartikel',
        description: 'Die Lesezeit hilft, Überschriften oder Teaser abzustimmen.',
      },
    ],
    faqs: [
      {
        question: 'Werden Emojis richtig gezählt?',
        answer: 'Ja, Emojis zählen als einzelnes Zeichen und können mit dem Emoji-Counter weiter analysiert werden.',
      },
      {
        question: 'Kann ich den Text teilen?',
        answer: 'Bis zu 400 Zeichen werden in der URL gespeichert und lassen sich teilen oder bookmarken.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'wort-zaehler',
    name: 'Wort-Zähler',
    shortDescription: 'Ermittelt Wortanzahl, einzigartige Begriffe und Top-Vorkommen.',
    description:
      'Der Wort-Zähler extrahiert häufige Wörter, berechnet Durchschnittslängen und liefert Statistiken für Texte oder SEO-Briefings.',
    seoTitle: 'Wortzähler – Häufigkeiten & Textstatistik online',
    seoDescription:
      'Wörter zählen, häufige Begriffe finden und Textstatistiken für Content, SEO oder Hausarbeiten analysieren.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['Wortzähler', 'Keyword-Häufigkeit', 'Textanalyse'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['zeichen-zaehler', 'lorem-ipsum', 'emoji-counter'],
    examples: [
      {
        title: 'SEO-Analyse',
        description: 'Finde die Top-10-Schlüsselwörter eines Textes inklusive Häufigkeit.',
      },
      {
        title: 'Hausarbeit',
        description: 'Überprüfe, ob die Mindestwortanzahl erreicht wird und ob Füllwörter dominieren.',
      },
    ],
    faqs: [
      {
        question: 'Unterscheidet der Zähler Groß- und Kleinschreibung?',
        answer: 'Nein, Wörter werden kleingeschrieben und ohne Satzzeichen ausgewertet.',
      },
      {
        question: 'Wie viele Ergebnisse zeigt die Tabelle?',
        answer: 'Standardmäßig die Top-10. Über die Zwischenablage können alle Werte exportiert werden.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem-Ipsum-Generator',
    shortDescription: 'Erzeugt klassisches, modernes oder stichpunktartiges Blindtext-Material.',
    description:
      'Der Generator liefert Absätze, Bullet-Listen oder Tech-Floskeln für Mockups, Newsletter und Platzhaltertexte.',
    seoTitle: 'Lorem Ipsum Generator – Blindtext für Design & Content',
    seoDescription:
      'Blindtext in Sekunden erstellen: klassische Lorem-ipsum-Passagen, moderne Tech-Texte oder Stichpunktlisten.',
    cluster: 'cluster-b',
    category: 'Kreativ & Content',
    keywords: ['Lorem Ipsum', 'Blindtext Generator', 'Dummy Text'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['wort-zaehler', 'gross-klein', 'json-formatter'],
    examples: [
      {
        title: 'Landingpage Mockup',
        description: 'Erzeuge drei Absätze „modern“, um realistische Platzhalter zu erhalten.',
      },
      {
        title: 'Bullet-Listen',
        description: 'Die Option „Stichpunkte“ liefert Listen mit ✓-Markierung für Key-Features.',
      },
    ],
    faqs: [
      {
        question: 'Kann ich die Texte kopieren?',
        answer: 'Ja, ein Klick auf „Kopieren“ übernimmt den generierten Inhalt in die Zwischenablage.',
      },
      {
        question: 'Wie viele Absätze sind möglich?',
        answer: 'Bis zu zehn Absätze können auf einmal generiert werden.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'gross-klein',
    name: 'Groß-/Kleinschreibung-Umwandler',
    shortDescription: 'Wandle Text in Groß-, Klein-, Satz- oder Titel-Schreibung um.',
    description:
      'Der Umwandler bietet mehrere Presets – inklusive Kebab-Case und Trimmen von Leerzeichen – für Social Media, Überschriften oder Code.',
    seoTitle: 'Groß-/Kleinschreibung ändern – Uppercase, Title Case & mehr',
    seoDescription:
      'Texte bequem konvertieren: Großbuchstaben, klein, Satzanfang, Titel-Case oder kebab-case mit einem Klick.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['Text umwandeln', 'Uppercase', 'Title Case'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['zeichen-zaehler', 'reverse-text', 'wort-zaehler'],
    examples: [
      {
        title: 'Newsletter-Headline',
        description: 'Wähle „Titel-Format“ für eine saubere Headline-Kapitalisierung.',
      },
      {
        title: 'Slug-Erstellung',
        description: 'Mit „kebab-case“ entsteht sofort ein SEO-freundlicher URL-Slug.',
      },
    ],
    faqs: [
      {
        question: 'Bleiben Umlaute erhalten?',
        answer: 'Ja, Umlaute und Sonderzeichen werden korrekt konvertiert und nicht ersetzt.',
      },
      {
        question: 'Kann ich führende Leerzeichen entfernen?',
        answer: 'Aktiviere die Option „Leerzeichen entfernen“, um Text automatisch zu trimmen.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'palindrom-check',
    name: 'Palindrom-Checker',
    shortDescription: 'Prüft Wörter und Sätze auf Palindrome inklusive Bereinigung.',
    description:
      'Der Checker ignoriert Groß-/Kleinschreibung sowie Sonderzeichen und zeigt das bereinigte Prüfwort an.',
    seoTitle: 'Palindrom Checker – Wörter & Sätze testen',
    seoDescription:
      'Palindrom online prüfen: Texte werden bereinigt und als Palindrom oder nicht markiert.',
    cluster: 'cluster-b',
    category: 'Kreativ & Content',
    keywords: ['Palindrom', 'Wortspiele', 'Textwerkzeug'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['reverse-text', 'anagramm-generator', 'zeichen-zaehler'],
    examples: [
      {
        title: 'Wort-Spiel',
        description: '„Rentner“ wird als Palindrom erkannt – genau wie „Reliefpfeiler“.',
      },
      {
        title: 'Satz',
        description: '„Eine Horde bedrohe nie“ ergibt nach Bereinigung ein Palindrom.',
      },
    ],
    faqs: [
      {
        question: 'Welche Zeichen werden ignoriert?',
        answer: 'Sämtliche Leerzeichen, Satzzeichen und Symbole – geprüft wird nur der alphanumerische Kern.',
      },
      {
        question: 'Kann ich Emojis verwenden?',
        answer: 'Emojis werden entfernt, da nur Buchstaben und Zahlen betrachtet werden.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'passwort-generator',
    name: 'Passwort-Generator',
    shortDescription: 'Erstellt sichere Zufallspasswörter mit wählbarer Länge und Zeichensätzen.',
    description:
      'Der Generator baut auf Groß-/Kleinbuchstaben, Ziffern und optionalen Symbolen auf und liefert mehrere Vorschläge inkl. Kopierfunktion.',
    seoTitle: 'Passwort Generator – sichere Passwörter online erstellen',
    seoDescription:
      'Starke Passwörter erzeugen: Länge festlegen, Sonderzeichen optional zuschalten und Vorschläge kopieren.',
    cluster: 'cluster-b',
    category: 'Sicherheit',
    keywords: ['Passwort Generator', 'Zufallspasswort', 'Sicherheit'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'SecurityApplication',
    related: ['hash-generator', 'username-generator', 'zufallszahl'],
    examples: [
      {
        title: '16 Zeichen mit Symbolen',
        description: 'Liefert Passwörter wie „H9t$M4x!Q2zR8f@1“ für sensible Konten.',
      },
      {
        title: 'Ohne Sonderzeichen',
        description: 'Für Systeme mit Beschränkungen lassen sich nur Buchstaben und Zahlen wählen.',
      },
    ],
    faqs: [
      {
        question: 'Werden Passwörter gespeichert?',
        answer: 'Nein, alle Vorschläge entstehen ausschließlich im Browser und werden nicht übertragen.',
      },
      {
        question: 'Wie erhöhe ich die Sicherheit?',
        answer: 'Nutze möglichst lange Passwörter und kombiniere Buchstaben, Ziffern sowie Symbole.',
      },
    ],
    status: 'live',
    ymyDisclaimer: 'Hinweis: Verwende einzigartige Passwörter pro Dienst und speichere sie sicher in einem Passwortmanager.',
  },
  {
    slug: 'username-generator',
    name: 'Usernamen-Generator',
    shortDescription: 'Kreiert kreative Nutzernamen für Gaming, Business oder Social Media.',
    description:
      'Der Usernamen-Generator kombiniert Adjektive, Substantive, optionale Keywords und Stilprofile für vielseitige Vorschläge.',
    seoTitle: 'Username Generator – kreative Namen für Social Media & Gaming',
    seoDescription:
      'Individuelle Usernamen generieren: Keyword optional eingeben, Stil wählen und Vorschläge kopieren.',
    cluster: 'cluster-b',
    category: 'Kreativ & Content',
    keywords: ['Username Generator', 'Nickname', 'Social Media'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['domainname-generator', 'passwort-generator', 'zufallszahl'],
    examples: [
      {
        title: 'Gaming',
        description: 'Mit Stil „Gamer“ entstehen Varianten wie „CyberFalconXR83“.',
      },
      {
        title: 'Business',
        description: 'Für Unternehmen ergeben sich Namen wie „DataLabs“ oder „EcoStudio“.',
      },
    ],
    faqs: [
      {
        question: 'Wie viele Vorschläge bekomme ich?',
        answer: 'Bis zu 15 Vorschläge pro Klick – jeder mit direkter Kopierfunktion.',
      },
      {
        question: 'Kann ich eigene Wörter erzwingen?',
        answer: 'Gib ein Keyword ein; es wird bevorzugt in die Vorschläge eingebaut.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'domainname-generator',
    name: 'Domain-Name-Generator',
    shortDescription: 'Kombiniert Keywords mit beliebten TLDs zu verfügbaren Domain-Ideen.',
    description:
      'Der Generator kombiniert bis zu drei Keywords, mischt sie und ergänzt Wunsch-TLDs wie .de, .com oder .io.',
    seoTitle: 'Domain Generator – Ideen für verfügbare Domains finden',
    seoDescription:
      'Domainideen mit Wunsch-TLD erstellen: Keywords eingeben, Vorschläge prüfen und direkt zur Verfügbarkeit springen.',
    cluster: 'cluster-b',
    category: 'Kreativ & Content',
    keywords: ['Domain Generator', 'Domainnamen', 'Business Ideen'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['username-generator', 'qr-code-generator', 'passwort-generator'],
    examples: [
      {
        title: 'Lokales Business',
        description: 'Keywords „bäckerei berlin“ erzeugen Vorschläge wie „baeckereiberlin.de“ oder „berlinbrot.shop“.',
      },
      {
        title: 'Tech-Startup',
        description: 'Mit „data cloud“ entstehen Domains wie „datacloud.io“ oder „clouddata.app“.',
      },
    ],
    faqs: [
      {
        question: 'Prüft der Generator die Verfügbarkeit?',
        answer: 'Nein, aber jeder Vorschlag ist anklickbar und öffnet die Domain direkt im Browser.',
      },
      {
        question: 'Kann ich eigene TLDs hinzufügen?',
        answer: 'Zurzeit stehen gängige Endungen zur Auswahl – weitere folgen bei Bedarf.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'reverse-text',
    name: 'Reverse-Text-Tool',
    shortDescription: 'Dreht Texte zeichenweise um – ideal für Spielereien oder Palindromtests.',
    description:
      'Das Reverse-Tool spiegelt Eingaben live und eignet sich als Ergänzung zu Palindrom- und Anagramm-Checks.',
    seoTitle: 'Reverse Text – Zeichenfolge online umdrehen',
    seoDescription:
      'Text umdrehen und spiegeln: Eingabe wird live rückwärts ausgegeben, optional zum Teilen speichern.',
    cluster: 'cluster-b',
    category: 'Kreativ & Content',
    keywords: ['Text spiegeln', 'Reverse Text', 'Spiegeltext'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['palindrom-check', 'anagramm-generator', 'gross-klein'],
    examples: [
      {
        title: 'Social Media',
        description: 'Spiegeltext erzeugt außergewöhnliche Captions oder Rätsel.',
      },
      {
        title: 'Code-Review',
        description: 'Hilft, Eingaben rückwärts zu prüfen – z. B. Base64-Präfixe.',
      },
    ],
    faqs: [
      {
        question: 'Bleiben Emojis erhalten?',
        answer: 'Ja, Emojis und Sonderzeichen werden in ihrer Reihenfolge umgekehrt.',
      },
      {
        question: 'Kann ich den Text teilen?',
        answer: 'Bis zu 400 Zeichen werden in der URL gespeichert und lassen sich teilen.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'anagramm-generator',
    name: 'Anagramm-Generator',
    shortDescription: 'Mischt Buchstaben eines Wortes zu neuen Varianten.',
    description:
      'Der Anagramm-Generator erstellt zufällige Buchstabenkombinationen und eignet sich für Wortspiele, Quiz oder kreative Namensideen.',
    seoTitle: 'Anagramm Generator – Buchstaben neu anordnen',
    seoDescription:
      'Anagramme online bilden: Wort eingeben, Anzahl wählen und Vorschläge für Wortspiele erhalten.',
    cluster: 'cluster-b',
    category: 'Kreativ & Content',
    keywords: ['Anagramm', 'Wortgenerator', 'Wortspiele'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['palindrom-check', 'reverse-text', 'wort-zaehler'],
    examples: [
      {
        title: 'Rätsel',
        description: 'Aus „Regal“ entstehen Varianten wie „Lager“ oder „Geral“.',
      },
      {
        title: 'Namensideen',
        description: '„listen“ ergibt z. B. „silent“ – praktisch für Projektnamen.',
      },
    ],
    faqs: [
      {
        question: 'Wie lang darf das Wort sein?',
        answer: 'Bis zu 12 Zeichen funktionieren gut. Längere Wörter liefern zufällige Mischungen.',
      },
      {
        question: 'Werden doppelte Buchstaben berücksichtigt?',
        answer: 'Ja, jeder Buchstabe wird in der Häufigkeit verwendet, wie er im Original vorkommt.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'zufallszahl',
    name: 'Zufallszahl-Generator',
    shortDescription: 'Generiert beliebig viele Zufallszahlen mit optionaler Einzigartigkeit.',
    description:
      'Der Zufallszahl-Generator unterstützt Dezimal- und Ganzzahlen, einzigartige Ausgaben und flexible Bereiche – ideal für Lose, Aufgaben oder Tests.',
    seoTitle: 'Zufallszahl Generator – Zahlen online auslosen',
    seoDescription:
      'Zufallszahlen ziehen: Bereich festlegen, Anzahl bestimmen und bei Bedarf eindeutige Werte erzeugen.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['Zufallszahl', 'Random Generator', 'Auslosen'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['passwort-generator', 'qr-code-generator', 'emoji-counter'],
    examples: [
      {
        title: 'Gewinnspiel',
        description: 'Ziehe zehn eindeutige Zahlen zwischen 1 und 500 für eine Verlosung.',
      },
      {
        title: 'Matheübung',
        description: 'Erstelle zufällige Startwerte für Aufgaben oder Simulationen.',
      },
    ],
    faqs: [
      {
        question: 'Wie stelle ich eindeutige Ergebnisse sicher?',
        answer: 'Aktiviere die Option „Nur eindeutige Zahlen“. Der Bereich muss groß genug sein.',
      },
      {
        question: 'Kann ich mit Dezimalzahlen arbeiten?',
        answer: 'Ja, Eingaben werden auf sechs Dezimalstellen gerundet ausgegeben.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'emoji-counter',
    name: 'Emoji-Counter',
    shortDescription: 'Zählt Emojis in Texten und zeigt ihre Häufigkeit.',
    description:
      'Der Emoji-Counter erkennt alle Extended-Pictographic-Zeichen, liefert Gesamtanzahl sowie Häufigkeit je Emoji.',
    seoTitle: 'Emoji Zähler – Emojis in Texten analysieren',
    seoDescription:
      'Emojis zählen: Gesamtanzahl, einzigartige Emojis und Häufigkeit für Social Media, Chat oder Copywriting ermitteln.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['Emoji zählen', 'Social Media Analyse', 'Textanalyse'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['zeichen-zaehler', 'wort-zaehler', 'qr-code-generator'],
    examples: [
      {
        title: 'Instagram-Post',
        description: 'Analysiere, wie viele Emojis dein Beitrag enthält und welche dominieren.',
      },
      {
        title: 'Messenger-Verlauf',
        description: 'Zähle Emojis in einem Chat-Export – ideal für Statistiken.',
      },
    ],
    faqs: [
      {
        question: 'Werden Skintone-Varianten zusammengefasst?',
        answer: 'Jede Emoji-Variante wird separat gezählt, um genaue Ergebnisse zu liefern.',
      },
      {
        question: 'Wie viele Emojis kann ich analysieren?',
        answer: 'Der Zähler arbeitet clientseitig und verarbeitet auch lange Texte mit tausenden Emojis.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'qr-code-generator',
    name: 'QR-Code-Generator',
    shortDescription: 'Erstellt QR-Codes für Text, URLs oder Kontaktdaten und bietet Download.',
    description:
      'Der QR-Code-Generator verwendet eine etablierte API, zeigt Vorschauen in mehreren Größen und ermöglicht den PNG-Download.',
    seoTitle: 'QR-Code Generator – QR-Code online erstellen & downloaden',
    seoDescription:
      'Text oder URL eingeben, Größe wählen und QR-Code direkt herunterladen. Ideal für Visitenkarten, Plakate oder WLAN-Zugänge.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['QR-Code Generator', 'QR Code erstellen', 'QR Download'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['hash-generator', 'domainname-generator', 'passwort-generator'],
    examples: [
      {
        title: 'Event-Einladung',
        description: 'Generiere einen QR-Code zu einer Event-Landingpage in 300 × 300 Pixel.',
      },
      {
        title: 'WLAN-Zugang',
        description: 'Kodiert das WLAN-Passwort, um Gästen schnelles Einloggen zu ermöglichen.',
      },
    ],
    faqs: [
      {
        question: 'Benötige ich eine externe Bibliothek?',
        answer: 'Nein, der Code wird per HTTPS von einer stabilen QR-API geladen.',
      },
      {
        question: 'Kann ich den QR-Code speichern?',
        answer: 'Ja, über den Button „Herunterladen“ wird die PNG-Datei gespeichert.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'hash-generator',
    name: 'Hash-Generator (MD5/SHA)',
    shortDescription: 'Berechnet MD5-, SHA-1- und SHA-256-Hashes direkt im Browser.',
    description:
      'Der Hash-Generator nutzt die WebCrypto-API für sichere SHA-Hashes und eine eigene MD5-Implementierung – ideal für Integritätsprüfungen.',
    seoTitle: 'Hash Generator – MD5, SHA-1 & SHA-256 online berechnen',
    seoDescription:
      'Hashes für Texte berechnen: MD5, SHA-1 und SHA-256 als Hex-Wert inklusive Kopierfunktion.',
    cluster: 'cluster-b',
    category: 'Entwicklung',
    keywords: ['Hash Generator', 'MD5', 'SHA256'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['passwort-generator', 'qr-code-generator', 'json-formatter'],
    examples: [
      {
        title: 'Datei-Integrität',
        description: 'Vergleiche einen SHA-256-Hash mit dem Wert einer heruntergeladenen Datei.',
      },
      {
        title: 'API-Token',
        description: 'Erzeuge einen MD5-Hash aus einer Zeichenfolge zur Demonstration.',
      },
    ],
    faqs: [
      {
        question: 'Sind die Hashes sicher?',
        answer: 'SHA-1 und SHA-256 werden über die Browserinterne WebCrypto-API berechnet. MD5 dient nur zu Demonstrationszwecken.',
      },
      {
        question: 'Werden Daten gespeichert?',
        answer: 'Nein, Eingaben bleiben lokal im Browser.',
      },
    ],
    status: 'live',
    additionalDisclaimer: 'MD5 gilt als kryptografisch unsicher und sollte nur für Prüfsummen genutzt werden.',
  },
  {
    slug: 'pdf-merger',
    name: 'PDF-Merger (client-side)',
    shortDescription: 'Fügt mehrere PDF-Dateien direkt im Browser zusammen.',
    description:
      'Der PDF-Merger lädt Dateien lokal, kombiniert sie mit pdf-lib und bietet sofortigen Download – ohne Server-Upload.',
    seoTitle: 'PDF zusammenfügen – PDFs online mergen',
    seoDescription:
      'Mehrere PDFs zu einer Datei verbinden: Dateien wählen, clientseitig zusammenfügen und als neue PDF herunterladen.',
    cluster: 'cluster-b',
    category: 'Produktivität',
    keywords: ['PDF zusammenfügen', 'PDF merge', 'pdf-lib'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['json-formatter', 'csv-to-json', 'minifier'],
    examples: [
      {
        title: 'Bewerbungsunterlagen',
        description: 'Fasse Anschreiben, Lebenslauf und Zeugnisse zu einer PDF zusammen.',
      },
      {
        title: 'Schulunterlagen',
        description: 'Kombiniere mehrere Arbeitsblätter in ein Dokument für den Ausdruck.',
      },
    ],
    faqs: [
      {
        question: 'Werden Dateien hochgeladen?',
        answer: 'Nein, alle Operationen laufen lokal im Browser. Die PDFs verlassen dein Gerät nicht.',
      },
      {
        question: 'Gibt es Limitierungen?',
        answer: 'Sehr große PDFs können je nach Arbeitsspeicher des Geräts länger dauern.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'json-formatter',
    name: 'JSON-Formatter',
    shortDescription: 'Formatiert oder minimiert JSON-Strings für Development und Debugging.',
    description:
      'Der JSON-Formatter validiert JSON, formatiert es mit Einrückung oder minimiert es für kompakte Übertragung.',
    seoTitle: 'JSON Formatter – JSON online formatieren & minifizieren',
    seoDescription:
      'JSON prüfen, formatieren und minimieren: Struktur validieren, Einrückung wählen und Ergebnis kopieren.',
    cluster: 'cluster-b',
    category: 'Entwicklung',
    keywords: ['JSON formatieren', 'JSON minify', 'Developer Tool'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['csv-to-json', 'regex-tester', 'minifier'],
    examples: [
      {
        title: 'API-Debug',
        description: 'Formatiere eine verschachtelte API-Antwort zur besseren Lesbarkeit.',
      },
      {
        title: 'Minify',
        description: 'Reduziere JSON vor dem Speichern in localStorage auf wenige Zeichen.',
      },
    ],
    faqs: [
      {
        question: 'Unterstützt das Tool große Objekte?',
        answer: 'Ja, solange sie in den Arbeitsspeicher des Browsers passen.',
      },
      {
        question: 'Bleiben Unicode-Zeichen erhalten?',
        answer: 'Ja, JSON.stringify behandelt Sonderzeichen korrekt.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'csv-to-json',
    name: 'CSV-zu-JSON-Konverter',
    shortDescription: 'Wandelt CSV-Daten mit Komma, Semikolon oder Tab in JSON um.',
    description:
      'Der Konverter verarbeitet einfache CSV-Dateien mit Anführungszeichen, nutzt die erste Zeile als Header und erzeugt JSON-Arrays.',
    seoTitle: 'CSV in JSON umwandeln – Online-Konverter',
    seoDescription:
      'CSV-Daten in JSON konvertieren: Trennzeichen wählen, Daten einfügen und strukturierte JSON-Ausgabe erhalten.',
    cluster: 'cluster-b',
    category: 'Entwicklung',
    keywords: ['CSV zu JSON', 'Datenkonverter', 'Developer Tool'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['json-formatter', 'regex-tester', 'minifier'],
    examples: [
      {
        title: 'Produktliste',
        description: 'Konvertiere eine CSV-Tabelle mit Produktdaten in JSON für eine Web-App.',
      },
      {
        title: 'Notenverwaltung',
        description: 'Importiere Schulnoten aus Excel und bereite sie als JSON vor.',
      },
    ],
    faqs: [
      {
        question: 'Unterstützt der Konverter Anführungszeichen?',
        answer: 'Ja, doppelte Anführungszeichen werden gemäß CSV-Standard berücksichtigt.',
      },
      {
        question: 'Was passiert mit leeren Spalten?',
        answer: 'Leere Zellen werden als leere Zeichenketten ausgegeben.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'minifier',
    name: 'HTML/CSS-Minifier',
    shortDescription: 'Reduziert HTML- oder CSS-Code auf ein Minimum – ohne Build-Tool.',
    description:
      'Der Minifier entfernt Kommentare, unnötige Leerzeichen und Zeilenumbrüche in HTML oder CSS – perfekt für kleine Projekte.',
    seoTitle: 'HTML & CSS minifizieren – Online-Minifier',
    seoDescription:
      'HTML- oder CSS-Code online minifizieren: Kommentare entfernen, Whitespace reduzieren und Ergebnis kopieren.',
    cluster: 'cluster-b',
    category: 'Entwicklung',
    keywords: ['HTML minify', 'CSS minimieren', 'Code optimieren'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['json-formatter', 'regex-tester', 'csv-to-json'],
    examples: [
      {
        title: 'Landingpage',
        description: 'Verkleinere eine statische HTML-Seite für bessere Ladezeiten.',
      },
      {
        title: 'Style-Snippet',
        description: 'Minifiziere ein eingebettetes CSS-Snippet für Newsletter.',
      },
    ],
    faqs: [
      {
        question: 'Werden JavaScript-Dateien unterstützt?',
        answer: 'Der Fokus liegt auf HTML und CSS. Für JavaScript sind externe Tools empfohlen.',
      },
      {
        question: 'Kann ich das Ergebnis rückgängig machen?',
        answer: 'Nutze das Ausgangsfeld als Backup oder kopiere den Code vor der Minifizierung.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'regex-tester',
    name: 'Regex-Tester',
    shortDescription: 'Testet Reguläre Ausdrücke mit Live-Matches und Fehleranzeige.',
    description:
      'Der Regex-Tester zeigt Trefferpositionen, unterstützt Flags und weist auf Syntaxfehler hin – ideal für Entwicklung oder Datenbereinigung.',
    seoTitle: 'Regex Tester – Reguläre Ausdrücke online testen',
    seoDescription:
      'Reguläre Ausdrücke ausprobieren: Muster eingeben, Flags wählen und Treffer inklusive Index anzeigen lassen.',
    cluster: 'cluster-b',
    category: 'Entwicklung',
    keywords: ['Regex Tester', 'Reguläre Ausdrücke', 'Pattern Matching'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'UtilityApplication',
    related: ['json-formatter', 'csv-to-json', 'minifier'],
    examples: [
      {
        title: 'E-Mail-Prüfung',
        description: 'Teste das Muster /[\\w.-]+@example\\.de/ an mehreren Beispieladressen.',
      },
      {
        title: 'Logfile-Analyse',
        description: 'Finde IP-Adressen in Log-Dateien mit einem passenden Regex.',
      },
    ],
    faqs: [
      {
        question: 'Welche Flags sind verfügbar?',
        answer: 'Alle JavaScript-Flags (g, i, m, u, y, s) können kombiniert werden.',
      },
      {
        question: 'Wie viele Treffer zeigt der Tester?',
        answer: 'Es werden alle Treffer mit Index aufgelistet. Für sehr lange Texte sollte die Eingabe begrenzt werden.',
      },
    ],
    status: 'live',
  },
  {
    slug: 'farbcode-konverter',
    name: 'Farbcode-Konverter',
    shortDescription: 'Konvertiert Farben zwischen HEX, RGB, CMYK und zeigt HSL-Werte.',
    description:
      'Der Farbcode-Konverter synchronisiert HEX-, RGB- und CMYK-Eingaben mit Farbwähler und liefert zusätzliche HSL-Infos.',
    seoTitle: 'Farbcode Konverter – HEX, RGB, CMYK & HSL umrechnen',
    seoDescription:
      'Farbcodes umwandeln: HEX, RGB, CMYK und HSL live berechnen und Farbe im Vorschau-Block anzeigen.',
    cluster: 'cluster-b',
    category: 'Design & Medien',
    keywords: ['Farbcode umrechnen', 'RGB zu CMYK', 'HEX zu RGB'],
    lastUpdated: '2025-01-15',
    applicationCategory: 'ProductivityApplication',
    related: ['qr-code-generator', 'lorem-ipsum', 'username-generator'],
    examples: [
      {
        title: 'Print & Web',
        description: 'Wandle die Webfarbe #0EA5E9 in CMYK 79, 27, 0, 9 für den Druck um.',
      },
      {
        title: 'Corporate Design',
        description: 'Passe eine RGB-Farbe an und übernehme sie als HEX in den Styleguide.',
      },
    ],
    faqs: [
      {
        question: 'Unterstützt das Tool den Farbwähler?',
        answer: 'Ja, über das native Color-Input lässt sich der Farbton komfortabel auswählen.',
      },
      {
        question: 'Wie genau sind die CMYK-Werte?',
        answer: 'Die Umrechnung basiert auf Standard-Formeln und liefert gerundete Prozentwerte.',
      },
    ],
    status: 'live',
  },
];

export function findTool(slug) {
  return tools.find((tool) => tool.slug === slug);
}

export function listToolsByCluster() {
  return tools.reduce((acc, tool) => {
    if (!acc[tool.cluster]) {
      acc[tool.cluster] = [];
    }
    acc[tool.cluster].push(tool);
    return acc;
  }, {});
}
