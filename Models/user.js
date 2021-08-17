//Require mongoose and Schema to create model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  registrationDate: {
    type: Date,
  },

  nbOfAttempts: {
    type: Number,
    default: 0,
  },

  blockTime: {
    type: Date,
  },

  __v: {
    type: Number,
    select: false,
  },

});

userSchema.index({email: 1});

module.exports = mongoose.model("User", userSchema)