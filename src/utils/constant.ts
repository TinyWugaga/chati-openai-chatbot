import { ConversationGenerateAPIErrorType } from "@/types";
import { generateErrorEventParams } from "./generateEventParams";

export const CHATTING_AI_PROMPT = [
  "Your name is ChaTi.",
  "Try to talk with ridicule and humor.",
  "Add an emoji to convey your mood at the end of each reply",
  "Tiny is a cute girl and she is a frontend develop.",
].join("\n");

export const SENSITIVE_WORDS = ["sex", "幹"];

// Errors
export const InvalidContentError = () => {
  const invalidContentError = new Error();
  invalidContentError.name =
    ConversationGenerateAPIErrorType.INVALID_CONTENT_ERROR;
  invalidContentError.message = "Invalid request params.";
  return invalidContentError;
};

export const RequestServiceError = (error?: any) => {
  const requestServiceError = error || new Error();
  requestServiceError.name =
    ConversationGenerateAPIErrorType.REQUEST_SERVICE_ERROR;
  requestServiceError.message = `An ${error.name} occurred during your request.`;
  return requestServiceError;
};

export const OpenAIResponseError = (error: any) => {
  const openAIResponseError = error;
  openAIResponseError.name =
    ConversationGenerateAPIErrorType.OPEN_AI_RESPONSE_ERROR;
  openAIResponseError.message = `An ${error.name} occurred during your request.
  ${error.message}`;
  return openAIResponseError;
};

export const RequestTimeoutError = () => {
  const requestTimeoutError = new Error();
  requestTimeoutError.name =
    ConversationGenerateAPIErrorType.REQUEST_TIMEOUT_ERROR;
  requestTimeoutError.message = `The request is timeout.`;
  return requestTimeoutError;
};

// NotionLogger
export const ApiEventLogger = (
  api: string,
  extra: Record<string, string> = {}
) => ({
  logger: `api/${api}`,
  type: "log",
  extra: JSON.stringify({ ...extra }),
  url: process.env.API_DOMAIN,
  version: process.env.APP_VERSION,
});

export const ApiErrorLogger = (
  api: string,
  error: any,
  extra: Record<string, string> = {}
) => ({
  logger: `api/${api}`,
  type: "error",
  extra: JSON.stringify({ ...generateErrorEventParams(error), ...extra }),
  url: process.env.API_DOMAIN,
  version: process.env.APP_VERSION,
});
