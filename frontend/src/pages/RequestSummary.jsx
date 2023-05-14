import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../store/Request/request.action";
import useToastComponent from "../custom-hook/useToast";
import TableComponent from "../components/TableComponent";

const RequestSummary = () => {
  const { token } = useSelector((state) => state.authManager);

  const { userAcceptedEventRequests, userRequestedEventRequests } = useSelector(
    (state) => state.requestManager
  );

  const dispatch = useDispatch();

  const Toast = useToastComponent();

  // * dispatch action to get the accepted requests of the user
  const acceptedRequest = () => {
    dispatch(types.getUserAcceptedRequests(token, Toast));
  };

  // * dispatch action to get the rejected requests of the user
  const rejectedRequest = () => {
    let status = "status=pending&status=rejected";

    dispatch(types.getUserRequestedRequests(token, Toast, status));
  };

  return (
    <div>
      <Tabs
        colorScheme="teal"
        isFitted
        variant="solid-rounded"
      >
        <TabList mb="1em">
          <Tab onClick={acceptedRequest}>Accepted Request</Tab>
          <Tab onClick={rejectedRequest}>Requested Request</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableComponent userEventRequests={userAcceptedEventRequests} />
          </TabPanel>
          <TabPanel>
            <TableComponent userEventRequests={userRequestedEventRequests} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default RequestSummary;
