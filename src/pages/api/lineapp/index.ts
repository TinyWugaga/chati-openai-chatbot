import type { NextApiRequest, NextApiResponse } from "next";
import { WebhookRequestBody } from "@line/bot-sdk";

import LinebotClient, { validateSignature } from "@/lib/Linebot";
import OpenAI from "@/lib/OpenAI";
import logger from "@/lib/logger";
import generateMessages from "@/lib/OpenAI/utils/generateMessages";

export default async function ConversationGenerateAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as WebhookRequestBody;
  const headerXLineSignature = req.headers["X-Line-Signature"];

  validateSignature(JSON.stringify(body), headerXLineSignature as string);
  if (req.method === "POST") {
    const openai = new OpenAI();

    const { events } = body;

    const eventResult = await Promise.all(
      events.map(async (event) => {
        if (event.type === "message") {
          const { message, source, replyToken } = event;

          if (message.type === "text") {
            const { userId = "guest" } = source;
            const chatMessages = generateMessages([
              { role: "user", content: message.text },
            ]);

            try {
              const result = await openai.createConversation(
                chatMessages,
                userId
              );
              await LinebotClient.replyMessage(replyToken, {
                type: "text",
                text: result.content,
              });
              await logger.log("api/lineapp", "Chat with user", {
                userId,
                content: message.text,
                reply: result.content,
              });
            } catch (error) {
              await LinebotClient.replyMessage(replyToken, {
                type: "text",
                text: "Sorry, I can not reply your message now, maybe you can try it again.",
              });
              await logger.error("api/lineapp", error, {
                userId,
                content: message.text,
              });
            }
          }
        }
      })
    );

    return res.status(200).json(eventResult);
  }

  return res.status(200);
}
