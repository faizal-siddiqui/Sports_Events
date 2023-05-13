import { useToast } from "@chakra-ui/react";
import React from "react";

const useToastComponent = () => {
  const toast = useToast();

  const Toast = (msg, type) => {
    toast({
      title: msg,
      status: type,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return Toast;
};

export default useToastComponent;
