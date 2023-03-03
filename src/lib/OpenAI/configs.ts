import { ChatCompletionRequestMessage } from "openai";
import { isUTF8 } from "./utils/isUTF8";

export const textModel = (content: string) => ({
  model: "text-davinci-003",
  temperature: 0.9,
  max_tokens: 100 * (isUTF8(content) ? 3 : 1),
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
  prompt: content,
});

export const chatModel = (messages: ChatCompletionRequestMessage[]) => ({
  model: "gpt-3.5-turbo",
  temperature: 1.1,
  frequency_penalty: 0.8,
  messages,
});
