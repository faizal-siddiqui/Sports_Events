const { RequestModel } = require("../Model/request.model");

// * POST Request To join Event

const reqToJoinEvent = async (req, res) => {
  //   * getting user_id from body with the help of middleware
  const { user_id } = req.body;

  //   * getting eventId from params
  const { eventId } = req.params;

  try {
    // * Creating Request
    const request = new RequestModel({
      event_id: eventId,
      user_id,
    });

    //   * saving Request
    await request.save();

    res.status(201).json({
      msg: "Request Done",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * PATCH status of request (accepted or pending)

const updateReqStatus = async (req, res) => {
  // * updating field
  const { status } = req.body;

  //   * getting eventId & requestId from params
  const { eventId, requestId } = req.params;

  try {
    //* Fetch the existing request from the database
    const existingRequest = await RequestModel.findById(requestId).populate(
      "event_id"
    );

    // if not exist
    if (!existingRequest) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // * find all the accepted request of the event
    const acceptedRequest = await RequestModel.find({
      event_id: eventId,
      status: "accepted",
    });

    // * if we want status to be accepted
    // * so compare players_limit and accepted request
    // * if they equal then event filled

    if (
      status === "accepted" &&
      existingRequest.event_id.players_limit <= acceptedRequest.length
    ) {
      res.status(403).json({ msg: "Event Already Filled" });
      return;
    } else {
      //* Update the status in the request document

      await RequestModel.findByIdAndUpdate(requestId, {
        status,
      });

      res.status(200).json({
        msg: "Request Updated",
      });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * GET All the request of some specific event

const getEventRequest = async (req, res) => {
  //   * getting eventId from params
  const { eventId } = req.params;

  //   * adding query to filter status accepted and rejected
  let { status } = req.query;

  if (!status) {
    res.status(404).json({ msg: "Status Not Found" });
  }

  // If status is not already an array, convert it to an array
  if (!Array.isArray(status)) {
    status = [status];
  }

  try {
    //   * getting all Requests of event

    const requests = await RequestModel.find({
      event_id: eventId,
      status: { $in: status },
    }).populate({
      path: "user_id",
      select: "name",
    });

    res.status(200).json({
      status: "success",
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * Check User is Accepted to event of eventID or not

const getUserEventRequestStatus = async (req, res) => {
  //   * getting user_id from body
  const { user_id } = req.body;

  //* eventId
  const { eventId } = req.params;

  try {
    //   * check accepted accepted Requests of user

    const request = await RequestModel.findOne({
      user_id,
      event_id: eventId,
    });

    res.status(200).json({
      status: request ? request.status : "not_applied",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * GET All the request of the User which are accepted, rejected, expired or pending

const getRequestedUserRequest = async (req, res) => {
  //   * getting user_id from body
  const { user_id } = req.body;

  // * This query contains status of request that we want to filter
  let { status } = req.query;

  if (!status) {
    res.status(404).json({ msg: "Status Not found" });
  }

  // If status is not already an array, convert it to an array
  if (!Array.isArray(status)) {
    status = [status];
  }

  try {
    //   * getting all pending Requests of user

    const requests = await RequestModel.find({
      user_id,
      status: { $in: status },
    }).populate({
      path: "event_id",
      select:
        "_id event_name poster description timing date players_limit type_of_game address city",
    });

    res.status(200).json({
      status: "success",
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  reqToJoinEvent,
  updateReqStatus,
  getEventRequest,
  getUserEventRequestStatus,
  getRequestedUserRequest,
};
