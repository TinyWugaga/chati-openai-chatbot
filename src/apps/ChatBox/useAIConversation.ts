import { useState, useCallback } from "react";

import logger from "@/lib/logger";

interface Conversation {
  time: Date;
  author: string;
  content: string;
}

export default function useAIConversation() {
  const [isProgressing, setIsProgressing] = useState(false);

  const generateContent = useCallback((newConversation: Conversation[]) => {
    // TODO: add sort
    const content = newConversation
      .map(({ author, content }) => `${author}:${content}`)
      .join("\n");

    return `${content ? content + "\n" : ""}ai:`;
  }, []);

  const fetchGenerateConversationAPI = useCallback((content: string) => {
    logger.log("fetchGenerateConversationAPI:" + content);
    return fetch("/api/generateConversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((response) => response.result)
      .catch((error) => {
        throw new Error(
          `Request failed with status ${error.status}: ${error.message}`
        );
      });
  }, []);

  const requestConversation = useCallback(
    async (newConversation: Conversation[]) => {
      try {
        const content = generateContent(newConversation);

        setIsProgressing(true);
        const reply = await fetchGenerateConversationAPI(content);
        setIsProgressing(false);

        return reply;
      } catch (error: any) {
        logger.error(error);

        setIsProgressing(false);
        return "";
      }
    },
    [generateContent, fetchGenerateConversationAPI]
  );

  return {
    isProgressing,
    requestConversation,
  };
}
