import { useState, useMemo, useCallback, PropsWithChildren } from "react";

import Context from "./context";

import useSpeech from "./useSpeech";
import useAIConversation from "./useAIConversation";

import { Conversation } from "@/types";

export default function ChatBoxProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const { currentSpeechText, startSpeech, isSpeaking } = useSpeech();
  const { requestConversation, isProgressing } = useAIConversation();

  const requestNewReply = useCallback(
    async (newConversation: Conversation[]) => {
      const reply = await requestConversation(newConversation);
      setConversation([
        ...newConversation,
        {
          time: new Date(),
          author: "ai",
          content: reply,
        },
      ]);
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
      setConversation((prev) => {
        const newConversation = [
          ...prev,
          {
            time: new Date(),
            author: "user",
            content: newContent,
          },
        ];
        requestNewReply(newConversation);
        return newConversation;
      });
      setInputValue("");
    },
    [requestNewReply]
  );

  const state = useMemo(
    () => ({
      state: {
        inputValue,
        currentSpeechText,
        conversation,

        isSpeaking,
        isProgressing,
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
      startSpeech,
      handleInputChange,
      handleSubmit,
    ]
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
