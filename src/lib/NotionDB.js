import { Client } from "@notionhq/client";

class NotionDB {
  _notionDB;

  _databaseId;

  constructor({ id }) {
    this._databaseId = id;
  }

  init() {
    const db = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    this._notionDB = db;

    console.log({ db });
  }

  async updateDB(properties) {
    return await this._notionDB.pages.create({
      parent: {
        type: "database_id",
        database_id: this._databaseId,
      },
      properties,
    });
  }
}

export default NotionDB;
