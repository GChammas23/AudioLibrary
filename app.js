const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");

//Require the validation error from express-validation
const { ValidationError } = require("express-validation");

//Setup dotenv
require("dotenv").config();

//Require config file
const config = require("./configs/config");


//SETUP MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//Require and use routes needed
const categoryRoute = require("./Category/category.routes");
app.use("/api/category", categoryRoute);

const albumRoutes = require("./Album/album.routes");
app.use("/api/album", albumRoutes);

const trackRoutes = require("./Track/track.routes");
app.use("/api/track", trackRoutes);

const userRoutes = require("./User/user.routes");
app.use("/api/auth", userRoutes);

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).send({ error: err.details[0] });
  }
});


//CREATE SERVER
const PORT = config.server.port;

//ADD LISTENER TO PORT
mongoose
  .connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Listening on port ${PORT}`)
    );

    const io = new Server(server);

    io.on('connection', (socket) => {
      console.log(`Client with id: ${socket.id} connected`);
    })
  })
  .catch((err) => console.log(err));
