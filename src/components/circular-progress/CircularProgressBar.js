import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { formatToUnits } from "../../utils";
const margin = { top: 0, right: 0, bottom: 0, left: "5%" };

const styles = {
  root: {
    textAlign: "center",
    position: "relative",
    width: 300,
    height: 250,
    margin: "0px auto",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: margin.right,
    bottom: 0,
    left: margin.left,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "center",
    // This is important to preserve the chart interactivity
    pointerEvents: "none",
  },
};

const theme = {
  background: "white",
  axis: {
    fontSize: "14px",
    tickColor: "#eee",
    ticks: {
      line: {
        stroke: "#555",
      },
      text: {
        fill: "#fff",
      },
    },
    legend: {
      text: {
        fill: "#aaa",
      },
    },
  },
  grid: {
    line: {
      stroke: "#555",
    },
  },
};

const CircularProgressBar = ({ data, colors, text, economic }) => {
  const getColor = (item) => colors[item.id];

  return (
    <div style={styles.root}>
      <ResponsivePie
        data={data}
        colors={getColor}
        innerRadius={0.8}
        enableRadialLabels={false}
        tooltipFormat={economic ? formatToUnits : undefined}
        enableSlicesLabels={false}
        theme={theme}
      />
      <div style={styles.overlay}>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
