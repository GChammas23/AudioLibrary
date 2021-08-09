//Set express router for route and express-validation for validation
const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

//Require track services to access methods
const tracks = require("./track.controller");

//Require track schema for validation
const validation = require("./track.validation");

//Require authentication middleware
const tokenCheck = require("../middleware/checkToken");

router.post(
  "/:albumId/:categoryId",
  validate(validation.trackSchema, { keyByField: true }, {}),
  tracks.addTrack
);
router.get("/", tracks.getAllTracks);
router.get("/:albumId", tokenCheck, tracks.getSortedTracksByCategory); //Authenticated api
router.get("/getTrackBySinger/:singer", tracks.getTrackBySinger);
router.delete("/:id", tracks.deleteTrackById);
router.put("/:id", tracks.updateTrackById);

module.exports = router;
