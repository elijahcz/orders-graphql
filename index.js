const http = require('http');
require('dotenv').config();

const express = require('express');
const app = express();

const { mongoConnect } = require('./src/services/mongo');
const { start } = require('repl');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    
    server.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
    });
}

startServer();