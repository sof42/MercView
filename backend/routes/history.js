const express = require('express');
const history = express.Router();
const db = require('../DB/dbConn.js');

history.get('/', async (req, res) => {
    try {
        const queryResult = await db.displayHistory();
        res.json(queryResult);
    } catch (error) {
        console.error("Error fetching parts:", error);
        res.status(500).json({ error: "An error occurred while fetching parts" });
    }
});

history.get('/:part_number', async (req, res) => {
    const partNumber = req.params.part_number;
  
    try {
      const history = await db.getPartHistory(partNumber);
      if (history.length > 0) {
        res.json(history);
      } else {
        res.status(404).json({ message: "No history found for this part" });
      }
    } catch (error) {
      console.error("Error fetching part history:", error);
      res.status(500).json({ error: "An error occurred while fetching part history" });
    }
  });

module.exports = history;