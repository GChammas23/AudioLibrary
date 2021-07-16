const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
