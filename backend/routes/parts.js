const express = require('express');
const parts = express.Router();
const db = require('../DB/dbConn.js');

// Get all parts
parts.get('/', async (req, res) => {
    try {
        const queryResult = await db.allParts();
        res.json(queryResult);
    } catch (error) {
        console.error("Error fetching parts:", error);
        res.status(500).json({ error: "An error occurred while fetching parts" });
    }
});

// Get a single part by ID
parts.get('/:part_number', async (req, res) => {
    try {
        const part_number = req.params.part_number;
        const queryResult = await db.onePart(part_number);

        if (queryResult) {
            res.json(queryResult);
        } else {
            res.status(404).json({ error: "Part not found" });
        }
    } catch (error) {
        console.error("Error fetching part:", error);
        res.status(500).json({ error: "An error occurred while fetching the part" });
    }
});

// Insert a new part
parts.post('/insert', async (req, res) => {
    try {
        const { part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg } = req.body;

        if (!part_description || !quantity || !country_of_origin || !euro_price_per_unit || !weight_per_unit_kg) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const queryResult = await db.insertPart(part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg);

        if (queryResult.part_number) {
            // Log the part addition
            await db.logPartHistory({
                part_number: queryResult.part_number,
                old_part_description: null,
                old_quantity: null,
                old_country_of_origin: null,
                old_euro_price_per_unit: null,
                old_weight_per_unit_kg: null,
                new_part_description: part_description,
                new_quantity: quantity,
                new_country_of_origin: country_of_origin,
                new_euro_price_per_unit: euro_price_per_unit,
                new_weight_per_unit_kg: weight_per_unit_kg
            }, 'ADD'); // Provide action_type 'ADD'

            res.status(201).json({ message: "Part successfully added", part_number: queryResult.part_number });
        } else {
            res.status(500).json({ error: "Failed to add part" });
        }
    } catch (err) {
        console.error("Error adding part:", err);
        res.status(500).json({ error: "An error occurred while adding the part" });
    }
});

// Delete a part
parts.delete('/remove/:part_number', async (req, res) => {
  try {
      const part_number = req.params.part_number;

      // Fetch the part details before deletion
      const partDetails = await db.onePart(part_number);

      if (!partDetails) {
          return res.status(404).json({ error: "Part not found" });
      }

      // Log the part removal with old details
      await db.logPartHistory({
          part_number,
          old_part_description: partDetails.part_description,
          old_quantity: partDetails.quantity,
          old_country_of_origin: partDetails.country_of_origin,
          old_euro_price_per_unit: partDetails.euro_price_per_unit,
          old_weight_per_unit_kg: partDetails.weight_per_unit_kg,
          new_part_description: null,
          new_quantity: null,
          new_country_of_origin: null,
          new_euro_price_per_unit: null,
          new_weight_per_unit_kg: null
      }, 'REMOVE');

      // Now, delete the part
      const deleteResult = await db.deletePart(part_number);

      if (deleteResult.affectedRows) {
          res.status(200).json({ message: "Part successfully deleted" });
      } else {
          res.status(404).json({ message: "Part not found or already deleted" });
      }
  } catch (err) {
      console.error("Error deleting part:", err);
      res.status(500).json({ error: "An error occurred while deleting the part" });
  }
});

//edit a part
parts.put('/edit/:part_number', async (req, res) => {
  const part_number = req.params.part_number;
  const { part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg } = req.body;

  if (!part_number || !part_description || !quantity || !country_of_origin || !euro_price_per_unit || !weight_per_unit_kg) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  try {
      // Fetch old part details before update
      const oldPartResults = await db.onePart(part_number);

      // Ensure oldPartResults is an array and has at least one element
      if (!oldPartResults || oldPartResults.length === 0) {
          return res.status(404).json({ error: "Part not found" });
      }

      // Extract the first element from the results array
      const oldPartDetails = oldPartResults[0];

      console.log("Old Part Details:", oldPartDetails);

      // Perform the update
      const queryResult = await db.editPart(part_number, part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg);

      if (queryResult.affectedRows) {
          // Log the part update with old and new details
          await db.logPartHistory({
              part_number,
              old_part_description: oldPartDetails.part_description,
              old_quantity: oldPartDetails.quantity,
              old_country_of_origin: oldPartDetails.country_of_origin,
              old_euro_price_per_unit: oldPartDetails.euro_price_per_unit,
              old_weight_per_unit_kg: oldPartDetails.weight_per_unit_kg,
              new_part_description: part_description,
              new_quantity: quantity,
              new_country_of_origin: country_of_origin,
              new_euro_price_per_unit: euro_price_per_unit,
              new_weight_per_unit_kg: weight_per_unit_kg
          }, 'UPDATE'); // Provide action_type 'UPDATE'

          res.status(200).json({ message: "Part successfully updated" });
      } else {
          res.status(404).json({ message: "Part not found or update failed" });
      }
  } catch (err) {
      console.error("Error updating part:", err);
      res.status(500).json({ error: "An error occurred while updating the part" });
  }
});


module.exports = parts;
