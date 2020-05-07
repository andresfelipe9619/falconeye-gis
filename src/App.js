import React, { memo } from "react";
import Map from "./components/map/Map";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <Map />
    </>
  );
}

export default memo(App);
