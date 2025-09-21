import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics/analytics";
import { GlobalStickyAd } from "@/components/ads/global-sticky-ad";
import { ConsentBanner } from "@/components/consent/consent-banner";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tech-teddy.de"),
  title: {
    default: "Tech Teddy – Rechner, Konverter & Generatoren",
    template: "%s | Tech Teddy",
  },
  description:
    "Tech Teddy bietet kostenlose Online-Tools für Schule, Büro und Alltag: Rechner, Konverter und Generatoren mit Sofortergebnissen.",
  applicationName: "Tech Teddy",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "https://tech-teddy.de",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Tech Teddy – Rechner, Konverter & Generatoren",
    description:
      "Kostenlose Online-Tools für die DACH-Region: Prozentrechner, Brutto-Netto, BMI, Kalorien und viele weitere Helfer.",
    url: "https://tech-teddy.de",
    siteName: "Tech Teddy",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Teddy",
    description: "Rechner & Generatoren für den Alltag in der DACH-Region.",
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#111827" }, { color: "#ffffff" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans bg-background text-foreground">
        <ThemeProvider>
          <ConsentProvider>
            <Analytics />
            <div className="relative flex min-h-screen flex-col">
              <a
                href="#hauptinhalt"
                className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:top-4 focus:-translate-x-1/2 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
              >
                Zum Inhalt springen
              </a>
              <Header />
              <main id="hauptinhalt" className="flex-1 bg-background">
                <div className="container py-10 sm:py-12">{children}</div>
              </main>
              <Footer />
            </div>
            <GlobalStickyAd />
            <ConsentBanner />
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
