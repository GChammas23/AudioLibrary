//Require services file for DB logic
const services = require("./track.services");

//ADD TRACK API
exports.addTrack = async (req, res) => {
  //Create track object from values in request
  const track = {
    name: req.body.name,
    singer: req.body.singer,
    categoryId: req.params.categoryId,
    albumId: req.params.albumId,
  };

  try {
    const result = await services.addTrack(track);

    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET ALL TRACKS API
exports.getAllTracks = async (req, res) => {
  try {
    const result = await services.getAllTracks();

    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET TRACK BY SINGER API
exports.getTrackBySinger = async (req, res) => {
  try {
    const result = await services.getTrackBySinger(req.params.singer);

    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//UPDATE TRACK API
exports.updateTrackById = async (req, res) => {
  //Create a updatedValues object to send
  const updatedValues = {
    name: req.body.name,
    singer: req.body.singer,
    categoryId: req.body.categoryId,
    albumId: req.body.albumId,
  };

  try {
    const result = await services.updateTrackById(updatedValues, req.params.id);

    if (result == 200) {
      res.end();
    } else {
      res.status(result).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

//DELETE TRACK API
exports.deleteTrackById = async (req, res) => {
  try {
    const result = await services.deleteTrackById(req.params.id);

    if (result == 200) {
      res.end();
    } else {
      res.status(result).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSortedTracksByCategory = async (req, res) => {
  //Create parameters object to send to service function
  let parameters = {
    albumId: req.params.albumId,
  };

  if (Object.keys(req.query).length > 0) {
    parameters.categoryId = req.query[Object.keys(req.query)[0]];
  }

  try {
    const result = await services.getSortedTrackByCategory(parameters);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
