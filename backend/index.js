const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files
app.use(cookieParser()); // Parse cookies

app.use(express.json()); // Parse JSON bodies

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({
    origin: 'http://88.200.63.148:8163', // frontend location
    credentials: true
}));

// Session middleware
let sess = {
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}

app.use(session(sess))

const port = process.env.PORT || 8162;
const parts = require('./routes/parts.js');
const users = require('./routes/users.js');
const models = require('./routes/models.js');
const history = require('./routes/history.js');
const reports = require('./routes/reports.js');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use("/parts", parts);
app.use("/users", users);
app.use("/models", models);
app.use("/history", history);
app.use("/reports", reports);

app.listen(port, () => {
    console.log(`Successfully running on port: ${port}`);
});
