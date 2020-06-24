import React, { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "./icon";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Sidebar from "../sidebar/Sidebar";
import { Typography, LinearProgress } from "@material-ui/core";
import { formatToUnits, technicalLayers } from "../../utils";
import "./index.css";

const API_URL = process.env.REACT_APP_API_URL;
const TILE_LAYER = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const BOUNDS = new L.LatLngBounds(
  new L.LatLng(18.385844, -70.069322),
  new L.LatLng(18.647996, -69.751352)
);
const VISCOSITY = 0.5;
const MAX_ZOOM_MAP = 18;
const INITIAL_ZOOM = 13;
const MAP_OPTIONS = {
  zoom: INITIAL_ZOOM,
  center: BOUNDS.getCenter(),
  minZoom: INITIAL_ZOOM,
  maxZoom: MAX_ZOOM_MAP,
  maxBounds: BOUNDS,
  maxBoundsViscosity: VISCOSITY,
};

const getMaintenancesData = async () => {
  let response = await fetch(`${API_URL}/maintenances`);
  let jsonData = await response.json();
  return jsonData;
};

const getColorsData = async () => {
  let response = await fetch(`${API_URL}/colors`);
  let jsonData = await response.json();
  return jsonData;
};

export default function Map() {
  const classes = useStyles();
  const [maintenancesData, setMaintenancesData] = useState({});
  const [colorsData, setColorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layer, setLayer] = useState("default");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let colors = await getColorsData();
        setColorsData(colors);
        let data = await getMaintenancesData();
        setMaintenancesData(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentLayer = colorsData.find((c) => c.property === layer);
  let currentLayerColors = {};
  if ((currentLayer || {}).sg_attributes) {
    currentLayerColors = currentLayer.sg_attributes.reduce(
      (acc, { property, sg_layers_attributes }) => ({
        ...acc,
        [property]: sg_layers_attributes.color,
      }),
      {}
    );
  }

  const handleChangeLayer = useCallback((event) => {
    let { value } = event.target;
    setLayer(value);
  }, []);
  console.log("layer", layer);
  const { ranges, maintenances = [], rangesOrder } = maintenancesData;
  const isDefault = layer.includes("default");
  const isTechnicalRange = layer.includes("tech");
  const isMonetaryRange = layer === "monetary-range";
  let layerRange = isMonetaryRange ? ranges : rangesOrder;
  let rangeColors = [];
  let rangeColorsName = [];
  let displayNameRanges = [];
  if ((currentLayer || {}).sg_numRanges) {
    displayNameRanges = currentLayer.sg_numRanges.map(
      ({ displayName }) => displayName
    );
    rangeColors = currentLayer.sg_numRanges.map(
      ({ sg_markers: [marker] }) => marker.color
    );
    rangeColorsName = currentLayer.sg_numRanges.map(
      ({ sg_markers: [marker] }) => marker.colorName.toLowerCase()
    );
  }

  console.log("{isMonetaryRange, isTechnicalRange}", {
    isMonetaryRange,
    isTechnicalRange,
  });
  const hasData = !!maintenances.length;
  return (
    <Grid container spacing={0}>
      <Grid item md={8}>
        {loading && <LinearProgress />}
        <LeafletMap className={classes.map} {...MAP_OPTIONS}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={TILE_LAYER}
          />
          {hasData && (
            <MaintenancesMarkers
              {...{
                layer,
                classes,
                isDefault,
                layerRange,
                isTechnicalRange,
                maintenances,
                rangeColorsName,
                isMonetaryRange,
                currentLayerColors,
              }}
            />
          )}
        </LeafletMap>
      </Grid>
      <Grid item md={4}>
        {loading && (
          <div style={{ width: "100%", marginTop: 50, margin: "0px auto" }}>
            <Typography variant={"body1"}>
              Cargando Costos de Asistencias ...
            </Typography>
          </div>
        )}
        {!loading && hasData && (
          <Sidebar
            layer={layer}
            isDefault={isDefault}
            rangeColors={rangeColors}
            ranges={displayNameRanges}
            maintenancesData={maintenancesData}
            handleChangeLayer={handleChangeLayer}
            currentLayerColors={currentLayerColors}
          />
        )}
      </Grid>
    </Grid>
  );
}

const between = (number) => (a, b) => {
  let min = Math.min.apply(Math, [a, b]);
  let max = Math.max.apply(Math, [a, b]);
  return number >= min && number <= max;
};

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

const useStyles = makeStyles(() => ({
  map: { height: "calc(100vh - 2px)" },
  popup: { minWidth: 300 },
}));
