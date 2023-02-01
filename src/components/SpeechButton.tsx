import styled from "styled-components";

import { MicIcon } from "@/components/Icons";
import {
  backgroundHexColorDarken,
  backgroundHexColorLighten,
} from "@/assets/styles/mixin";

const Button = styled.button<{ active?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  font-size: 2rem;

  cursor: pointer;
  background: ${({ theme }) =>
    backgroundHexColorDarken(
      theme.colors.primary.main,
      theme.colors.primary.dark
    )};

  color: inherit;
  border: none;
  border-radius: 1.5rem;
  text-align: center;

  &:hover:not([disabled]) {
    background: ${({ theme }) =>
      backgroundHexColorLighten(
        theme.colors.primary.main + "80",
        theme.colors.white.main
      )};
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    cursor: auto;
    color: ${({ theme }) => theme.colors.primary.dark + "80"};
  }
`;

export default function SpeechButton({
  onClick,
  disabled = false,
  isActive = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
}) {
  return (
    <Button disabled={disabled} active={isActive} onClick={onClick}>
      <MicIcon />
    </Button>
  );
}
