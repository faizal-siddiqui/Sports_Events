import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

const RequestSummary = () => {
  return (
    <div>
      <Tabs
        colorScheme="teal"
        isFitted
        variant="solid-rounded"
      >
        <TabList mb="1em">
          <Tab>Accepted Request</Tab>
          <Tab>Pending Request</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default RequestSummary;
