//Set express router for route
const express = require("express");
const router = express.Router();

//Require track services to access methods
const tracks = require("../controllers/track.controller");

//Require authentication middleware
const tokenCheck = require("../middleware/checkToken");

router.post("/track", tracks.addTrack);
router.get("/track", tracks.getAllTracks);
router.get("/track/:albumId", tokenCheck ,tracks.getSortedTracksByCategory); //Authenticated api
router.post("/track/getTrackBySinger", tracks.getTrackBySinger);
router.delete("/track/:id", tracks.deleteTrackById);
router.put("/track/:id", tracks.updateTrackById);

module.exports = router;
