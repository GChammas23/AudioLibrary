//Require needed modules and models
const Album = require("../Models/album");
const Track = require('../Models/track');

exports.addAlbumService = async (req) => {
  //Create object from model with given values
  const album = new Album({
    name: req.body.name,
    description: req.body.description,
    showNbOfTracks: req.body.showNumbOfTracks,
    createdDate: new Date(),
  });

  //Save object to DB
  const result = await album.save();
  return result._id;
};

exports.getAlbumsService = async () => {
  const result = await Album.find();

  return result;
};

exports.getAlbumByIdService = async (req) => {
  const album = await Album.findById(req.params.id);

  if (album) {
    return album; //Album found, send it in response
  } else {
    return; //No Album found
  }
};

exports.updateAlbumByIdService = async (req) => {
  const album = await Album.findById({ _id: req.params.id });
  if (album) {
    //Album found, now we need to update it
    await Album.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          showNbOfTracks: req.body.showNumberOfTracks,
          updatedDate: new Date(),
        },
      },
      { omitUndefined: true } //Make sure that only defined values are updated in the DB
    );
    return 200;
  } else {
    return 404; // Album not found
  }
};

exports.deleteAlbumByIdService = async (req) => {
  //Find album first
  const album = await Album.findById(req.params.id);

  if (album) {
    //Check if album has any tracks
    const track = await Track.findOne({ albumId: req.params.id });

    if (track) {
      //One track found cannot delete
      return 409;
    } else {
      //No tracks found, now delete album
      await Album.deleteOne({ _id: req.params.id });

      return 200;
    }
  } else {
    //No album found
    return 404;
  }
};

exports.getNbOfTracksService = async () => {
  //Create an array to store results in
  var results = [];

  //Get list of all albums who have showNbOfTracks set to true
  Album.aggregate([{ $match: { showNbOfTracks: true } }]).then(
    async (result) => {
      if (result.length !== 0) {
        for (let counter = 0; counter < result.length; counter++) {
          //Loop through albums and access their _id
          const id = result[counter]._id;

          const count = await Track.countDocuments({ albumId: id });

          results.push({
            albumId: id,
            trackCount: count,
          });
        }
        return results;
      } else {
        return;
      }
    }
  );
};
