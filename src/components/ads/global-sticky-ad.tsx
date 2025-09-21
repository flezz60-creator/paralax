"use client";

import { AdSlot } from "./ad-slot";
import { useConsent } from "../consent/consent-provider";

export function GlobalStickyAd() {
  const { status } = useConsent();
  if (status === "unknown") {
    return null;
  }
  return <AdSlot placement="sticky-footer" className="sm:hidden" label="Mobile Sticky Ad" />;
}
