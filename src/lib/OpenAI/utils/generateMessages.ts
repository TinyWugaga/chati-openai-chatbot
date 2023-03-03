import { ChatCompletionResponseMessage } from "openai";

import { SYSTEM_MESSAGES } from "../configs";
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

  return [{ role: "system", content: SYSTEM_MESSAGES }, ...messages];
}
