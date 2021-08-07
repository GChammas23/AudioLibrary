//Require services file for DB logic
const services = require("./track.services");

//ADD TRACK API
exports.addTrack = async (req, res) => {
  try {
    const result = await services.addTrackService(req, res);
    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET ALL TRACKS API
exports.getAllTracks = async (req, res) => {
  try {
    const result = await services.getTracksService(req, res);
    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET TRACK BY SINGER API
exports.getTrackBySinger = async (req, res) => {
  try {
    const result = await services.getTrackBySingerService(req, res);
    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//UPDATE TRACK API
exports.updateTrackById = async (req, res) => {
  try {
    const result = await services.updateTrackByIdService(req, res);
    if (result) {
      res.end();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

//DELETE TRACK API
exports.deleteTrackById = async (req, res) => {
  try {
    const result = await services.deleteTrackByIdService(req, res);

    if (result) {
      res.end();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getSortedTracksByCategory = async (req, res) => {
  try {
    const result = await services.getSortedTrackService(req, res);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
