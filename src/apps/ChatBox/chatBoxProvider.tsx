import { useState, useMemo, useCallback, PropsWithChildren } from "react";

import { ConversationStatus } from "@/types";
import { trackAction, trackError } from "@/lib/tracker";

import Context from "./context";

import useSpeech from "./useSpeech";
import useAIConversation from "./useAIConversation";

export default function ChatBoxProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [inputValue, setInputValue] = useState("");

  const { currentSpeechText, startSpeech, isSpeaking, isSupportSpeech } =
    useSpeech();
  const { isProgressing, loadingTime, conversations, sendMessage } =
    useAIConversation();

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback(
    async (value: string) => {
      try {
        const content = value.trim();
        if (content.length === 0) return;
        setInputValue("");
        await sendMessage(content);
        trackAction("request_conversation", {
          label: ConversationStatus.SUCCESS,
        });
      } catch (error) {
        trackError(error, { label: "error" });
      }
    },
    [sendMessage]
  );

  const state = useMemo(
    () => ({
      state: {
        inputValue,
        currentSpeechText,
        conversations,

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
      conversations,
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
