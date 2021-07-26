//Require mongoose and Schema to create model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  registrationDate: {
    type: Date,
    required: true,
  },

  __v: {
    type: Number,
    select: false,
  },

});

module.exports = mongoose.model("User", userSchema)