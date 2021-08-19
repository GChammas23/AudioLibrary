//Require album & track model and other services needed
const Album = require("../Models/album");
const trackServices = require("../Track/track.services");
const Track = require('../Models/track');

exports.addAlbum = async (album) => {
  //Create object from model with given values
  const newAlbum = new Album(album);

  //Save object to DB
  const result = await newAlbum.save();
  return result._id;
};

exports.getAlbums = async () => {
  const result = await Album.find();

  return result;
};

exports.getAlbumById = async (id) => {
  const album = await Album.findById(id);

  if (album) {
    return album; //Album found, send it in response
  } else {
    return; //No Album found
  }
};

exports.updateAlbumById = async (values, id) => {
  const album = await Album.findById({ _id: id });
  if (album) {
    //Album found, now we need to update it
    await Album.updateOne(
      { _id: id },
      {
        $set: values,
      },
      { omitUndefined: true } //Make sure that only defined values are updated in the DB
    );
    return 200;
  } else {
    return 404; // Album not found
  }
};

exports.deleteAlbumById = async (id) => {
  //Find album first
  const album = await Album.findById(id);

  if (album) {
    //Check if album has any tracks
    const track = await trackServices.getTracksByAlbumId(id);

    if (track) {
      //One track found cannot delete
      return 409;
    } else {
      //No tracks found, now delete album
      await Album.deleteOne({ _id: id });

      return 200;
    }
  } else {
    //No album found
    return 404;
  }
};

exports.getNbOfTracks = async () => {
  //Group tracks by album id using aggregate
  const result = await Track.aggregate([{$group: {_id: {albumId: "$albumId"}, numberOfTracks: {$sum: 1}}}]);

  return result;
};
