/*
    Event mongoose model for Database.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventOwner: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Event", eventSchema);
