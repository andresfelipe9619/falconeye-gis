import { createMuiTheme } from "@material-ui/core/styles";
const primaryColor = "#ff9800";
const primaryGray = "rgba(85, 85, 85, 1)";

const FalconPalette = {
  type: "dark",
  primary: {
    main: primaryColor,
  },
  secondary: {
    main: primaryGray,
  },
  success: {
    main: "#5cb860",
  },
  warning: {
    main: "#ffa21a",
  },
  error: {
    main: "#f55a4e",
  },
  info: {
    main: "#00d3ee",
  },
};

const BrooklynTheme = createMuiTheme({
  palette: FalconPalette,
});

export default BrooklynTheme;
