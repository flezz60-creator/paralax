const { getHolidays } = require('../lib/holidays');

/**
 * GET /api/holidays
 *
 * Query params:
 * - country: de, at, ch (required)
 * - year: 2025-2026 (optional, default: current year)
 * - state: state/region code (optional)
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { country, year, state } = req.query;

    // Validate country
    if (!country) {
      return res.status(400).json({
        error: 'Missing required parameter: country',
        usage: 'GET /api/holidays?country=de&year=2025&state=BY'
      });
    }

    if (!['de', 'at', 'ch'].includes(country.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid country code. Supported: de, at, ch'
      });
    }

    // Get holidays
    const result = getHolidays(
      country.toLowerCase(),
      year ? parseInt(year) : undefined,
      state || null
    );

    if (result.error) {
      return res.status(400).json(result);
    }

    // Success response
    return res.status(200).json({
      success: true,
      data: result,
      meta: {
        requestedAt: new Date().toISOString(),
        endpoint: '/api/holidays'
      }
    });

  } catch (error) {
    console.error('Error in /api/holidays:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
