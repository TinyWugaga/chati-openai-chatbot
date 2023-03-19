import { Client } from "@notionhq/client";
import {
  UpdatePageParameters,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

class NotionDB {
  _notionDB: Client | undefined;
  _databaseId: string;

  constructor(id: string) {
    this._databaseId = id;
    this._init();
  }

  _init() {
    const db = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    this._notionDB = db;
  }

  async queryData(filter: QueryDatabaseParameters["filter"]) {
    if (this._notionDB) {
      try {
        return await this._notionDB.databases.query({
          database_id: this._databaseId,
          filter,
        });
      } catch (error) {
        console.error({ notionQueryDataError: error });
      }
    }
  }

  /** ts issue when using CreatePageParameters["properties"] as the type of param properties */
  async addData(properties: { [key: string]: any }) {
    if (this._notionDB) {
      try {
        return await this._notionDB.pages.create({
          parent: {
            type: "database_id",
            database_id: this._databaseId,
          },
          properties,
        });
      } catch (error) {
        console.error({ notionAddDataError: error });
      }
    }
  }

  async updateData(
    pageId: string,
    properties: UpdatePageParameters["properties"]
  ) {
    if (this._notionDB) {
      try {
        return await this._notionDB.pages.update({
          page_id: pageId,
          properties,
        });
      } catch (error) {
        console.error({ notionUpdateDataError: error });
      }
    }
  }
}

export default NotionDB;
