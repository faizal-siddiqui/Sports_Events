import * as types from "./request.types";

const initialState = {
  eventAcceptedRequests: [], //* get accepted requests of each event created by user
  eventPendingRequests: [], //* get pending requests of each event created by user
  userEventStatus: "", //* specific for user, different for different events
  userAcceptedEventRequests: [], //* Accepted Requests of the user who has applied in the event
  userRequestedEventRequests: [], //* Requested Requests of the user who has applied in the event
  loading: false,
  error: false,
};

export const requestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.REQUEST_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case types.REQUEST_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    case types.JOIN_REQUEST:
    case types.UPDATE_REQUEST_STATUS: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.GET_USER_EVENT_STATUS: {
      return {
        ...state,
        userEventStatus: payload,
        loading: false,
      };
    }

    case types.GET_ACCEPTED_EVENT_REQUEST: {
      return {
        ...state,
        eventAcceptedRequests: payload,
        loading: false,
      };
    }

    case types.GET_PENDING_EVENT_REQUEST: {
      return {
        ...state,
        eventPendingRequests: payload,
        loading: false,
      };
    }

    case types.GET_USER_ACCEPTED_EVENT_REQUEST: {
      return {
        ...state,
        userAcceptedEventRequests: payload,
        loading: false,
      };
    }

    case types.GET_USER_REQUESTED_EVENT_REQUEST: {
      return {
        ...state,
        userRequestedEventRequests: payload,
        loading: false,
      };
    }

    case types.REQUEST_RESET: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};
