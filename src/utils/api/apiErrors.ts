import { ConversationGenerateAPIErrorType } from "@/types";

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
