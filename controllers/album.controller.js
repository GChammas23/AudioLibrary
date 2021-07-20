//Require album & track models to use in functions
const Album = require("../model/album");
const Track = require("../model/track");

//Add album API
exports.addAlbum = (req, res) => {
  //Extract values from request's body
  const { name } = req.body;
  const { description } = req.body;
  const { showNumbOfTracks } = req.body;

  //Create object from model with given values
  const album = new Album({
    name: name,
    description: description,
    showNbOfTracks: showNumbOfTracks,
  });

  //Save object to DB
  album
    .save()
    .then((result) => {
      res
        .status(200)
        .send({ message: "Album successfully added!", result: result });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error occured while saving album!", error: err });
    });
};

//Get all albums from DB API
exports.getAlbums = (req, res) => {
  //Get all albums from DB
  Album.find()
    .then((result) => {
      res
        .status(200)
        .send({ message: "Albums fetched successfully!", albums: result });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error occured while fetching albums", error: err });
    });
};

//Get specififc album
exports.getAlbumById = (req, res) => {
  //Get id from request's body
  const { _id } = req.body;

  Album.findById(_id)
    .then((document) => {
      if (document !== null) {
        res
          .status(200)
          .send({ message: "Album successfully fetched!", result: document });
      } else {
        res
          .status(404)
          .send({ message: "Could not find album with specified id!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to find an album with this id",
        error: err,
      });
    });
};

//Update album API
exports.updateAlbumById = (req, res) => {
  //Get values from request's body
  const { newName } = req.body;
  const { newDescription } = req.body;
  const { showNumberOfTracks } = req.body;
  const { _id } = req.body;

  //Use aggregate to find the record
  Album.findById(_id)
    .then((object) => {
      if (newName) object.name = newName;
      if (newDescription) object.description = newDescription;
      if (showNumberOfTracks) object.showNbOfTracks = showNumberOfTracks;
      object.updatedDate = new Date();

      object
        .save()
        .then((result) =>
          res
            .status(200)
            .send({ message: "Album successfully updated!", result: result })
        )
        .catch((err) => {
          res.status(500).send({
            message: "Error occured while trying to update the album",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to find the album",
        error: err,
      });
    });
};

exports.deleteAlbumById = (req, res) => {
  //Get id from request's body
  const { _id } = req.body;

  Album.findByIdAndDelete(_id)
    .then((result) => {
      res
        .status(200)
        .send({ message: "Album successfully deleted!", result: result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to delete specified album",
        error: err,
      });
    });
};

//GET NUMBER OF TRACKS FOR ALL ALBUMS
exports.getNbOfTracks =  (req, res) => {
  //Create an array to store results in
  var results = [];

  //Get list of all albums who have showNbOfTracks set to true
  Album.aggregate([{ $match: { showNbOfTracks: true } }]).then( async (result) => {
    if (result.length !== 0) {
      for (let counter = 0; counter < result.length; counter++) {
        //Loop through albums and access their _id
        const id = result[counter]._id;

        const count = await Track.countDocuments({albumId: id});

        results.push({
          albumId: id,
          trackCount: count
        })
      }
      res
        .status(200)
        .send({ message: "Tracks successfully counted!", list: results });
    } else {
      res.status(404).send({
        message: "No tracks found! Make sure to set showNbOfTracks to true",
      });
    }
  });
};
