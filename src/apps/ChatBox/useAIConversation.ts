import { useState, useCallback } from "react";

import {
  Conversation,
  GenerateConversationAPIResult,
  GenerateConversationAPIError,
} from "@/types";

export default function useAIConversation() {
  const [isProgressing, setIsProgressing] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);

  const fetchGenerateConversationAPI = useCallback(
    async (
      conversations: Conversation[]
    ): Promise<
      | GenerateConversationAPIResult
      | GenerateConversationAPIError
      | { error: any }
    > => {
      let stopTimer = false;
      const loadingTimeInterval = setInterval(() => {
        if (!stopTimer) {
          setLoadingTime((time) => time + 1);
        } else {
          clearInterval(loadingTimeInterval);
        }
      }, 500);

      try {
        const result = await fetch("/api/generateConversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ conversations }),
        })
          .then((response) => response.json())
          .catch((error) => error);

        if (result) {
          stopTimer = true;
          setLoadingTime(0);
        }
        return result;
      } catch (error: any) {
        return { error };
      }
    },
    []
  );

  const requestConversation = useCallback(
    async (newConversations: Conversation[]) => {
      const currentConversation = [...newConversations].pop() || {
        id: "unknown",
        author: "unknown",
        content: "unknown",
      };
      try {
        setIsProgressing(true);
        const response = await fetchGenerateConversationAPI(newConversations);
        setIsProgressing(false);

        return {
          error: undefined,
          result: "",
          conversation: currentConversation,
          ...response,
        };
      } catch (error: any) {
        setIsProgressing(false);
        return {
          error,
          result: "",
          conversation: currentConversation,
        };
      }
    },
    [fetchGenerateConversationAPI]
  );

  return {
    isProgressing,
    loadingTime,
    requestConversation,
  };
}
