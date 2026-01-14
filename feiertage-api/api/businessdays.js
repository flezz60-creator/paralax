const { calculateBusinessDays } = require('../lib/holidays');

/**
 * POST /api/businessdays
 *
 * Body:
 * {
 *   "country": "de",
 *   "start": "2025-01-01",
 *   "end": "2025-12-31",
 *   "state": "BY" (optional)
 * }
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { country, start, end, state } = req.body;

    // Validate input
    if (!country || !start || !end) {
      return res.status(400).json({
        error: 'Missing required fields: country, start, end',
        usage: {
          method: 'POST',
          endpoint: '/api/businessdays',
          body: {
            country: 'de',
            start: '2025-01-01',
            end: '2025-12-31',
            state: 'BY (optional)'
          }
        }
      });
    }

    if (!['de', 'at', 'ch'].includes(country.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid country code. Supported: de, at, ch'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(start) || !dateRegex.test(end)) {
      return res.status(400).json({
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    // Calculate business days
    const result = calculateBusinessDays(
      country.toLowerCase(),
      start,
      end,
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
        endpoint: '/api/businessdays'
      }
    });

  } catch (error) {
    console.error('Error in /api/businessdays:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
