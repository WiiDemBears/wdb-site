/*
    Quote model for Database.
 */

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  postedUser: {
    type: String
  },
  text: {
    type: String
  },

  timestamps: true
})
