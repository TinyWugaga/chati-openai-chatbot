import { Client } from "@notionhq/client";

class NotionDB {
  _notionDB: Client | undefined;

  constructor() {
    this._init();
  }

  _init() {
    const db = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    this._notionDB = db;
  }

  async updateDB(id: string, properties: { [key: string]: any }) {
    if (this._notionDB) {
      return await this._notionDB.pages.create({
        parent: {
          type: "database_id",
          database_id: id,
        },
        properties,
      });
    }
  }
}

export default NotionDB;
