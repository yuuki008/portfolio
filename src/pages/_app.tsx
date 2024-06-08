import { TerminalProvider } from "@/context/TerminalContext";
import "@/styles/globals.css";
import "github-markdown-css/github-markdown-light.css";
import type { AppProps } from "next/app";
import { Space_Mono } from "next/font/google";
import { statSync, readdirSync } from "fs";
import { join, basename } from "path";

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

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
  rootDirectory: Resource;
} & AppProps;

function App({ Component, pageProps, rootDirectory }: Props) {
  return (
    <TerminalProvider rootDirectory={rootDirectory}>
      <main className={`${mono.className} bg-black`}>
        <div className="overflow-y-scroll terminal min-h-screen bg-black">
          <Component {...pageProps} />
        </div>
      </main>
    </TerminalProvider>
  );
}

const readDirectory = (directoryPath: string): Resource => {
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
