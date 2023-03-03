import { generateErrorEventParams } from "@/utils/generateEventParams";
import { NotionLogProperties } from "./utils/generateProperties";

export const NOTION_LOG_DB_ID = "51a7a1683aee4a76bfebf2fa14752d8b";

// NotionLogger
export const NotionLogger = (
  logger: string,
  extra: Record<string, string> = {}
): NotionLogProperties => ({
  logger,
  type: "log",
  extra,
  url: process.env.API_DOMAIN || "no set",
  version: process.env.APP_VERSION || "unknown",
});

export const NotionErrorLogger = (
  logger: string,
  error: any,
  extra: Record<string, string> = {}
): NotionLogProperties => ({
  logger,
  type: "error",
  extra: { ...generateErrorEventParams(error), ...extra },
  url: process.env.API_DOMAIN || "no set",
  version: process.env.APP_VERSION || "unknown",
});
