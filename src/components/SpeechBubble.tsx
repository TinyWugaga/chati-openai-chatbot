import styled, { keyframes } from "styled-components";

import { mediaQueryScreen } from "@/assets/styles/mixin";

export default function SpeechBubble({
  text,
  direction = "right",
}: {
  text: string;
  direction?: string;
}) {
  return (
    <BubbleContainer>
      <Bubble direction={direction}>
        <BubbleTextWrapper>{text}</BubbleTextWrapper>
      </Bubble>
    </BubbleContainer>
  );
}

const BubbleBounceKeyframe = keyframes`
  0% {
    transform: scale(0.9, 0);
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
    transform: translateY(-10%);
  }

  70% {
    transform: translateY(0px);
  }
`;

const BubbleContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  animation: 0.38s ease-out 0s 1 normal forwards running ${BubbleBounceKeyframe};
  transform-box: fill-box;
  transform-origin: 50% 50%;
`;

const Bubble = styled.div<{ direction: string }>`
  position: relative;
  width: fit-content;
  max-width: 23rem;

  background: #f9f9f9;
  border-radius: ${({ direction }) =>
    direction === "right" ? "12px 12px 0px 12px" : "12px 12px 12px 0px"};
  ${({ direction }) =>
    direction === "right" ? "margin-left" : "margin-right"}: auto;
  padding: 0.8rem 1rem;

  ${mediaQueryScreen("tablet")} {
    max-width: 78%;
  }

  animation: 0.38s ease-out 0s 1 normal backwards running ${BubbleKeyframe};
  transform-box: fill-box;
  transform-origin: 50% 50%;
`;

const BubbleTextWrapper = styled.p`
  font-size: 1rem;
`;
