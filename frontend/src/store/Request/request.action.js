import * as types from "./request.types";
import { TOAST } from "../../utils/toastType";

// * Error Function

const errorHandle = (err, dispatch, Toast) => {
  console.log("Toast:", Toast);
  console.log("err:", err);

  // ! ERROR
  dispatch({ type: types.REQUEST_ERROR });

  // * Toast msg
  Toast(err.msg, TOAST.ERROR);
};

// * Warning Function

const warningHandle = (response, data, Toast, dispatch) => {
  // * If the response code is 500 then showcase error in the Toast

  if (response.status === 500) {
    console.log("error", data);

    Toast(data.err, TOAST.ERROR);

    // * dispatching action for error
    dispatch({ type: types.REQUEST_ERROR });

    // * If the response code not success not error then all other codes will be handled in else part
  } else {
    console.log("warning", data);

    dispatch({ type: types.REQUEST_ERROR });

    Toast(data.msg, TOAST.WARNING);
  }
};

//* API URL
const API_URL = `${process.env.REACT_APP_API_URL}`;

// * Create Request to Join Event
export const updateRequestStatus =
  (token, eventId, requestId, updatedStatus, Toast) => async (dispatch) => {
    // * LOADING
    dispatch({ type: types.REQUEST_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(
        `${API_URL}/api/events/${eventId}/requests/${requestId}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedStatus),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, //* Passed token
          },
        }
      );

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Update Request Status action
        dispatch({ type: types.UPDATE_REQUEST_STATUS });

        // * Updating Pending Requests
        dispatch(getPendingEventRequest(token, eventId, Toast));

        Toast(data.msg, TOAST.SUCCESS);

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };

// * Filter Accepted Event Request
export const getAcceptedEventRequest =
  (token, eventId, Toast) => async (dispatch) => {
    // * LOADING
    dispatch({ type: types.REQUEST_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(
        `${API_URL}/api/events/${eventId}/requests?status=accepted`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, //* Passed token
          },
        }
      );

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Get Event Request action
        // *passed eventRequests as payload
        dispatch({
          type: types.GET_ACCEPTED_EVENT_REQUEST,
          payload: data.data,
        });

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };

// * Filter Pending Event Request
export const getPendingEventRequest =
  (token, eventId, Toast) => async (dispatch) => {
    // * LOADING
    dispatch({ type: types.REQUEST_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(
        `${API_URL}/api/events/${eventId}/requests?status=pending`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, //* Passed token
          },
        }
      );

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Get Event Request action
        // *passed eventRequests as payload
        dispatch({ type: types.GET_PENDING_EVENT_REQUEST, payload: data.data });

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };

// * 	Get the Status of user event Request
export const getUserRequestStatus =
  (token, eventId, Toast) => async (dispatch) => {
    // * LOADING
    dispatch({ type: types.REQUEST_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(
        `${API_URL}/api/user/${eventId}/request/status`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, //* Passed token
          },
        }
      );

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Get User Event Status action
        // * Passed user request status in payload
        dispatch({ type: types.GET_USER_EVENT_STATUS, payload: data.status });

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };

// * Create Request to Join Event
export const joinEvent = (token, eventId, Toast) => async (dispatch) => {
  // * LOADING
  dispatch({ type: types.REQUEST_LOADING });

  try {
    // *getting Response Object

    const response = await fetch(`${API_URL}/api/events/${eventId}/requests`, {
      method: "POST",
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
      // * Dispatching Join Request action
      dispatch({ type: types.JOIN_REQUEST });

      // * Update the User request also
      dispatch(getUserRequestStatus(token, eventId, Toast));

      Toast(data.msg, TOAST.SUCCESS);

      // !ERROR
    } else {
      warningHandle(response, data, Toast, dispatch);
    }
  } catch (err) {
    errorHandle(err, dispatch, Toast);
  }
};

// * 	Get the List of Accepted Requests a user has join to
export const getUserAcceptedRequests = (token, Toast) => async (dispatch) => {
  // * LOADING
  dispatch({ type: types.REQUEST_LOADING });

  try {
    // *getting Response Object

    const response = await fetch(
      `${API_URL}/api/user/events/requests?status=accepted`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, //* Passed token
        },
      }
    );

    //   * resolving response

    const data = await response.json();

    /**
     * * checking all the response codes and based upon that passing actions
     * * Toast - To showcase Toast message to client
     */

    // * SUCCESS
    if (response.status === 200) {
      // * Dispatching Get User Event Request action
      // * Passed userEventRequest data in payload
      dispatch({
        type: types.GET_USER_ACCEPTED_EVENT_REQUEST,
        payload: data.data,
      });

      // !ERROR
    } else {
      warningHandle(response, data, Toast, dispatch);
    }
  } catch (err) {
    errorHandle(err, dispatch, Toast);
  }
};

// * 	Get the List of requested Requests a user has join to
export const getUserRequestedRequests =
  (token, Toast, status = "") =>
  async (dispatch) => {
    // * LOADING
    dispatch({ type: types.REQUEST_LOADING });

    try {
      // *getting Response Object

      const response = await fetch(
        `${API_URL}/api/user/events/requests?${status}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, //* Passed token
          },
        }
      );

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing actions
       * * Toast - To showcase Toast message to client
       */

      // * SUCCESS
      if (response.status === 200) {
        // * Dispatching Get User Event Request action
        // * Passed userEventRequest data in payload
        dispatch({
          type: types.GET_USER_REQUESTED_EVENT_REQUEST,
          payload: data.data,
        });

        // !ERROR
      } else {
        warningHandle(response, data, Toast, dispatch);
      }
    } catch (err) {
      errorHandle(err, dispatch, Toast);
    }
  };
