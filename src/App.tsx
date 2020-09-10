import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Import Component */
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
