//Set express router for route
const express = require("express");
const router = express.Router();

//Require track services to access methods
const tracks = require("../controllers/track.controller");

router.post('/addTrack', tracks.addTrack);

module.exports = router;