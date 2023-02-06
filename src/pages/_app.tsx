import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@/assets/styles/globalStyles";
import { theme } from "@/assets/styles/globalTheme";

import { BasicLayout } from "@/components/Layouts";

interface CustomComponent {
  Layout: typeof BasicLayout;
}

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: CustomComponent;
}) {
  const Layout = Component.Layout || BasicLayout;
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
