//Require track & album & category models to use
const Track = require("../model/track");
const Album = require("../model/album");
const Category = require("../model/category");

//ADD TRACK API
exports.addTrack = async (req, res) => {
  //Extract values from request
  const { name } = req.body;
  const { singer } = req.body;
  const { category } = req.body; //Represents category object in request
  const { album } = req.body; //Represents album object in request

  //Check for any missing input that is required
  if (
    name === undefined ||
    singer === undefined ||
    category === undefined ||
    album === undefined
  ) {
    res
      .status(400)
      .send({ message: "Please make sure to enter all information needed!" });
  } else {
    //Create track object to save
    const track = new Track({
      name: name,
      singer: singer,
      categoryId: category._id,
      albumId: album._id,
    });

    //Save the created object in DB
    try {
      const result = await track.save();
      res.status(200).send({ track: result });
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};

//GET ALL TRACKS API
exports.getAllTracks = async (req, res) => {
  try {
    const result = await Track.find();

    if (result.length > 0) {
      res.status(200).send({ tracks: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//GET TRACK BY SINGER API
exports.getTrackBySinger = async (req, res) => {
  //Get id from request
  const { albumSinger } = req.body;

  //Invalid input case
  if (!albumSinger) {
    res.status(400).send();
  } else {
    //Find the album with the specified singer
    const result = await Track.find({ singer: albumSinger });

    if (result) {
      res.status(200).send({ album: result });
    } else {
      res.status(404).send();
    }
  }
};

//UPDATE TRACK API
exports.updateTrackById = async (req, res) => {
  //Get id from url
  const { id } = req.params;

  if (
    req.body.newName === undefined &&
    req.body.newSinger === undefined &&
    req.body.newCategory === undefined &&
    req.body.newAlbum === undefined
  ) {
    res
      .status(400)
      .send({ message: "No new value was sent. No update needed" });
  } else {
    //Find the track by its id and update it with the new values
    try {
      const track = await Track.findById(id);

      if (track) {
        //Track found, now update it
        try {
          const update = await Track.updateOne(
            { _id: id },
            {
              $set: {
                name: req.body.newName,
                singer: req.body.newSinger,
                categoryId: req.body.newCategory._id,
                albumId: req.body.newAlbum._id,
              },
            },
            { omitUndefined: true }
          );
          
          //Check if update is successfull
          if (update.nModified > 0) {
            res.end();
          }else {
            res.status(400).send(); //No update done
          }
        } catch (err) {
          res.status(500).send({ error: err });
        }
      } else {
        res.status(404).send();
      }
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};

//DELETE TRACK API
exports.deleteTrackById = async (req, res) => {
  //Get track id from request
  const { id } = req.params;

  //Delete track by id and return response
  try {
    //First try to find the track
    const track = await Track.findById(id);

    if (track) {
      //Track found, now delete it
      const deleteTrack = await Track.deleteOne({ _id: id });

      if (deleteTrack.deletedCount > 0) {
        //Delete successfull
        res.end();
      }
      else {
        //Error in deletion
        res.status(500).send();
      }
    }else {
      //No track found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.getSortedTracksByCategory = async (req, res) => {
  //Check if we have a category id sent in the request
  if (Object.keys(req.query).length > 0) {
    //Get all songs in album with given category
    try {
      //Check for album first
      const album = await Album.findById(req.params.albumId);

      if (album) {
        //Album found, now check category
        const category = await Category.findById(req.query[Object.keys(req.query)[0]]);

        if (category) {
          //Category found, now find tracks
          const tracks = await Track.find({albumId: req.params.albumId, categoryId: req.query[Object.keys(req.query)[0]]});
          
          res.status(200).send({ result: tracks});
        }
        else {
          //Category not found
          res.status(404).send({message: "Category not found"})
        }
      }
      else {
        //Album not found
        res.status(404).send({message: "Album not found"})
      }
    }catch(err) {
      res.status(500).send({ error: err });
    }
  }
  else {
    //Get all songs in album 
    try {
      //Find album first
      const album = await Album.findById(req.params.albumId);

      if (album) {
        //Album found, now get all songs and return them in response

        const tracks = await Track.find({albumId: req.params.albumId});

        res.status(200).send({result: tracks});
      }
      else {
        //Album not found
        res.status(404).send();
      }
    }catch(err) {
      res.status(500).send({ error: err });
    }
  }
}