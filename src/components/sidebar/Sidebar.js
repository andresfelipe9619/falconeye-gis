import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import FalconEye from "./falconeye.png";
import { Grid, Typography, Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DataBox from "../data-box/DataBox";
import { formatToUnits } from "../../utils";

const drawerWidth = 420;

const useStyles = makeStyles((theme) => ({
  drawer: {
    padding: 10,
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    marginTop: 20,
    maxWidth: "100%",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    height: "auto",
    width: 120,
  },
  leftBox: { borderRight: [[2, "dashed", theme.palette.divider]] },
  toolbar: { textAlign: "center", background: "white" },
  preventive: { color: "#2AAD27" },
  engineering: { color: "#FFD326" },
  equipment: { color: theme.palette.info.main },
  materials: { color: "#757575" },
  corrective: { color: theme.palette.error.main },
}));

const sum = (list, prop) => list.reduce((acc, item) => acc + item[prop], 0);

export default function Sidebar({ locations = [] }) {
  const classes = useStyles();
  const totalPreventive = sum(locations, "preventive");
  const totalEngineering = sum(locations, "engineering");
  const totalCorrective = sum(locations, "corrective");
  const totalMaterials = sum(locations, "materials");
  const totalServices = sum(locations, "services");
  const totalEquipments = sum(locations, "equipments");

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
      <Grid item md={12} container justify="center">
        <DataBox text="Ubicaciones" number={locations.length} />
        <DataBox text="Mantenimientos" number={locations.length} />
      </Grid>
      <Grid item md={12} container justify="center">
        <Grid item md={4}>
          <DataBox
            small
            currency
            text="Preventivos"
            number={totalPreventive}
            className={classes.preventive}
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            small
            currency
            text="Ingeniería"
            number={totalEngineering}
            className={classes.engineering}
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            small
            currency
            className={classes.corrective}
            text="Correctivos"
            number={totalCorrective}
          />
        </Grid>
      </Grid>
      <Grid item md={12} container justify="center">
        <Grid item md={4}>
          <DataBox
            small
            currency
            text="Equipo"
            number={totalEquipments}
            className={classes.equipment}
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            small
            currency
            text="Materiales"
            number={totalMaterials}
            className={classes.materials}
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            small
            currency
            className={classes.preventive}
            text="Servicios"
            number={totalServices}
          />
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <List className={classes.list}>
        {locations.map(
          (
            {
              mainStreet,
              secondStreet,
              corrective,
              preventive,
              equipments,
              materials,
              services,
              intersectionId,
              engineering,
            },
            index
          ) => (
            <ListItem divider button key={index}>
              <ListItemText
                primary={
                  <>
                    <Typography align="left" variant="caption">
                      {intersectionId}
                    </Typography>
                    <Typography align="left" variant="body1">
                      {mainStreet}
                    </Typography>
                  </>
                }
                secondary={secondStreet}
              />
              <Grid item md={8} container justify="center">
                <Grid item md={6}>
                  <Box
                    m={0}
                    p={0}
                    className={classes.leftBox}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      className={classes.preventive}
                      align="center"
                      variant="body1"
                    >
                      {formatToUnits(preventive)}
                    </Typography>
                    <Typography
                      className={classes.engineering}
                      align="center"
                      variant="body1"
                    >
                      {formatToUnits(engineering)}
                    </Typography>
                    <Typography
                      className={classes.corrective}
                      align="center"
                      variant="body1"
                    >
                      {formatToUnits(corrective)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box
                    m={0}
                    p={0}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      className={classes.equipment}
                      align="center"
                      variant="body1"
                    >
                      {formatToUnits(equipments)}
                    </Typography>
                    <Typography
                      className={classes.materials}
                      align="center"
                      variant="body1"
                    >
                      {formatToUnits(materials)}
                    </Typography>
                    <Typography
                      className={classes.preventive}
                      align="center"
                      variant="body1"
                    >
                      {formatToUnits(services)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
}
