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

// * PATCH status of request (accepted or rejected)

const updateReqStatus = async (req, res) => {
  // * updating field
  const { status } = req.body;

  //   * getting eventId & requestId from params
  const { eventId, requestId } = req.params;

  try {
    //   * saving Request
    await RequestModel.findByIdAndUpdate(requestId, {
      status,
    });

    res.status(200).json({
      msg: "Request Done",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * GET All the request of some specific event

const getEventRequest = async (req, res) => {
  //   * getting eventId from params
  const { eventId } = req.params;

  //   * adding query to filter accepted and rejected
  const query = req.query;

  try {
    //   * getting all Requests of event

    const requests = await RequestModel.find({
      event_id: eventId,
      ...query,
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

    // * Passing user request status if found otherwise not_applied which means user has not applied ye
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

  // * This query contains status of request on the basis of which we want to filter events
  const { status } = req.query;

  try {
    //   * getting all pending Requests of user

    const requests = await RequestModel.find({
      user_id,
      status,
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
