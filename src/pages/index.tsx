import { ChangeEvent, FormEvent, MouseEvent, useEffect } from "react";

import { ChatBoxProvider, useChatBox } from "@/apps/ChatBox";

import { BasicLayout as Layout } from "@/components/Layouts";
import {
  ChatBoxContainer,
  ChatBoxContent,
  ChatBoxNavbar,
  ChatBoxForm,
  ChatBoxInput,
} from "@/components/ChatBox";
import SpeechButton from "@/components/SpeechButton";

export default function Home() {
  const {
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
  } = useChatBox();

  const onStartSpeech = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("onStartSpeech");
    startSpeech();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.target.value);
  };

  async function onSubmit(event: FormEvent | null = null) {
    event && event.preventDefault();
    handleSubmit();
  }

  useEffect(() => {
    if (currentSpeechText.length !== 0) {
      handleInputChange(currentSpeechText);
      handleSubmit();
    }
  }, [currentSpeechText, handleInputChange, handleSubmit]);

  return (
    <ChatBoxProvider>
      <Layout>
        <ChatBoxContainer>
          <ChatBoxContent>{reply}</ChatBoxContent>
          <ChatBoxNavbar>
            <ChatBoxForm onSubmit={onSubmit}>
              <ChatBoxInput
                type="text"
                name="chatbox"
                placeholder={
                  isSpeaking ? "Speech listening..." : "Start conversation"
                }
                value={inputValue}
                onChange={onInputChange}
                disabled={isSpeaking || isProgressing}
              />
            </ChatBoxForm>
            <SpeechButton onClick={onStartSpeech} />
          </ChatBoxNavbar>
        </ChatBoxContainer>
      </Layout>
    </ChatBoxProvider>
  );
}
