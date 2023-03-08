import NotionDB from "@/lib/NotionDB";

import { ConversationLog } from "@/types";

import { NOTION_LOG_DB_ID, NOTION_CONVERSATION_DB_ID } from "./constant";
import {
  NotionLogProperties,
  NotionConversationProperties,
  generateLogDBProperties,
  generateConversationDBProperties,
} from "./utils/generateProperties";
import { queryPageByConversationId } from "./utils/queryPageByConversationId";

const LoggerDB = new NotionDB(NOTION_LOG_DB_ID);
const ConversationDB = new NotionDB(NOTION_CONVERSATION_DB_ID);

const notionDB = {
  addLog: async (properties: NotionLogProperties) => {
    const logProperties = generateLogDBProperties(properties);
    return await LoggerDB.addData(logProperties);
  },
  addConversationLog: async (properties: NotionConversationProperties) => {
    const conversationLogProperties =
      generateConversationDBProperties(properties);
    return await ConversationDB.addData(conversationLogProperties);
  },
  updateConversationLog: async (
    conversationId: string,
    properties: Partial<Omit<ConversationLog, "conversationId">>
  ) => {
    const page = await queryPageByConversationId(
      ConversationDB,
      conversationId
    );
    const pageId = page?.id;
    const conversationLogProperties =
      generateConversationDBProperties(properties);

    return await (pageId
      ? ConversationDB.updateData(pageId, conversationLogProperties)
      : undefined);
  },
};

export default notionDB;
