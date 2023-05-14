import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.authManager);

  if (auth) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default PrivateRoute;
