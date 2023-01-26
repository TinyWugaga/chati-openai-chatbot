import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "@/lib/OpenAI";
import { ErrorTypes } from "@/lib/constants";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI();
  const content = req.body.content || "";

  try {
    const result = await openai.createConversation(content);
    res.status(200).json({ result });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    const errorResponse = error.response;
    const errorName = error.name;
    if (errorResponse) {
      console.error(errorResponse.status, errorResponse.data);
      res.status(errorResponse.status).json(errorResponse.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);

      if (errorName === ErrorTypes.INVALID_INPUT_ERROR) {
        res.status(400).json({
          error: {
            message: `"${content}" is a invalid content.`,
          },
        });
        return;
      }
      res.status(500).json({
        error: {
          message: `An ${error.name} occurred during your request.`,
        },
      });
    }
  }
}
