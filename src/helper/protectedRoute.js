import React from "react";
import { Redirect, Route } from "react-router-dom";
import MenuBar from "../components/menubar";
import Header from "../components/header";

const ProtectedRoute = ({ path, component }) => {
  var token = localStorage.getItem("token");
  return token ? (
    <>
      <Header />
      <MenuBar />
      <Route path={path} component={component} />
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
