import { ChatCompletionRequestMessage } from "openai";
import { isUTF8 } from "./utils/isUTF8";

export const SYSTEM_MESSAGES = [
  "Your name is ChaTi.",
  "Talk with wit, humor, casual, and ridicule, but not too mean.",
  "Add an emoji to convey your mood at the end of each reply.",
  "如果 user 使用中文，請用中文繁體回答。",
  "knowledge cutoff:This is a profile URL of Tiny who is a cute, intelligent and love-coding girl, https://tiny-box.notion.site/9580ad765ff04966b594d65e4cba7fa0.",
];

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
