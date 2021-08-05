//Require album & track models to use in functions
const Album = require("../Models/album");
const Track = require("../Models/track");

//Add album API
exports.addAlbum = async (req, res) => {
  //Invalid input case
  if (!req.body.name) {
    res
      .status(400)
      .send({ message: "Please make sure to give a name to the album!" });
  } else {
    //Create object from model with given values
    const album = new Album({
      name: req.body.name,
      description: req.body.description,
      showNbOfTracks: req.body.showNumbOfTracks,
      createdDate: new Date(),
    });

    //Save object to DB
    try {
      const result = await album.save();
      res.status(200).send({ album: result });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};

//Get all albums from DB API
exports.getAlbums = async (req, res) => {
  //Get all albums from DB
  try {
    const result = await Album.find();

    res.status(200).send({result: result});

  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//Get specific album
exports.getAlbumById = async (req, res) => {
  //Get id from request's body
  const { id } = req.params;

  try {
    const album = await Album.findById(id);

    if (album) {
      res.status(200).send({ result: album }); //Album found, send it in response
    } else {
      res.status(404).send(); //No Album found
    }
  } catch (err) {
    res.status(500).send({ error: err }); //Error while fetching album
  }
};

//Update album API
exports.updateAlbumById = async (req, res) => {
  //Get id from url
  const { id } = req.params;

  //Find the album first
  try {
    const album = await Album.findById({ _id: id });
    if (album) {
      try {
        //Album found, now we need to update it
        await Album.updateOne(
          { _id: id },
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
        res.end();
      } catch (err) {
        res.status(500).send({ error: err }); //Error occurred in update
      }
    } else {
      res.status(404).send(); // Album not found
    }
  } catch (err) {
    res.status(500).send({ error: err }); //Error occurred in find
  }
};

exports.deleteAlbumById = async (req, res) => {
  //Get id from request's body
  const { id } = req.params;

  try {
    //Find album first
    const album = await Album.findById(id);

    if (album) {
      //Check if album has any tracks
      const tracks = await Track.find({ albumId: id });

      if (tracks.length > 0) {
        //Tracks found cannot delete
        res.status(403).send();
      } else {
        //No tracks found, now delete album
        const deleteAlbum = await Album.deleteOne({ _id: id });

        res.end();
      }
    } else {
      //No album found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//GET NUMBER OF TRACKS FOR ALL ALBUMS
exports.getNbOfTracks = (req, res) => {
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
        res.status(200).send({ list: results });
      } else {
        res.status(404).send({
          message: "No tracks found! Make sure to set showNbOfTracks to true",
        });
      }
    }
  );
};
