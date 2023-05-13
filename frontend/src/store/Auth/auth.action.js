// * To store token in cookie

import { TOAST } from "../../utils/toastType";
import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_SIGNUP,
} from "./auth.types";

const saveToken = (token) => {
  // Get the current date and time
  const currentDate = new Date();
  // Set the expiry time to 24 hours from the current time
  const expiryDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  // Set the cookie with the expiry time
  document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/;`;
};

//* API URL
const API_URL = `${process.env.REACT_APP_API_URL}`;

//* SignUp Action

export const signUpUser =
  (userCreds, Toast, showLoginComponent) => async (dispatch) => {
    // * LOADING
    dispatch({ type: AUTH_LOADING });

    try {
      // *getting Response Promise

      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify(userCreds),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   * resolving response

      const data = await response.json();

      /**
       * * checking all the response codes and based upon that passing responses
       * * Toast - To showcase Toast message to client
       */

      if (response.status === 201) {
        Toast(data.msg, TOAST.SUCCESS);

        // * Render Login Component on success
        showLoginComponent();

        // * SIGNUP SUCCESS
        dispatch({ type: AUTH_SIGNUP });
      } else if (response.status === 500) {
        console.log("error", data);

        Toast(data.err, TOAST.ERROR);
      } else {
        console.log("warning", data);

        Toast(data.msg, TOAST.WARNING);
      }
    } catch (err) {
      // * ERROR
      dispatch({ type: AUTH_ERROR });

      console.log("err:", err);

      // * Toast msg
      Toast(err.msg, TOAST.ERROR);
    }
  };

//   * Login User

export const loginUser = (userCreds, Toast, navigate) => async (dispatch) => {
  // * LOADING
  dispatch({ type: AUTH_LOADING });

  try {
    // *getting Response Promise

    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(userCreds),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //   * resolving response

    const data = await response.json();

    /**
     * * checking all the response codes and based upon that passing responses
     * * Toast - To showcase Toast message to client
     */

    if (response.status === 200) {
      //   * Dispatching action and token as payload to store
      dispatch({ type: AUTH_LOGIN, payload: data.token });

      //   * Save Token on Cookies
      saveToken(data.token);

      Toast(data.msg, TOAST.SUCCESS);

      //   * Navigate user to home page
      navigate("/");
    } else if (response.status === 500) {
      console.log("error", data);

      Toast(data.err, TOAST.ERROR);
    } else {
      console.log("warning", data);

      Toast(data.msg, TOAST.WARNING);
    }
  } catch (err) {
    // * ERROR
    dispatch({ type: AUTH_ERROR });

    console.log("err:", err);
    Toast(err.msg, TOAST.ERROR);
  }
};
