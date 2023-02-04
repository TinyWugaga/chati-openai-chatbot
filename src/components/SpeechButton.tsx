import styled, { DefaultTheme, keyframes, css } from "styled-components";

import { MicIcon } from "@/components/Icons";
import {
  backgroundHexColorDarken,
  backgroundHexColorLighten,
} from "@/assets/styles/mixin";

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

const ButtonActiveKeyframe = (
  theme: DefaultTheme,
  backgroundColor: string
) => keyframes`
  0% {
    background: ${backgroundColor};
    color: inherit;
  }

  50% {
    background: ${backgroundHexColorLighten(
      theme.colors.white.main + "80",
      theme.colors.primary.main
    )};
    color: ${theme.colors.black.main + "60"};
  }

  99% {
    background: ${backgroundColor};
    color: inherit;
  }
`;

const ButtonActiveAnimation = ({
  theme,
  backgroundColor,
}: {
  theme: DefaultTheme;
  backgroundColor: string;
}) => css`
  animation: 1.2s cubic-bezier(0.5, 0.4, 0.99, 0.88) 0s infinite normal
    backwards running ${ButtonActiveKeyframe(theme, backgroundColor)};
  transform-box: fill-box;
  transform-origin: 50% 50%;
`;

const Button = styled.button.attrs(({ theme }) => ({
  backgroundColor: backgroundHexColorDarken(
    theme.colors.primary.main,
    theme.colors.primary.dark
  ),
}))<{ active?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  font-size: 2rem;

  cursor: pointer;
  background: ${({ backgroundColor }) => backgroundColor};

  color: inherit;
  border: none;
  border-radius: 1.5rem;
  text-align: center;

  transition: all ease-in-out 0.3s;

  @media screen and (hover: hover) {
    &:hover:not([disabled]) {
      background: ${({ theme }) =>
        backgroundHexColorLighten(
          theme.colors.primary.main,
          theme.colors.white.main
        )};
    }
  }
  &[disabled] {
    cursor: auto;

    ${({ theme, active }) =>
      active
        ? ButtonActiveAnimation
        : `color: ${theme.colors.black.main + "30"};
           background: ${theme.colors.black.main + "08"};
      `}
  }
`;
