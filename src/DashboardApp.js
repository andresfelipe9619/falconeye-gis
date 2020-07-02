import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Dashboard from "./components/dashboard/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FalconLogo from "./SmartCity.png";
import { getDsLayers } from "./api";

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(null);
  let history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (path) => () => history.push(path);

  useEffect(() => {
    (async () => {
      try {
        const layers = await getDsLayers();
        const layersTabs = layers.map((l) => ({
          icon: mapper[l.property],
          text: l.name,
          path: `/dashboard/${l.property}`,
        }));
        setTabs(layersTabs);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    })();
  }, []);
  if (error) return <strong>{(error || {}).message}</strong>;
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.title}>
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
          <img src={FalconLogo} alt="Falconeye logo" className={classes.logo} />
          <Typography variant="h6" color="primary" noWrap>
            SMARTCITY
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {tabs.map(({ text, icon, path }) => (
            <ListItem button key={text} onClick={handleClick(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Dashboard />
        <div className={classes.footer}>
          <Copyright classes={classes} />
        </div>
      </main>
    </div>
  );
}
function Copyright({ classes }) {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      {`© ${new Date().getFullYear()} Copyright:`}{" "}
      <span className={classes.company}>FALCONEYE</span>
    </Typography>
  );
}

const mapper = {
  Technical: <AssignmentIcon />,
  Economic: <BusinessCenterIcon />,
  Technical_v0: <AssessmentIcon />,
  Economic_v0: <MonetizationOnIcon />,
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: theme.palette.common.white,
    minHeight: 26,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  title: {
    color: "white",
    minHeight: 26,
  },
  company: {
    color: theme.palette.primary.main,
  },
  logo: {
    width: 50,
    height: "auto",
  },
  footer: {
    flexGrow: 1,
    marginTop: 30,
    paddingTop: 20,
    justifyContent: "center",
    borderTop: [[1, "solid", theme.palette.divider]],
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: 30,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
