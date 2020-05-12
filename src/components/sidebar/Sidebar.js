import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FalconEye from "./falconeye.png";
import { Grid, Typography, Divider, LinearProgress } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DataBox from "../data-box/DataBox";
import clsx from "clsx";

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
  radio: {
    fontSize: 12,
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
  layer,
  loading,
  ranges,
  rangeColors,
  maintenancesData,
  handleChangeLayer,
}) {
  const classes = useStyles();
  const {
    totalOrders,
    maintenances = [],
    totalServices,
    totalMaterials,
    totalEquipments,
    totalCorrective,
    totalPreventive,
    totalEngineering,
  } = maintenancesData;
  const isDefault = layer === "default";
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
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="layers"
            name="layers"
            value={layer}
            onChange={handleChangeLayer}
          >
            <FormControlLabel
              classes={{ root: classes.radio }}
              value="monetary-range"
              control={<Radio color="primary" />}
              label="Rango Monetario"
            />
            <FormControlLabel
              classes={{ root: classes.radio }}
              value="orders-range"
              control={<Radio color="primary" />}
              label="Rango de Ordenes"
            />
            <FormControlLabel
              classes={{ root: classes.radio }}
              value="default"
              control={<Radio color="primary" />}
              label="Normal"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {!isDefault && rangeColors && (
        <>
          <br />
          <Grid item md={12} container spacing={8} justify="center">
            {rangeColors.map((color, i) => (
              <Grid item md={3}>
                <div style={{ backgroundColor: color, height: 30 }} />
                {ranges[i]}
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Grid item md={12} container justify="center">
        <DataBox text="Ubicaciones" number={maintenances.length} />
        <DataBox text="Mantenimientos" number={totalOrders} />
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
            className={clsx({ [classes.corrective]: isDefault })}
            number={totalCorrective}
          />
          <DataBox
            small
            currency
            text="Ingeniería"
            number={totalEngineering}
            className={clsx({ [classes.engineering]: isDefault })}
          />
          <DataBox
            small
            currency
            text="Preventivos"
            number={totalPreventive}
            className={clsx({ [classes.preventive]: isDefault })}
          />
        </Grid>
        <Grid item md={6} container direction="column">
          <DataBox
            small
            currency
            text="Equipos"
            number={totalEquipments}
            className={clsx({ [classes.equipment]: isDefault })}
          />
          <DataBox
            small
            currency
            text="Materiales"
            number={totalMaterials}
            className={clsx({ [classes.materials]: isDefault })}
          />
          <DataBox
            small
            currency
            className={clsx({ [classes.preventive]: isDefault })}
            text="Servicios"
            number={totalServices}
          />
        </Grid>
      </Grid>
      <br />
      {loading && <LinearProgress />}
      <Divider variant="middle" />
      {!!maintenances.length && (
        <LocationsList {...{ classes, maintenances, isDefault }} />
      )}
    </Drawer>
  );
}

function LocationsListComponent({ classes, maintenances, isDefault }) {
  return (
    <List classes={{ root: classes.list }}>
      {maintenances.map(
        ({
          mainStreet,
          secondStreet,
          corrective,
          preventive,
          equipments,
          materials,
          services,
          intersectionID,
          engineering,
        }) => (
          <ListItem dense divider button key={intersectionID}>
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
                  className={clsx({ [classes.corrective]: isDefault })}
                  number={corrective}
                />

                <DataBox
                  small
                  currency
                  shortLabel
                  text="I"
                  className={clsx({ [classes.engineering]: isDefault })}
                  number={engineering}
                />
                <DataBox
                  small
                  currency
                  shortLabel
                  text="P"
                  className={clsx({ [classes.preventive]: isDefault })}
                  number={preventive}
                />
              </Grid>
              <Grid item md={4} justify="center" container direction="column">
                <DataBox
                  small
                  currency
                  shortLabel
                  text="E"
                  className={clsx({ [classes.equipment]: isDefault })}
                  number={equipments}
                />
                <DataBox
                  small
                  currency
                  shortLabel
                  text="M"
                  className={clsx({ [classes.materials]: isDefault })}
                  number={materials}
                />
                <DataBox
                  small
                  currency
                  shortLabel
                  text="S"
                  className={clsx({ [classes.preventive]: isDefault })}
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
