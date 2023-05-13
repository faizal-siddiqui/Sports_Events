import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";

const DrawerComponent = ({
  children,
  placement = "right",
  isOpen,
  onClose,
}) => {
  return (
    <div>
      <Drawer
        placement={placement}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
