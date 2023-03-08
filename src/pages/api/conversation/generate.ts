import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "@/lib/OpenAI";
import generateMessages from "@/lib/OpenAI/utils/generateMessages";
import { logger, conversationLogger } from "@/lib/logger";

import validateContent from "@/utils/api/validateContent";
import {
  InvalidContentError,
  RequestServiceError,
  OpenAIResponseError,
  // RequestTimeoutError,
} from "@/utils/api/apiErrors";

import {
  ConversationStatus,
  ConversationGenerateAPIRequestParams as RequestParams,
} from "@/types";

const handleError = async (
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
  await Promise.all([
    logger.error("api/conversation/generate", error, {
      conversationId,
      status,
    }),
    conversationLogger.update({
      conversationId,
      result: `${error.name}:${error.message}`,
      status: ConversationStatus.FAILED,
    }),
  ]);
  res.status(status).json({ conversationId: conversationId, error });
};

export default async function ConversationGenerateAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { conversationId, conversations, userId, role, content } =
      req.body as RequestParams;

    const openai = new OpenAI();

    try {
      await conversationLogger.add({
        conversationId,
        userId,
        content,
        status: ConversationStatus.PROGRESSING,
      });

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

      await Promise.all([
        logger.log(
          "api/conversation/generate",
          "generate conversation success",
          {
            conversationId,
          }
        ),
        conversationLogger.update({
          conversationId,
          result: result?.content || "",
          status: ConversationStatus.SUCCESS,
        }),
      ]);

      res.status(200).json({ conversationId, result });
    } catch (error: any) {
      const errorResponse = error.response;
      if (errorResponse) {
        handleError(res, {
          conversationId,
          error: OpenAIResponseError({
            ...errorResponse.data,
            message: `StatusCode: ${errorResponse.status}`,
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
}
