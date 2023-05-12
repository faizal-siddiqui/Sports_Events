const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "NEW",
  },
});

// Request Model

const RequestModel = mongoose.model("request", requestSchema);

module.exports = { RequestModel };
