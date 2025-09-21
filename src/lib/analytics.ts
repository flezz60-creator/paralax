export type AnalyticsEvent =
  | "calc_submit"
  | "calc_change"
  | "tool_share"
  | "related_click"
  | "ad_view_enter";

type EventPayload = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, payload?: { props?: EventPayload }) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (typeof window.plausible === "function") {
    window.plausible(event, { props: payload });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
  }

  if (!window.gtag && !window.plausible && !window.dataLayer) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[Analytics]", event, payload);
    }
  }
}
