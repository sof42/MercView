const express = require('express');
const { title } = require('process');
const users = express.Router();
const db = require('../DB/dbConn.js')

users.get('/', async (req, res, next) => {
    try {
        var queryResult=await db.allUsers();
        res.json(queryResult)

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


module.exports = users;