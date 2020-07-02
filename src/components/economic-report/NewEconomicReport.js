import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgressBar from "../circular-progress/CircularProgressBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AssistsRanking from "../tecnic-report/AssistsRanking";
import MarkedBarChart from "../mark-bar-chart/MarkedBarChart";
import { formatToUnits } from "../../utils";
import TecnicChart from "../tecnic-report/TecnicChart";
import DividedCard from "../data-box/DividedCard";

export default function NewEconomicReport(props) {
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

  if (loading) return <LinearProgress />;
  console.log("data", data);
  return (
    <Grid container spacing={2}>
      <Grid container item md={5}>
        {((data || {}).barData || []).map((item, i) => (
          <Grid container spacing={1} key={i}>
            <MarkedBarChart
              data={item.data}
              title={item.id}
              color={item.color}
              media={item.media}
              keys={["value", "media"]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container item md={7} spacing={1}>
        <Grid
          container
          item
          md={12}
          style={{ height: "fit-content" }}
          spacing={3}
        >
          {((data || {}).pieData || []).map(
            (
              {
                proName,
                conName,
                proPercentage = 0,
                proCount = 0,
                conCount = 0,
              },
              index
            ) => (
              <Grid item md={6} key={index} style={{ height: "fit-content" }}>
                <DividedCard above={conName} below={proName} hasColors />
                <Grid item md={12}>
                  <Card
                    style={{ overflow: "visible", margin: "10px 0px" }}
                    raised
                  >
                    <CardContent>
                      <CircularProgressBar
                        economic
                        colors={{ con: "#f44336", pro: "#4caf50" }}
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
                <DividedCard
                  above={"Disponibilidad"}
                  below={formatToUnits(conCount - proCount)}
                  hasNumber
                />
              </Grid>
            )
          )}
        </Grid>
      </Grid>
      <TecnicChart economic data={(data || {}).lineData || []} />
      <Grid container item md={12}>
        <Card raised>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  style={{ fontSize: 14, marginTop: 5, fontWeight: "bold" }}
                >
                  Ranking de Consumo
                </Typography>
              </Grid>
              {((data || {}).rankingData || []).map((item, i) => (
                <Grid container item md={4} key={i}>
                  <AssistsRanking
                    economic
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
