const prod = process.env.NODE_ENV === "production";

const localhost = "http://localhost:3000/";
const apiDomain = prod ? process.env.DEPLOY_DOMAIN : localhost;

const IS_DEV =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development";
const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
const IS_PROD = prod && !IS_PREVIEW;

module.exports = {
  IS_DEV,
  IS_PREVIEW,
  IS_PROD,
  LOCAL_DOMAIN: localhost,
  API_DOMAIN: apiDomain,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
};
