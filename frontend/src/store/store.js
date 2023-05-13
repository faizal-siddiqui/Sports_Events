import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";

// * Root reducer to combine all reducers

const rootReducer = combineReducers({
  authManager: authReducer,
});

// * Adding Redux Devtools Extension for testing

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//* store

export const store = legacy_createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)) //* adding thunk
);
