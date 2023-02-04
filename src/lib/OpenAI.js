import { Configuration, OpenAIApi } from "openai";

import { ErrorTypes } from "@/lib/constants";
import logger from "@/lib/logger";

import { isUTF8 } from "@/utils/isUTF8";

class OpenAI {
  _openAI;

  constructor() {
    this._init();
  }

  _init() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!configuration.apiKey) {
      const InvalidAPIKeyError = new Error("OpenAI API key not configured.");
      InvalidAPIKeyError.name = ErrorTypes.INVALID_API_KEY_ERROR;
      throw InvalidAPIKeyError;
    }

    this._openAI = new OpenAIApi(configuration);
  }

  async createConversation(content) {
    try {
      this._validateContent(content);

      const completion = await this._openAI.createCompletion({
        model: "text-davinci-003",
        temperature: 0.5,
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
    } catch (error) {
      const OpenAIError = new Error(error.message);
      OpenAIError.name = ErrorTypes.OPEN_AI_ERROR;
      throw OpenAIError;
    }
  }

  _validateContent(content) {
    if (content.trim().length === 0) {
      const InvalidInputError = new Error("Please enter a valid content");
      InvalidInputError.name = ErrorTypes.INVALID_INPUT_ERROR;
      throw InvalidInputError;
    }
  }
}

export default OpenAI;
