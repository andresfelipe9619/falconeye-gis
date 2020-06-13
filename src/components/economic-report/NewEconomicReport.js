import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgressBar from "../circular-progress/CircularProgressBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AssistsRanking from "../tecnic-report/AssistsRanking";
import MarkedBarChart from "../mark-bar-chart/MarkedBarChart";
import { formatToUnits } from "../../utils";
import TecnicChart from "../tecnic-report/TecnicChart";

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
      <Grid container item md={5} direction="column" justify="space-between">
        {((data || {}).barData || []).map((item, i) => (
          <Grid container key={i}>
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

      <Grid container item md={7} spacing={1} justify="space-between">
        {((data || {}).pieData || []).map(
          (
            { proName, conName, proPercentage = 0, proCount = 0, conCount = 0 },
            index
          ) => (
            <Grid
              item
              md={6}
              container
              key={index}
              spacing={1}
              diirection="column"
            >
              <DividedCard above={conName} below={proName} hasColors />
              <Grid item md={12}>
                <Card style={{ overflow: "visible" }} raised>
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
                  style={numberStyle}
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

const DividedCard = ({ above, below, hasNumber, hasColors }) => (
  <Grid item md={12} style={{ margin: "0px" }}>
    <Card raised>
      <CardContent>
        <Typography
          align="center"
          variant="h3"
          gutterBottom
          style={{ ...titleStyle, ...(hasColors ? colorRed : null) }}
        >
          {above}
        </Typography>
        <Divider />
        {hasNumber ? (
          <Typography align="center" variant="h3" style={numberStyle}>
            {below}
          </Typography>
        ) : (
          <Typography
            align="center"
            variant="h3"
            style={{ ...titleStyle, ...(hasColors ? colorGreen : null) }}
          >
            {below}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Grid>
);

const numberStyle = {
  fontSize: 20,
  marginTop: 10,
  fontWeight: "bold",
};

const colorGreen = { color: "#4caf50", fontWeight: "bold" };
const colorRed = { color: "#f44336", fontWeight: "bold" };

const titleStyle = { fontSize: 18, marginTop: 10 };
