//Require mongoose and get the Schema Object to create the album model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  showNbOfTracks: {
    type: Boolean,
  },

  createdDate: {
    type: Date,
  },

  updatedDate: {
    type: Date,
  },

  __v: {
    type: Number,
    select: false
  }
});

module.exports = mongoose.model("Album", albumSchema);
