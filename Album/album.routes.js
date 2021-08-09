//Set express router for route
const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

//Require album services to access methods
const albums = require("./album.controller");

//Require album schema for validation
const validation = require("./album.validation");

router.post(
  "/",
  validate(validation.albumSchema, {context: true, keyByField: true }, {}),
  albums.addAlbum
);
router.get("/", albums.getAlbums);
router.get("/getNbOfTracks", albums.getNbOfTracks);
router.get("/:id", albums.getAlbumById);
router.put("/:id", albums.updateAlbumById);
router.delete("/:id", albums.deleteAlbumById);

module.exports = router;
