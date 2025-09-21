export function round(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) {
    return 0;
  }
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function parseLocaleNumber(value: string | null | undefined): number | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value
    .trim()
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");

  if (normalized === "" || normalized === "-" || normalized === ".") {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const formatter = new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 2,
    ...options,
  });

  return formatter.format(value);
}

export function formatCurrency(value: number, currency: string): string {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}

export function formatPercent(value: number, fractionDigits = 2): string {
  return `${formatNumber(value, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })} %`;
}

export function validateNumber(value: string | null | undefined): boolean {
  return parseLocaleNumber(value) !== null;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function sanitizeNumberInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  let sanitized = "";
  let hasDecimal = false;
  let hasMinus = false;

  for (const char of trimmed) {
    if ((char === "," || char === ".") && !hasDecimal) {
      sanitized += ",";
      hasDecimal = true;
    } else if (char === "-" && !hasMinus && sanitized.length === 0) {
      sanitized += "-";
      hasMinus = true;
    } else if (/\d/.test(char)) {
      sanitized += char;
    }
  }

  return sanitized;
}
