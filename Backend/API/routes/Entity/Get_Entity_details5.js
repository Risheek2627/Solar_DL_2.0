const express = require('express');
const pool = require('../../db');
const router = express.Router();

router.get('/get_entity_details5', async (req, res) => {
  const { country, region } = req.query;

  if (!country || !region) {
    return res.status(400).json({ message: 'Both country and region parameters are required' });
  }

  try {
    const [rows] = await pool.query(`
      SELECT * 
      FROM EntityMaster 
      WHERE mark_deletion = 0 AND country = ? AND region = ?
    `, [country, region]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No active entities found for the specified country and region' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching entity details by country and region:', error);
    res.status(500).json({ message: 'Error fetching entity details', error: error.message });
  }
});

module.exports = router;
