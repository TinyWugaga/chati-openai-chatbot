import { useState, useCallback, useEffect } from "react";

import {
  Conversation,
  ConversationStatus,
  ConversationGenerateAPIRequestParams as RequestParams,
  ConversationGenerateAPIResultResponse as ResultResponse,
} from "@/types";
import { generateConversation } from "@/services/conversation";
import useTimer from "@/utils/useTimer";
import {
  generateConversationId,
  handleConversationErrorMessage,
} from "./utils";

export default function useAIConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isProgressing, setIsProgressing] = useState(false);

  const { time, start, stop } = useTimer();

  const handleConversationResponse = useCallback(
    ({
      status,
      conversationId,
      result,
    }: ResultResponse & { status: ConversationStatus }) => {
      setConversations((prevConversations) => {
        const conversationIndex = prevConversations.findIndex(
          ({ id }) => id === conversationId
        );
        return [
          ...prevConversations.slice(0, conversationIndex),
          { ...prevConversations[conversationIndex], status },
          ...prevConversations.slice(conversationIndex + 1),
          {
            id: generateConversationId("assistant"),
            time: new Date(),
            ...result,
            status,
          },
        ];
      });
    },
    []
  );

  const fetchGenerateConversation = useCallback(
    async (params: Omit<RequestParams, "conversations">): Promise<void> => {
      start();
      const response = await generateConversation({
        ...params,
        conversations,
      });
      response && stop();

      const { result, error } = response;
      if (result) {
        handleConversationResponse({
          conversationId: params.conversationId,
          result,
          status: ConversationStatus.SUCCESS,
        });
      }
      if (error) {
        handleConversationResponse({
          conversationId: params.conversationId,
          result: {
            role: "assistant",
            content: handleConversationErrorMessage(response.status),
          },
          status: ConversationStatus.SUCCESS,
        });
      }
    },
    [start, stop, conversations, handleConversationResponse]
  );

  const sendMessage = useCallback(async (content: string) => {
    const conversationId = generateConversationId("user");
    setConversations((prevConversation) => [
      ...prevConversation,
      {
        id: conversationId,
        time: new Date(),
        role: "user",
        content,
        status: ConversationStatus.PROGRESSING,
      },
    ]);
  }, []);

  const requestConversation = useCallback(
    async (conversation: Conversation) => {
      try {
        const { id: conversationId, role, content } = conversation;
        setIsProgressing(true);
        await fetchGenerateConversation({
          conversationId,
          role,
          content,
        });
        setIsProgressing(false);
      } catch (error: any) {
        setIsProgressing(false);
        throw error;
      }
    },
    [fetchGenerateConversation]
  );

  useEffect(() => {
    const progressingConversation = conversations.find(
      ({ status }) => status === ConversationStatus.PROGRESSING
    );
    if (progressingConversation) {
      requestConversation(progressingConversation);
    }
  }, [conversations, requestConversation]);

  return {
    isProgressing,
    loadingTime: time,
    conversations,
    sendMessage,
  };
}
