const { EventModel } = require("../Model/event.model");
const { RequestModel } = require("../Model/request.model");

const updateExpiredRequests = async (req, res, next) => {
  try {
    const currentTime = new Date(); // Get the current date and time

    //* Update all the expired requests in database

    const filter = {
      "event_data.date": { $lte: currentTime },
      "event_data.timing": {
        $lte: `${currentTime.getHours()}` + ":" + `${currentTime.getMinutes()}`,
      },
      status: "pending",
    };

    // * Get all the expired request
    const expiredRequests = await RequestModel.aggregate([
      {
        $lookup: {
          from: "events", // Replace "events" with the actual name of the event collection
          localField: "event_id",
          foreignField: "_id",
          as: "event_data",
        },
      },
      {
        $match: filter,
      },
    ]);

    // Update the fields in the documents returned by the aggregation query concurrently
    await Promise.all(
      expiredRequests.map((request) => {
        return RequestModel.findByIdAndUpdate(request._id, {
          status: "expired",
        });
      })
    );

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { updateExpiredRequests };
