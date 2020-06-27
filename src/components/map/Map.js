import React, { useState, useEffect, useCallback } from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Sidebar from "../sidebar/Sidebar";
import { LinearProgress } from "@material-ui/core";
import MaintenancesMarkers from "./MaintenancesMarkers";
import MAP_OPTIONS, { TILE_LAYER } from "./map.options";
import "./index.css";

const API_URL = process.env.REACT_APP_API_URL;

const getEconomicMaintenancesData = async () => {
  let response = await fetch(`${API_URL}/maintenances/economic`);
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
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => setOpen(true), []);

  const handleDrawerClose = useCallback(() => setOpen(false), []);

  const handleChangeLayer = useCallback((event) => {
    const { value } = event.target;
    setLayer(value);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let colors = await getColorsData();
        setColorsData(colors);
        let data = await getEconomicMaintenancesData();
        setMaintenancesData(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentLayer = colorsData.find((c) => c.property === layer);
  const currentLayerColors = getCurrentLayerColors(currentLayer);

  console.log("layer", layer);
  const { ranges, maintenances = [], rangesOrder } = maintenancesData;
  const isDefault = layer.includes("default");
  const isTechnicalRange = layer.includes("tech");
  const isMonetaryRange = layer === "monetary-range";
  const layerRange = isMonetaryRange ? ranges : rangesOrder;
  const {
    rangeColors,
    rangeColorsName,
    displayNameRanges,
  } = getRangeDataFromCurrentLayer(currentLayer);

  console.log("{isMonetaryRange, isTechnicalRange}", {
    isMonetaryRange,
    isTechnicalRange,
  });
  const hasData = !!maintenances.length;
  return (
    <Grid container spacing={0}>
      <Grid item md={11}>
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
      <Grid item md={1}>
        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: 50,
              margin: "0px auto",
            }}
          >
            <LinearProgress />
          </div>
        )}
        {!loading && hasData && (
          <Sidebar
            {...{
              open,
              layer,
              isDefault,
              rangeColors,
              maintenancesData,
              handleChangeLayer,
              handleDrawerOpen,
              handleDrawerClose,
              currentLayerColors,
              ranges: displayNameRanges,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

const getRangeDataFromCurrentLayer = (currentLayer) => {
  let rangeColors = [];
  let rangeColorsName = [];
  let displayNameRanges = [];
  if ((currentLayer || {}).sg_numranges) {
    displayNameRanges = currentLayer.sg_numranges.map(
      ({ displayName }) => displayName
    );
    rangeColors = currentLayer.sg_numranges.map(
      ({ sg_markers: [marker] }) => marker.color
    );
    rangeColorsName = currentLayer.sg_numranges.map(
      ({ sg_markers: [marker] }) => marker.colorName.toLowerCase()
    );
  }
  return {
    rangeColors,
    rangeColorsName,
    displayNameRanges,
  };
};

const getCurrentLayerColors = (currentLayer) => {
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
  return currentLayerColors;
};

const useStyles = makeStyles(() => ({
  map: { height: "calc(100vh - 2px)", width: "100%" },
  popup: { minWidth: 300 },
}));
