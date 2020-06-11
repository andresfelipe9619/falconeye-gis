import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function ReportCard({
  title,
  titleColor,
  percentage,
  accumulated,
  currentValue,
  currentDate,
}) {
  const classes = useStyles();
  return (
    <Card raised className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid
            item
            md={12}
            style={{ backgroundColor: titleColor }}
            className={classes.titleBox}
          >
            <Typography align="left" gutterBottom className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            container
            spacing={2}
            alignItems="center"
            className={classes.container}
          >
            <Grid
              item
              md={6}
              container
              justify="center"
              direction="column"
              alignItems="center"
              className={classes.accBox}
            >
              <Typography variant="h5" gutterBottom>
                {accumulated}
              </Typography>
              <Typography
                variant="caption"
                style={{ fontSize: 14 }}
                color="textSecondary"
                gutterBottom
              >
                {isNaN(percentage) ? `Hasta ${currentDate}` : "Acumuladas"}
              </Typography>
            </Grid>
            <Grid container item md={6}>
              <Grid
                item
                md={12}
                container
                justify="center"
                className={classes.borderBox}
              >
                <Typography color="textSecondary" variant="body1" gutterBottom>
                  {currentDate}
                </Typography>
              </Grid>
              <Grid item md={12} container>
                {isNaN(percentage) ? (
                  <Grid container justify="center">
                    <Typography gutterBottom>{currentValue}</Typography>
                  </Grid>
                ) : (
                  <PercentageBlock
                    {...{ titleColor, currentValue, percentage }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const PercentageBlock = ({ titleColor, currentValue, percentage }) => (
  <>
    <Grid item md={6}>
      <Typography variant="h6" align="center" gutterBottom>
        {currentValue}
      </Typography>
    </Grid>
    <Grid item md={6}>
      <Typography
        variant="h6"
        style={{ color: titleColor, fontWeight: "bold" }}
        align="right"
        gutterBottom
      >
        {percentage}%
      </Typography>
    </Grid>
  </>
);

const borderStyle = (theme) => [[1, "solid", theme.palette.divider]];
const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
  },
  cardContent: {
    padding: 0,
  },
  container: { padding: 10, height: "100%" },
  title: {
    fontWeight: "bold",
    color: "white",
    padding: [[4, 10]],
  },
  titleBox: { marginBottom: 10 },
  accBox: {
    borderRight: borderStyle(theme),
  },
  borderBox: {
    marginBottom: 10,
  },
}));
