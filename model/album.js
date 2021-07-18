//Require mongoose and get the Schema Object to create the album model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  showNbOfTracks: {
      type: Boolean,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },

  updatedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Album", albumSchema);
