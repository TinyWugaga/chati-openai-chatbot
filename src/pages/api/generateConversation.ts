import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "@/lib/OpenAI";
import { sendEvent } from "@/lib/googleAnalytics";
import notion from "@/database/notion";

import validateContent from "@/utils/api/validateContent";
import generateContent from "@/utils/api/generateContent";

import {
  Conversation,
  ConversationAPIError,
  GenerateConversationAPIErrorType,
} from "@/types";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI();
  const conversations = (req.body.conversations || []) as Conversation[];
  const requestConversation = [...conversations].pop();

  const handleError = (
    error: ConversationAPIError,
    conversation: Conversation | undefined
  ) => {
    const currentConversation = conversation || {
      id: "unknown",
      author: "unknown",
      content: "",
    };
    sendEvent("api_error", {
      category: "api",
      label: "error",
      apiPath: "generateConversation",
      conversation,
    });
    notion.addLogEvent({
      logger: "console_error",
      type: "error",
      api: "generateConversation",
      message: `Conversation request failed.\nid:${currentConversation.id}\nContent:${currentConversation.content}`,
      url: process.env.API_DOMAIN || "",
      extra: error,
    });

    res.status(error.status).json({ conversation: currentConversation, error });
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
        requestConversation
      );
      return;
    }

    const content = generateContent(conversations);
    const result = await openai.createConversation(content);

    notion.addLogEvent({
      logger: "console_log",
      type: "log",
      api: "generateConversation",
      message: result || "",
      url: process.env.API_DOMAIN || "",
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
        requestConversation
      );
    } else {
      handleError(
        {
          name: GenerateConversationAPIErrorType.REQUEST_OPEN_AI_ERROR,
          message: `An ${error.name} occurred during your request.`,
          status: 500,
        },
        requestConversation
      );
    }
  }
}
