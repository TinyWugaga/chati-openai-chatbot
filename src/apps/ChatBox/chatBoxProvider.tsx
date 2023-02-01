import { useState, useMemo, useCallback, PropsWithChildren } from "react";

import Context from "./context";

import useSpeech from "./useSpeech";
import useAIConversation from "./useAIConversation";

export default function ChatBoxProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [inputValue, setInputValue] = useState("");
  const [reply, setReply] = useState("");

  const { currentSpeechText, startSpeech, isSpeaking } = useSpeech();
  const { requestConversation, isProgressing } = useAIConversation();

  const requestNewConversation = useCallback(async (content: string) => {
    return await requestConversation(content);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    const newValue = value.trim();
    if (newValue.length === 0) return;
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback(
    async (value: string) => {
      if (value.length === 0) return;
      const newReply = await requestNewConversation(value);
      setReply(newReply);
      setInputValue("");
    },
    [requestNewConversation]
  );

  const state = useMemo(
    () => ({
      state: {
        inputValue,
        currentSpeechText,
        reply,

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
      reply,
      isSpeaking,
      isProgressing,
      startSpeech,
      handleInputChange,
      handleSubmit,
    ]
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
