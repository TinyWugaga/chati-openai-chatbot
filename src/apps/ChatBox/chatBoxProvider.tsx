import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  PropsWithChildren,
} from "react";

import { ConversationRequestStatus, Conversation } from "@/types";
import { sendLogEvent, sendErrorEvent } from "@/lib/googleAnalytics";

import Context from "./context";

import useSpeech from "./useSpeech";
import useAIConversation from "./useAIConversation";

import {
  generateConversationId,
  updateConversationPropertyById,
} from "./utils";

export default function ChatBoxProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const { currentSpeechText, startSpeech, isSpeaking, isSupportSpeech } =
    useSpeech();
  const { requestConversation, isProgressing, loadingTime } =
    useAIConversation();

  const requestNewConversation = useCallback(
    async (newConversation: Conversation[]) => {
      if (newConversation.length === 0) return;
      try {
        const reply = await requestConversation([...newConversation]);
        const { result, error, conversation } = reply;

        updateConversationPropertyById(newConversation, conversation.id, {
          status: ConversationRequestStatus.FINISHED,
        });

        const logEvent = {
          event: "request_new_conversation_result",
          category: "request_new_conversation",
          label: "result",
          appName: "chatBox",
          conversation: JSON.stringify(conversation),
        };

        if (result) {
          setConversation([
            ...newConversation,
            {
              id: generateConversationId("ai"),
              time: new Date(),
              author: "ai",
              content: result,
              status: ConversationRequestStatus.SUCCESS,
            },
          ]);
          sendLogEvent(null, {
            ...logEvent,
            status: ConversationRequestStatus.SUCCESS,
            result,
          });
        }
        if (error) {
          setConversation([
            ...newConversation,
            {
              id: generateConversationId("system"),
              time: new Date(),
              author: "system",
              content: error.message,
              status: ConversationRequestStatus.ERROR,
            },
          ]);
          sendLogEvent(null, {
            ...logEvent,
            status: ConversationRequestStatus.ERROR,
            error: error.message,
          });
        }
      } catch (error: any) {
        sendErrorEvent(error, {
          event: "request_new_conversation_error",
          category: "request_new_conversation",
          label: "error",
          appName: "chatBox",
        });
        newConversation.pop();
        setConversation([...newConversation]);
      }
    },
    [requestConversation]
  );

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback(
    (value: string) => {
      const newContent = value.trim();
      if (newContent.length === 0) return;
      setConversation((prev) => [
        ...prev,
        {
          id: generateConversationId("user"),
          time: new Date(),
          author: "user",
          content: newContent,
          status: ConversationRequestStatus.PROGRESSING,
        },
      ]);
      setInputValue("");
    },
    [requestNewConversation]
  );

  useEffect(() => {
    const onRequestConversation = async () => {
      const newConversation = conversation[conversation.length - 1];
      if (newConversation?.status === ConversationRequestStatus.PROGRESSING) {
        await requestNewConversation([...conversation]);
      }
    };
    onRequestConversation();
  }, [conversation]);

  const state = useMemo(
    () => ({
      state: {
        inputValue,
        currentSpeechText,
        conversation,

        isSpeaking,
        isProgressing,
        isSupportSpeech,

        loadingTime,
      },
      actions: {
        startSpeech,

        handleInputChange,
        handleSubmit,
      },
    }),
    [
      inputValue,
      currentSpeechText,
      conversation,
      isSpeaking,
      isProgressing,
      isSupportSpeech,
      loadingTime,

      startSpeech,
      handleInputChange,
      handleSubmit,
    ]
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
