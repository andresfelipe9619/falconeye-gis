import React from "react";
import RoomIcon from "@material-ui/icons/Room";
export default function SVGIcon({ color = "#2196f3", ...props }) {
  return <RoomIcon style={{ color }} {...props} />;
}
