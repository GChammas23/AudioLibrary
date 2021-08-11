//Require mongoose and get the Schema Object to create the track model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  name: {
    type: String,
  },

  singer: {
    type: String,
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  albumId: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },

  __v: {
    type: Number,
    select: false
  }
  
});

trackSchema.index({singer: 1});

module.exports = mongoose.model("Track", trackSchema);
