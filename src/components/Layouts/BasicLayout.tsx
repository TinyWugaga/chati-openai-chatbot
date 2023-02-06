import { PropsWithChildren } from "react";

import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100vw;
  height: 100vh;

  width: 100dvw;
  height: 100dvh;
`;

export default function BasicLayout({ children }: PropsWithChildren) {
  return <Main>{children}</Main>;
}
