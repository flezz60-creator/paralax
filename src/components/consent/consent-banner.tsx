"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useConsent } from "./consent-provider";

export function ConsentBanner() {
  const { status, grant, deny } = useConsent();
  const isVisible = status === "unknown";

  const message = useMemo(
    () =>
      "Wir verwenden Cookies und vergleichbare Technologien, um anonyme Nutzungsstatistiken zu erheben. Du kannst deine Entscheidung jederzeit in der Datenschutzerklärung ändern.",
    []
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="max-w-3xl rounded-2xl border bg-card p-5 shadow-card">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {message}{" "}
          <Link className="font-semibold text-primary" href="/datenschutz">
            Mehr erfahren
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={deny}
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={grant}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Einverstanden
          </button>
        </div>
      </div>
    </div>
  );
}
