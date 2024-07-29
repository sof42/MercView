const express = require('express');
const { title } = require('process');
const users = express.Router();
const db = require('../DB/dbConn.js')


users.get('/', async (req, res, next) => {
    try {
        var queryResult = await db.allUsers();
        res.json(queryResult);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

users.post('/login', async (req, res) => {
    let [username, password] = req.body;
    let isUserComplete = username && password;
    if(isUserComplete){
        try {
            let queryResult = await db.authUser(username);
            if(queryResult>0){
                if(password===queryResult[0].password){
                    console.log(queryResult);
                    console.log("User found");
                    res.sendStatus(200);
                }else{
                    console.log("Password incorrect");
                }
            }else{
                console.log("User not found");
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            
        }
    }else{
        console.log("Enter username AND password");
    }
    res.end();
});

module.exports = users;

