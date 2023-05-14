import * as types from "./request.types";

const initialState = {
  eventRequests: [], //* get requests of each event created by user
  userEventStatus: "", //* specific for user, different for different events
  useEventRequests: [], //* Requests of the user who has applied in the event
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

    case types.GET_EVENT_REQUEST: {
      return {
        ...state,
        eventRequests: payload,
        loading: false,
      };
    }

    case types.GET_USER_EVENT_REQUEST: {
      return {
        ...state,
        useEventRequests: payload,
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
