import React, { useEffect, useState } from "react";
import ReportCard from "../report-card/ReportCard";
import MostVisitedCard from "../report-card/MostVisitedCard";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TecnicChart from "./TecnicChart";

export default function TecnicReport(props) {
  const { getData } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
    <Grid container spacing={1}>
      <Grid container spacing={2} item md={12}>
        {(data.kpi || []).map(
          (
            { title, percentage, accumulated, currentValue, currentDate },
            index
          ) => (
            <Grid container key={index} item md={3}>
              <ReportCard
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
      <TecnicChart data={(data || {}).lineData || []} />
      <Grid container item md={12} alignItems="center" justify="center">
        <Grid container item md={8}>
          <MostVisitedCard data={data.mostVisited || []} />
        </Grid>
      </Grid>
    </Grid>
  );
}
