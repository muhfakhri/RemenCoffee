// filepath: /c:/Users/nurfa/OneDrive/Documents/A_CODING/nextjs/tefa-mp/src/pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="64x64" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="" />
        <style dangerouslySetInnerHTML={{__html: `
          .wa_button,
          .wa-button,
          [class*="whatsapp"],
          [class*="delightchat"],
          [id*="whatsapp"],
          [id*="delightchat"],
          [data-wa-widget],
          button[aria-label*="WhatsApp"],
          div[data-test*="whatsapp"],
          iframe[src*="delightchat"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            z-index: -99999 !important;
          }
        `}} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}