import { ChatCompletionResponseMessage } from "openai";

import { CHATTING_AI_PROMPT } from "../constant";
import { Conversation } from "@/types";

export default function generateMessages(
  conversation: Conversation[] | ChatCompletionResponseMessage[]
): ChatCompletionResponseMessage[] {
  // TODO: add sort
  const messages = conversation
    .filter(({ role }) => ["user", "assistant"].includes(role))
    .map<ChatCompletionResponseMessage>(({ role, content }) => ({
      role,
      content,
    }));

  return [{ role: "system", content: CHATTING_AI_PROMPT }, ...messages];
}
