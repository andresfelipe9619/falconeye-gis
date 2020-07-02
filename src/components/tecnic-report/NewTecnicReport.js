import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TecnicChart from "./TecnicChart";
import CircularProgressBar from "../circular-progress/CircularProgressBar";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AssistsRanking from "./AssistsRanking";
import DividedCard from "../data-box/DividedCard";

const colors = { con: "#f44336", pro: "#4caf50" };

export default function NewTecnicReport(props) {
  const { getData } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        let result = await getData();
        setData(result);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (loading) return <LinearProgress />;
  return (
    <Grid container spacing={2} justify="center">
      <Grid container spacing={0} item md={12} justify="space-around">
        <PieCharts data={data} />
      </Grid>
      <TecnicChart
        style={{ marginLeft: 15, marginRight: 25 }}
        data={(data || {}).lineData || []}
      />
      <Grid container item md={12}>
        <Card raised>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  className={classes.bold}
                >
                  Ranking de Asistencias
                </Typography>
              </Grid>
              {((data || {}).rankingData || []).map((item, i) => (
                <Grid container item md={4} key={i}>
                  <AssistsRanking
                    title={item.title}
                    data={item.indexes}
                    keys={["value"]}
                    color={item.color}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const PieCharts = ({ data }) =>
  ((data || {}).pieData || []).map(
    (
      {
        proName,
        conName,
        pendingValue,
        proPercentage = 0,
        proCount = 0,
        conCount = 0,
      },
      index
    ) => {
      if (!proName && !conName) return null;
      return (
        <Grid item md={4} container key={index} spacing={1}>
          <DividedCard above={conName} below={proName} hasColors />
          <Grid item md={12}>
            <Card style={{ overflow: "visible" }} raised>
              <CardContent>
                <CircularProgressBar
                  colors={colors}
                  data={[
                    {
                      id: "pro",
                      label: proName,
                      value: proCount,
                    },
                    {
                      id: "con",
                      label: conName,
                      value: conCount,
                    },
                  ]}
                  text={`${proPercentage}%`}
                />
              </CardContent>
            </Card>
          </Grid>
          <DividedCard above={"Pendiente"} below={pendingValue} hasNumber />
        </Grid>
      );
    }
  );

const useStyles = makeStyles(() => ({
  title: { fontSize: 16, marginTop: 5 },
  bold: { fontWeight: "bold" },
  number: { fontSize: 14, marginTop: 5, fontWeight: "bold" },
}));
