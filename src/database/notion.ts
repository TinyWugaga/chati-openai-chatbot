import NotionDB from "@/lib/NotionDB";
import {
  NotionLogProperties,
  generateNotionLogProperties,
} from "@/utils/generateNotionProperties";

import { NOTION_LOG_DB_ID } from "./constant";

const database = new NotionDB();

export default {
  addLogEvent: async (properties: NotionLogProperties) => {
    const logProperties = generateNotionLogProperties(properties);
    return await database.updateDB(NOTION_LOG_DB_ID, logProperties);
  },
};
