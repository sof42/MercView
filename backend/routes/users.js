const express = require('express');
const users = express.Router();
const db = require('../DB/dbConn.js');
const session = require('express-session');

users.use(session({
    secret: "secretpassword",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000 // Session expires in 10 minutes
    }
}));

// Endpoint to get all users
users.get('/', async (req, res) => {
    try {
        const queryResult = await db.allUsers();
        res.json(queryResult);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Endpoint for user login
users.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please enter both username and password.' });
    }

    try {
        const user = await db.AuthUser(username);

        if (user && user.length > 0) {
            if (password === user[0].password) {
                req.session.userId = user[0].id;
                req.session.username = user[0].username;

                res.json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Endpoint for logout
users.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'Logout successful' });
    });
});

module.exports = users;
