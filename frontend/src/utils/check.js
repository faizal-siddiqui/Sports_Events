export const isEventDateAndTimePassed = (eventDate, eventTime) => {
  const currDate = new Date();

  // creating a date time string
  const eventDateTimeString = eventDate + "T" + eventTime + ":00.000Z";

  // comparing is the time and date <= current time and date
  // that means event passed away or started
  return eventDateTimeString <= currDate;
};

// checking is event filled or not
export const isEventFilled = (no_of_participants, event_limit) => {
  return no_of_participants >= event_limit;
};
