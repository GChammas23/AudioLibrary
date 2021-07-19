//Require album model to use in functions
const Album = require("../model/album");

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
    .then((albums) => {
      res
        .status(200)
        .send({ message: "Albums fetched successfully!", result: albums });
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
      }
      else {
        res.status(404).send({message: "Could not find album with specified id!"})
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
  const { _id } = req.body;

  //Use aggregate to find the record
  Album.findById(_id).then((object) => {
    object.name = newName;
    object.description = newDescription;
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
          message: "Error occured while trying to update album",
          error: err,
        });
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
