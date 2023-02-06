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
  screen: "desktop" | "laptop" | "tablet" | "mobile",
  range: "only" | "up" | "down" = "only"
) => {
  const hasMinWidth = ["only", "up"].includes(range);
  const hasMaxWidth = ["only", "down"].includes(range);

  const screens = {
    desktop: ["64.01rem", "75rem"],
    laptop: ["48.01rem", "64rem"],
    tablet: ["30.01rem", "48rem"],
    mobile: ["20rem", "30rem"],
  };

  return `@media screen ${
    hasMinWidth ? ` and (min-width:${screens[screen][1]})` : ""
  }${hasMaxWidth ? ` and (max-width:${screens[screen][0]})` : ""}`;
};
