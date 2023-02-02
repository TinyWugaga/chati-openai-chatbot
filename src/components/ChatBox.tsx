import { ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";

import { useChatBox } from "@/apps/ChatBox";

import SpeechButton from "@/components/SpeechButton";
import { backgroundHexColorDarken } from "@/assets/styles/mixin";

export default function ChatBox() {
  const {
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
  } = useChatBox();

  const onStartSpeech = () => {
    startSpeech();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.target.value);
  };

  async function onSubmit(event: FormEvent | null = null) {
    event && event.preventDefault();
    handleSubmit(inputValue);
  }

  useEffect(() => {
    if (currentSpeechText.length !== 0) {
      handleInputChange(currentSpeechText);
      handleSubmit(currentSpeechText);
    }
  }, [currentSpeechText, handleInputChange, handleSubmit]);

  return (
    <ChatBoxContainer>
      <ChatBoxContent>
        {conversation?.map(({ content }, index) => (
          <div key={`conversation_${index}`}>{content}</div>
        ))}
      </ChatBoxContent>
      <ChatBoxNavbar>
        <ChatBoxForm onSubmit={onSubmit}>
          <ChatBoxInput
            type="text"
            name="chatbox"
            autoComplete="off"
            placeholder={
              isSpeaking ? "Speech listening..." : "Start conversation"
            }
            disabled={isSpeaking || isProgressing}
            value={inputValue}
            onChange={onInputChange}
          />
        </ChatBoxForm>
        <SpeechButton
          onClick={onStartSpeech}
          disabled={isSpeaking || isProgressing}
          isActive={isSpeaking}
        />
      </ChatBoxNavbar>
    </ChatBoxContainer>
  );
}

export const ChatBoxContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 7.5rem;

  position: relative;
  width: min(100%, 48rem);
  height: 100%;

  padding: 0;

  background-color: ${({ theme }) => theme.colors.green.main};
`;

export const ChatBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.75rem;
  gap: 2rem;
`;

export const ChatBoxNavbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.75rem 1.75rem 2.75rem;
  gap: 1rem;

  position: relative;
  width: 100%;

  background: ${({ theme }) =>
    backgroundHexColorDarken(
      theme.colors.primary.main,
      theme.colors.primary.dark
    )};
`;

export const ChatBoxForm = styled.form`
  position: relative;
  width: 100%;
`;

export const ChatBoxInput = styled.input`
  width: 100%;
  height: auto;

  padding: 1rem;

  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1.5rem;

  font-size: 1rem;

  &:focus {
    outline-color: ${({ theme }) => theme.colors.primary.dark};
    outline-width: 1px;
  }
`;
