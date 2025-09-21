import { clamp, round } from './utils.js';

export function percent({ base, rate, value, mode }) {
  if (mode === 'value') {
    if (!isFiniteNumber(base) || !isFiniteNumber(rate)) return 0;
    return round(base * (rate / 100), 4);
  }
  if (mode === 'rate') {
    if (!isFiniteNumber(base) || !isFiniteNumber(value) || base === 0) return 0;
    return round((value / base) * 100, 4);
  }
  if (!isFiniteNumber(rate) || !isFiniteNumber(value) || rate === 0) {
    return 0;
  }
  return round(value / (rate / 100), 4);
}

export function ruleOfThree({ baseQuantity, baseResult, targetQuantity, mode }) {
  if (!isFiniteNumber(baseQuantity) || !isFiniteNumber(baseResult) || !isFiniteNumber(targetQuantity)) {
    return 0;
  }
  if (mode === 'inverse') {
    if (targetQuantity === 0) {
      return 0;
    }
    return round((baseQuantity * baseResult) / targetQuantity, 4);
  }
  if (baseQuantity === 0) {
    return 0;
  }
  return round((baseResult / baseQuantity) * targetQuantity, 4);
}

export function bmi({ heightCm, weightKg }) {
  if (!isFiniteNumber(heightCm) || !isFiniteNumber(weightKg) || heightCm === 0) {
    return { bmi: 0, category: '' };
  }
  const heightM = heightCm / 100;
  const bmiValue = round(weightKg / (heightM * heightM), 1);
  return { bmi: bmiValue, category: bmiCategory(bmiValue) };
}

const bmiScale = [
  { min: 0, max: 18.4, label: 'Untergewicht' },
  { min: 18.5, max: 24.9, label: 'Normalgewicht' },
  { min: 25, max: 29.9, label: 'Übergewicht' },
  { min: 30, max: 34.9, label: 'Adipositas Grad I' },
  { min: 35, max: 39.9, label: 'Adipositas Grad II' },
  { min: 40, max: Infinity, label: 'Adipositas Grad III' },
];

function bmiCategory(value) {
  const entry = bmiScale.find((scale) => value >= scale.min && value <= scale.max);
  return entry ? entry.label : '';
}

export function compound({ principal, rate, years, compoundsPerYear, contribution = 0 }) {
  if (!isFiniteNumber(principal) || !isFiniteNumber(rate) || !isFiniteNumber(years)) {
    return { futureValue: 0, totalContribution: 0, interestEarned: 0 };
  }

  const m = clamp(Math.floor(compoundsPerYear ?? 1), 1, 365);
  const r = rate / 100;
  const periods = years * m;
  const periodicRate = r / m;
  const principalGrowth = principal * (1 + periodicRate) ** periods;

  const contributionPerPeriod = isFiniteNumber(contribution) ? contribution : 0;
  const contributionGrowth =
    contributionPerPeriod > 0 && periodicRate !== 0
      ? contributionPerPeriod * (((1 + periodicRate) ** periods - 1) / periodicRate)
      : contributionPerPeriod * periods;

  const futureValue = round(principalGrowth + contributionGrowth, 2);
  const totalContribution = round(principal + contributionPerPeriod * periods, 2);
  const interestEarned = round(futureValue - totalContribution, 2);

  return { futureValue, totalContribution, interestEarned };
}

export function mifflinStJeor({ weightKg, heightCm, age, sex }) {
  if (!isFiniteNumber(weightKg) || !isFiniteNumber(heightCm) || !isFiniteNumber(age)) {
    return 0;
  }
  const s = sex === 'male' ? 5 : sex === 'female' ? -161 : -78;
  return round(10 * weightKg + 6.25 * heightCm - 5 * age + s, 0);
}

export function totalEnergyExpenditure(bmr, pal) {
  if (!isFiniteNumber(bmr) || !isFiniteNumber(pal)) {
    return 0;
  }
  return round(bmr * pal, 0);
}

export function arithmeticMean(values, decimals = 4) {
  if (!values.length) {
    return 0;
  }
  const total = values.reduce((acc, value) => acc + value, 0);
  return round(total / values.length, decimals);
}

export function median(values, decimals = 4) {
  if (!values.length) {
    return 0;
  }
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return round((sorted[middle - 1] + sorted[middle]) / 2, decimals);
  }
  return round(sorted[middle], decimals);
}

export function populationStandardDeviation(values, decimals = 4) {
  if (!values.length) {
    return 0;
  }
  const mean = values.reduce((acc, value) => acc + value, 0) / values.length;
  const variance = values.reduce((acc, value) => acc + (value - mean) ** 2, 0) / values.length;
  return round(Math.sqrt(variance), decimals);
}

const lengthToMeter = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

export function convertLength(value, from, to) {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  const meters = value * lengthToMeter[from];
  return round(meters / lengthToMeter[to], 6);
}

const massToKilogram = {
  kilogram: 1,
  gram: 0.001,
  milligram: 0.000001,
  pound: 0.45359237,
  ounce: 0.0283495231,
  tonne: 1000,
};

export function convertMass(value, from, to) {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  const kilograms = value * massToKilogram[from];
  return round(kilograms / massToKilogram[to], 6);
}

const volumeToLiter = {
  liter: 1,
  milliliter: 0.001,
  cubicMeter: 1000,
  teaspoon: 0.00492892,
  tablespoon: 0.0147868,
  cup: 0.24,
  pint: 0.473176,
  gallon: 3.78541,
};

export function convertVolume(value, from, to) {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  const liters = value * volumeToLiter[from];
  return round(liters / volumeToLiter[to], 6);
}

const timeToSecond = {
  millisecond: 0.001,
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  year: 31536000,
};

export function convertTime(value, from, to) {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  const seconds = value * timeToSecond[from];
  return round(seconds / timeToSecond[to], 6);
}

const speedToMetersPerSecond = {
  kilometersPerHour: 0.277777778,
  milesPerHour: 0.44704,
  meterPerSecond: 1,
  knot: 0.514444,
};

export function convertSpeed(value, from, to) {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  const metersPerSecond = value * speedToMetersPerSecond[from];
  return round(metersPerSecond / speedToMetersPerSecond[to], 6);
}

export function convertTemperature(value, from, to) {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  let celsius = value;
  if (from === 'fahrenheit') {
    celsius = (value - 32) * (5 / 9);
  } else if (from === 'kelvin') {
    celsius = value - 273.15;
  }

  if (to === 'celsius') {
    return round(celsius, 2);
  }
  if (to === 'fahrenheit') {
    return round(celsius * (9 / 5) + 32, 2);
  }
  return round(celsius + 273.15, 2);
}

export const PAL_VALUES = [
  { value: 1.2, label: 'Sitzende Tätigkeit' },
  { value: 1.4, label: 'Überwiegend sitzend mit etwas Bewegung' },
  { value: 1.6, label: 'Stehende/gehende Tätigkeiten' },
  { value: 1.8, label: 'Körperlich anstrengende Arbeit' },
  { value: 2.0, label: 'Sehr hohe körperliche Aktivität' },
];

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

export const timeUnits = {
  millisecond: 'Millisekunden',
  second: 'Sekunden',
  minute: 'Minuten',
  hour: 'Stunden',
  day: 'Tage',
  week: 'Wochen',
  year: 'Jahre',
};

export const speedUnits = {
  kilometersPerHour: 'km/h',
  milesPerHour: 'mph',
  meterPerSecond: 'm/s',
  knot: 'Knoten',
};

export const lengthUnits = {
  meter: 'Meter',
  kilometer: 'Kilometer',
  centimeter: 'Zentimeter',
  millimeter: 'Millimeter',
  inch: 'Zoll (inch)',
  foot: 'Fuß (ft)',
  yard: 'Yard',
  mile: 'Meile',
};

export const massUnits = {
  kilogram: 'Kilogramm',
  gram: 'Gramm',
  milligram: 'Milligramm',
  pound: 'Pfund (lb)',
  ounce: 'Unze (oz)',
  tonne: 'Tonne',
};

export const volumeUnits = {
  liter: 'Liter',
  milliliter: 'Milliliter',
  cubicMeter: 'Kubikmeter',
  teaspoon: 'Teelöffel',
  tablespoon: 'Esslöffel',
  cup: 'Cup',
  pint: 'Pint',
  gallon: 'Gallone',
};

export const temperatureUnits = {
  celsius: 'Grad Celsius (°C)',
  fahrenheit: 'Grad Fahrenheit (°F)',
  kelvin: 'Kelvin (K)',
};
