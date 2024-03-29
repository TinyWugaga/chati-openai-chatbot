import { ChatCompletionResponseMessageRoleEnum } from "openai";

export interface Message {
  id: string;
  time: Date;
  role: ChatCompletionResponseMessageRoleEnum;
  content: string;
}

export enum ConversationStatus {
  PROGRESSING = "progressing",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface Conversation extends Message {
  status: ConversationStatus;
}

export interface ConversationLog {
  conversationId: string;
  userId: string;
  content: string;
  result?: string;
  status: ConversationStatus;
}
