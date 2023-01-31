import "styled-components";

declare type Palette =
  | "green"
  | "blue"
  | "pink"
  | "yellow"
  | "orange"
  | "black"
  | "white";

declare type Color = {
  main: string;
  dark?: string;
  text?: string;
};

type ThemeColors<T> = {
  [K in T]: Color;
} & {
  primary: Color;
  secondary: Color;
  background: {
    paper: string;
  };
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors<Palette>;
  }
}
