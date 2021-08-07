const Track = require("../Models/track");
const Album = require("../Models/album");
const Category = require("../Models/category");

exports.addTrackService = async (req, res) => {
  //Create track object to save
  const track = new Track({
    name: req.body.name,
    singer: req.body.singer,
    categoryId: req.params.categoryId,
    albumId: req.params.albumId,
  });

  //Save the created object in DB
  const result = await track.save();
  return result._id;
};

exports.getTracksService = async () => {
  const result = await Track.find();

  return result;
};

exports.getTrackBySingerService = async (req, res) => {
  //Find the album with the specified singer
  const result = await Track.find({ singer: req.params.singer });

  return result;
};

exports.updateTrackByIdService = async (req, res) => {
  //Find the track by its id and update it with the new values
  const track = await Track.findById(req.params.id);

  if (track) {
    //Track found, now update it
    await Track.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          singer: req.body.singer,
          categoryId: req.body.categoryId,
          albumId: req.body.albumId,
        },
      },
      { omitUndefined: true }
    );

    return true; //Update done
  } else {
    return false; //Error in update
  }
};

exports.deleteTrackByIdService = async (req, res) => {
  //Delete track by id and return response

  //First try to find the track
  const track = await Track.findById(req.params.id);

  if (track) {
    //Track found, now delete it
    await Track.deleteOne({ _id: req.params.id });

    return true; //Deleted track
  } else {
    //No track found
    return false;
  }
};

exports.getSortedTrackService = async (req, res) => {
  //Get all songs in album with given category
  
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

        return tracks;
      } else {
        //Category not found
        return;
      }
    } else {
      //Album not found
      return;
    }
  } else {
    //Find album first
    const album = await Album.findById(req.params.albumId);

    if (album) {
      //Album found, now get all songs and return them in response

      const tracks = await Track.find({ albumId: req.params.albumId });

      return tracks;
    } else {
      //Album not found
      return;
    }
  }
};
