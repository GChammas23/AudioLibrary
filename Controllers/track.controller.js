//Require track & album & category models to use
const Track = require("../Models/track");
const Album = require("../Models/album");
const Category = require("../Models/category");

//ADD TRACK API
exports.addTrack = async (req, res) => {
  //Check for any missing input that is required
  if (
    req.body.name === undefined ||
    req.body.singer === undefined
  ) {
    res
      .status(400)
      .send({ message: "Please make sure to enter all information needed!" });
  } else {
    //Create track object to save
    const track = new Track({
      name: req.body.name,
      singer: req.body.singer,
      categoryId: req.params.categoryId,
      albumId: req.params.albumId,
    });

    //Save the created object in DB
    try {
      const result = await track.save();
      res.status(200).send({ track: result });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};

//GET ALL TRACKS API
exports.getAllTracks = async (req, res) => {
  try {
    const result = await Track.find();

    res.status(200).send({ result: result });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//GET TRACK BY SINGER API
exports.getTrackBySinger = async (req, res) => {
  //Invalid input case
  if (!req.body.singer) {
    res.status(400).send();
  } else {
    //Find the album with the specified singer
    const result = await Track.find({ singer: req.body.singer });

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  }
};

//UPDATE TRACK API
exports.updateTrackById = async (req, res) => {
  //Get id from url
  const { id } = req.params;

  if (
    req.body.name === undefined &&
    req.body.singer === undefined &&
    req.body.category === undefined &&
    req.body.newAlbum === undefined
  ) {
    res
      .status(400)
      .send({ message: "No new value was sent. No update needed" });
  } else {
    //Find the track by its id and update it with the new values
    try {
      const track = await Track.findById(id);

      if (track) {
        //Track found, now update it
        try {
          await Track.updateOne(
            { _id: id },
            {
              $set: {
                name: req.body.newName,
                singer: req.body.newSinger,
                categoryId: req.body.newCategory._id,
                albumId: req.body.newAlbum._id,
              },
            },
            { omitUndefined: true }
          );

          res.end();
        } catch (err) {
          res.status(500).send({ error: err });
        }
      } else {
        res.status(404).send();
      }
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};

//DELETE TRACK API
exports.deleteTrackById = async (req, res) => {
  //Get track id from request
  const { id } = req.params;

  //Delete track by id and return response
  try {
    //First try to find the track
    const track = await Track.findById(id);

    if (track) {
      //Track found, now delete it
      await Track.deleteOne({ _id: id });

      res.end();
    } else {
      //No track found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.getSortedTracksByCategory = async (req, res) => {
  //Get all songs in album with given category
  try {
    //Check if we have a category id sent in the request
    if (Object.keys(req.query).length > 0) {
      //Check for album first
      const album = await Album.findById(req.params.albumId);

      if (album) {
        //Album found, now check category
        const category = await Category.findById(
          req.query[Object.keys(req.query)[0]]
        );

        if (category) {
          //Category found, now find tracks
          const tracks = await Track.find({
            albumId: req.params.albumId,
            categoryId: req.query[Object.keys(req.query)[0]],
          });

          res.status(200).send({ result: tracks });
        } else {
          //Category not found
          res.status(404).send({ message: "Category not found" });
        }
      } else {
        //Album not found
        res.status(404).send({ message: "Album not found" });
      }
    } else {
      //Find album first
      const album = await Album.findById(req.params.albumId);

      if (album) {
        //Album found, now get all songs and return them in response

        const tracks = await Track.find({ albumId: req.params.albumId });

        res.status(200).send({ result: tracks });
      } else {
        //Album not found
        res.status(404).send();
      }
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
