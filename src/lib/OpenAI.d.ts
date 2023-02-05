import { OpenAIApi } from "openai";

declare class OpenAI {
  _openAI: OpenAIApi | undefined;
  constructor();
  createConversation(content: string): string;
}
