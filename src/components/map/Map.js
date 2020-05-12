import React, { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "./icon";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Sidebar from "../sidebar/Sidebar";
import { Typography, LinearProgress } from "@material-ui/core";
import { formatToUnits } from "../../utils";
const API_URL = process.env.REACT_APP_API_URL;
const TILE_LAYER = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const BOUNDS = new L.LatLngBounds(
  new L.LatLng(18.40593, -70.018579),
  new L.LatLng(18.550654, -69.874751)
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

const rangeColors = ["#22b14c", "#fef200", "#ff7f27", "#ed1d25"];

const getMaintenancesData = async () => {
  let response = await fetch(`${API_URL}/maintenances`);
  let jsonData = await response.json();
  return jsonData;
};

export default function Map() {
  const classes = useStyles();
  const [maintenancesData, setMaintenancesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingLayer, setLoadingLayer] = useState(false);
  const [layer, setLayer] = useState("default");
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let data = await getMaintenancesData();
        setMaintenancesData(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChangeLayer = useCallback((event) => {
    let { value } = event.target;
    setLoadingLayer(true);
    setTimeout(() => setLayer(value), 1500);
    setTimeout(() => setLoadingLayer(false), 2000);
  }, []);

  const isLoadingMap = loadingLayer || loading;
  const { ranges, maintenances, rangesOrder } = maintenancesData;

  return (
    <Grid container spacing={0}>
      <Grid item md={9}>
        {isLoadingMap && <LinearProgress />}
        {!isLoadingMap && (
          <LeafletMap className={classes.map} {...MAP_OPTIONS}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={TILE_LAYER}
            />
            <MaintenancesMarkers
              layer={layer}
              ranges={ranges}
              classes={classes}
              rangesOrder={rangesOrder}
              maintenances={maintenances}
            />
          </LeafletMap>
        )}
      </Grid>
      <Grid item md={3}>
        {loading ? (
          <div style={{ width: "100%", marginTop: 50 }}>
            <Typography variant={"body1"}>
              Cargando Costos de Mantenimientos ...
            </Typography>
          </div>
        ) : (
          <Sidebar
            layer={layer}
            ranges={ranges}
            loading={loadingLayer}
            rangeColors={rangeColors}
            maintenancesData={maintenancesData}
            handleChangeLayer={handleChangeLayer}
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
  ranges = [],
  classes,
  rangesOrder = [],
  maintenances = [],
}) =>
  maintenances.map((maintenance) => {
    const {
      intersectionID,
      corrective,
      preventive,
      equipments,
      materials,
      services,
      orders,
      reliability,
      engineering,
      mainStreet,
      secondStreet,
      latitude,
      longitude,
      totalCosts,
    } = maintenance;
    const primaryCosts = [
      {
        label: "Preventivo",
        value: preventive,
        className: classes.preventive,
      },
      {
        label: "Ingeniería",
        value: engineering,
        className: classes.engineering,
      },
      {
        label: "Correctivo",
        value: corrective,
        className: classes.corrective,
      },
    ];
    const secondaryCosts = [
      {
        label: "Equipos",
        value: equipments,
        className: classes.equipment,
      },
      {
        label: "Materiales",
        value: materials,
        className: classes.materials,
      },
      {
        label: "Servicios",
        value: services,
        className: classes.preventive,
      },
    ];
    const markerCoordinates = [latitude, longitude];
    const isDefault = layer === "default";
    const isMonetaryRange = layer === "monetary-range";
    console.log("isDefault", { layer, isDefault });

    let markerColor = undefined;
    let layerRange = isMonetaryRange ? ranges : rangesOrder;
    let layerProp = isMonetaryRange ? totalCosts : orders;
    if (!isDefault) {
      markerColor = layerRange.reduce((acc, rangeA, index) => {
        let size = layerRange.length;
        if (size - index <= 1) return acc;
        let rangeB = layerRange[index + 1];
        if (between(layerProp)(rangeA, rangeB)) {
          return rangeColors[index];
        }
        return acc;
      }, "");
    }

    return (
      <Marker
        key={intersectionID}
        position={markerCoordinates}
        icon={markerIcon(markerColor)}
      >
        <Popup>
          <Typography align="left" variant="caption">
            {intersectionID}
          </Typography>
          <Typography gutterBottom variant={"h5"}>
            {mainStreet}
          </Typography>
          <Typography variant={"h5"}>{secondStreet}</Typography>
          <hr />
          <Typography variant={"body2"}>
            Fiabilidad: {reliability || 0}
          </Typography>
          <hr />
          <Typography variant={"body2"}>Órdenes: {orders || 0}</Typography>
          <hr />
          <CostsList checked={isDefault} costs={primaryCosts} />
          <hr />
          <CostsList checked={isDefault} costs={secondaryCosts} />
          <hr />
          <Typography align="center" variant={"body2"}>
            Total: {formatToUnits(totalCosts)}
          </Typography>
        </Popup>
      </Marker>
    );
  });

const CostsList = ({ costs = [], checked }) => (
  <Grid item md={12} container spacing={0} direction="column">
    {costs.map(({ label, value, className }) => (
      <Grid key={label} item md={12} container>
        <Grid item sm={1} md={4} container>
          <Typography
            component="span"
            className={checked ? undefined : className}
            variant={"body2"}
          >
            {label}:
          </Typography>
        </Grid>
        <Grid item sm={11} md={8} container justify="flex-end">
          <Typography
            component="span"
            className={checked ? undefined : className}
            variant={"body2"}
          >
            {formatToUnits(value)}
          </Typography>
        </Grid>
      </Grid>
    ))}
  </Grid>
);

const margin = [[0, 0]];
const useStyles = makeStyles((theme) => ({
  map: { height: "calc(100vh - 10px)" },
  preventive: { color: "#2AAD27", margin },
  engineering: { color: "#FFD326", margin },
  equipment: { color: theme.palette.info.main, margin },
  materials: { color: "#757575", margin },
  corrective: { color: theme.palette.error.main, margin },
}));
