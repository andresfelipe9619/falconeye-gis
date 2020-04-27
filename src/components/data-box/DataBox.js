import React from "react";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { formatToUnits } from "../../utils";

const DataBox = ({ text, number, className, small, currency }) => (
  <Box m={1} flexDirection="column" justifyContent="center" alignItems="center">
    <Typography
      align="center"
      className={className}
      component={small ? "h3" : "h2"}
      variant={small ? "body1" : "h6"}
    >
      {currency ? formatToUnits(number) : number}
    </Typography>
    {text && (
      <Typography
        align={!currency ? "left" : "center"}
        className={className}
        variant="body2"
      >
        {text}
      </Typography>
    )}
  </Box>
);
export default DataBox;
