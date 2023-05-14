import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToastComponent from "../custom-hook/useToast";
import { getUserEvents } from "../store/Event/event.action";
import { Button, SimpleGrid, Skeleton } from "@chakra-ui/react";
import EventCard from "../components/EventCard";

const ButtonComponent = () => {
  return (
    <>
      <Button backgroundColor={"green.400"}>Partcipants - {3}</Button>
      <Button backgroundColor={"yellow.400"}>Requests - {3}</Button>
    </>
  );
};

const UserEvents = () => {
  // * Consuming Redux Event State and auth State
  const { userEvents, loading } = useSelector((state) => state.eventManager);
  const { token } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();

  // *  Toast from custom hook
  const Toast = useToastComponent();

  useEffect(() => {
    dispatch(getUserEvents(token, Toast));
  }, []);
  return (
    <div>
      <SimpleGrid
        columns={{
          lg: "4",
          md: "3",
          sm: "2",
          base: "1",
        }}
        spacing={5}
      >
        {
          // * Map Events data here
          userEvents?.map((event) => (
            <Skeleton
              key={event._id}
              isLoaded={!loading}
            >
              {/* <Link to={`/events/${event._id}`}> */}
              <EventCard
                event={event}
                buttons={<ButtonComponent />}
              />
              {/* </Link> */}
            </Skeleton>
          ))
        }
      </SimpleGrid>
    </div>
  );
};

export default UserEvents;
