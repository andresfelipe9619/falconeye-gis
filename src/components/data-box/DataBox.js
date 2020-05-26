import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { formatToUnits } from "../../utils";

const DataBox = (props) => {
  if (props.currency) return <CurrencyBox {...props} />;
  const { text, number, style, small } = props;
  return (
    <Box
      m={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        align="center"
        style={style}
        component={small ? "h3" : "h2"}
        variant={small ? "body1" : "h6"}
      >
        {number}
      </Typography>
      {text && (
        <Typography align={"left"} style={style} variant="body2">
          {text}
        </Typography>
      )}
    </Box>
  );
};

export const CurrencyBox = ({ text, number, style, small, shortLabel }) => (
  <Grid container spacing={0} alignItems="center">
    {text && (
      <Grid item md={shortLabel ? 2 : 6}>
        <Typography
          align="left"
          style={style}
          component="h3"
          variant="body2"
        >
          {text}
        </Typography>
      </Grid>
    )}
    <Grid item md={shortLabel ? 10 : 6}>
      <Typography
        align="right"
        style={style}
        variant={small ? "body2" : "body1"}
      >
        {formatToUnits(number)}
      </Typography>
    </Grid>
  </Grid>
);

export default DataBox;
