import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Import Component */
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UpdatePage from "./components/UpdatePage/UpdatePage";

import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/update" component={UpdatePage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
