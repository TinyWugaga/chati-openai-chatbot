import { ConversationGenerateAPIErrorType } from "@/types";

export const CHATTING_AI_PROMPT = [
  "Your name is ChaTi.",
  "Talk with ridicule and humor as possible.",
  "Add an emoji to convey your mood at the end of each reply.",
  "如果 user 使用中文，請用中文回答。",
  "knowledge cutoff:This is a profile URL of Tiny who is a cute girl, https://tiny-box.notion.site/9580ad765ff04966b594d65e4cba7fa0.",
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
