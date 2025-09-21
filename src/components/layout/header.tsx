import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/a-z", label: "Tools A–Z" },
  { href: "/wissen", label: "Wissen" },
  { href: "/quiz/allgemeinwissen", label: "Quiz" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">🐻</span>
          <span className="tracking-tight">
            Tech <span className="text-primary">Teddy</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-foreground focus-visible:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
