const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 8162;
const parts = require('./routes/parts.js');

app.get('/', (req, res) => {
    res.send('MUST BE CHANGED TO A STATIC FILE');
});

app.use("/parts", parts);

app.listen(port, () => {
    console.log(`Successfully running on port: ${port}`);
});
