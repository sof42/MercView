const express = require('express');
const { title } = require('process');
const models = express.Router();
const db = require('../DB/dbConn.js')

models.get('/', async (req, res, next) => {
    try {
        var queryResult = await db.allModels();
        res.json(queryResult);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

models.get('/:id', async (req, res, next) => {
    try {
        var queryResult = await db.oneModel(req.params.id);
        res.json(queryResult);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

models.post("/insert", async (req, res, next) => {
    try {
        const car_model_name = req.body.car_model_name;

        if (!car_model_name) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if the car model already exists
        const existingModel = await db.checkCarModelExists(car_model_name);

        if (existingModel) {
            return res.status(409).json({ message: "Car model already exists" });
        }

        // Insert the new car model
        const queryResult = await db.insertCarModel(car_model_name);
        
        if (queryResult.car_model_id) {
            res.status(201).json({ message: "Car model successfully added", car_model_id: queryResult.car_model_id });
        } else {
            res.status(500).json({ error: "Failed to add car model" });
        }
    } catch (err) {
        console.error("Error adding car model:", err);
        res.status(500).json({ error: "An error occurred while adding the car model" });
    }
});


models.delete("/remove/:car_model_id", async (req, res, next) => {
    try {
        const car_model_id = req.params.car_model_id;
        const queryResult = await db.deleteCarModel(car_model_id);

        if (queryResult.affectedRows) {
            res.status(200).json({ message: "Car model successfully deleted" });
        } else {
            res.status(404).json({ message: "Car model not found" });
        }
    } catch (err) {
        console.error("Error deleting car model:", err);
        res.status(500).json({ message: "An error occurred while deleting the car model" });
    }
});




module.exports = models;