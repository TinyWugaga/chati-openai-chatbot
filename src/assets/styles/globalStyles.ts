import { createGlobalStyle } from "styled-components";

import fonts from "./fonts";

const GlobalStyle = createGlobalStyle`

  ${fonts}

  html,
  body {
    color: ${({ theme }) => theme.colors.primary.text};

    padding: 0;
    margin: 0;

    font-family: "ColfaxAI", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }

  input {
    border: unset;
  }
`;

export default GlobalStyle;
