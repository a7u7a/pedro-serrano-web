import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Netlify Widget */}
          <script
            async
            src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          />
          {/* Fonts */}
          <link
            // href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital@0;1&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
