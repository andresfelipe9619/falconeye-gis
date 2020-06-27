import React from "react";
import markerIcon from "./icon";
import { Marker, Popup } from "react-leaflet";
import { Typography, Grid } from "@material-ui/core";
import { between, formatToUnits, technicalLayers } from "../../utils";

const MaintenancesMarkers = ({
  layer,
  classes,
  isDefault,
  isTechnicalRange,
  rangeColorsName,
  layerRange = [],
  maintenances = [],
  currentLayerColors,
  isMonetaryRange,
}) =>
  maintenances.map((maintenance) => {
    const {
      id,
      intersectionID,
      corrective,
      preventive,
      equipments,
      materials,
      services,
      orders,
      engineering,
      mainStreet,
      secondStreet,
      latitude,
      longitude,
      totalCosts,
      fs_maintenance,
    } = maintenance;
    const primaryCosts = [
      {
        label: "Preventivo",
        value: preventive,
        color: currentLayerColors.preventive,
      },
      {
        label: "Ingeniería",
        value: engineering,
        color: currentLayerColors.engineering,
      },
      {
        label: "Correctivo",
        value: corrective,
        color: currentLayerColors.corrective,
      },
    ];
    const secondaryCosts = [
      {
        label: "Equipos",
        value: equipments,
        color: currentLayerColors.equipment,
      },
      {
        label: "Materiales",
        value: materials,
        color: currentLayerColors.materials,
      },
      {
        label: "Servicios",
        value: services,
        color: currentLayerColors.services,
      },
    ];
    const markerCoordinates = [latitude, longitude];
    let markerColor = undefined;
    let layerProp = isMonetaryRange ? totalCosts : orders;
    if (!isDefault) {
      if (isMonetaryRange) {
        markerColor = layerRange.reduce((acc, rangeA, index) => {
          let size = layerRange.length;
          if (size - index <= 1) return acc;
          let rangeB = layerRange[index + 1];
          if (between(layerProp)(rangeA, rangeB)) {
            return rangeColorsName[index];
          }
          return acc;
        }, "");
      }
      if (isTechnicalRange) {
        let techLayer = technicalLayers.find((l) => l.value === layer);
        console.log("{techLayer, layer}", { techLayer, layer });
        markerColor =
          (fs_maintenance || {}).status === (techLayer || {}).name
            ? "red"
            : "blue";
      }
    }

    return (
      <Marker
        key={id}
        position={markerCoordinates}
        icon={markerIcon(markerColor)}
      >
        <Popup className={classes.popup}>
          <Typography align="left" variant="caption">
            {intersectionID}
          </Typography>
          <Typography gutterBottom variant={"h5"}>
            {mainStreet}
          </Typography>
          <Typography variant={"h5"}>{secondStreet}</Typography>
          <hr />
          <Typography variant={"body2"}>Órdenes: {orders || 0}</Typography>
          <hr />
          <CostsList costs={primaryCosts} />
          <hr />
          <CostsList costs={secondaryCosts} />
          <hr />
          <Typography align="center" variant={"body2"}>
            Total: {formatToUnits(totalCosts)}
          </Typography>
        </Popup>
      </Marker>
    );
  });

const CostsList = ({ costs = [] }) => (
  <Grid item md={12} container spacing={0} direction="column">
    {costs.map(({ label, value, color }) => {
      return (
        <Grid key={label} item md={12} container>
          <Grid item sm={1} md={4} container>
            <Typography component="span" style={{ color }} variant={"body2"}>
              {label}:
            </Typography>
          </Grid>
          <Grid item sm={11} md={8} container justify="flex-end">
            <Typography
              component="span"
              className={{ color }}
              variant={"body2"}
            >
              {formatToUnits(value)}
            </Typography>
          </Grid>
        </Grid>
      );
    })}
  </Grid>
);

export default MaintenancesMarkers;
