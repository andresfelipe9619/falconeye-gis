import L from "leaflet";
import React from "react";
import ReactDOMServer from "react-dom/server";
import SVGIcon from "../svg-icon/SVGIcon";
export const htmlIcon = (color) => {
  return new L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<SVGIcon color={color} />),
  });
};

const icon = (color = "blue") => {
  return new L.Icon({
    iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};
export default icon;
