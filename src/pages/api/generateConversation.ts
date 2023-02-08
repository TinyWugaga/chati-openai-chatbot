import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "@/lib/OpenAI";
import { sendEvent } from "@/lib/googleAnalytics";
import notion from "@/database/notion";

import { CHATTING_AI_PROMPT } from "@/utils/constant";

import {
  Conversation,
  ConversationAPIError,
  GenerateConversationAPIErrorType,
} from "@/types";

const validateContent = (content: string) => {
  const isInvalid = content.trim().length === 0 || content.match(/sex/i);
  return !isInvalid;
};

const generateContent = (newConversation: Conversation[]) => {
  // TODO: add sort
  const content = newConversation
    .filter(({ author }) => ["user", "ai"].includes(author))
    .map(({ author, content }) => `${author}:${content}`)
    .join("\n");

  return `${CHATTING_AI_PROMPT}\n${content ? content + "\n" : ""}ai:`;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI();
  const conversations = (req.body.conversations || []) as Conversation[];
  const requestConversation = conversations.pop();

  const handleError = (
    error: ConversationAPIError,
    conversation: Conversation | {}
  ) => {
    sendEvent("api_error", {
      category: "api",
      label: "error",
      apiPath: "generateConversation",
      conversation,
    });
    notion.addLogEvent({
      event: "console_error",
      type: "error",
      api: "generateConversation",
      message: `Conversation request failed.\nid:${
        (conversation as Conversation).id || "unknown"
      }\nContent:${(conversation as Conversation).content || ""}`,
      extra: error,
    });

    res.status(error.status).json({ conversation, error });
  };

  try {
    if (
      requestConversation === undefined ||
      !validateContent(requestConversation.content)
    ) {
      handleError(
        {
          name: GenerateConversationAPIErrorType.INVALID_CONTENT_ERROR,
          message: "Invalid content.",
          status: 400,
        },
        { ...requestConversation }
      );
      return;
    }

    const content = generateContent([
      ...conversations,
      { ...requestConversation },
    ]);
    const result = await openai.createConversation(content);

    notion.addLogEvent({
      event: "console_log",
      type: "log",
      api: "generateConversation",
      message: result || "",
      extra: requestConversation,
    });

    res.status(200).json({ conversation: requestConversation, result });
  } catch (error: any) {
    const errorResponse = error.response;
    if (errorResponse) {
      handleError(
        {
          ...errorResponse.data,
          name: GenerateConversationAPIErrorType.RESPONSE_ERROR,
          status: errorResponse.status,
        },
        { ...requestConversation }
      );
    } else {
      handleError(
        {
          name: GenerateConversationAPIErrorType.REQUEST_OPEN_AI_ERROR,
          message: `An ${error.name} occurred during your request.`,
          status: 500,
        },
        { ...requestConversation }
      );
    }
  }
}
