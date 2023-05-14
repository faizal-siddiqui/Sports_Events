import {
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../store/Request/request.action";
import useToastComponent from "../custom-hook/useToast";
import TableComponent from "../components/TableComponent";

const RequestSummary = () => {
  const { token } = useSelector((state) => state.authManager);

  const { userAcceptedEventRequests, userRequestedEventRequests, loading } =
    useSelector((state) => state.requestManager);

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

  // * while mounting call accepted request

  useEffect(() => {
    acceptedRequest();
  }, []);

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
            <Skeleton isLoaded={!loading}>
              <TableComponent userEventRequests={userAcceptedEventRequests} />
            </Skeleton>
          </TabPanel>
          <TabPanel>
            <Skeleton isLoaded={!loading}>
              <TableComponent userEventRequests={userRequestedEventRequests} />
            </Skeleton>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default RequestSummary;
