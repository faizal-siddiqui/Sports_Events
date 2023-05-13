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

//* Fetch All the request of the user which are accepted

requestRouter.get(
  "/user/accepted/event/request",
  requestController.getUserAcceptedRequest
);

//* Fetch All the request of the user which are accepted

requestRouter.get(
  "/user/events/accepted",
  requestController.getAcceptedUserRequest
);

//* Fetch All the request of the user which are requested

requestRouter.get(
  "/user/events/requested",
  updateExpiredRequests,
  requestController.getRequestedUserRequest
);

module.exports = { requestRouter };
