import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ path, component }) => {
  var token = localStorage.getItem("token");
  return token ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
