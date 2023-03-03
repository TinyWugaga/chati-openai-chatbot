import NotionDB from "@/lib/NotionDB";

import { NOTION_LOG_DB_ID } from "./constant";
import {
  NotionLogProperties,
  generateLogDBProperties,
} from "./utils/generateProperties";

const LoggerDB = new NotionDB(NOTION_LOG_DB_ID);

const notionDB = {
  addLog: async (properties: NotionLogProperties) => {
    const logProperties = generateLogDBProperties(properties);
    return await LoggerDB.addNewData(logProperties);
  },
};

export default notionDB;
