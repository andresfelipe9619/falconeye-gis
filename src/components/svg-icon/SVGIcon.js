import React from "react";
import RoomTwoToneIcon from '@material-ui/icons/RoomTwoTone';
export default function SVGIcon({ color = "#2d82cb", ...props }) {
  return <RoomTwoToneIcon fontSize="large" style={{ color }} {...props} />;
}
