import { Conversation } from "../chatBoxProvider";

export enum GenerateConversationAPIErrorType {
  INVALID_CONTENT_ERROR = "invalidContentError",
  RESPONSE_ERROR = "responseError",
  REQUEST_OPEN_AI_ERROR = "requestOpenAPIError",
}

export interface ConversationAPIError {
  name: string;
  message: string;
  status: 400 | 500 | number;
}

export interface GenerateConversationAPIError {
  error: ConversationAPIError;
  conversation: Conversation;
}

export interface GenerateConversationAPIResult {
  result: string;
  conversation: Conversation;
}
