const prod = process.env.NODE_ENV === "production";

const localhost = "http://localhost:3000/";
const apiDomain = prod ? process.env.DEPLOY_DOMAIN : localhost;

module.exports = {
  LOCAL_DOMAIN: localhost,
  API_DOMAIN: apiDomain,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
