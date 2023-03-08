import NotionDB from "@/lib/NotionDB";

export async function queryPageByConversationId(
  ConversationDB: NotionDB,
  conversationId: string
) {
  const page = await ConversationDB.queryData({
    and: [
      {
        title: {
          equals: conversationId,
        },
        property: "conversationId",
        type: "title",
      },
    ],
  });

  if (page) {
    return page.results[0];
  }
  return undefined;
}
