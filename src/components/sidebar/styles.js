import { makeStyles } from "@material-ui/core/styles";

const drawerWidthMD = 430;
const drawerWidthLG = "33.333%";

const useStyles = makeStyles((theme) => ({
  drawer: {
    padding: 5,
    [theme.breakpoints.down("lg")]: {
      width: drawerWidthMD,
    },
    [theme.breakpoints.up("lg")]: {
      width: drawerWidthLG,
    },
    flexShrink: 0,
  },
  content: {
    marginTop: 20,
    maxWidth: "100%",
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
  fontRange: {
      fontSize: 11
  },
  rangeBox: { borderRight: [[1, "solid", theme.palette.divider]] },
  leftBox: { borderRight: [[2, "dashed", theme.palette.divider]] },
  toolbar: { textAlign: "center", background: "white" },
  preventive: { color: "#2AAD27" },
  services: { color: "#924767" },
  engineering: { color: "#FFD326" },
  equipment: { color: theme.palette.info.main },
  materials: { color: "#757575" },
  corrective: { color: theme.palette.error.main },
}));

export default useStyles;