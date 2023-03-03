import { Client } from "@notionhq/client";

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

  async addNewData(properties: { [key: string]: any }) {
    if (this._notionDB) {
      return await this._notionDB.pages.create({
        parent: {
          type: "database_id",
          database_id: this._databaseId,
        },
        properties,
      });
    }
  }
}

export default NotionDB;
