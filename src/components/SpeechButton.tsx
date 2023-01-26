import { MouseEvent } from "react";
import styled from "styled-components";

const SpeechButton = styled.button`
  padding: 12px 0;
  color: #fff;
  font-size: 16px;
  background-color: #10a37f;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`;

export default function ({
  onClick,
}: {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return <SpeechButton onClick={onClick}>Speak</SpeechButton>;
}
