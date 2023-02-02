import styled from "styled-components";

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

const BubbleContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const Bubble = styled.div<{ direction: string }>`
  position: relative;
  width: fit-content;
  max-width: 78%;

  background: #f9f9f9;
  border-radius: ${({ direction }) =>
    direction === "right" ? "12px 12px 0px 12px" : "12px 12px 12px 0px"};
  ${({ direction }) =>
    direction === "right" ? "margin-left" : "margin-right"}: auto;
  padding: 0.8rem 1rem;

  @media screen and (min-width: 768px) {
    max-width: 23rem;
  }
`;

const BubbleTextWrapper = styled.p`
  font-size: 1rem;
`;
