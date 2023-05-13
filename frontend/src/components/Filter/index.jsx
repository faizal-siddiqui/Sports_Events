import { Box, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import React from "react";

const FilterType = ({ name }) => {
  return (
    <Box>
      <Heading
        as="h5"
        size="sm"
        pb="19px"
      >
        {name}
      </Heading>
      <Input
        type="text"
        placeholder={`Enter ${name} Name`}
      />
    </Box>
  );
};

const Filter = () => {
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
        <FilterType name={"City"} />
        <FilterType name={"Game"} />
      </VStack>
    </Box>
  );
};

export default Filter;
