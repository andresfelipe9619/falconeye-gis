import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
export default function MostVisitedCard({ data }) {
  const classes = useStyles();

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <Grid container item md={12} alignItems="center">
          <Grid item md={4}>
            <Typography
              className={classes.bold}
              align="center"
              variant="h6"
              gutterBottom
            >
              Ubicación más visitada
            </Typography>
          </Grid>
          <Grid container item md={8}>
            {data.map(({ year, location, total }, index) => (
              <Grid
                key={index}
                container
                item
                alignItems="center"
                md={12}
                className={clsx({ [classes.borderBox]: index === 0 })}
              >
                <Grid item md={4}>
                  <Typography color="textSecondary" align="center" gutterBottom>
                    {year}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography color="textSecondary" align="center" gutterBottom>
                    {location}
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography
                    className={classes.bold}
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    {total}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const borderStyle = (theme) => [[1, "solid", theme.palette.divider]];
const useStyles = makeStyles((theme) => ({
  card: { minWidth: "100%" },
  bold: { fontWeight: "bold" },
  borderBox: {
    borderBottom: borderStyle(theme),
  },
}));
