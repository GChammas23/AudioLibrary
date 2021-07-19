//Require track model to use it
const Track = require("../model/track");

//ADD TRACK API
exports.addTrack = (req, res) => {
  //Extract values from request
  const { name } = req.body;
  const { singer } = req.body;
  const { category } = req.body; //Represents category object in request
  const { album } = req.body; //Represents album object in request

  //Check for any missing input that is required
  if (
    name === undefined ||
    singer === undefined ||
    category === undefined ||
    album === undefined
  ) {
    res
      .status(400)
      .send({ message: "Please make sure to enter all information needed!" });
  } else {
    const track = new Track({
      name: name,
      singer: singer,
      categoryId: category._id,
      albumId: album._id,
    });

    track
      .save()
      .then((result) => {
        res
          .status(200)
          .send({ message: "Track successfully added!", result: result });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error occured while trying to add the track!",
          error: err,
        });
      });
  }
};

//GET ALL TRACKS API
exports.getAllTracks = (req, res) => {
  Track.find()
    .then((result) => {
      res
        .status(200)
        .send({ message: "Tracks fetched successfully!", tracks: result });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error while trying to fetch tracks", error: err });
    });
};

//GET TRACK BY ID API
exports.getTrackById = (req, res) => {
  //Get id from request
  const { _id } = req.body;

  Track.findById(_id)
    .then((result) => {
      res
        .status(200)
        .send({ message: "Track successfully fetched!", track: result });
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: "Error occured while trying to fetch the track",
          error: err,
        });
    });
};

//DELETE TRACK API
exports.deleteTrackById = (req, res) => {
  //Get track id from request
  const { _id } = req.body;

  //Delete track by id and return response
  Track.findOneAndDelete(_id)
    .then((result) => {
      res
        .status(200)
        .send({ message: "Track successfully deleted!", result: result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to delete the track",
        error: err,
      });
    });
};
