//Require album & track models to use in functions
const Album = require("../model/album");
const Track = require("../model/track");

//Add album API
exports.addAlbum = (req, res) => {
  //Extract values from request's body
  const { name } = req.body;
  const { description } = req.body;
  const { showNumbOfTracks } = req.body;

  //Invalid input case
  if (name === undefined) {
    res
      .status(400)
      .send({ message: "Please make sure to give a name to the album!" });
  } else {
    //Create object from model with given values
    const album = new Album({
      name: name,
      description: description,
      showNbOfTracks: showNumbOfTracks,
      createdDate: new Date(),
    });

    //Save object to DB
    album
      .save()
      .then((result) => {
        res.status(200).send({ result: result });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  }
};

//Get all albums from DB API
exports.getAlbums = (req, res) => {
  //Get all albums from DB
  Album.find()
    .then((result) => {
      res.status(200).send({ albums: result });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};

//Get specififc album
exports.getAlbumById = (req, res) => {
  //Get id from request's body
  const { id } = req.params;

  Album.findById(id)
    .then((document) => {
      if (document !== null) {
        res.status(200).send({ result: document });
      } else {
        res
          .status(404)
          .send({ message: "Could not find album with specified id!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
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
        const update = await Album.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.newName,
              description: req.body.newDescription,
              showNbOfTracks: req.body.showNumberOfTracks,
              updatedDate: new Date(),
            },
          },
          { omitUndefined: true } //Make sure that only defined values are updated in the DB
        );
        //Check if update was successfull
        if (update.nModified > 0) {
          res.end();
        } else {
          res.status(400).send(); // No update done
        }
      } catch (err) {
        res.status(500).send({ error: err }); //Error occured in update
      }
    } else {
      res.status(404).send(); // Album not found
    }
  } catch (err) {
    res.status(500).send({ error: err }); //Error occured in find
  }
};

exports.deleteAlbumById = async (req, res) => {
  //Get id from request's body
  const { id } = req.params;

  try {
    const deleteAlbum = await Album.deleteOne({ _id: id });
    if (deleteAlbum.deletedCount > 0) {
      res.end();
    } else {
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
