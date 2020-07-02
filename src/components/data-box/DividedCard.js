import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const DividedCard = ({ above, below, hasNumber, hasColors }) => {
  const classes = useStyles();
  return (
    <Grid item md={12}>
      <Card raised className={classes.container}>
        <CardContent classes={{ root: classes.card }}>
          <Typography
            align="center"
            variant="h4"
            component="h2"
            gutterBottom
            className={classes.title}
            style={{ ...(hasColors ? colorRed : null) }}
          >
            {above}
          </Typography>
          <Divider />
          {hasNumber ? (
            <Typography
              align="center"
              variant="h4"
              component="h2"
              className={classes.number}
            >
              {below}
            </Typography>
          ) : (
            <Typography
              align="center"
              variant="h4"
              component="h2"
              className={classes.title}
              style={{ ...(hasColors ? colorGreen : null) }}
            >
              {below}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

const colorGreen = { color: "#4caf50", fontWeight: "bold" };
const colorRed = { color: "#f44336", fontWeight: "bold" };

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: 60,
  },
  card: { padding: [[0, 20]] },
  title: { fontSize: 16, marginTop: 5 },
  bold: { fontWeight: "bold" },
  number: { fontSize: 14, marginTop: 5, fontWeight: "bold" },
}));

export default DividedCard;
