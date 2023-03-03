const packageJson = require("./package.json");

const prod = process.env.NODE_ENV === "production";

const localhost = "http://localhost:3000/";
const apiDomain = prod ? process.env.NEXT_PUBLIC_VERCEL_URL : localhost;

const IS_DEV =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development";
const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
const IS_PROD = prod && !IS_PREVIEW;
const ON_TRACK = process.env.TRACK || IS_PREVIEW;

module.exports = {
  IS_DEV,
  IS_PREVIEW,
  IS_PROD,
  ON_TRACK,
  LOCAL_DOMAIN: localhost,
  API_DOMAIN: apiDomain,
  APP_VERSION: packageJson.version,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
  NOTION_TOKEN: process.env.NOTION_TOKEN,
};
