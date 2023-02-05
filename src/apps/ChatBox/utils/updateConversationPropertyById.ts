import { Conversation } from "@/types";

export default function updateConversationPropertyById(
  conversations: Conversation[],
  conversationId: string,
  newProperty: Partial<Conversation>
) {
  const conversationIndex = conversations.findIndex(
    ({ id }) => id === conversationId
  );
  if (conversationIndex) {
    conversations[conversationIndex] = {
      ...conversations[conversationIndex],
      ...newProperty,
    };
  }
}
