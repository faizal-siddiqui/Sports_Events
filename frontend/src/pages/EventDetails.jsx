import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import styles from "../styles/EventDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEvents } from "../store/Event/event.action";
import { useParams } from "react-router-dom";
import useToastComponent from "../custom-hook/useToast";

const HeadAndInfo = ({ children, head }) => {
  return (
    <Text
      my={2}
      display="block"
    >
      <Text
        className={styles.head}
        as="span"
      >
        {head}
      </Text>
      {children}
    </Text>
  );
};

const EventDetails = () => {
  // * Consuming event and token from Redux State
  const { event, loading } = useSelector((state) => state.eventManager);
  const { token } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();

  // * getting eventId from Params of the route
  const { eventId } = useParams();

  // * getting Toast from Custom Hook
  const Toast = useToastComponent();

  useEffect(() => {
    // * call getSingle Event When component mounts

    dispatch(getSingleEvents(token, eventId, Toast));
  }, []);

  return (
    <Box p={{ lg: "7", base: "5" }}>
      <Flex flexDir={{ lg: "row", md: "row", sm: "row", base: "column" }}>
        {/* Event Image */}
        <Box className={styles.imageBox}>
          <Skeleton isLoaded={!loading}>
            <Image
              src={event?.poster}
              alt={event?.event_name}
              borderRadius="lg"
              width={"100%"}
            />
          </Skeleton>
        </Box>

        {/* Event Details */}

        <Box className={styles.detailsBox}>
          {/* Event Heading */}

          <Skeleton
            my={4}
            isLoaded={!loading}
          >
            <Heading size="lg">{event?.event_name}</Heading>
          </Skeleton>

          {/* Event Other Details */}
          <Skeleton isLoaded={!loading}>
            <Box my={9}>
              <Text>{event?.description}</Text>

              <Text
                color="blue.600"
                fontSize="xl"
              >
                {event?.type_of_game}
              </Text>

              <HeadAndInfo head={"City - "}>{event?.city}</HeadAndInfo>

              <HeadAndInfo head={"Date - "}>
                {event?.date?.split("T")[0]}
              </HeadAndInfo>

              <HeadAndInfo head={"Timings - "}>
                {/* *
                 * Adding AM/PM in timing based upon the time
                 *
                 *  Split time by `:`
                 *  check
                 *  if (hour time < 12) => AM
                 *  if (hour time >= 12) => PM
                 */}

                {+event?.timing?.split(":")[0] < 12
                  ? event?.timing + " AM"
                  : event?.timing + " PM"}
              </HeadAndInfo>

              <HeadAndInfo head={"Address - "}>{event?.address}</HeadAndInfo>

              <HeadAndInfo head={"Player Limit-"}>
                {event?.players_limit}
              </HeadAndInfo>

              {/* Join Button */}

              <Button
                backgroundColor="teal.400"
                className={styles.joinBtn}
              >
                JOIN
              </Button>
            </Box>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default EventDetails;
