import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/wissen", label: "Wissen" },
  { href: "/a-z", label: "Tools A–Z" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/80">
      <div className="container flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Tech Teddy</p>
          <p>
            Online-Rechner &amp; Generatoren für den Alltag in der DACH-Region. Ergebnisse in Echtzeit, optimiert für Mobile.
          </p>
          <p className="text-xs text-muted-foreground/80">
            © {new Date().getFullYear()} Tech Teddy. Alle Rechte vorbehalten.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
