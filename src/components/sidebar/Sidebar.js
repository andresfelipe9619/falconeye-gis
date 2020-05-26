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
import { formatToUnits } from "../../utils";
import clsx from "clsx";
import useStyles from "./styles";
import { FixedSizeList } from "react-window";

export default function Sidebar({
  layer,
  loading,
  ranges,
  currentLayerColors,
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
            style={{
              color: clsx({ [currentLayerColors.corrective]: isDefault }),
            }}
            number={totalCorrective}
          />
          <DataBox
            small
            currency
            text="Ingeniería"
            number={totalEngineering}
            style={{
              color: clsx({ [currentLayerColors.engineering]: isDefault }),
            }}
          />
          <DataBox
            small
            currency
            text="Preventivos"
            number={totalPreventive}
            style={{
              color: clsx({ [currentLayerColors.preventive]: isDefault }),
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
              color: clsx({ [currentLayerColors.equipment]: isDefault }),
            }}
          />
          <DataBox
            small
            currency
            text="Materiales"
            number={totalMaterials}
            style={{
              color: clsx({ [currentLayerColors.materials]: isDefault }),
            }}
          />
          <DataBox
            small
            currency
            style={{
              color: clsx({ [currentLayerColors.services]: isDefault }),
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
  console.log("{props, tableProps}", { props, tableProps });
  const { classes, maintenances, isDefault } = props;
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
              color: clsx({ [classes.corrective]: isDefault }),
            }}
            number={corrective}
          />

          <DataBox
            small
            currency
            shortLabel
            text="I"
            style={{
              color: clsx({ [classes.engineering]: isDefault }),
            }}
            number={engineering}
          />
          <DataBox
            small
            currency
            shortLabel
            text="P"
            style={{
              color: clsx({ [classes.preventive]: isDefault }),
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
              color: clsx({ [classes.equipment]: isDefault }),
            }}
            number={equipments}
          />
          <DataBox
            small
            currency
            shortLabel
            text="M"
            style={{
              color: clsx({ [classes.materials]: isDefault }),
            }}
            number={materials}
          />
          <DataBox
            small
            currency
            shortLabel
            text="S"
            style={{ color: clsx({ [classes.services]: isDefault }) }}
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
