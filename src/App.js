import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Plan from './pages/plan';
import ProtectedRoute from './helper/protectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/home" component={Home} />
          <ProtectedRoute path="/plan" component={Plan} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
