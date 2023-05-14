import * as types from "./auth.types";

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
    case types.AUTH_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case types.AUTH_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    case types.AUTH_SIGNUP: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.AUTH_LOGIN: {
      return {
        ...state,
        auth: true,
        loading: false,
        token: payload,
      };
    }

    case types.AUTH_RESET: {
      return {
        ...initialState,
        token: "",
        auth: false,
      };
    }

    default: {
      return state;
    }
  }
};
