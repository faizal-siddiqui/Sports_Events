const { EventModel } = require("../Model/event.model");

// * GET All Events

const getAllEvents = async (req, res) => {
  // TODO: ADDING FILTERS and POpulate

  try {
    //* getting list of events

    const events = await EventModel.find().populate("user_id");

    // * passing events data to client

    res.status(200).json({
      status: "success",
      count: events.length,
      data: events,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * GET User Events Only

const getUserEvents = async (req, res) => {
  const { user_id } = req.body;

  try {
    //* getting list of user events

    const userEvents = await EventModel.find({ user_id });

    // * passing userEvents data to client

    res.status(200).json({
      status: "success",
      count: userEvents.length,
      data: userEvents,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * GET Single Event

const getSingleEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    //* getting single event of _id as eventId

    const event = await EventModel.findOne({ _id: eventId });

    // * passing events data to client

    res.status(200).json({
      status: "success",
      data: event,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const postEvent = async (req, res) => {
  const { user_id } = req.body;

  const {
    event_name,
    poster,
    description,
    timing,
    date,
    players_limit,
    type_of_game,
    address,
    city,
  } = req.body;

  try {
    //* creating new event

    const event = new EventModel({
      event_name,
      description: description || "",
      timing,
      date,
      players_limit,
      type_of_game,
      address,
      city,
      user_id, //* to build the relationship
    });

    // * saving event to database

    await event.save();

    res.status(201).json({
      msg: "Event Added",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * PATCH Event

const updateEvent = async (req, res) => {
  const { eventId } = req.params;

  //* deleting the user_id from req.body that gets added cbecause of middlewares
  delete req.body.user_id;

  //* Fetch the existing event from the database
  const existingEvent = await EventModel.findById(eventId);

  if (!existingEvent) {
    return res.status(404).json({ msg: "Event not found" });
  }

  try {
    //* Iterate over the keys in req.body
    for (const key in req.body) {
      //* Check if the value is not empty, undefined or null
      if (
        req.body[key] !== "" &&
        req.body[key] !== undefined &&
        req.body[key] !== null
      ) {
        //* Update the field of the existing event
        existingEvent[key] = req.body[key];
      }
    }

    //* Save the updated event to the database
    await existingEvent.save();

    res.status(200).json({
      msg: "Event Updated",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// * DELETE Event

const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    //* deleting event

    await EventModel.findByIdAndDelete(eventId);

    res.status(200).json({
      msg: "Event Deleted",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  getUserEvents,
  getAllEvents,
  getSingleEvent,
  postEvent,
  updateEvent,
  deleteEvent,
};
