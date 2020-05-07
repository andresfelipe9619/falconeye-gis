import React, { memo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FalconEye from "./falconeye.png";
import { Grid, Typography, Divider, LinearProgress } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DataBox from "../data-box/DataBox";

const drawerWidth = 420;

const useStyles = makeStyles((theme) => ({
  drawer: {
    padding: 5,
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    marginTop: 20,
    maxWidth: "100%",
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: "hidden",
  },
  logo: {
    height: "auto",
    width: 120,
  },
  list: {
    overflowY: "auto",
    overflowX: "hidden",
  },
  leftBox: { borderRight: [[2, "dashed", theme.palette.divider]] },
  toolbar: { textAlign: "center", background: "white" },
  preventive: { color: "#2AAD27" },
  engineering: { color: "#FFD326" },
  equipment: { color: theme.palette.info.main },
  materials: { color: "#757575" },
  corrective: { color: theme.palette.error.main },
}));

export default function Sidebar({
  checked,
  loading,
  maintenancesData,
  handleChangeSwitch,
}) {
  const classes = useStyles();
  const {
    totalCosts,
    maintenances = [],
    totalServices,
    totalMaterials,
    totalEquipments,
    totalCorrective,
    totalPreventive,
    totalEngineering,
  } = maintenancesData;
  return (
    <Drawer
      elevation={10}
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.toolbar}>
        <img src={FalconEye} className={classes.logo} alt="Falconeye logo" />
      </div>
      <Grid item md={12} container justify="flex-end">
        <FormControlLabel
          control={
            <Switch
              name="monetary-range"
              checked={checked}
              color="primary"
              onChange={handleChangeSwitch}
            />
          }
          label="Rango Monetario"
        />
      </Grid>

      <Grid item md={12} container justify="center">
        <DataBox text="Ubicaciones" number={maintenances.length} />
        <DataBox text="Mantenimientos" number={totalCosts} />
      </Grid>
      <br />
      <Grid item md={12} container spacing={4}>
        <Grid
          item
          md={6}
          container
          direction="column"
          className={classes.leftBox}
        >
          <DataBox
            small
            currency
            text="Correctivos"
            className={checked ? undefined : classes.corrective}
            number={totalCorrective}
          />
          <DataBox
            small
            currency
            text="Ingeniería"
            number={totalEngineering}
            className={checked ? undefined : classes.engineering}
          />
          <DataBox
            small
            currency
            text="Preventivos"
            number={totalPreventive}
            className={checked ? undefined : classes.preventive}
          />
        </Grid>
        <Grid item md={6} container direction="column">
          <DataBox
            small
            currency
            text="Equipos"
            number={totalEquipments}
            className={checked ? undefined : classes.equipment}
          />
          <DataBox
            small
            currency
            text="Materiales"
            number={totalMaterials}
            className={checked ? undefined : classes.materials}
          />
          <DataBox
            small
            currency
            className={checked ? undefined : classes.preventive}
            text="Servicios"
            number={totalServices}
          />
        </Grid>
      </Grid>
      <br />
      {loading && <LinearProgress />}
      <Divider variant="middle" />
      {!!maintenances.length && (
        <LocationsList {...{ classes, maintenances, checked }} />
      )}
    </Drawer>
  );
}

function LocationsListComponent({ classes, maintenances, checked }) {
  return (
    <List classes={{ root: classes.list }}>
      {maintenances.map(
        (
          {
            mainStreet,
            secondStreet,
            corrective,
            preventive,
            equipments,
            materials,
            services,
            intersectionID,
            engineering,
          },
          index
        ) => (
          <ListItem dense divider button key={index}>
            <Grid container spacing={2}>
              <Grid item container md={4}>
                <ListItemText
                  primary={
                    <>
                      <Typography align="left" variant="caption">
                        {intersectionID}
                      </Typography>
                      <Typography align="left" variant="body2">
                        {mainStreet}
                      </Typography>
                    </>
                  }
                  secondary={secondStreet}
                />
              </Grid>
              <Grid
                item
                md={4}
                container
                justify="center"
                className={classes.leftBox}
                direction="column"
              >
                <DataBox
                  small
                  currency
                  shortLabel
                  text="C"
                  className={checked ? undefined : classes.corrective}
                  number={corrective}
                />

                <DataBox
                  small
                  currency
                  shortLabel
                  text="I"
                  className={checked ? undefined : classes.engineering}
                  number={engineering}
                />
                <DataBox
                  small
                  currency
                  shortLabel
                  text="P"
                  className={checked ? undefined : classes.preventive}
                  number={preventive}
                />
              </Grid>
              <Grid item md={4} justify="center" container direction="column">
                <DataBox
                  small
                  currency
                  shortLabel
                  text="E"
                  className={checked ? undefined : classes.equipment}
                  number={equipments}
                />
                <DataBox
                  small
                  currency
                  shortLabel
                  text="M"
                  className={checked ? undefined : classes.materials}
                  number={materials}
                />
                <DataBox
                  small
                  currency
                  shortLabel
                  text="S"
                  className={checked ? undefined : classes.preventive}
                  number={services}
                />
              </Grid>
            </Grid>
          </ListItem>
        )
      )}
    </List>
  );
}

const LocationsList = memo(LocationsListComponent);
