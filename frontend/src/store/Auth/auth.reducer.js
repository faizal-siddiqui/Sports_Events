import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_RESET,
  AUTH_SIGNUP,
} from "./auth.types";

const findtoken = () => {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];
};

const initialState = {
  auth: findtoken() ? true : false,
  token: findtoken() ? findtoken() : "",
  loading: false,
  error: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  // * applying switch Case on action types

  switch (type) {
    case AUTH_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    case AUTH_SIGNUP: {
      return {
        ...state,
        loading: false,
      };
    }
    case AUTH_LOGIN: {
      return {
        ...state,
        auth: true,
        loading: false,
        token: payload,
      };
    }
    case AUTH_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
