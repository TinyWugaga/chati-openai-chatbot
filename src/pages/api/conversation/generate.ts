import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "@/lib/OpenAI/index";
import notion from "@/database/notion";

import validateContent from "@/utils/api/validateContent";
import generateMessages from "@/utils/api/generateMessages";
import {
  InvalidContentError,
  RequestServiceError,
  OpenAIResponseError,
  // RequestTimeoutError,
  ApiEventLogger,
  ApiErrorLogger,
} from "@/utils/constant";

import { ConversationGenerateAPIRequestParams as RequestParams } from "@/types";

const handleError = (
  res: NextApiResponse,
  {
    conversationId,
    error,
    status,
  }: {
    conversationId: string;
    error: Error | any;
    status: 400 | 500 | 504;
  }
) => {
  // notion.addLogEvent(ApiErrorLogger("generateConversation", error));
  console.error({ conversationId, error });
  res.status(status).json({ conversationId: conversationId, error });
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { conversationId, conversations, role, content } =
    req.body as RequestParams;

  const openai = new OpenAI();

  try {
    if (!conversationId || !validateContent(content)) {
      handleError(res, {
        conversationId,
        error: InvalidContentError(),
        status: 400,
      });
      return;
    }

    const messages = generateMessages([...conversations, { role, content }]);
    const result = await openai.createConversation(messages);

    res.status(200).json({ conversationId, result });
  } catch (error: any) {
    const errorResponse = error.response;
    if (errorResponse) {
      handleError(res, {
        conversationId,
        error: OpenAIResponseError({
          ...errorResponse.data,
          name: `StatusCode: ${errorResponse.status}`,
        }),
        status: 500,
      });
    } else {
      handleError(res, {
        conversationId,
        error: RequestServiceError({ error }),
        status: 500,
      });
    }
  }
}
