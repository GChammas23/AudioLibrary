//Require services file for DB logic
const services = require("./track.services");

//ADD TRACK API
exports.addTrack = async (req, res) => {
  try {
    const result = await services.addTrack(req);
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
    const result = await services.getTrackBySinger(req);
    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//UPDATE TRACK API
exports.updateTrackById = async (req, res) => {
  try {
    const result = await services.updateTrackById(req);
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
    const result = await services.deleteTrackById(req);

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
  try {
    const result = await services.getSortedTrackByCategory(req);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
