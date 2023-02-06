import { PropsWithChildren } from "react";
import styled from "styled-components";

import { mediaQueryScreen } from "@/assets/styles/mixin";

export default function BasicLayout({ children }: PropsWithChildren) {
  return <Main>{children}</Main>;
}

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100vw;
  height: 100vh;

  width: 100dvw;
  height: 100dvh;

  ${mediaQueryScreen("tablet", "up")} {
    padding: 1.2rem 1.4rem;
  }
`;
