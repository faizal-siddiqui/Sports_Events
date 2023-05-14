import { Box, Image } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <Box
        w="fit-content"
        m="auto"
      >
        <Image
          src="https://miro.medium.com/v2/resize:fit:1400/1*zE2qnVTJehut7B8P2aMn3A.gif"
          alt="not_found"
        />
      </Box>
    </div>
  );
};

export default NotFound;
