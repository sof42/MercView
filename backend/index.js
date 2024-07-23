const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8162;
const users = require('./routes/users.js');

app.get('/', (req, res) => {
    res.send('MUST BE CHANGED TO A STATIC FILE');
});

app.use("/users", users);

app.listen(port, () => {
    console.log(`Successfully running on port: ${port}`);
});
