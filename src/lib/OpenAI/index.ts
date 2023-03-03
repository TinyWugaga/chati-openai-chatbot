import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { OpenAIErrorTypes } from "./types";
import { chatModel } from "./configs";

class OpenAI {
  _openAI: OpenAIApi | undefined;

  constructor() {
    this._init();
  }

  _init() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!configuration.apiKey) {
      throw new InvalidAPIKeyError();
    }

    this._openAI = new OpenAIApi(configuration);
  }

  async createConversation(messages: ChatCompletionRequestMessage[]) {
    try {
      if (!this._openAI) throw new UndefinedOpenAIError();

      const completion = await this._openAI.createChatCompletion(
        chatModel(messages)
      );

      return completion.data.choices[0].message;
    } catch (error: any) {
      // API Error Code Doc: https://platform.openai.com/docs/guides/error-codes/api-errors
      throw new OpenAIError(error.message);
    }
  }
}

export class UndefinedOpenAIError extends Error {
  constructor() {
    super("OpenAI did not initialize.");
    this.name = OpenAIErrorTypes.UNDEFINED_OPEN_AI_ERROR;
  }
}

export class InvalidAPIKeyError extends Error {
  constructor() {
    super("OpenAI API key not configured.");
    this.name = OpenAIErrorTypes.INVALID_API_KEY_ERROR;
  }
}

export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = OpenAIErrorTypes.OPEN_AI_ERROR;
  }
}

export default OpenAI;
