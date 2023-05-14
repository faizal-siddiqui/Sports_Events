const express = require("express");
const requestController = require("../Controller/request.controller");
const { updateExpiredRequests } = require("../Middleware/request.middleware");

const requestRouter = express.Router();

//* Send a request to join an event

requestRouter.post(
  "/events/:eventId/requests",
  requestController.reqToJoinEvent
);

//* Accept or reject a user's request to join an event

requestRouter.patch(
  "/events/:eventId/requests/:requestId",
  requestController.updateReqStatus
);

//* Fetch All the request of the event of  eventId
// ? (Here User can filter accepted or rejected based upon Id)

requestRouter.get(
  "/events/:eventId/requests",
  updateExpiredRequests,
  requestController.getEventRequest
);

//* Get Status of the user's request for that event
// * Here User will get to know about whether the request has been accepted, pending, or not_applied

requestRouter.get(
  "/user/:eventId/request/status",
  requestController.getUserEventRequestStatus
);

//* Fetch All the request of the user which are requested

requestRouter.get(
  "/user/events/requests",
  updateExpiredRequests,
  requestController.getRequestedUserRequest
);

module.exports = { requestRouter };
