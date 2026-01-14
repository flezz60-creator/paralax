const { isHoliday } = require('../lib/holidays');

/**
 * GET /api/is-holiday
 *
 * Query params:
 * - country: de, at, ch (required)
 * - date: YYYY-MM-DD (required)
 * - state: state/region code (optional)
 */
module.exports = async (req, res) => {
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
    const { country, date, state } = req.query;

    if (!country || !date) {
      return res.status(400).json({
        error: 'Missing required parameters: country, date',
        usage: 'GET /api/is-holiday?country=de&date=2025-01-01&state=BY'
      });
    }

    if (!['de', 'at', 'ch'].includes(country.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid country code. Supported: de, at, ch'
      });
    }

    const result = isHoliday(
      country.toLowerCase(),
      date,
      state || null
    );

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      data: result,
      meta: {
        requestedAt: new Date().toISOString(),
        endpoint: '/api/is-holiday'
      }
    });

  } catch (error) {
    console.error('Error in /api/is-holiday:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
