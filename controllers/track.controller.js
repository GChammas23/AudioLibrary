//Require track & album models to use
const Track = require("../model/track");
const Album = require("../model/album");

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
    //Create track object to save
    const track = new Track({
      name: name,
      singer: singer,
      categoryId: category._id,
      albumId: album._id,
    });

    //Save the created object in DB
    track
      .save()
      .then((result) => {
        res
          .status(200)
          .send({ message: "Track successfully added!", result: result });
      })
      .catch((err) => {
        //ERROR CASE
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

//GET TRACK BY SINGER API
exports.getTrackBySinger = (req, res) => {
  //Get id from request
  const { albumSinger } = req.body;

  //Invalid input case
  if (albumSinger === undefined) {
    res.status(400).send({ message: "Please make sure to specify a singer!" });
  } else {
    //Use aggregate to find songs with singer as albumSinger sent
    Track.aggregate([{ $match: { singer: albumSinger } }])
      .then((docs) => {
        if (docs.length === 0) {
          //NO RESULTS FOUND
          res.status(404).send({
            message: "No tracks with the specified singer were found",
          });
        } else {
          res
            .status(200)
            .send({ message: "Tracks successfully fetched!", tracks: docs });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error occured while trying to fetch the tracks",
          error: err,
        });
      });
  }
};

//UPDATE TRACK API
exports.updateTrackById = (req, res) => {
  //Get new values from request
  const { newName } = req.body;
  const { newSinger } = req.body;
  const { newCategory } = req.body; //new catgeory object
  const { newAlbum } = req.body; //new album object
  const { _id } = req.body;

  if (
    newName === undefined &&
    newSinger === undefined &&
    newCategory === undefined &&
    newAlbum === undefined
  ) {
    res
      .status(400)
      .send({ message: "No new value was sent. No update needed" });
  } else {
    //Find the track by its id and update it with the new values
    Track.findById(_id).then((object) => {
      //Update fields only if new values are provided
      if (newName) object.name = newName;
      if (newSinger) object.singer = newSinger;
      if (newCategory) object.categoryId = newCategory._id;
      if (newAlbum) object.albumId = newAlbum._id;

      Album.findById(object.albumId)
        .then((album) => {
          album.updatedDate = new Date();

          album
            .save()
            .then(() => {
              //Save the new object and return a response
              object
                .save()
                .then((result) => {
                  res.status(200).send({
                    message: "Track successfully updated!",
                    result: result,
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message: "Error while trying to update the track",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not update album related to track",
                error: err,
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              "Error occured while trying to fetch album related to the song",
            error: err,
          });
        });
    });
  }
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
