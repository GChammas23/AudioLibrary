//Set express router for route
const express = require("express");
const router = express.Router();

//Require album services to access methods
const albums = require("../controllers/album.controller");

router.post('/', albums.addAlbum);
router.get('/', albums.getAlbums);
router.get('/getNbOfTracks', albums.getNbOfTracks);
router.get('/:id', albums.getAlbumById);
router.put('/:id', albums.updateAlbumById);
router.delete('/:id', albums.deleteAlbumById);

module.exports = router;