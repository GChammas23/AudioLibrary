//Require services file for DB logic and sender middleware
const services = require("./track.services");
const sender = require("../middleware/responseSender");

//ADD TRACK API
exports.addTrack = async (req, res, next) => {
  //Create track object from values in request
  const track = {
    name: req.body.name,
    singer: req.body.singer,
    categoryId: req.params.categoryId,
    albumId: req.params.albumId,
  };

  try {
    const result = await services.addTrack(track);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET ALL TRACKS API
exports.getAllTracks = async (req, res, next) => {
  try {
    const result = await services.getAllTracks();

    req.result = result; //Add result to request

  sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET TRACK BY SINGER API
exports.getTrackBySinger = async (req, res, next) => {
  try {
    const result = await services.getTrackBySinger(req.params.singer);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

//UPDATE TRACK API
exports.updateTrackById = async (req, res, next) => {
  //Create a updatedValues object to send
  const updatedValues = {
    name: req.body.name,
    singer: req.body.singer,
    categoryId: req.body.categoryId,
    albumId: req.body.albumId,
  };

  try {
    const result = await services.updateTrackById(updatedValues, req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

//DELETE TRACK API
exports.deleteTrackById = async (req, res, next) => {
  try {
    const result = await services.deleteTrackById(req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSortedTracksByCategory = async (req, res, next) => {
  //Create parameters object to send to service function
  let parameters = {
    albumId: req.params.albumId,
  };

  if (Object.keys(req.query).length > 0) {
    parameters.categoryName = req.query.category;
    parameters.page = parseInt(req.query.page);
    parameters.limit = parseInt(req.query.limit);
  }

  try {
    const result = await services.getSortedTrackByCategory(parameters);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};
