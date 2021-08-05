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
  },

  updatedDate: {
    type: Date,
  },

  __v: {
    type: Number,
    select: false
  }
  
});

module.exports = mongoose.model("Category", categorySchema);
