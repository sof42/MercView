const express = require('express');
const reports = express.Router();
const db = require('../DB/dbConn.js');
const multer = require('multer');
const upload = multer(); // For handling multipart/form-data

// POST route to save a report with PDF data
reports.post('/save', upload.single('report_data'), async (req, res) => {
    const { employee_id, report_name } = req.body;

    if (!req.file) {
        console.error("No file uploaded.");
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const report_data = req.file.buffer;

    try {
        await db.saveReport(employee_id, report_name, report_data);
        res.status(201).json({ message: 'Report saved successfully!' });
    } catch (error) {
        console.error("Error saving report:", error);
        res.status(500).json({ message: 'Error saving report.' });
    }
});


module.exports = reports;
