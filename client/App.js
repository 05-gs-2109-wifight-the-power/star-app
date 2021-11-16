import React from "react";
import { Switch, Route } from "react-router-dom";
import Routes from "./Routes";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route component={Routes} />
      </Switch>
    </div>
  );
};

export default App;
