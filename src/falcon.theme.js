import { useState } from "react";

const primaryColor = "#b2993e";
const primaryGray = "rgba(85, 85, 85, 1)";

const FalconPalette = {
  type: "light",
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

const FalconTheme = {
  palette: FalconPalette,
};

export function useDarkMode() {
  const [theme, setTheme] = useState(FalconTheme);
  const {
    palette: { type },
  } = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === "light" ? "dark" : "light",
      },
    };
    setTheme(updatedTheme);
  };

  return [theme, toggleDarkMode];
}

export default FalconTheme;
