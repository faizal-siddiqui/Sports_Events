export const isEventDateAndTimePassed = (eventDate, eventTime) => {
  const currDate = new Date();

  const eventDateTimeString = eventDate + "T" + eventTime + ":00.000Z";

  return eventDateTimeString <= currDate;
};

export const isEventFilled = (no_of_participants, event_limit) => {
  return no_of_participants === event_limit;
};
