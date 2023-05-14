import { Box, Button, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ModalComponent from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import useToastComponent from "../../custom-hook/useToast";
import { getAcceptedEventRequest } from "../../store/Request/request.action";

const AcceptedUser = ({ eventId, btnText }) => {
  const modal = useDisclosure();

  const dispatch = useDispatch();

  const Toast = useToastComponent();

  const { token } = useSelector((state) => state.authManager);

  const { eventAcceptedRequests, loading } = useSelector(
    (state) => state.requestManager
  );

  const getAcceptedReq = () => {
    //* Call getAcceptedEventRequest to  get this event's requests which got accepted

    dispatch(getAcceptedEventRequest(token, eventId, Toast));

    // * open Modal
    modal.onOpen();
  };

  return (
    <Box>
      {/* Adding Modal */}

      <Button
        my="3"
        backgroundColor="yellow.300"
        onClick={getAcceptedReq}
      >
        {btnText}
      </Button>

      <ModalComponent
        title={"All Participants"}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        {/* Mapping Participants Name to show it into modal */}

        {eventAcceptedRequests?.map((request, index) => (
          <Skeleton
            key={request._id}
            isLoaded={!loading}
            m={1}
          >
            <Text fontWeight={600}>{`${index + 1} -  ${
              request?.user_id.name
            }`}</Text>
          </Skeleton>
        ))}
      </ModalComponent>
    </Box>
  );
};

export default AcceptedUser;
