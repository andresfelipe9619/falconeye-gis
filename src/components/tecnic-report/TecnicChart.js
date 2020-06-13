import React from "react";
import { ResponsiveLine } from "@nivo/line";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { formatToUnits, formatToAbbreviation } from "../../utils";

const useStyles = makeStyles(() => ({
  container: {
    height: "500px",
  },
  card: { minWidth: "100%" },
  bold: { fontWeight: "bold" },
}));

export default function TecnicChart({ style, data, economic }) {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      md={12}
      style={{
        background: "white",
        marginTop: 25,
        marginRight: 20,
        ...style,
      }}
    >
      <Card raised style={{ width: "100%" }}>
        <div style={{ marginTop: "10px" }}>
          <Typography
            style={{ fontWeight: "bold" }}
            variant="h5"
            component="h2"
            align="center"
          >
            {economic ? "Acumulado Monetario" : "Asistencias"}
          </Typography>
        </div>
        <CardContent>
          <Grid container className={classes.container}>
            <ResponsiveLine
              data={data}
              yFormat={economic ? formatToUnits : undefined}
              margin={{ top: 5, right: 110, bottom: 80, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              enableSlices="x"
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: "",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: economic ? formatToAbbreviation : undefined,
                legend: "",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              colors={{ datum: "color" }}
              enablePoints={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 50,
                  translateY: 80,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
