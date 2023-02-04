import styled, { keyframes, css } from "styled-components";

import { mediaQueryScreen } from "@/assets/styles/mixin";

export default function SpeechBubble({
  text,
  direction = "right",
  isLoading = false,
}: {
  text: string;
  direction?: string;
  isLoading?: boolean;
}) {
  return (
    <BubbleContainer>
      <Bubble direction={direction}>
        <BubbleTextWrapper isLoading={isLoading}>{text}</BubbleTextWrapper>
      </Bubble>
    </BubbleContainer>
  );
}

const BubbleBounceKeyframe = keyframes`
  0% {
    transform: scale(0.98, 0);
  }
  70% {
    transform: scale(1, 1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const BubbleKeyframe = keyframes`
  0% {
    transform: translateY(10px);
  }

  55% {
    transform: translateY(-8%);
  }

  70% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(0px);
  }
`;

const LoadingKeyframe = keyframes`
  0% {
    width: 0;
    margin-right: 100%;
  }

  100% {
    width: 100%;
    margin-right: 0;
  }
`;

const BubbleContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  transform: scale(0);
  animation: 0.38s ease-out 500ms 1 normal forwards running
    ${BubbleBounceKeyframe};
  transform-box: fill-box;
  transform-origin: 50% 50%;
`;

const Bubble = styled.div<{ direction: string }>`
  position: relative;
  width: fit-content;
  max-width: 23rem;

  background: #f9f9f9;
  box-shadow: 0px 4px 2px rgba(72, 77, 81, 0.12);

  border-radius: ${({ direction }) =>
    direction === "right" ? "12px 12px 0px 12px" : "12px 12px 12px 0px"};
  ${({ direction }) =>
    direction === "right" ? "margin-left" : "margin-right"}: auto;
  padding: 0.8rem 1rem;

  ${mediaQueryScreen("tablet")} {
    max-width: 78%;
  }

  animation: 0.38s ease-out 500ms 1 normal backwards running ${BubbleKeyframe};
  transform-box: fill-box;
  transform-origin: 50% 50%;
`;

const LoadingCSS = css`
  &:before {
    content: "......";
    display: inline-block;
    overflow-x: hidden;

    width: 0;
    margin-right: 100%;

    letter-spacing: 2px;

    animation: 1.2s linear 500ms infinite normal forwards running
      ${LoadingKeyframe};
  }
`;

const BubbleTextWrapper = styled.p<{ isLoading: boolean }>`
  font-size: 1rem;

  ${({ isLoading }) => (isLoading ? LoadingCSS : "")};
`;
