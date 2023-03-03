import { ChatCompletionResponseMessage } from "openai";

import { SYSTEM_MESSAGES } from "../configs";
import { Conversation } from "@/types";

export default function generateMessages(
  conversation: Conversation[] | ChatCompletionResponseMessage[]
): ChatCompletionResponseMessage[] {
  const systemMessages = SYSTEM_MESSAGES.map<ChatCompletionResponseMessage>(
    (content) => ({
      role: "system",
      content,
    })
  );
  const messages = conversation
    .filter(({ role }) => ["user", "assistant"].includes(role))
    .map<ChatCompletionResponseMessage>(({ role, content }) => ({
      role,
      content,
    }));

  return [...systemMessages, ...messages];
}
