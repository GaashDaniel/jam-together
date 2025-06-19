import { useContext } from "react";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import ThemeContext from "../../contexts/ThemeContext";
export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  const muiTheme = useMuiTheme();
  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  const { mode, toggleColorMode } = themeContext;
  const getThemeColor = (lightColor, darkColor) => {
    return mode === "dark" ? darkColor : lightColor;
  };
  const getBackgroundColor = (level = "default") => {
    if (level === "paper") {
      return muiTheme.palette.background.paper;
    }
    return muiTheme.palette.background.default;
  };
  const getTextColor = (variant = "primary") => {
    switch (variant) {
      case "primary":
        return muiTheme.palette.text.primary;
      case "secondary":
        return muiTheme.palette.text.secondary;
      case "disabled":
        return muiTheme.palette.text.disabled;
      default:
        return muiTheme.palette.text.primary;
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return muiTheme.palette.success.main;
      case "warning":
        return muiTheme.palette.warning.main;
      case "error":
        return muiTheme.palette.error.main;
      case "info":
        return muiTheme.palette.info.main;
      default:
        return muiTheme.palette.primary.main;
    }
  };
  const getAdminTheme = () => ({
    admin: {
      primary: muiTheme.palette.primary.main,
      secondary: muiTheme.palette.secondary.main,
      background: {
        main: getBackgroundColor(),
        paper: getBackgroundColor("paper"),
        sidebar: getThemeColor("#f5f5f5", "#1e1e1e"),
        header: getThemeColor("#ffffff", "#2d2d2d"),
      },
      text: {
        primary: getTextColor("primary"),
        secondary: getTextColor("secondary"),
        disabled: getTextColor("disabled"),
      },
      status: {
        active: getStatusColor("success"),
        inactive: getStatusColor("warning"),
        error: getStatusColor("error"),
        pending: getStatusColor("info"),
      },
      elevation: {
        card: mode === "dark" ? 4 : 2,
        dialog: mode === "dark" ? 8 : 4,
        appBar: mode === "dark" ? 6 : 2,
      },
    },
    spacing: muiTheme.spacing,
    borderRadius: muiTheme.shape.borderRadius,
    shadows: muiTheme.shadows,
    transitions: muiTheme.transitions,
  });
  return {
    mode,
    toggleColorMode,
    theme: muiTheme,
    adminTheme: getAdminTheme(),
    getThemeColor,
    getBackgroundColor,
    getTextColor,
    getStatusColor,
    isDark: mode === "dark",
    isLight: mode === "light",
  };
};
export default useTheme;