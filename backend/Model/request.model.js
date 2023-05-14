const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.ObjectId,
    ref: "event",
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "expired", "rejected"],
    default: "pending",
  },
});

// Request Model

const RequestModel = mongoose.model("request", requestSchema);

module.exports = { RequestModel };
