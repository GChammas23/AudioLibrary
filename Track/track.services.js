const Track = require("../Models/track");
const Album = require("../Models/album");
const Category = require("../Models/category");

exports.addTrack = async (track) => {
  //Create track object to save
  const newTrack = new Track(track);

  //Save the created object in DB
  const result = await newTrack.save();
  return result._id;
};

exports.getAllTracks = async () => {
  const result = await Track.find();

  return result;
};

exports.getTrackBySinger = async (singer) => {
  //Find the album with the specified singer
  const result = await Track.find({ singer: singer });

  return result;
};

exports.updateTrackById = async (values, id) => {
  //Find the track by its id and update it with the new values
  const track = await Track.findById(id);

  if (track) {
    //Track found, now update it
    await Track.updateOne(
      { _id: id },
      {
        $set: values,
      },
      { omitUndefined: true }
    );

    return 200; //Update done
  } else {
    return 404; //Error in update
  }
};

exports.deleteTrackById = async (id) => {
  //Delete track by id and return response

  //First try to find the track
  const track = await Track.findById(id);

  if (track) {
    //Track found, now delete it
    await Track.deleteOne({ _id: id });

    return 200; //Deleted track
  } else {
    //No track found
    return 404;
  }
};

exports.getSortedTrackByCategory = async (parameters) => {
  //Get all songs in album with given category

  //Check if we have a category id sent in the request
  if (parameters.categoryId) {
    //We have a category

    //Find album first
    const album = await Album.findById(parameters.albumId);

    if (album) {
      //Album found, now get category
      const category = await Category.findById(parameters.categoryId);

      if (category) {
        //Finally, get tracks related to album and category
        const tracks = await Track.find({
          albumId: parameters.albumId,
          categoryId: parameters.categoryId,
        });

        return tracks;
      }
      else {
        //Category not found
        return;
      }
    }
    else {
      //Album not found
      return;
    }
  } else {
    //No category found, only albumId is provided

    //Find album first
    const album = await Album.findById(parameters.albumId);

    if (album) {
      //Album found, now get all related tracks
      const tracks = await Track.find({ albumId: parameters.albumId });

      return tracks;
    } else {
      //Album not found
      return;
    }
  }
};
