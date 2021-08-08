//Require service functions
const services = require("./album.services");

//Add album API
exports.addAlbum = async (req, res) => {
  //Invalid input case
  if (!req.body.name) {
    res
      .status(400)
      .send({ message: "Please make sure to give a name to the album!" });
  } else {
    try {
      const result = await services.addAlbumService(req, res);
      if (result) {
        res.status(200).send({ result: result });
      } else {
        res.status(400).send();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

//Get all albums from DB API
exports.getAlbums = async (req, res) => {
  //Get all albums from DB
  try {
    const result = await services.getAlbumsService(req, res);

    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//Get specific album
exports.getAlbumById = async (req, res) => {
  try {
    const result = await services.getAlbumByIdService(req, res);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message); //Error while fetching album
  }
};

//Update album API
exports.updateAlbumById = async (req, res) => {
  //Find the album first
  try {
    const result = await services.updateAlbumByIdService(req, res);

    if (result == 200) {
      res.end();
    } else {
      res.status(result).send();
    }
  } catch (err) {
    throw new Error(err.message); //Error occurred in find
  }
};

exports.deleteAlbumById = async (req, res) => {
  try {
    const result = await services.deleteAlbumByIdService(req, res);

    if (result == 200) {
      res.end();
    } else {
      res.status(result).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET NUMBER OF TRACKS FOR ALL ALBUMS
exports.getNbOfTracks = async (req, res) => {
  try {
    const result = await services.getNbOfTracksService(req, res);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
