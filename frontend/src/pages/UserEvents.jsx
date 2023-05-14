import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToastComponent from "../custom-hook/useToast";
import { getUserEvents } from "../store/Event/event.action";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import EventCard from "../components/EventCard";
import ButtonComponent from "../components/ButtonComponent";

const UserEvents = () => {
  // * Consuming Redux Event State and auth State
  const { userEvents, loading } = useSelector((state) => state.eventManager);
  const { token } = useSelector((state) => state.authManager);

  const dispatch = useDispatch();

  // *  Toast from custom hook
  const Toast = useToastComponent();

  useEffect(() => {
    // * getUserEvents to get all the events of the registered user

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
                buttons={<ButtonComponent eventId={event._id} />}
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
