//Set express router for route
const express = require("express");
const router = express.Router();

//Require album services to access methods
const albums = require("../controllers/album.controller");

router.post('/addAlbum', albums.addAlbum);
router.get('/getAlbums', albums.getAlbums);
router.get('/getNbOfTracks', albums.getNbOfTracks);
router.post('/getAlbumById', albums.getAlbumById);
router.put('/updateAlbumById', albums.updateAlbumById);
router.delete('/deleteAlbum', albums.deleteAlbumById);

module.exports = router;