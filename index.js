require('dotenv').config();
const express = require("express");
const cors = require("cors");
require('./config/dbConnection');
const router = require('./routes/router');

const crmappServer = express();

// ✅ CORS Setup with options
crmappServer.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

crmappServer.use(express.json());
crmappServer.use(router);
crmappServer.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
crmappServer.listen(PORT, () => {
    console.log(`crmappServer running at ${PORT}`);
});

// Default route
crmappServer.get("/", (req, res) => {
    res.status(200).send(`<h1>crmappServer started</h1>`);
});