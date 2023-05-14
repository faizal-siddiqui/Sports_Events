import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./eventCard.module.css";

const EventCard = ({ event, buttons = null }) => {
  return (
    <Card maxW="sm">
      {/* Adding Event details in Cart Body  */}

      <CardBody className={styles.productCard}>
        <Image
          className={styles.img}
          src={event.poster}
          alt={event.event_name}
          borderRadius="lg"
          // width={"100%"}
        />

        <Stack
          className={styles.productInfo}
          mt="6"
          spacing="3"
        >
          <Heading size="md">{event.event_name}</Heading>
          <Text>{event.description}</Text>
          <Text
            color="blue.600"
            fontSize="xl"
          >
            {event.type_of_game}
          </Text>
          <Text display="block">
            <Text as="span">City - </Text>
            {event.city}
          </Text>
          <Text>
            <Text as="span">Date - </Text>
            {event.date.split("T")[0]}
          </Text>
          {buttons}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
