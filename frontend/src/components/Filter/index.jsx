import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import FilterType from "./FilterType";

// input initialState
const initialState = {
  city: "",
  type_of_game: "",
};

const Filter = ({ getEvents }) => {
  // For Filter
  const [filter, setFilter] = useState(initialState);

  // event handler of input change
  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.id]: e.target.value,
    });
  };

  // * function to convert filter object in query and call getEvents
  const applyFilter = () => {
    // * validating

    let filterQuery = "";

    for (let key in filter) {
      if (filter[key] !== "") {
        filterQuery += `&${key}=${filter[key]}`;
      }
    }

    getEvents(filterQuery);
  };

  return (
    <Box p={5}>
      <Heading
        as="h3"
        size="lg"
      >
        Filter By
      </Heading>
      <VStack
        spacing={10}
        mt={10}
      >
        <FilterType
          handleChange={handleChange}
          value={filter.city}
          name={"City"}
          id={"city"}
        />

        <FilterType
          handleChange={handleChange}
          value={filter.type_of_game}
          name={"Game"}
          id={"type_of_game"}
        />

        <Button
          colorScheme="teal"
          variant="outline"
          onClick={applyFilter}
        >
          Filter
        </Button>
      </VStack>
    </Box>
  );
};

export default Filter;
