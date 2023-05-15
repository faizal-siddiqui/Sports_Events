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
import { useParams } from "react-router-dom";
import useToastComponent from "../custom-hook/useToast";
import { getSingleEvents } from "../store/Event/event.action";
import * as action from "../store/Request/request.action";
import { TOAST } from "../utils/toastType";
import * as check from "../utils/check";
import AcceptedUser from "../components/AcceptedUser";

// *Small Heading And Info Component

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

// *Event Details Component

const EventDetails = () => {
  // * Consuming states from Redux State
  const { event, loading } = useSelector((state) => state.eventManager);
  const { token } = useSelector((state) => state.authManager);
  const { userEventStatus, eventAcceptedRequests } = useSelector(
    (state) => state.requestManager
  );

  const dispatch = useDispatch();

  // * getting eventId from Params of the route
  const { eventId } = useParams();

  // * getting Toast from Custom Hook
  const Toast = useToastComponent();

  useEffect(() => {
    //*When component mounts

    // * call getSingleEvent Action to get the details of the event
    dispatch(getSingleEvents(token, eventId, Toast));

    // * Call getUserRequestStatus Action to get the user request status of this event
    dispatch(action.getUserRequestStatus(token, eventId, Toast));

    //* Call getAcceptedEventRequest to get the get this event's requests which got accepted
    dispatch(action.getAcceptedEventRequest(token, eventId, Toast));
  }, []);

  const joinEventFunc = () => {
    // *if userEventStatus is not_applied then only create Request otherwise show Toast

    if (userEventStatus === "not_applied") {
      //* check Timing Expired or not

      if (check.isEventDateAndTimePassed(event.date, event.timing)) {
        Toast("Event Started You cannot join", TOAST.WARNING);

        return;
      }

      // *Here eventAcceptedRequests stores all the user who are the participant of this event that means whose request got accepted for this event

      //* check is Event Filled or not

      if (
        check.isEventFilled(eventAcceptedRequests.length, event.players_limit)
      ) {
        Toast("Event Already Filled", TOAST.WARNING);

        return;
      }

      // * If above cases are not true then create a join request of the user

      dispatch(action.joinEvent(token, eventId, Toast));

      //
    } else if (userEventStatus === "accepted") {
      // * allows user to see all the other users whose request got accepted for this event

      Toast("Your request got Accepted", TOAST.SUCCESS);

      return;
    } else if (userEventStatus === "expired") {
      Toast("Your request got expired", TOAST.WARNING);
    } else {
      Toast("You have Already Requested", TOAST.WARNING);
      return;
    }
  };

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
                onClick={joinEventFunc}
              >
                {/* * TODO: CHANGE THE DATA OF BUTTON DYNAMICALLY */}
                {userEventStatus === "not_applied" ? "JOIN" : userEventStatus}
              </Button>

              {/* Showing Other Participants of this event to Acccepted User*/}

              {userEventStatus === "accepted" ? (
                <AcceptedUser
                  btnText={"See Other Users"}
                  eventId={eventId}
                />
              ) : (
                ""
              )}
            </Box>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default EventDetails;
