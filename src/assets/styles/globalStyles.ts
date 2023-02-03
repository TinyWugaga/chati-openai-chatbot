import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary.text};

    padding: 0;
    margin: 0;

    font-family: Poppins, Noto Sans TC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  input {
    border: unset;
  }

  button {
    appearance: none;
  }

  p {
    margin: 0px;
  }
`;

export default GlobalStyle;
