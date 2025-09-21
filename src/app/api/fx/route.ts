import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const DEFAULT_SYMBOLS = ["EUR", "USD", "CHF", "GBP", "JPY", "CZK", "PLN"].join(",");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const base = (searchParams.get("base") || "EUR").toUpperCase();
  const symbols = (searchParams.get("symbols") || DEFAULT_SYMBOLS)
    .split(",")
    .map((currency) => currency.trim().toUpperCase())
    .filter(Boolean)
    .join(",");

  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) {
      throw new Error(`Exchange API returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        base: data.base,
        date: data.date,
        rates: data.rates,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=86400, stale-if-error=172800",
        },
      }
    );
  } catch (error) {
    console.error("FX API error", error);
    return NextResponse.json(
      { error: "Kurse derzeit nicht verfügbar" },
      { status: 502, headers: { "Cache-Control": "public, max-age=300" } }
    );
  }
}
