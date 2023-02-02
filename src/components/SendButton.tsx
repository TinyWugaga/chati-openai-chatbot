import styled, { DefaultTheme, keyframes, css } from "styled-components";

import { SendIcon } from "@/components/Icons";
export default function SendButton({
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
      <SendIcon />
    </Button>
  );
}

const ButtonActiveKeyframe = (theme: DefaultTheme) => keyframes`
  0% {
    color: inherit;
  }

  50% {
    color: ${theme.colors.black.main + "60"};
  }

  99% {
    color: inherit;
  }
`;

const ButtonActiveAnimation = ({ theme }: { theme: DefaultTheme }) => css`
  animation: 1.2s cubic-bezier(0.5, 0.4, 0.99, 0.88) 0s infinite normal
    backwards running ${ButtonActiveKeyframe(theme)};
  transform-box: fill-box;
  transform-origin: 50% 50%;
`;

const Button = styled.button<{ active?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  font-size: 2rem;

  cursor: pointer;

  color: inherit;
  border: none;
  border-radius: 1.5rem;
  text-align: center;

  background-color: transparent;
  transition: all ease-in-out 0.1s;

  @media screen and (hover: hover) {
    &:hover:not([disabled]) {
      color: ${({ theme }) => theme.colors.primary.dark + "80"};
    }
  }

  &[disabled] {
    cursor: auto;

    ${({ theme, active }) =>
      active
        ? ButtonActiveAnimation
        : `color: ${theme.colors.black.main + "26"};`}
  }
`;
