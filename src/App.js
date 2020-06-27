import React, { lazy, Suspense } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Link } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDarkMode } from "./falcon.theme";

const Map = lazy(() => import("./components/map/Map"));
const Dashboard = lazy(() => import("./DashboardApp"));

function App() {
  const [theme] = useDarkMode();
  const themeConfig = createMuiTheme(theme);

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Switch>
        <Suspense fallback={""}>
          <Route component={MainRoutes} path="/" strict exact />
          <Route component={Map} path="/map" />
          <Route component={Dashboard} path="/dashboard" />
        </Suspense>
      </Switch>
    </MuiThemeProvider>
  );
}

const MainRoutes = () => (
  <>
    <h2>Avaialable routes:</h2>
    <ul>
      <li>
        <Link to="/map">/map</Link>
      </li>
      <li>
        <Link to="/dashboard">/dashboard</Link>
      </li>
    </ul>
  </>
);
export default App;
