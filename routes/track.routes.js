//Set express router for route
const express = require("express");
const router = express.Router();

//Require track services to access methods
const tracks = require("../controllers/track.controller");

router.post("/addTrack", tracks.addTrack);
router.get("/getTracks", tracks.getAllTracks);
router.post("/getTrackBySinger", tracks.getTrackBySinger);
router.delete("/deleteTrackById/:id", tracks.deleteTrackById);
router.put("/updateTrackById", tracks.updateTrackById);

module.exports = router;
