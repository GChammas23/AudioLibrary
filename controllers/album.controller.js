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
