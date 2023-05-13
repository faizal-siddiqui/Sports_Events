const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  timing: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  players_limit: {
    type: Number,
    required: true,
  },

  type_of_game: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
});

// Event Model

const EventModel = mongoose.model("event", eventSchema);

module.exports = { EventModel };
