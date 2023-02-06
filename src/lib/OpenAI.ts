import { Configuration, OpenAIApi } from "openai";

import logger from "@/lib/logger";

import { isUTF8 } from "@/utils/isUTF8";

export enum OpenAILang {
  CHT = "cmn-Hant-TW",
  EN = "en-US",
}

export enum OpenAIErrorTypes {
  UNDEFINED_OPEN_AI_ERROR = "UndefinedOpenAIError",
  INVALID_API_KEY_ERROR = "InvalidAPIKeyError",
  INVALID_CONTENT_ERROR = "InvalidContentError",
  OPEN_AI_ERROR = "OpenAIError",
}

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

  async createConversation(content: string) {
    try {
      if (!this._openAI) throw new UndefinedOpenAIError();
      this._validateContent(content);

      const completion = await this._openAI.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 100 * (isUTF8(content) ? 3 : 1),
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["user:"],
        prompt: content,
      });

      const choices = completion.data.choices;
      logger.log({ choices });
      const result = choices[0].text;
      return result;
    } catch (error: any) {
      throw new OpenAIError(error.message);
    }
  }

  _validateContent(content: string) {
    if (content.trim().length === 0) {
      throw new InvalidContentError();
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

export class InvalidContentError extends Error {
  constructor() {
    super("Invalid content of conversation request");
    this.name = OpenAIErrorTypes.INVALID_CONTENT_ERROR;
  }
}

export default OpenAI;
