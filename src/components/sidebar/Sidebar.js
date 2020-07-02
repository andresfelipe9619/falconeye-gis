import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FalconLogo from "../../SmartCity.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DataBox from "../data-box/DataBox";
import clsx from "clsx";
import useStyles from "./styles";
import LocationsList from "./LocationList";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TabsRouter from "./TabsRouter";
import { technicalLayers, economicLayers } from "../../utils";

export default function Sidebar({
  open,
  layer,
  ranges,
  loading,
  isDefault,
  rangeColors,
  isTechnicalRange,
  maintenancesData,
  handleDrawerOpen,
  handleDrawerClose,
  handleChangeLayer,
  currentLayerColors,
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

  const tabs = [
    {
      to: "/economic",
      label: "Económico",
      render: () => (
        <EconomicRadioGroup
          {...{
            classes,
            economicLayers,
            handleChangeLayer,
            selectedLayer: layer,
          }}
        />
      ),
    },
    {
      to: "/technical",
      label: "Técnico",
      render: () => (
        <TechnicalRadioGroup
          {...{
            classes,
            technicalLayers,
            handleChangeLayer,
            selectedLayer: layer,
          }}
        />
      ),
    },
  ];
  return (
    <Drawer
      onMouseLeave={handleDrawerClose}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.drawerPaper]: open,
        }),
      }}
      anchor="right"
    >
      <Grid item md={12} container justify="center" className={classes.toolbar}>
        <Grid item md={1} container>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleDrawerClose}
            className={clsx(classes.menuButton, {
              [classes.hide]: !open,
            })}
          >
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        {open && (
          <Grid item md={11} container justify="center">
            <img
              src={FalconLogo}
              className={classes.logo}
              alt="Falconeye logo"
            />
          </Grid>
        )}
      </Grid>
      {open ? (
        <>
          <Grid item md={12} container justify="center">
            <TabsRouter tabs={tabs} />
          </Grid>
          <Divider variant="middle" />
          {!isDefault && !isTechnicalRange && rangeColors && (
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
                        style={{
                          backgroundColor: color,
                          height: 30,
                          width: 40,
                        }}
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
          {!isTechnicalRange && (
            <>
              <Divider variant="middle" />
              <br />
              <Grid
                item
                md={12}
                container
                spacing={2}
                className={classes.fieldset}
              >
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
            </>
          )}
          <br />
          {loading && <LinearProgress />}
          <Divider variant="middle" />
          {!!maintenances.length && (
            <LocationsList
              {...{
                classes: { ...classes, ...currentLayerColors },
                maintenances,
                isTechnicalRange,
                isDefault,
              }}
            />
          )}
        </>
      ) : null}
    </Drawer>
  );
}

function EconomicRadioGroup({
  classes,
  selectedLayer,
  handleChangeLayer,
  economicLayers = [],
}) {
  return (
    <FormControl component="fieldset" className={classes.fieldset}>
      <RadioGroup
        row
        name="layers"
        aria-label="economic-layers"
        value={selectedLayer}
        onChange={handleChangeLayer}
      >
        {economicLayers.map((layer, index) => (
          <FormControlLabel
            key={index}
            classes={{ label: classes.radio }}
            value={layer.value}
            control={<Radio size="small" color="primary" />}
            label={layer.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function TechnicalRadioGroup({ selectedLayer, classes, handleChangeLayer }) {
  return (
    <FormControl component="fieldset" className={classes.fieldset}>
      <RadioGroup
        row
        aria-label="layers"
        name="technical-layers"
        value={selectedLayer}
        onChange={handleChangeLayer}
      >
        {technicalLayers.map((layer, index) => (
          <FormControlLabel
            key={index}
            classes={{ label: classes.radio }}
            value={layer.value}
            control={<Radio size="small" color="primary" />}
            label={layer.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
