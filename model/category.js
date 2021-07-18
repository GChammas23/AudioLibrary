//Require mongoose and get the Schema Object to create the category model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },

  updatedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Category", categorySchema);
