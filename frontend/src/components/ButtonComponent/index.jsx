import AcceptedUser from "../AcceptedUser";
import PendingRequest from "./PendingRequest";

const ButtonComponent = ({ eventId }) => {
  return (
    <>
      {/* Show all the participants */}
      <AcceptedUser
        eventId={eventId}
        btnText={"Participants"}
      />

      {/* Shows all the requests which are pending */}

      <PendingRequest
        btnText={"Pending Request"}
        eventId={eventId}
      />
    </>
  );
};

export default ButtonComponent;
