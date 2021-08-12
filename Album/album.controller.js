//Require service functions
const services = require("./album.services");

//Add album API
exports.addAlbum = async (req, res, next) => {
  //Create new album object to send to service function
  const album = {
    name: req.body.name,
    description: req.body.description,
    showNbOfTracks: req.body.showNumbOfTracks,
    createdDate: new Date(),
  };

  try {
    const result = await services.addAlbum(album);

    req.result = result;

    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

//Get all albums from DB API
exports.getAlbums = async (req, res, next) => {
  //Get all albums from DB
  try {
    const result = await services.getAlbums();

    req.result = result;
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

//Get specific album
exports.getAlbumById = async (req, res, next) => {
  try {
    const result = await services.getAlbumById(req.params.id);

    req.result = result;

    next(); //Move to response middleware
  } catch (err) {
    throw new Error(err.message); //Error while fetching album
  }
};

//Update album API
exports.updateAlbumById = async (req, res, next) => {
  //Create object for new values
  const updatedValues = {
    name: req.body.name,
    description: req.body.description,
    showNbOfTracks: req.body.showNumberOfTracks,
    updatedDate: new Date(),
  };

  try {
    const result = await services.updateAlbumById(updatedValues, req.params.id);

    req.result = result;

    next();
  } catch (err) {
    throw new Error(err.message); //Error occurred in find
  }
};

exports.deleteAlbumById = async (req, res, next) => {
  try {
    const result = await services.deleteAlbumById(req.params.id);

    req.result = result;

    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET NUMBER OF TRACKS FOR ALL ALBUMS
exports.getNbOfTracks = async (req, res, next) => {
  try {
    const result = await services.getNbOfTracks();

    req.result = result;

    next();
  } catch (err) {
    throw new Error(err.message);
  }
};
