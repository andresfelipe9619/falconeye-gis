import React, { useEffect, useState } from "react";
import EconomicCard from "./EconomicCard";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TecnicChart from "../tecnic-report/TecnicChart";
import HorizontalBarChart from "../horizontal-bar/HorizontalBarChart";
import { formatToUnits } from "../../utils";

export default function TecnicReport(props) {
  const { getData } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const barKeys = ["contratado", "ejecutado"];

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
  const colors = [
    "#009688",
    "#4caf50",
    "#3f51b5",
    "#03a9f4",
    "#f44336",
    "#ab47bc",
    "#cddc39",
    "#ff9800",
  ];
  if (loading) return <LinearProgress />;
  return (
    <Grid container spacing={3}>
      <Grid container spacing={4} item md={12}>
        {((data || {}).kpi || []).map(
          (
            { title, percentage, accumulated, currentValue, currentDate },
            index
          ) => (
            <Grid container key={index} item md={3}>
              <EconomicCard
                {...{
                  title,
                  percentage,
                  accumulated,
                  currentValue,
                  currentDate,
                  titleColor: colors[index],
                }}
              />
            </Grid>
          )
        )}
      </Grid>
      <TecnicChart economic data={(data || {}).lineData || []} />
      <Grid container item md={12} alignItems="center" justify="center">
        <Grid item md={7}>
          <HorizontalBarChart data={(data || {}).barData} keys={barKeys} />
        </Grid>
        <Grid item md={5} style={{ padding: "15px" }}>
          <Grid item md={12} style={{ padding: "10px" }}>
            <TableCard data={(data || {}).mostExpensive} />
          </Grid>
          <Grid item md={12}>
            <DividedCard below={(data || {}).totalExecuted} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const DividedCard = ({ below }) => (
  <Card raised>
    <CardContent>
      <Typography
        align="center"
        style={{ fontWeight: "bold" }}
        variant="h6"
        gutterBottom
      >
        Ejecutado total
      </Typography>
      <Divider />
      <Typography style={{ fontWeight: "bold" }} align="center" variant="h6">
        {formatToUnits(below, 0)}
      </Typography>
    </CardContent>
  </Card>
);

const TableCard = ({ data }) => (
  <Card raised>
    <CardContent>
      <Typography
        align="center"
        style={{ fontWeight: "bold" }}
        variant="h6"
        gutterBottom
      >
        Ubicación más costosa
      </Typography>
      {(data || []).map(({ title, location, value }, index) => (
        <Grid container item md={12} key={index} style={{ marginTop: 10 }}>
          <Grid item md={4}>
            <Typography align="center" variant="body2" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography align="center" variant="body2" gutterBottom>
              {location}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography align="center" variant="body2" gutterBottom>
              {formatToUnits(value, 0)}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </CardContent>
  </Card>
);
