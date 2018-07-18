/*
    Event mongoose model for Database.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventOwner: { type: Schema.Types.ObjectId, ref: "User" },
  event_date: { type: Date, default: Date.now },
  event_name: String,
  event_location: { type: String, default: "No Location Set" },
  invited: [
    {
      invited_user: { type: Schema.Types.ObjectId, ref: "User" },
      isGoing: { type: Boolean, defualt: false }
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
