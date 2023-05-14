import * as types from "./event.types";

const initialState = {
  events: [], //* all events
  userEvents: [], //* user created events
  event: {}, //* events with some id
  loading: false,
  error: false,
};

export const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.EVENT_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case types.EVENT_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    case types.GET_ALL_EVENTS: {
      // * Here we will get all the events in the payload
      return {
        ...state,
        events: payload,
        loading: false,
      };
    }

    case types.GET_USER_EVENTS: {
      // * Here we will only those events which is created by current user
      return {
        ...state,
        userEvents: payload,
        loading: false,
      };
    }

    case types.GET_SINGLE_EVENT: {
      // * Here we will only an event of id eventId
      return {
        ...state,
        event: payload,
        loading: false,
      };
    }

    // * For Add , Update, and Delete the return statement will be same
    case types.ADD_EVENT:
    case types.UPDATE_EVENT:
    case types.DELETE_EVENT: {
      return {
        ...state,
        loading: false,
      };
    }

    // * To reset the redux state after logging out of user
    case types.EVENT_RESET: {
      return {
        ...initialState,
        events: state.events,
      };
    }

    default: {
      return state;
    }
  }
};
