import { Palette, Colors, ColorPalette } from "styled";

export const palette: Record<Palette, ColorPalette> = {
  green: {
    main: "#D7E9B9",
    dark: "#61876E",
  },
  blue: {
    main: "#6886C5",
    dark: "#3A4F7A",
  },
  pink: {
    main: "#FFACB7",
    dark: "#E98EAD",
  },
  yellow: {
    main: "#FFE0AC",
    dark: "#FECD70",
  },
  orange: {
    main: "#FFD495",
    dark: "#FAAB78",
  },
  black: { main: "#484D51", dark: "#000000" },
  white: { main: "#D2E4F1", light: "#ffffff" },
};

export const lightModeColors: Colors = {
  ...palette,

  primary: {
    ...palette.green,
    text: palette.black.main,
  },
  secondary: {
    ...palette.blue,
    text: palette.white.main,
  },
  info: { main: "#4E89AE", dark: "#43658B" },
  warning: { ...palette.orange },
  error: { main: "#F48484", dark: "#F55050" },
  success: { ...palette.yellow },

  text: {
    primary: palette.black.main,
    secondary: palette.black.main + "80",
    disabled: palette.black.main + "60",
  },
  action: {
    active: palette.black.dark + "50",
    hover: palette.black.dark + "04",
    selected: palette.black.dark + "08",
    disabled: palette.black.dark + "26",
    disabledBackground: palette.black.dark + "12",
  },
  background: {
    default: "#F9F9F9",
    paper: "#F9F9F9",
  },
};
