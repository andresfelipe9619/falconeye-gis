import React, { useState, useEffect } from "react";
import L from "leaflet";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "./icon";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Sidebar from "../sidebar/Sidebar";
import { Typography } from "@material-ui/core";
import { formatToUnits } from "../../utils";
const API_URL = process.env.REACT_APP_API_URL;
const TILE_LAYER = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const BOUNDS = new L.LatLngBounds(
  new L.LatLng(18.40593, -70.018579),
  new L.LatLng(18.550654, -69.874751)
);
const VISCOSITY = 0.1;
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

const getMaintenances = async () => {
  let response = await fetch(`${API_URL}/maintenances`);
  let jsonData = await response.json();
  return jsonData.data;
};

export default function Map() {
  const classes = useStyles();
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let data = await getMaintenances();
        setMaintenances(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Grid container spacing={0}>
      <Grid item md={9}>
        <LeafletMap className={classes.map} {...MAP_OPTIONS}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url={TILE_LAYER}
          />
          {maintenances.map((maintenance) => {
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
            const markerCoordinates = [
              latitude,
              longitude,
            ];
            const totalCosts = secondaryCosts.reduce((acc, cost) => acc + cost.value, 0)
            return (
              <Marker key={intersectionID} position={markerCoordinates} icon={markerIcon()}>
                <Popup>
                  <Typography align="left" variant="caption">
                    {intersectionID}
                  </Typography>
                  <Typography gutterBottom variant={"h5"}>{mainStreet}</Typography>
                  <Typography variant={"h5"}>{secondStreet}</Typography>
                  <hr />
                  <Typography variant={"body2"}>Fiabilidad: {reliability}</Typography>
                  <hr />
                  <Typography variant={"body2"}>Órdenes: {orders}</Typography>
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
          })}
        </LeafletMap>
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
              locations={maintenances}
            />
          )}
      </Grid>
    </Grid>
  );
}

const CostsList = ({ costs = [] }) => (
  <Grid item md={12} container spacing={0} direction="column">
    {costs.map(({ label, value, className }) => (
      <Typography key={label} component="span" className={className} variant={"body2"}>
        {label}: {formatToUnits(value)}
      </Typography>
    ))}
  </Grid>
);

const margin = [[0, 0]];
const useStyles = makeStyles((theme) => ({
  map: { height: 800 },
  preventive: { color: "#2AAD27", margin },
  engineering: { color: "#FFD326", margin },
  equipment: { color: theme.palette.info.main, margin },
  materials: { color: "#757575", margin },
  corrective: { color: theme.palette.error.main, margin },
}));
