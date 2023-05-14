import { Box, Button } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ page, setPage, limit = 6 }) => {
  const handlePage = (diff) => {
    setPage(page + diff);
  };

  return (
    <Box
      width="fit-content"
      margin="auto"
      my={3}
    >
      <Button
        colorScheme="teal"
        variant="outline"
        isDisabled={page === 1}
        onClick={() => handlePage(-1)}
      >
        Prev
      </Button>
      <Button isDisabled>{page}</Button>
      <Button
        variant="outline"
        colorScheme="teal"
        // isDisabled={page === Math.ceil(events.length / limit)}
        onClick={() => handlePage(1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
