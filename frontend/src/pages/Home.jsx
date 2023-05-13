import { Box, Button, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import DrawerComponent from "../components/Drawer";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getUserEvents } from "../store/Event/event.action";
import useToastComponent from "../custom-hook/useToast";

const Home = () => {
  // * Consuming Redux Event State and auth State
  const { events } = useSelector((state) => state.eventManager);
  const { token } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();

  // * drawer disclosure to handle open and close of drawer
  const drawer = useDisclosure();

  // *  Toast from custom Component
  const Toast = useToastComponent();

  useEffect(() => {
    dispatch(getAllEvents("", Toast));
  }, []);

  return (
    <div>
      <Flex flexDir={{ base: "column", sm: "column", md: "row", lg: "row" }}>
        {/* Importing Drawer Component and Filter to show Filters in the small screen */}

        <Box display={{ base: "block", sm: "block", md: "none", lg: "none" }}>
          <Button onClick={drawer.onOpen}>Filters</Button>
          <DrawerComponent
            placement={"left"}
            isOpen={drawer.isOpen}
            onClose={drawer.onClose}
          >
            <Filter />
          </DrawerComponent>
        </Box>

        {/* * This sidebar and filter Component will visible in the medium and large screen */}

        <Box
          className={styles.sidebar}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
        >
          <Filter />
        </Box>

        {/* * This block show all the events in the form of grid*/}

        <Box className={styles.events}>
          <Grid>
            {
              // * Map Events data here
            }
          </Grid>
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
