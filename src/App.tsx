import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthenticationCheck from "./hoc/auth";
import AdminCheck from "./hoc/checkAdmin";
import { RoleStatus } from "./types/enum/User";

/* Import Component */
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import UpdatePage from "./components/UpdatePage/UpdatePage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

/* Import Admin Component */
import TodoList from "./components/Admin/TodoList/TodoList";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            component={AuthenticationCheck(LandingPage, true)}
          />
          <Route
            exact
            path="/login"
            component={AuthenticationCheck(LoginPage, false)}
          />
          <Route
            exact
            path="/register"
            component={AuthenticationCheck(RegisterPage, false)}
          />
          <Route
            exact
            path="/update"
            component={AuthenticationCheck(UpdatePage, true)}
          />

          {/* 관리자 페이지는 로그인 해야 하고, 관리자여야 한다 */}
          <Route exact path="/admin/todo" component={AdminCheck(TodoList)} />

          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
