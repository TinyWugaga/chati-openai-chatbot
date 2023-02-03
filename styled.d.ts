import "styled-components";

// Colors
declare interface ColorPalette {
  main: string;
  dark?: string;
  light?: string;
  text?: string;
}

declare type Palette =
  | "green"
  | "blue"
  | "pink"
  | "yellow"
  | "orange"
  | "black"
  | "white";

declare type ThemePalette =
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "error"
  | "success";

declare type Colors = {
  [K in Palette]: ColorPalette;
} & {
  [K in ThemePalette]: ColorPalette;
} & {
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  action: {
    active: string;
    hover: string;
    selected: string;
    disabled: string;
    disabledBackground: string;
  };
  background: {
    default: string;
    paper: string;
  };
};

declare type ThemeColors = Omit<Colors, Palette | ThemePalette>;

// Breakpoints
declare type BreakpointsSize = "xs" | "sm" | "md" | "lg" | "xl";
declare type BreakpointsScreen = "desktop" | "laptop" | "tablet" | "mobile";
declare type Breakpoints = Record<BreakpointsSize | BreakpointsScreen, string>;

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    breakpoints: Breakpoints;
  }
}
