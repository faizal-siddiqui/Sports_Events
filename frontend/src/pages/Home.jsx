import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import DrawerComponent from "../components/Drawer";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../store/Event/event.action";
import useToastComponent from "../custom-hook/useToast";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const Home = () => {
  //* For Pagination
  const [page, setPage] = useState(1);

  // * Consuming Redux Event State and auth State
  const { events, loading } = useSelector((state) => state.eventManager);

  const dispatch = useDispatch();

  // * drawer disclosure to handle open and close of drawer
  const drawer = useDisclosure();

  // *  Toast from custom hook
  const Toast = useToastComponent();

  // * function to getEvents based upon query
  const getEvents = (filterQuery = "") => {
    dispatch(getAllEvents(`page=${page}&limit=${6}${filterQuery}`, Toast));
  };

  useEffect(() => {
    getEvents();
  }, [page]);

  return (
    <div>
      <Flex flexDir={{ base: "column", sm: "column", md: "row", lg: "row" }}>
        {/* Importing Drawer Component and Filter to show Filters in the small screen */}

        <Box display={{ base: "block", sm: "block", md: "none", lg: "none" }}>
          <Button
            className={styles.filterBtn}
            colorScheme="teal"
            onClick={drawer.onOpen}
          >
            Filters
          </Button>
          <DrawerComponent
            placement={"left"}
            isOpen={drawer.isOpen}
            onClose={drawer.onClose}
          >
            <Filter getEvents={getEvents} />
          </DrawerComponent>
        </Box>

        {/* * This sidebar and filter Component will visible in the medium and large screen */}

        <Box
          className={styles.sidebar}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
        >
          <Filter getEvents={getEvents} />
        </Box>

        {/* * This block show all the events in the form of grid*/}

        <Box className={styles.events}>
          <SimpleGrid
            columns={{
              lg: "3",
              md: "2",
              sm: "2",
              base: "1",
            }}
            spacing={5}
          >
            {
              // * Map Events data here
              events?.map((event) => (
                <Skeleton
                  key={event._id}
                  isLoaded={!loading}
                >
                  <Link to={`/events/${event._id}`}>
                    <EventCard event={event} />
                  </Link>
                </Skeleton>
              ))
            }
          </SimpleGrid>
        </Box>
      </Flex>
      <Pagination
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Home;
