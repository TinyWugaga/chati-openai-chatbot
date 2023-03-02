import { CHATTING_AI_PROMPT } from "./constant";

import { Conversation } from "@/types";

export default function generatePrompt(newConversation: Conversation[]) {
  // TODO: add sort
  const content = newConversation
    .filter(({ role }) => ["user", "ai"].includes(role))
    .map(({ role, content }) => `${role}:${content}`)
    .join("\n");

  return `${CHATTING_AI_PROMPT}\n${content ? content + "\n" : ""}ai:`;
}
