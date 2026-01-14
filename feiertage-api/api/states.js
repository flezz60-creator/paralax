const { getStates } = require('../lib/holidays');

/**
 * GET /api/states
 *
 * Query params:
 * - country: de, at, ch (required)
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
    const { country } = req.query;

    if (!country) {
      return res.status(400).json({
        error: 'Missing required parameter: country',
        usage: 'GET /api/states?country=de'
      });
    }

    if (!['de', 'at', 'ch'].includes(country.toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid country code. Supported: de, at, ch'
      });
    }

    const result = getStates(country.toLowerCase());

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      data: result,
      meta: {
        requestedAt: new Date().toISOString(),
        endpoint: '/api/states'
      }
    });

  } catch (error) {
    console.error('Error in /api/states:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
