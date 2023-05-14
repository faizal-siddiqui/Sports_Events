import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const FormInput = ({ type, name, label, eventData, handleChange }) => {
  return (
    <FormControl
      my={2}
      isRequired
    >
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={`Enter ${label}`}
        type={type}
        id={name}
        value={eventData[name]}
        onChange={handleChange}
      />
    </FormControl>
  );
};

// * initialData of form
const initialState = {
  event_name: "",
  poster: "",
  description: "",
  timing: "",
  date: "",
  players_limit: "",
  type_of_game: "",
  address: "",
  city: "",
};

const Form = ({ addEventFunc }) => {
  const [eventData, setEventData] = useState(initialState);

  //   * For handling onChange of inputs and storing their values
  const handleChange = (event) => {
    // * In the case of number store integer value
    if (event.target.type === "number") {
      setEventData({
        ...eventData,
        [event.target.id]: +event.target.value,
      });

      //   *otherwise store string value
    } else {
      setEventData({
        ...eventData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const onSubmit = (event) => {
    // * preventing Default property of onSubmit
    event.preventDefault();

    // calling addEventFunc to add the events
    addEventFunc(eventData);

    // resetting Form inupts
    setEventData(initialState);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Event Name */}

      <FormInput
        type={"text"}
        name={"event_name"}
        label={"Event Name"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event Poster */}

      <FormInput
        type={"text"}
        name={"poster"}
        label={"Event Poster"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event Description */}

      <FormInput
        type={"text"}
        name={"description"}
        label={"Event Description"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event Timing */}

      <FormInput
        type={"time"}
        name={"timing"}
        label={"Event Timing"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event Date */}

      <FormInput
        type={"date"}
        name={"date"}
        label={"Event Date"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event Player Limit */}

      <FormInput
        type={"number"}
        name={"players_limit"}
        label={"Player Limit"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Type of Game */}

      <FormInput
        type={"text"}
        name={"type_of_game"}
        label={"Type of Game"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event Address */}

      <FormInput
        type={"text"}
        name={"address"}
        label={"Event Address"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Event City */}

      <FormInput
        type={"text"}
        name={"city"}
        label={"Event City"}
        eventData={eventData}
        handleChange={handleChange}
      />

      {/* Submit Button */}

      <Button
        display="block"
        width="40%"
        margin="auto"
        marginTop={4}
        backgroundColor="teal.400"
        type="submit"
      >
        Add Event
      </Button>
    </form>
  );
};

export default Form;
