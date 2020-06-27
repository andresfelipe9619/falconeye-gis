import { makeStyles } from "@material-ui/core/styles";

const drawerWidthMD = 410;
const drawerWidthLG = "25%";

const useStyles = makeStyles((theme) => ({
  drawer: {
    padding: 5,
    [theme.breakpoints.down("lg")]: {
      width: drawerWidthMD,
    },
    [theme.breakpoints.up("lg")]: {
      width: drawerWidthLG,
    },
  },
  drawerOpen: {
    [theme.breakpoints.down("lg")]: {
      width: drawerWidthMD,
    },
    [theme.breakpoints.up("lg")]: {
      width: drawerWidthLG,
    },
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
    width: "8.333%",
  },
  content: {
    marginTop: 20,
    maxWidth: "100%",
  },
  menuButton: {
    margin: [[10, 36, 20, 0]],
    height: 40,
    width: 40,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    [theme.breakpoints.down("lg")]: {
      width: drawerWidthMD,
    },
    [theme.breakpoints.up("lg")]: {
      width: drawerWidthLG,
    },
    overflowY: "hidden",
  },
  fieldset: {
    padding: 5,
  },
  logo: {
    height: 80,
    width: 100,
  },
  radio: {
    fontSize: 12,
  },
  list: {
    width: "100%",
    height: "100%",
  },
  fontRange: {
    fontSize: 11,
  },
  rangeBox: { borderRight: [[1, "solid", theme.palette.divider]] },
  leftBox: { borderRight: [[2, "dashed", theme.palette.divider]] },
  toolbar: { textAlign: "center", background: "white" },
}));

export default useStyles;
