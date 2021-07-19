//Require track model to use it
const Track = require("../model/track");

//ADD TRACK API
exports.addTrack = (req, res) => {
  //Extract values from request
  const { name } = req.body;
  const { singer } = req.body;
  const { category } = req.body; //Represents category object in request
  const { album } = req.body;    //Represents album object in request

  if (name === undefined || singer === undefined || category === undefined || album === undefined) {
      res.status(400).send({message: "Please make sure to enter all information needed!"});
  }
  else {
    const track = new Track({
        name: name,
        singer: singer,
        categoryId: category._id,
        albumId: album._id,
      });
    
      track
        .save()
        .then((result) => {
          res
            .status(200)
            .send({ message: "Track successfully added!", result: result });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error occured while trying to add the track!",
            error: err,
          });
        });
  }

};
