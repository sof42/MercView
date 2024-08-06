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

users.get("/login", (req, res) => {
    if(req.session.user){
        res.send({
            loggedIn:true,
            user:req.session.user
        })
    }else
    {
        res.send({
            loggedIn:false
        });
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
                req.session.userId = user[0].employee_id;
                req.session.username = user[0].username;
                req.session.roleId = user[0].role_id;
                req.session.firstName = user[0].first_name;
                req.session.lastName = user[0].last_name;
                console.log(req.session);
                res.json({ 
                    message: 'Login successful', 
                    roleId: user[0].role_id, // Include role id in response
                    userId: user[0].employee_id,// Include user id in response
                    firstName: user[0].first_name,
                    lastName: user[0].last_name
                });
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

//Endpoint for adding users
users.post('/add', async (req, res) => {
    const { username, password, role_id, first_name, last_name } = req.body;

    // Validate that role_id is a number
    if (!username || !password || !role_id || !first_name || !last_name || isNaN(role_id)) {
        return res.status(400).json({ message: 'Please provide valid username, password, role ID (as integer), first name, and last name.' });
    }

    try {
        const newUser = await db.addUser(parseInt(role_id), first_name, last_name, username, password);
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

users.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await db.getUserById(userId);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Endpoint to remove a user
users.delete('/remove/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await db.removeUser(userId);

        // Check if any rows were affected by the delete operation
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User removed successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal Server Error
    }
});

// Endpoint to edit a user profile
users.put('/edit/:userId', async (req, res) => {
    const { userId } = req.params;
    const { username, firstName, lastName, password } = req.body;
  
    try {
      const result = await db.editUser(username, password, firstName, lastName, userId);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });





module.exports = users;
