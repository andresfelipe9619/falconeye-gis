import React, { lazy, Suspense, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, useLocation } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useDarkMode } from "./falcon.theme";

const Map = lazy(() => import("./components/map/Map"));
const Dashboard = lazy(() => import("./DashboardApp"));

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeConfig = createMuiTheme(theme);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("map")) {
      toggleTheme();
    }
  }, [location]);

  return (
    <MuiThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Switch>
        <Suspense fallback={""}>
          <Route component={Map} path="/map" />
          <Route component={Dashboard} path="/dashboard" />
        </Suspense>
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
