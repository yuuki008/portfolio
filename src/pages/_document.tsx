import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>{`Yuuki008 - Terminal Portfolio `}</title>
      <meta
        data-react-helmet="true"
        name="description"
        content="This is a terminal-style portfolio website. Enjoy your journey ..."
      ></meta>

      {/* Open Graph */}
      <meta
        data-react-helmet="true"
        property="og:title"
        content="Yuuki008 - Terminal Portfolio"
      ></meta>
      <meta
        data-react-helmet="true"
        property="og:description"
        content="This is a terminal-style portfolio website. Enjoy your journey ..."
      ></meta>
      <meta property="og:image" content="/images/opengraph-image.png" />
      <meta property="og:image:type" content="article" />
      <meta property="og:image:width" content="1068" />
      <meta property="og:image:height" content="609" />

      {/* Twitter Open Graph */}
      <meta
        data-react-helmet="true"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        data-react-helmet="true"
        property="og:type"
        content="article"
      ></meta>
      <meta
        data-react-helmet="true"
        property="twitter:title"
        content="Yuuki008 - Terminal Portfolio"
      ></meta>
      <meta
        data-react-helmet="true"
        property="twitter:description"
        content="Experience a unique terminal-style portfolio website, designed to showcase projects and skills in a hacker-themed interface. Navigate through various commands and immerse yourself in a tech-savvy environment."
      ></meta>
      <meta name="twitter:image" content="/images/opengraph-image.png" />
      <meta name="twitter:image:type" content="article" />
      <meta name="twitter:image:width" content="1068" />
      <meta name="twitter:image:height" content="609" />
      <link rel="icon" href="/images/logo.png" sizes="any" />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
