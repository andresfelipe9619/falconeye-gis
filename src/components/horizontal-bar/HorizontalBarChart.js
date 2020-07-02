import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { formatToUnits, formatToAbbreviation } from "../../utils/index";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.

const borderStyle = (theme) => [[1, "solid", theme.palette.divider]];
const useStyles = makeStyles((theme) => ({
  container: {
    height: 250,
  },
  card: { minWidth: "100%" },
  bold: { fontWeight: "bold" },
  borderBox: {
    borderBottom: borderStyle(theme),
  },
}));

const HorizontalBarChart = ({ data, keys }) => {
  const classes = useStyles();

  return (
    <Card raised className={classes.card}>
      <div style={{ marginTop: "10px" }}>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold" }}
          component="h2"
          align="center"
        >
          Gastos vs Contratado
        </Typography>
      </div>
      <CardContent>
        <Grid container className={classes.container}>
          <ResponsiveBar
            layout="horizontal"
            data={data}
            keys={keys}
            indexBy="assistanceType"
            margin={{ top: 5, right: 100, bottom: 80, left: 100 }}
            padding={0.2}
            innerPadding={3}
            colors={({ id, data }) => data[`${id}Color`]}
            groupMode="grouped"
            enableGridY={false}
            enableGridX={true}
            enableLabel={false}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: formatToAbbreviation,
              //     {
              // 	tickSize: 0,
              // 	tickPadding: 0,
              // 	tickRotation: 0,
              // 	legend: '',
              // 	legendPosition: 'middle',
              // 	legendOffset: 32,
              // }
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 15,
                translateY: 60,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            tooltip={({ id, value, color }) => (
              <strong style={{ color }}>
                {id}: {formatToUnits(value, 0)}
              </strong>
            )}
            theme={{
              tooltip: {
                container: {
                  background: "#333",
                },
              },
            }}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HorizontalBarChart;
