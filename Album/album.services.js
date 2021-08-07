//Require needed modules and models
const Album = require("../Models/album");

exports.addAlbumService = async (req, res) => {
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

exports.getAlbumsService = async (req, res) => {
  const result = await Album.find();

  return result;
};

exports.getAlbumByIdService = async (req, res) => {
  const album = await Album.findById(req.params.id);

  if (album) {
    return album; //Album found, send it in response
  } else {
    return; //No Album found
  }
};

exports.updateAlbumByIdService = async (req, res) => {
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
    //Check if update was successful
    return true;
  } else {
    return false; // Album not found
  }
};

exports.deleteAlbumByIdService = async (req, res) => {
  //Find album first
  const album = await Album.findById(req.params.id);

  if (album) {
    //Check if album has any tracks
    const tracks = await Track.find({ albumId: req.params.id });

    if (tracks.length > 0) {
      //Tracks found cannot delete
      return false;
    } else {
      //No tracks found, now delete album
      await Album.deleteOne({ _id: req.params.id });

      return true;
    }
  } else {
    //No album found
    return false;
  }
};

exports.getNbOfTracksService = async (req, res) => {
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
