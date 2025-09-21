"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ConsentStatus = "unknown" | "granted" | "denied";

interface ConsentContextValue {
  status: ConsentStatus;
  grant: () => void;
  deny: () => void;
  reset: () => void;
}

const CONSENT_STORAGE_KEY = "tt-consent";

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("unknown");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentStatus | null;
      if (stored === "granted" || stored === "denied") {
        setStatus(stored);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Consent storage unavailable", error);
      }
    }
  }, []);

  const persist = useCallback((next: ConsentStatus) => {
    setStatus(next);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Consent storage unavailable", error);
      }
    }
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      status,
      grant: () => persist("granted"),
      deny: () => persist("denied"),
      reset: () => persist("unknown"),
    }),
    [persist, status]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}
