import { TerminalProvider } from "@/context/TerminalContext";
import "@/styles/globals.css";
import "@/styles/markdown.css";
import type { AppProps } from "next/app";
import { statSync, readdirSync } from "fs";
import { join, basename } from "path";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { GA_TRACKING_ID } from "@/utils/gtag";

export type DirectoryResource = {
  name: string;
  type: "directory";
  children: Resource[];
};

export type FileResource = {
  name: string;
  type: "file";
};

export type Resource = DirectoryResource | FileResource;

type Props = {
  rootDirectory: DirectoryResource;
} & AppProps;

function App({ Component, pageProps, rootDirectory }: Props) {
  const router = useRouter();

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
      <TerminalProvider rootDirectory={rootDirectory}>
        <main className={`font-terminal text-[14px] bg-black`}>
          <div className="overflow-y-scroll terminal min-h-screen bg-black">
            <Component {...pageProps} />
          </div>
        </main>
      </TerminalProvider>
    </>
  );
}

const readDirectory = (directoryPath: string) => {
  const stat = statSync(directoryPath);
  if (!stat.isDirectory()) {
    throw new Error("The provided path is not a directory.");
  }

  const files = readdirSync(directoryPath);
  const directory: Resource = {
    name: basename(directoryPath),
    type: "directory",
    children: [],
  };

  files.forEach((file) => {
    const filePath = join(directoryPath, file);
    const fileStat = statSync(filePath);
    if (fileStat.isDirectory()) {
      directory.children.push(readDirectory(filePath));
    } else {
      directory.children.push({
        name: file,
        type: "file",
      });
    }
  });

  return directory;
};

App.getInitialProps = async () => {
  const root = join(process.cwd(), "public");
  let rootDirectory: Resource;

  try {
    rootDirectory = readDirectory(root);
  } catch (error) {
    console.error("Error reading directory:", error);
    rootDirectory = { name: "terminal", type: "directory", children: [] };
  }

  return {
    rootDirectory,
  };
};

export default App;
