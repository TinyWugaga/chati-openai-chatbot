import Crypto from "crypto";
import { Client } from "@line/bot-sdk";

const CHANNEL_TOKEN = process.env.LINE_CHANNEL_TOKEN as string;
const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET as string;

const client = new Client({
  channelAccessToken: CHANNEL_TOKEN,
  channelSecret: CHANNEL_SECRET,
});

export default client;

export const validateSignature = (
  body: string | Buffer,
  xLineSignature: string
): boolean => {
  const signature = Crypto.createHmac("SHA256", CHANNEL_SECRET)
    .update(body)
    .digest("base64");

  return signature === xLineSignature;
};
