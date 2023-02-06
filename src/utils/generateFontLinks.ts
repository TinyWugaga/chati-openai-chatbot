interface Font {
  family: string;
  wght?: string[];
}

export function generateFontLinks(fonts: Font[]) {
  return fonts.reduce((acc, { family, wght }) => {
    const accFonts = acc ? `${acc}&` : "";
    const fontFamily = `family=${family}`;
    const fontWght = wght ? `:wght@${wght.join(";")}` : "";
    return accFonts + fontFamily + fontWght;
  }, "");
}
