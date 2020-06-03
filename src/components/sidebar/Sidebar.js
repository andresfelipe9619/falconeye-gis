import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FalconEye from "./falconeye.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DataBox from "../data-box/DataBox";
import clsx from "clsx";
import useStyles from "./styles";
import { FixedSizeList } from "react-window";

export default function Sidebar({
  layer,
  loading,
  ranges,
  isDefault,
  currentLayerColors,
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
              label="Asistencias"
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
              const size = rangeColors.length - 1;
              const rangeText = ranges[i];
              return (
                <Grid
                  item
                  md={3}
                  container
                  key={`${color}-${i}`}
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
        <DataBox text="Asistencias" number={totalOrders} />
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
            style={{
              color: currentLayerColors.corrective,
            }}
            number={totalCorrective}
          />
          <DataBox
            small
            currency
            text="Ingeniería"
            number={totalEngineering}
            style={{
              color: currentLayerColors.engineering,
            }}
          />
          <DataBox
            small
            currency
            text="Preventivos"
            number={totalPreventive}
            style={{
              color: currentLayerColors.preventive,
            }}
          />
        </Grid>
        <Grid item md={6} container direction="column">
          <DataBox
            small
            currency
            text="Equipos"
            number={totalEquipments}
            style={{
              color: currentLayerColors.equipment,
            }}
          />
          <DataBox
            small
            currency
            text="Materiales"
            number={totalMaterials}
            style={{
              color: currentLayerColors.materials,
            }}
          />
          <DataBox
            small
            currency
            style={{
              color: currentLayerColors.services,
            }}
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
            classes: { ...classes, ...currentLayerColors },
            maintenances,
            isDefault,
          }}
        />
      )}
    </Drawer>
  );
}

const renderRow = (props) => (tableProps) => {
  // console.log('{props, tableProps}', {props, tableProps});
  const { classes, maintenances } = props;
  const { index, style } = tableProps;
  const {
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
  } = maintenances[index];

  return (
    <ListItem dense divider button style={style} key={id}>
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
            style={{
              color: classes.corrective,
            }}
            number={corrective}
          />

          <DataBox
            small
            currency
            shortLabel
            text="I"
            style={{
              color: classes.engineering,
            }}
            number={engineering}
          />
          <DataBox
            small
            currency
            shortLabel
            text="P"
            style={{
              color: classes.preventive,
            }}
            number={preventive}
          />
        </Grid>
        <Grid item md={4} justify="center" container direction="column">
          <DataBox
            small
            currency
            shortLabel
            text="E"
            style={{
              color: classes.equipment,
            }}
            number={equipments}
          />
          <DataBox
            small
            currency
            shortLabel
            text="M"
            style={{
              color: classes.materials,
            }}
            number={materials}
          />
          <DataBox
            small
            currency
            shortLabel
            text="S"
            style={{
              color: classes.services,
            }}
            number={services}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
};

function LocationsList({ classes, maintenances, isDefault }) {
  return (
    <div className={classes.list}>
      <FixedSizeList
        height={1600}
        width={"100%"}
        itemSize={100}
        itemCount={maintenances.length}
      >
        {renderRow({ classes, maintenances, isDefault })}
      </FixedSizeList>
    </div>
  );
}
