import { TOAST } from "../../utils/toastType";
import * as types from "./event.types";

// * Error Function

const errorHandle = (err, dispatch, Toast) => {
  console.log("err:", err);

  // ! ERROR
  dispatch({ type: types.EVENT_ERROR });

  // * Toast msg
  Toast(err.msg, TOAST.ERROR);
};

// * Warning Function

const warningHandle = (response, data, Toast, dispatch) => {
  // * If the response code is 500 then showcase error in the Toast

  if (response.status === 500) {
    // console.log("error", data);

    Toast(data.err, TOAST.ERROR);

    // * dispatching action for error
    dispatch({ type: types.EVENT_ERROR });

    // * If the response code not success not error then all other codes will be handled in else part
  } else {
    console.log("warning", data);

    Toast(data.msg, TOAST.WARNING);
    dispatch({ type: types.EVENT_ERROR });
  }
};

//* API URL
const API_URL = `${process.env.REACT_APP_API_URL}`;

// * Get All the Events
export const getAllEvents =
  (query = "", Toast) =>
  async (dispatch) => {
    // * LOADING
    dispatch({ type: types.EVENT_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(`${API_URL}/api/events?${query}`);

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Event and passing events in payload
        dispatch({ type: types.GET_ALL_EVENTS, payload: data.data });

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };

// * Get User Events
export const getUserEvents = (token, Toast) => async (dispatch) => {
  // * LOADING
  dispatch({ type: types.EVENT_LOADING });

  try {
    // *getting Response Object

    const response = await fetch(`${API_URL}/api/user/events`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    //   * resolving response

    const data = await response.json();

    /**
     * * checking all the response codes and based upon that passing actions
     * * Toast - To showcase Toast message to client
     */

    // * SUCCESS
    if (response.status === 200) {
      // * Dispatching Event and passing events data in payload
      dispatch({ type: types.GET_USER_EVENTS, payload: data.data });

      // !ERROR
    } else {
      warningHandle(response, data, Toast, dispatch);
    }
  } catch (err) {
    errorHandle(err, dispatch, Toast);
  }
};

// * Get Single Event
export const getSingleEvents = (token, eventId, Toast) => async (dispatch) => {
  // * LOADING
  dispatch({ type: types.EVENT_LOADING });

  try {
    // *getting Response Object

    const response = await fetch(`${API_URL}/api/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, //* Passed token
      },
    });

    //   * resolving response

    const data = await response.json();

    /**
     * * checking all the response codes and based upon that passing actions
     * * Toast - To showcase Toast message to client
     */

    // * SUCCESS
    if (response.status === 200) {
      // * Dispatching Event and passing events data in payload
      dispatch({ type: types.GET_SINGLE_EVENT, payload: data.data });

      // !ERROR
    } else {
      warningHandle(response, data, Toast, dispatch);
    }
  } catch (err) {
    errorHandle(err, dispatch, Toast);
  }
};

// * Create Event
export const createEvent = (token, eventData, Toast) => async (dispatch) => {
  // * LOADING
  dispatch({ type: types.EVENT_LOADING });

  try {
    // *getting Response Object

    const response = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, //* Passed token
      },
    });

    //   * resolving response

    const data = await response.json();

    /**
     * * checking all the response codes and based upon that passing actions
     * * Toast - To showcase Toast message to client
     */

    // * SUCCESS
    if (response.status === 201) {
      // * Dispatching Add Event
      dispatch({ type: types.ADD_EVENT });

      // * calling getAllEvents and getUserEvents to update the existing data in Redux State
      dispatch(getAllEvents("", Toast));

      dispatch(getUserEvents(token, Toast));

      Toast(data.msg, TOAST.SUCCESS);

      // !ERROR
    } else {
      warningHandle(response, data, Toast, dispatch);
    }
  } catch (err) {
    errorHandle(err, dispatch, Toast);
  }
};

// * Update Event
export const updateEvent =
  (token, eventUpdatedData, eventId, Toast) => async (dispatch) => {
    // * LOADING
    dispatch({ type: types.EVENT_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "PATCH",
        body: JSON.stringify(eventUpdatedData),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, //* Passed token
        },
      });

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Add Event
        dispatch({ type: types.UPDATE_EVENT });

        // * calling getAllEvents and getUserEvents to update the existing data in Redux State
        dispatch(getAllEvents("", Toast));

        dispatch(getUserEvents(token, Toast));

        Toast(data.msg, TOAST.SUCCESS);

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };

// * Delete Event
export const deleteEvent = (token, eventId, Toast) => async (dispatch) => {
  // * LOADING
  dispatch({ type: types.EVENT_LOADING });

  try {
    // *getting Response Object

    const response = await fetch(`${API_URL}/api/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, //* Passed token
      },
    });

    //   * resolving response

    const data = await response.json();

    /**
     * * checking all the response codes and based upon that passing actions
     * * Toast - To showcase Toast message to client
     */

    // * SUCCESS
    if (response.status === 200) {
      // * Dispatching Add Event
      dispatch({ type: types.DELETE_EVENT });

      // * calling getAllEvents and getUserEvents to update the existing data in Redux State
      dispatch(getAllEvents("", Toast));

      dispatch(getUserEvents(token, Toast));

      Toast(data.msg, TOAST.SUCCESS);

      // !ERROR
    } else {
      warningHandle(response, data, Toast, dispatch);
    }
  } catch (err) {
    errorHandle(err, dispatch, Toast);
  }
};
