import L from "leaflet";
import React from "react";
import ReactDOMServer from "react-dom/server";
import SVGIcon from "../svg-icon/SVGIcon";
const icon = (color) => {
  return new L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<SVGIcon color={color} />),
  });
};
export default icon;
