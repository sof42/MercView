const express = require('express');
const { title } = require('process');
const parts = express.Router();
const db = require('../DB/dbConn.js')

parts.get('/', async (req, res, next) => {
    try {
        var queryResult = await db.allParts();
        res.json(queryResult);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

parts.get('/:id', async (req, res, next) => {
    try {
        var queryResult = await db.onePart(req.params.id);
        res.json(queryResult);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//insert a new part
parts.post("/", async (req, res, next) => {
    try {
        // Extract data from request body
        const part_number = req.body.part_number;
        const part_description = req.body.part_description;
        const quantity = req.body.quantity;
        const country_of_origin = req.body.country_of_origin;
        const euro_price_per_unit = req.body.euro_price_per_unit;
        const weight_per_unit_kg = req.body.weight_per_unit_kg;


        // Check if all required fields are present
        const isCompletePart = part_number && part_description && quantity && country_of_origin && euro_price_per_unit && weight_per_unit_kg;

        if (isCompletePart) {
            // Add the product to the database
            const queryResult = await db.insertPart(part_number, part_description, quantity, ountry_of_origin, euro_price_per_unit, weight_per_unit_kg);

            if (queryResult.affectedRows) {
                res.status(201).json({ message: "Product successfully added" });
            } else {
                res.status(500).json({ error: "Failed to add product" });
            }
        } else {
            res.status(400).json({ error: "Missing required fields" });
        }
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ error: "An error occurred while adding the product" });
    }
});

//edit part info
parts.put("/:part_number", async (req, res, next) => {
    const part_number = req.params.part_number;
    const part_description = req.body.part_description;
    const quantity = req.body.quantity;
    const country_of_origin = req.body.country_of_origin;
    const euro_price_per_unit = req.body.euro_price_per_unit;
    const weight_per_unit_kg = req.body.weight_per_unit_kg;

    const isCompletePart = part_number && part_description && quantity && country_of_origin && euro_price_per_unit && weight_per_unit_kg;


    if (isCompletePart) {
        try {
            const queryResult = await db.editPart(part_number, part_description, quantity, country_of_origin, euro_price_per_unit, weight_per_unit_kg);

            if (queryResult.affectedRows) {
                res.status(200).json({ message: "Part successfully updated" });
            } else {
                console.log("No rows affected");
                res.status(404).json({ message: "No rows affected" }); // Not found if no rows are affected
            }
        } catch (err) {
            res.status(500).json({ message: "An error occurred while editing the part" });
        }
    } else {
        res.status(400).json({ message: "Missing required fields" });
    }
});


module.exports = parts;