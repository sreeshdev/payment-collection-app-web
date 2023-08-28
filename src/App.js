import "./App.css";
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Plan from "./pages/customer";
import ProtectedRoute from "./helper/protectedRoute";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/customer" component={Plan} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
