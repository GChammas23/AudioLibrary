//Set express router for route
const express = require("express");
const router = express.Router();

//Require album services to access methods
const albums = require("../controllers/album.controller");

router.post('/album', albums.addAlbum);
router.get('/album', albums.getAlbums);
router.get('/album/getNbOfTracks', albums.getNbOfTracks);
router.get('/album/:id', albums.getAlbumById);
router.put('/album/:id', albums.updateAlbumById);
router.delete('/album/:id', albums.deleteAlbumById);

module.exports = router;