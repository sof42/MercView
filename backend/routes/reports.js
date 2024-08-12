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

reports.get('/all', async (req, res) => {
    try {
        const reports = await db.getAllReports();
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

reports.get('/download/:id', async (req, res) => {
    const reportId = req.params.id;

    try {
        const report = await db.getReportById(reportId);
        if (report) {
            res.setHeader('Content-Disposition', `attachment; filename=report_${reportId}.bin`);
            res.setHeader('Content-Type', 'application/octet-stream');
            res.status(200).send(report.report_data);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        console.error("Error fetching report data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = reports;
