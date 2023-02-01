export const backgroundHexColorDarken = (
  baseColor: string,
  darkColor: string = "#000000"
): string => {
  return `linear-gradient(0deg, ${darkColor}20, ${darkColor}20), ${baseColor}`;
};
