import styled from "styled-components";

export default function SpeechBubble({
  direction = "right",
  text,
}: {
  direction: string;
  text: string;
}) {
  return (
    <Bubble direction={direction}>
      <p>{text}</p>
    </Bubble>
  );
}

const Bubble = styled.div<{ direction: string }>`
  background: #f9f9f9;
  border-radius: ${({ direction }) =>
    direction === "right" ? "12px 12px 0px 12px" : "12px 12px 12px 0px"};
`;
