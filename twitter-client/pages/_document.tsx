// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import  "dotenv/config"
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add your meta tags, stylesheets, and other head elements here */}
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
