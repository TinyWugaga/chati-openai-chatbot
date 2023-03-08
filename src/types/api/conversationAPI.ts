import {
  ChatCompletionResponseMessage,
  ChatCompletionResponseMessageRoleEnum,
} from "openai";
import { Conversation } from "../conversation";

export enum ConversationGenerateAPIErrorType {
  INVALID_CONTENT_ERROR = "invalidContentError",
  REQUEST_SERVICE_ERROR = "requestServiceError",
  REQUEST_TIMEOUT_ERROR = "requestTimeoutError",
  OPEN_AI_RESPONSE_ERROR = "openAIResponseError",
}

export interface ConversationGenerateAPIRequestParams {
  conversationId: string;
  userId: string;
  conversations: Conversation[];
  role: ChatCompletionResponseMessageRoleEnum;
  content: string;
}

export interface ConversationGenerateAPIResultResponse {
  conversationId: string;
  result: ChatCompletionResponseMessage;
}

export interface ConversationGenerateAPIErrorResponse {
  conversationId: string;
  error: Error | any;
  status: 400 | 500 | 504;
}
