export function isUTF8(str: string) {
  return str.length !== encodeURIComponent(str).length;
}
