import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "@/lib/OpenAI";
import { sendEvent } from "@/lib/googleAnalytics";

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
