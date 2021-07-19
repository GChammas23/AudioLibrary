//Set express router for route
const express = require("express");
const router = express.Router();

//Require track services to access methods
const tracks = require("../controllers/track.controller");

router.post('/addTrack', tracks.addTrack);
router.get('/getTracks', tracks.getAllTracks);
router.post('/getTrackById', tracks.getTrackById);
router.delete('/deleteTrackById', tracks.deleteTrackById);

module.exports = router;