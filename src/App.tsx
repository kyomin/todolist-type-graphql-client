import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./hoc/auth";

/* Import Component */
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UpdatePage from "./components/UpdatePage/UpdatePage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/update" component={Auth(UpdatePage, true)} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
