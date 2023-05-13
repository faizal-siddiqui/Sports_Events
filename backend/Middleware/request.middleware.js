const { RequestModel } = require("../Model/request.model");

const updateExpiredRequests = async (req, res, next) => {
  try {
    const currentTime = new Date(); // Get the current date and time

    //* Construct the filter to match requests with date and time lesser than the current time
    // * and status as pending
    const filter = {
      "event_id.date": { $lte: currentTime },
      "event_id.timing": { $lte: currentTime },
      status: "pending",
    };

    //* Set the update object to change the status to "expired"

    const updates = { $set: { status: "expired" } };

    //* Update all the expired requests in database
    await RequestModel.updateMany(filter, updates);

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { updateExpiredRequests };
