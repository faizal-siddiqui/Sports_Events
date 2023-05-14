import { Box, Heading, Input } from "@chakra-ui/react";

const FilterType = ({ name, handleChange, value, id }) => {
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
        onChange={handleChange}
        value={value}
        id={id}
      />
    </Box>
  );
};

export default FilterType;
