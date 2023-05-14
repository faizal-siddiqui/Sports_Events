import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";
import EventDetails from "../pages/EventDetails";
import UserEvents from "../pages/UserEvents";
import RequestSummary from "../pages/RequestSummary";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const RoutesComponent = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/auth"
          element={<Authentication />}
        />
        <Route
          path="/events/:eventId"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/events"
          element={
            <PrivateRoute>
              <UserEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/request/summary"
          element={
            <PrivateRoute>
              <RequestSummary />
            </PrivateRoute>
          }
        />
        <Route
          path="/*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

export default RoutesComponent;
