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
