import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import styled from "styled-components";

import { sendLogEvent } from "@/lib/googleAnalytics";

import { useChatBox } from "@/apps/ChatBox";

import SpeechButton from "@/components/SpeechButton";
import SendButton from "@/components/SendButton";
import SpeechBubble from "@/components/SpeechBubble";

import {
  backgroundHexColorDarken,
  mediaQueryScreen,
} from "@/assets/styles/mixin";

export default function ChatBox() {
  const ChatBoxContentContainerRef = useRef<HTMLDivElement>(null);

  const {
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

  // Auto send request if speech text recognized
  useEffect(() => {
    if (currentSpeechText.length !== 0) {
      handleInputChange(currentSpeechText);
      handleSubmit(currentSpeechText);
    }
  }, [currentSpeechText, handleInputChange, handleSubmit]);

  return (
    <ChatBoxContainer>
      <ChatBoxHeader>
        <div>
          <ChatBoxDot />
          <ChatBoxDot />
          <ChatBoxDot />
        </div>
      </ChatBoxHeader>
      <ChatBoxContent>
        <ChatBoxContentContainer ref={ChatBoxContentContainerRef}>
          {conversation?.map(({ id, author, content }) => (
            <SpeechBubble
              key={`conversation_${id}`}
              container={ChatBoxContentContainerRef.current}
              direction={author === "user" ? "right" : "left"}
              text={content}
            />
          ))}
          {loadingTime >= 1 && (
            <SpeechBubble
              container={ChatBoxContentContainerRef.current}
              direction="left"
              text={""}
              isLoading
            />
          )}
        </ChatBoxContentContainer>
      </ChatBoxContent>
      <ChatBoxToolbar>
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
          <ChatBoxSendButtonWrapper>
            <SendButton
              onClick={() => {
                sendLogEvent(null, {
                  event: "click_send_button",
                  category: "action",
                  label: "click",
                  element: "send_button",
                });
                handleSubmit(inputValue);
              }}
              disabled={isSpeaking || isProgressing}
              isActive={isProgressing}
            />
          </ChatBoxSendButtonWrapper>
        </ChatBoxForm>
        {isSupportSpeech && (
          <SpeechButton
            onClick={() => {
              sendLogEvent(null, {
                event: "click_speech_button",
                category: "action",
                label: "click",
                element: "speech_button",
              });
              onStartSpeech();
            }}
            disabled={isSpeaking || isProgressing}
            isActive={isSpeaking}
          />
        )}
      </ChatBoxToolbar>
    </ChatBoxContainer>
  );
}

export const ChatBoxContainer = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr 7.5rem;

  position: fixed;
  width: min(100%, 48rem);
  height: 100%;

  padding: 0;

  background-color: ${({ theme }) => theme.colors.green.main};

  ${mediaQueryScreen("tablet", "up")} {
    grid-template-rows: 3rem 1fr 7.5rem;

    position: relative;
    box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.black.main + "50"};
    border-radius: 0.3rem;
  }
`;

export const ChatBoxHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding: 1.2rem 1rem;

  background: ${({ theme }) => theme.colors.primary.dark};

  > div {
    display: flex;
  }

  ${mediaQueryScreen("tablet", "up")} {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }
`;

export const ChatBoxDot = styled.div`
  position: relative;
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.4rem;

  border-radius: 3rem;

  background: ${({ theme }) => theme.colors.white.main + "90"};
`;

export const ChatBoxContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  ${mediaQueryScreen("tablet", "up")} {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }
`;

export const ChatBoxContentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.75rem;
  gap: 2rem;
`;

export const ChatBoxToolbar = styled.div`
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

  ${mediaQueryScreen("tablet", "up")} {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
`;

export const ChatBoxSendButtonWrapper = styled.div`
  position: absolute;
  top: 0%;
  bottom: 0%;
  right: 0.5rem;
  margin: auto 0;

  width: 2rem;
  height: 2rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 0.25rem;
    width: 100%;
    height: 100%;
  }
`;

export const ChatBoxForm = styled.form`
  position: relative;
  width: 100%;
`;

export const ChatBoxInput = styled.input`
  width: 100%;
  height: auto;

  padding: 1rem;
  padding-right: 3.2rem;

  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 1.5rem;

  font-size: 1rem;

  &:focus {
    outline-color: ${({ theme }) => theme.colors.primary.dark};
    outline-width: 1px;
  }
`;
