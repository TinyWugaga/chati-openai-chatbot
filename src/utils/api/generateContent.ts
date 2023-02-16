import { CHATTING_AI_PROMPT } from "./constant";

import { Conversation } from "@/types";

export default function generateContent(newConversation: Conversation[]) {
  // TODO: add sort
  const content = newConversation
    .filter(({ author }) => ["user", "ai"].includes(author))
    .map(({ author, content }) => `${author}:${content}`)
    .join("\n");

  return `${CHATTING_AI_PROMPT}\n${content ? content + "\n" : ""}ai:`;
}
