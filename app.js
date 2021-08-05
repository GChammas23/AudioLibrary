const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//Setup dotenv
require("dotenv").config();

//SETUP MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//Require and use routes needed
const categoryRoute = require("./routes/category.routes");
app.use("/api/category", categoryRoute);

const albumRoutes = require("./routes/album.routes");
app.use("/api/album", albumRoutes);

const trackRoutes = require("./routes/track.routes");
app.use("/api/track", trackRoutes);

const userRoutes = require("./routes/user.routes");
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
