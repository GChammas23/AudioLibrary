const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//Setup dotenv
require("dotenv").config();

//SETUP MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

//CREATE SERVER
const PORT = 3001;

//ADD LISTENER TO PORT
mongoose
  .connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
