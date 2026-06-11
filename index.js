require('dotenv').config();

const http = require('http');
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');

const { mongoConnect } = require('./src/services/mongo');
const graphQLSchema = require("./src/schemas/schemas.graphql");

const app = express();

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