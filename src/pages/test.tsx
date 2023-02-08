import { useEffect, useRef } from "react";

import NotionDB from "@/lib/NotionDB";

export default function Home() {
  const notionDB = useRef<NotionDB>();

  useEffect(() => {
    const db = new NotionDB({ id: "51a7a1683aee4a76bfebf2fa14752d8b" });
    db.init();
    notionDB.current = db;
  }, []);

  return (
    <div>
      <button
        value="test"
        onClick={() =>
          notionDB.current?.updateDB({
            event: {
              title: [
                {
                  text: {
                    content: "console_log",
                  },
                },
              ],
            },
            type: {
              select: {
                name: "log",
              },
            },
            api: {
              rich_text: [
                {
                  text: {
                    content: "test page",
                  },
                },
              ],
            },
            message: {
              rich_text: [
                {
                  text: {
                    content: "just for test",
                  },
                },
              ],
            },
            extra: {
              rich_text: [
                {
                  text: {
                    content: JSON.stringify({
                      conversations: [{ id: 1, content: "testConversations" }],
                    }),
                  },
                },
              ],
            },
          })
        }
      />
    </div>
  );
}
