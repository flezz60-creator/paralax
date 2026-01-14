const fs = require('fs');
const path = require('path');

/**
 * Load holiday data for a specific country
 */
function loadHolidayData(country) {
  const dataPath = path.join(process.cwd(), 'data', `holidays-${country}.json`);
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

/**
 * Get holidays for a specific country, year, and optional state
 */
function getHolidays(country, year = new Date().getFullYear(), state = null) {
  const data = loadHolidayData(country);

  if (!data) {
    return { error: 'Invalid country code. Supported: de, at, ch' };
  }

  if (!data.years[year]) {
    return { error: `No data available for year ${year}. Available: 2025-2026` };
  }

  let holidays = data.years[year];

  // Filter by state if provided
  if (state && state !== 'all') {
    holidays = holidays.filter(holiday =>
      holiday.states.includes('all') || holiday.states.includes(state.toUpperCase())
    );
  }

  return {
    country: data.name,
    countryCode: country,
    year: parseInt(year),
    state: state || 'all',
    holidays: holidays.map(h => ({
      date: h.date,
      name: h.name,
      type: h.type,
      dayOfWeek: getDayOfWeek(h.date)
    })),
    count: holidays.length
  };
}

/**
 * Check if a specific date is a holiday
 */
function isHoliday(country, date, state = null) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const dateString = date.slice(0, 10); // YYYY-MM-DD

  const data = loadHolidayData(country);
  if (!data || !data.years[year]) {
    return { isHoliday: false };
  }

  let holidays = data.years[year];

  if (state && state !== 'all') {
    holidays = holidays.filter(h =>
      h.states.includes('all') || h.states.includes(state.toUpperCase())
    );
  }

  const holiday = holidays.find(h => h.date === dateString);

  return {
    date: dateString,
    isHoliday: !!holiday,
    holiday: holiday ? { name: holiday.name, type: holiday.type } : null,
    dayOfWeek: getDayOfWeek(dateString)
  };
}

/**
 * Get the next upcoming holiday from today or a specific date
 */
function getNextHoliday(country, fromDate = null, state = null) {
  const today = fromDate ? new Date(fromDate) : new Date();
  const year = today.getFullYear();

  const data = loadHolidayData(country);
  if (!data) {
    return { error: 'Invalid country code' };
  }

  // Check current year and next year
  let allHolidays = [];
  [year, year + 1].forEach(y => {
    if (data.years[y]) {
      let yearHolidays = data.years[y];
      if (state && state !== 'all') {
        yearHolidays = yearHolidays.filter(h =>
          h.states.includes('all') || h.states.includes(state.toUpperCase())
        );
      }
      allHolidays = allHolidays.concat(yearHolidays);
    }
  });

  // Filter future holidays
  const todayString = today.toISOString().slice(0, 10);
  const futureHolidays = allHolidays
    .filter(h => h.date > todayString)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (futureHolidays.length === 0) {
    return { error: 'No upcoming holidays found' };
  }

  const next = futureHolidays[0];
  const daysUntil = Math.ceil((new Date(next.date) - today) / (1000 * 60 * 60 * 24));

  return {
    date: next.date,
    name: next.name,
    type: next.type,
    dayOfWeek: getDayOfWeek(next.date),
    daysUntil: daysUntil
  };
}

/**
 * Calculate business days between two dates
 */
function calculateBusinessDays(country, startDate, endDate, state = null) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    return { error: 'Start date must be before end date' };
  }

  const data = loadHolidayData(country);
  if (!data) {
    return { error: 'Invalid country code' };
  }

  // Get all holidays in the date range
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  let allHolidays = [];

  for (let year = startYear; year <= endYear; year++) {
    if (data.years[year]) {
      let yearHolidays = data.years[year];
      if (state && state !== 'all') {
        yearHolidays = yearHolidays.filter(h =>
          h.states.includes('all') || h.states.includes(state.toUpperCase())
        );
      }
      allHolidays = allHolidays.concat(yearHolidays.map(h => h.date));
    }
  }

  const holidaySet = new Set(allHolidays);
  let businessDays = 0;
  let totalDays = 0;
  let weekendDays = 0;
  let holidayDays = 0;

  const current = new Date(start);
  while (current <= end) {
    totalDays++;
    const dateString = current.toISOString().slice(0, 10);
    const dayOfWeek = current.getDay();

    // Check if weekend
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    // Check if holiday
    const isHol = holidaySet.has(dateString);

    if (isWeekend) {
      weekendDays++;
    } else if (isHol) {
      holidayDays++;
    } else {
      businessDays++;
    }

    current.setDate(current.getDate() + 1);
  }

  return {
    startDate: startDate,
    endDate: endDate,
    country: data.name,
    state: state || 'all',
    businessDays: businessDays,
    totalDays: totalDays,
    weekendDays: weekendDays,
    holidayDays: holidayDays
  };
}

/**
 * Get day of week name
 */
function getDayOfWeek(dateString) {
  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const date = new Date(dateString + 'T12:00:00'); // Noon to avoid timezone issues
  return days[date.getDay()];
}

/**
 * Get available states/regions for a country
 */
function getStates(country) {
  const data = loadHolidayData(country);
  if (!data) {
    return { error: 'Invalid country code' };
  }

  return {
    country: data.name,
    countryCode: country,
    states: data.states
  };
}

module.exports = {
  getHolidays,
  isHoliday,
  getNextHoliday,
  calculateBusinessDays,
  getStates
};
