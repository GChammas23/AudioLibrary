//Set express router for route
const express = require("express");
const router = express.Router();

//Require album services to access methods
const albums = require("../controllers/album.controller");

router.post('/addAlbum', albums.addAlbum);
router.get('/getAlbums', albums.getAlbums);
router.post('/getAlbumById', albums.getAlbumById);
router.post('/updateAlbum', albums.updateAlbumById);
router.delete('/deleteAlbum', albums.deleteAlbumById);

module.exports = router;