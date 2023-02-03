import { Breakpoints } from "styled";
import { DefaultTheme } from "styled-components";

import { lightModeColors } from "./palette";

const breakpoints: Record<keyof Breakpoints, string> = {
  xs: "0rem",
  sm: "37.5rem", // 600px
  md: "56.25rem", // 900px
  lg: "75rem", // 1200px
  xl: "96rem", // 1536px

  mobile: "30rem", // 480px
  tablet: "48rem", // 768px
  laptop: "64rem", // 1024px
  desktop: "75rem",
};

const themeColors = lightModeColors;

export const theme: DefaultTheme = {
  colors: {
    ...themeColors,
  },
  breakpoints,
};
