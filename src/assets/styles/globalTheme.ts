import { Palette, Color } from "styled";
import { DefaultTheme } from "styled-components";

const lightModeColorPalette: Record<Palette, Color> = {
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
  black: { main: "#484D51" },
  white: { main: "#D2E4F1" },
};

export const theme: DefaultTheme = {
  colors: {
    primary: {
      ...lightModeColorPalette.green,
      text: lightModeColorPalette.black.main,
    },
    secondary: {
      ...lightModeColorPalette.blue,
      text: lightModeColorPalette.white.main,
    },
    background: {
      paper: "#F9F9F9",
    },

    // palette
    ...lightModeColorPalette,
  },
};
