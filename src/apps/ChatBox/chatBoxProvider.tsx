import { useState, useMemo, useCallback, PropsWithChildren } from "react";

import Context from "./context";

import useSpeech from "./useSpeech";
import useAIConversation from "./useAIConversation";

export default function ChatBoxProvider({ children }: PropsWithChildren) {
  const [inputValue, setInputValue] = useState("");
  const [reply, setReply] = useState("");

  const { currentSpeechText, startSpeech, isSpeaking } = useSpeech();
  const { requestConversation, isProgressing } = useAIConversation();

  const requestNewConversation = useCallback(async (content: string) => {
    const newReply = await requestConversation(content);
    setReply(newReply);
    setInputValue("");
  }, []);

  const handleInputChange = useCallback((value: string) => {
    const newValue = value.trim();
    if (newValue.length === 0) return;
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (inputValue.length === 0) return;
    requestNewConversation(inputValue);
  }, [requestNewConversation]);

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
    []
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
