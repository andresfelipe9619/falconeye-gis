import React, { useState } from "react";
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
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DataBox from "../data-box/DataBox";
import clsx from "clsx";
import useStyles from "./styles";
import LocationsList from "./LocationList";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { technicalLayers, economicLayers } from "../../utils";

export default function Sidebar({
  tab,
  open,
  layer,
  ranges,
  loading,
  isDefault,
  rangeColors,
  handleChangeTab,
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
      <IconButton
        color="inherit"
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
        onClick={handleDrawerClose}
        className={clsx(classes.menuButton, {
          [classes.hide]: !open,
        })}
      >
        <ChevronRightIcon />
      </IconButton>
      <div className={classes.toolbar}>
        <img src={FalconEye} className={classes.logo} alt="Falconeye logo" />
      </div>

      {open ? (
        <>
          <Grid item md={12} container justify="center">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Económico" />
              <Tab label="Técnico" />
            </Tabs>
          </Grid>
          <Divider variant="middle" />
          <Grid item md={12} container justify="flex-end">
            <FormControl component="fieldset" className={classes.fieldset}>
              <TabPanel value={tab} index={0}>
                <EconomicRadioGroup
                  {...{
                    classes,
                    economicLayers,
                    handleChangeLayer,
                    selectedLayer: layer,
                  }}
                />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <TechnicalRadioGroup
                  {...{
                    classes,
                    technicalLayers,
                    handleChangeLayer,
                    selectedLayer: layer,
                  }}
                />
              </TabPanel>
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
        </>
      ) : null}
    </Drawer>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function EconomicRadioGroup({
  classes,
  selectedLayer,
  handleChangeLayer,
  economicLayers = [],
}) {
  return (
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
  );
}

function TechnicalRadioGroup({ selectedLayer, classes, handleChangeLayer }) {
  return (
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
  );
}
