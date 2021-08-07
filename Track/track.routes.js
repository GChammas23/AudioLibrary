//Set express router for route
const express = require("express");
const router = express.Router();

//Require track services to access methods
const tracks = require("./track.controller");

//Require authentication middleware
const tokenCheck = require("../middleware/checkToken");

router.post("/:albumId/:categoryId", tracks.addTrack);
router.get("/", tracks.getAllTracks);
router.get("/:albumId", tokenCheck ,tracks.getSortedTracksByCategory); //Authenticated api
router.get("/getTrackBySinger/:singer", tracks.getTrackBySinger);
router.delete("/:id", tracks.deleteTrackById);
router.put("/:id", tracks.updateTrackById);

module.exports = router;
