import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;

    font-family: Poppins, Noto Sans TC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.secondary.main};
  }

  * {
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
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
