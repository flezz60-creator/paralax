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
