const http = require('http');
require('dotenv').config();

const express = require('express');
const app = express();

const { mongoConnect } = require('./src/services/mongo');
const { createHandler } = require('graphql-http/lib/use/express');

const graphQLSchema = require("./src/schemas/schemas.graphql");

const PORT = process.env.PORT || 8000;

app.use("/graphql", createHandler({ schema: graphQLSchema }));

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    
    server.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
    });
}

startServer();