const express = require("express");
const eventController = require("../Controller/event.controller");
const { authorizeUser } = require("../Middleware/user.middleware");

const eventRouter = express.Router();

// * Get All Events

eventRouter.get("/events", eventController.getAllEvents);

// * Get User Events

eventRouter.get("/user/events", authorizeUser, eventController.getUserEvents);

// * Get Single Event

eventRouter.get(
  "/events/:eventId",
  authorizeUser,
  eventController.getSingleEvent
);

// * Add Event

eventRouter.post("/events", authorizeUser, eventController.postEvent);

// * Update Event

eventRouter.patch(
  "/events/:eventId",
  authorizeUser,
  eventController.updateEvent
);

// * Delete Event

eventRouter.delete(
  "/events/:eventId",
  authorizeUser,
  eventController.deleteEvent
);
module.exports = { eventRouter };
