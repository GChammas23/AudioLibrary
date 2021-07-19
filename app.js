const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//SETUP MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Require and use routes needed
const categoryRoute = require("./routes/category.routes");
app.use("/api/categories", categoryRoute);

const albumRoutes = require("./routes/album.routes");
app.use("/api/albums", albumRoutes);

//CREATE SERVER
const server = http.createServer(app);
const PORT = 3001;

//ADD LISTENER TO PORT
mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
