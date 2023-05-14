import * as types from "./request.types";
import { TOAST } from "../../utils/toastType";

// * Error Function

const errorHandle = (err, dispatch, Toast) => {
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

    Toast(data.msg, TOAST.WARNING);
  }
};

//* API URL
const API_URL = `${process.env.REACT_APP_API_URL}`;

// * Create Request to Join Event
const joinEvent = () => (dispatch) => {
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
}

