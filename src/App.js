import React from "react";
import Map from "./components/map/Map";
import Dashboard from "./DashboardApp";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect } from "react-router-dom";
function App() {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route component={Map} path="/map" />
        <Route component={Dashboard} path="/dashboard" />
        <Redirect to="/dashboard" />
      </Switch>
    </>
  );
}

export default App;
