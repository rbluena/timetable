import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const GA_MEASUREMENT_ID = 'G-WER39820LN';
    const isProduction = process.env.NODE_ENV === 'production';

    return (
      <Html lang="en">
        <Head>
          <meta
            property="og:title"
            content="Simple scheduling and tasks management application."
          />
          <meta property="og:url" content="https://asteyo.com" />
          <meta property="og:image" content="/images/logo.png" />
          <meta
            property="og:description"
            content="Simple scheduling and tasks management application."
          />
          <meta property="og:site_name" content="Asteyo" />
          <meta name="theme-color" content="#1890ff" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />

          {/* start: GOOGLE ANALYTICS */}
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                }}
              />
            </>
          )}
          {/* end: GOOGLE ANALYTICS */}
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Start: Tawk */}
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/608ed62462662a09efc42d80/1f4mv9094';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
          {/* End: Tawk */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
