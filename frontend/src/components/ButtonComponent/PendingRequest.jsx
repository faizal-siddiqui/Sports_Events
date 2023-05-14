import {
  Box,
  Button,
  Flex,
  IconButton,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import ModalComponent from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import useToastComponent from "../../custom-hook/useToast";
import * as types from "../../store/Request/request.action";

const PendingRequest = ({ btnText, eventId }) => {
  const modal = useDisclosure();

  const dispatch = useDispatch();

  const Toast = useToastComponent();

  const { token } = useSelector((state) => state.authManager);

  const { eventPendingRequests, loading } = useSelector(
    (state) => state.requestManager
  );

  // function to fetch all the pending request
  const getPendingReq = () => {
    //* Call getPendingEventRequest to  get this event's requests which is pending

    dispatch(types.getPendingEventRequest(token, eventId, Toast));

    // * open Modal
    modal.onOpen();
  };

  // function to accept the pending request
  const acceptRequest = (requestId) => {
    const updatedStatus = {
      status: "accepted",
    };

    dispatch(
      types.updateRequestStatus(token, eventId, requestId, updatedStatus, Toast)
    );
  };

  // function to reject the pending request
  const rejectRequest = (requestId) => {
    const updatedStatus = {
      status: "rejected",
    };

    dispatch(
      types.updateRequestStatus(token, eventId, requestId, updatedStatus, Toast)
    );
  };

  return (
    <Box>
      {/* Adding Modal */}

      <Button
        backgroundColor="yellow.300"
        onClick={getPendingReq}
      >
        {btnText}
      </Button>

      <ModalComponent
        title={btnText}
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        {/* Mapping Participants Name to show it into modal */}

        {eventPendingRequests?.map((request, index) => (
          <Skeleton
            key={request._id}
            isLoaded={!loading}
            m={1}
          >
            <Flex
              border="1px"
              padding={2}
              borderColor="gray.400"
              align="center"
              justify="space-between"
              my={2}
            >
              <Text fontWeight={600}>
                {`${request?.user_id.name} wants to join`}
              </Text>

              <Box>
                <IconButton
                  colorScheme="green"
                  aria-label="Send email"
                  icon={<CheckIcon />}
                  mx={2}
                  onClick={() => acceptRequest(request._id)}
                />

                <IconButton
                  colorScheme="red"
                  aria-label="Send email"
                  icon={<CloseIcon />}
                  onClick={() => rejectRequest(request._id)}
                />
              </Box>
            </Flex>
          </Skeleton>
        ))}
      </ModalComponent>
    </Box>
  );
};

export default PendingRequest;
