import React from "react";
import RoomIcon from "@material-ui/icons/Room";
export default function SVGIcon({ color = "blue", ...props }) {
  return <RoomIcon style={{ color }} {...props} />;
}
