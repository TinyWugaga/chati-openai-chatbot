import { generateErrorEventParams } from "@/utils/generateEventParams";
import { ConversationLog } from "@/types";
import {
  NotionLogProperties,
  NotionConversationProperties,
} from "./utils/generateProperties";

export const NOTION_LOG_DB_ID = "51a7a1683aee4a76bfebf2fa14752d8b";
export const NOTION_CONVERSATION_DB_ID = "994ae1e6c86745c79a388e6835cb9163";

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

export const NotionConversationLog = ({
  conversationId,
  userId,
  content,
  result = "",
  status,
}: ConversationLog): NotionConversationProperties => ({
  conversationId,
  userId,
  content,
  result,
  status,
  url: process.env.API_DOMAIN || "no set",
  version: process.env.APP_VERSION || "unknown",
});
