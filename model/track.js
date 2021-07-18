//Require mongoose and get the Schema Object to create the track model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  singer: {
    type: String,
    required: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
});

module.exports = mongoose.model("Track", trackSchema);
