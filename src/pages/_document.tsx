import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import { googleFontLinks } from "@/assets/styles/fonts";
import generateFontLinks from "@/utils/generateFontLinks";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          {/* metadata */}
          <meta
            property="og:title"
            content="OpenAI Chatting Bot!"
            key="title"
          />

          {/* google font links */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href={`https://fonts.googleapis.com/css2?${generateFontLinks(
              googleFontLinks
            )}&display=swap`}
            rel="stylesheet"
          />

          {/* Global site tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname
                  ${(process.env.NODE_ENV === 'development' && ",debug_event: 1,traffic_type : 'internal'") || ''}
                });
              `
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
