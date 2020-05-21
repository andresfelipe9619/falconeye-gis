import React, { memo } from "react";
import Drawer from "@material-ui/core/Drawer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FalconEye from "./falconeye.png";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DataBox from "../data-box/DataBox";
import { formatToUnits } from "../../utils";
import clsx from "clsx";
import useStyles from "./styles";

export default function Sidebar({
  layer,
  loading,
  ranges,
  colorsClasses,
  rangeColors,
  isMonetaryRange,
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
        <FormControl component="fieldset" className={classes.fieldset}>
          <RadioGroup
            row
            aria-label="layers"
            name="layers"
            value={layer}
            onChange={handleChangeLayer}
          >
            <FormControlLabel
              classes={{ label: classes.radio }}
              value="default"
              control={<Radio size="small" color="primary" />}
              label="General"
            />
            <FormControlLabel
              classes={{ label: classes.radio }}
              value="monetary-range"
              control={<Radio size="small" color="primary" />}
              label="Monetario"
            />
            <FormControlLabel
              classes={{ label: classes.radio }}
              value="orders-range"
              control={<Radio size="small" color="primary" />}
              label="Cantidad de órdenes"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Divider variant="middle" />
      {!isDefault && rangeColors && (
        <>
          <Grid
            item
            md={12}
            container
            justify="center"
            className={classes.fieldset}
          >
            {rangeColors.map((color, i) => {
              let size = rangeColors.length - 1;
              let current = i > 0 ? ranges[i] + 1 : ranges[i];
              let next = ranges[i + 1];
              let min = isMonetaryRange ? formatToUnits(current, 0) : current;
              let max = isMonetaryRange ? formatToUnits(next, 0) : next;

              let rangeText = `${min} - ${max}`;
              return (
                <Grid
                  item
                  md={3}
                  container
                  key={color}
                  className={clsx({
                    [classes.rangeBox]: i < size,
                  })}
                  direction="column"
                  alignItems="center"
                >
                  <div
                    style={{ backgroundColor: color, height: 30, width: 40 }}
                  />
                  <Typography
                    className={classes.fontRange}
                    align="center"
                    variant="body2"
                  >
                    {rangeText}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          <Divider variant="middle" />
        </>
      )}
      <Grid item md={12} container justify="center">
        <DataBox text="Ubicaciones" number={maintenances.length} />
        <DataBox text="Mantenimientos" number={totalOrders} />
      </Grid>
      <Divider variant="middle" />
      <br />
      <Grid item md={12} container spacing={4} className={classes.fieldset}>
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
            className={clsx({ [colorsClasses.corrective]: isDefault })}
            number={totalCorrective}
          />
          <DataBox
            small
            currency
            text="Ingeniería"
            number={totalEngineering}
            className={clsx({ [colorsClasses.engineering]: isDefault })}
          />
          <DataBox
            small
            currency
            text="Preventivos"
            number={totalPreventive}
            className={clsx({ [colorsClasses.preventive]: isDefault })}
          />
        </Grid>
        <Grid item md={6} container direction="column">
          <DataBox
            small
            currency
            text="Equipos"
            number={totalEquipments}
            className={clsx({ [colorsClasses.equipment]: isDefault })}
          />
          <DataBox
            small
            currency
            text="Materiales"
            number={totalMaterials}
            className={clsx({ [colorsClasses.materials]: isDefault })}
          />
          <DataBox
            small
            currency
            className={clsx({ [colorsClasses.services]: isDefault })}
            text="Servicios"
            number={totalServices}
          />
        </Grid>
      </Grid>
      <br />
      {loading && <LinearProgress />}
      <Divider variant="middle" />
      {!!maintenances.length && (
        <LocationsList
          {...{
            classes: { ...classes, ...colorsClasses },
            maintenances,
            isDefault,
          }}
        />
      )}
    </Drawer>
  );
}

function LocationsListComponent({ classes, maintenances, isDefault }) {
  return (
    <List classes={{ root: classes.list }}>
      {maintenances.map(
        ({
          id,
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
          <ListItem dense divider button key={id}>
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
                  className={clsx({ [classes.services]: isDefault })}
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
