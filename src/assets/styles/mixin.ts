export const backgroundHexColorLighten = (
  baseColor: string,
  brightColor: string = "#ffffff"
): string => {
  return `linear-gradient(0deg, ${brightColor}20, ${brightColor}20), ${baseColor}`;
};

export const backgroundHexColorDarken = (
  baseColor: string,
  darkColor: string = "#000000"
): string => {
  return `linear-gradient(0deg, ${darkColor}20, ${darkColor}20), ${baseColor}`;
};

export const boxShadowBorder = (color: string): string => {
  return `1px 0px 0px ${color}, 0px 1px 0px ${color}, -1px 0px 0px ${color}, 0px -1px 0px ${color}`;
};

export const mediaQueryScreen = (
  screen: "desktop" | "laptop" | "tablet" | "mobile"
) => {
  switch (screen) {
    // Desktops, large screens
    case "desktop":
      return "@media screen and (min-width:64.01rem) and (max-width:75rem)";
    // Small screens, laptops
    case "laptop":
      return "@media screen and (min-width:48.01rem) and (max-width:64rem)";
    // iPads, Tablets
    case "tablet":
      return "@media screen and (min-width:30.01rem) and (max-width:48rem)";
    // Mobile
    case "mobile":
      return "@media screen and (min-width:20rem) and (max-width:30rem)";
    // Extra large screens, TV
    default:
      return "@media screen and (min-width:75.01rem)";
  }
};
