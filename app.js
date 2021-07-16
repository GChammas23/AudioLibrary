const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//SETUP MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CREATE SERVER
const server = http.createServer(app);
const PORT = 3001;

//ADD LISTENER TO PORT
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
