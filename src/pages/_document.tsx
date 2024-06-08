import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>{`yuuki008 - Portfolio `}</title>
      <meta
        data-react-helmet="true"
        name="description"
        content="Experience a unique terminal-style portfolio website, designed to showcase projects and skills in a hacker-themed interface. Navigate through various commands and immerse yourself in a tech-savvy environment."
      ></meta>

      {/* Open Graph */}
      <meta
        data-react-helmet="true"
        property="og:title"
        content="yuuki008 - Portfolio"
      ></meta>
      <meta
        data-react-helmet="true"
        property="og:description"
        content="Experience a unique terminal-style portfolio website, designed to showcase projects and skills in a hacker-themed interface. Navigate through various commands and immerse yourself in a tech-savvy environment."
      ></meta>
      <meta property="og:image" content="/opengraph-image.png" />
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
        content="yuuki008 - Portfolio"
      ></meta>
      <meta
        data-react-helmet="true"
        property="twitter:description"
        content="Experience a unique terminal-style portfolio website, designed to showcase projects and skills in a hacker-themed interface. Navigate through various commands and immerse yourself in a tech-savvy environment."
      ></meta>
      <meta name="twitter:image" content="/opengraph-image.png" />
      <meta name="twitter:image:type" content="article" />
      <meta name="twitter:image:width" content="1068" />
      <meta name="twitter:image:height" content="609" />
      <link rel="icon" href="/logos/color.png" sizes="any" />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
