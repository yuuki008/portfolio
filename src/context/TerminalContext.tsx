import { TerminalDirectory, TerminalFile } from "@/utils/FileSystem";
import React, { createContext, useEffect, useState } from "react";
import { DirectoryResource, Resource } from "@/pages/_app";

type TerminalContextType = {
  user: User | null;
  commandHistories: string[];
  isCommandRunning: boolean;
  finishedFirstview: boolean;
  currentDirectory: TerminalDirectory;
  finishFirstview: () => void;
  updateCurrentDirectory: (directory: TerminalDirectory) => void;
  finishCommand: () => void;
  username: (name: string) => Promise<boolean>;
  login: (name: string, password: string) => Promise<boolean>;
  executeCommand: (command: string) => void;
  clearCommandHistories: () => void;
};
export const TerminalContext = createContext<TerminalContextType>(
  {} as TerminalContextType
);

type Props = {
  children: React.ReactNode;
  rootDirectory: Resource;
};

type User = {
  name: string;
  role: string;
};

export function TerminalProvider({ children, rootDirectory }: Props) {
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const [commandHistories, setCommandHistories] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [finishedFirstview, setFinishedFirstview] = useState(false);

  const [currentDirectory, setCurrentDirectory] =
    useState<TerminalDirectory | null>(null);

  const executeCommand = (command: string) => {
    setIsCommandRunning(true);
    setCommandHistories((prev) => [...prev, command]);
  };

  const finishCommand = () => setIsCommandRunning(false);

  const login = async (name: string, password: string): Promise<boolean> => {
    const res = await fetch("/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, password }),
    }).then((res) => res.json());

    return await new Promise((resolve) => {
      setTimeout(() => {
        const user = res.user;
        if (user) {
          resolve(true);
          setUser(user);
          setCommandHistories(["welcome"]);
        } else {
          resolve(false);
        }
      }, 1500);
    });
  };

  const username = async (name: string): Promise<boolean> => {
    const res = await fetch("/api/username", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name }),
    });

    return await new Promise((resolve) => {
      setTimeout(() => {
        // NOTE: Visitor￼￼ユーザーはアクセスさせない
        // if (res.status === 404) {
        //   setUser({ name: "vistor", role: "vistor" });
        //   setCommandHistories(["welcome"]);
        // }
        return resolve(res.status === 200);
      }, 1500);
    });
  };

  const updateCurrentDirectory = (directory: TerminalDirectory) =>
    setCurrentDirectory(directory);

  const finishFirstview = () => setFinishedFirstview(true);

  const clearCommandHistories = () => setCommandHistories([]);

  useEffect(() => {
    if (rootDirectory.type != "directory") return;

    const root = new TerminalDirectory(rootDirectory.name);

    const buildTree = (
      directory: TerminalDirectory,
      resource: DirectoryResource
    ) => {
      resource.children.forEach((child) => {
        if (child.type === "file") {
          const childFile = new TerminalFile(child.name);
          childFile.parent = directory;
          directory.children.push(childFile);
          return;
        }

        const childDirectory = new TerminalDirectory(child.name);
        directory.children.push(childDirectory);
        childDirectory.parent = directory;
        buildTree(childDirectory, child);
      });
    };

    buildTree(root, rootDirectory);
    setCurrentDirectory(root);
  }, [rootDirectory]);

  if (!currentDirectory) return <></>;

  return (
    <TerminalContext.Provider
      value={{
        user,
        commandHistories,
        isCommandRunning,
        finishedFirstview,
        currentDirectory,
        finishFirstview,
        updateCurrentDirectory,
        finishCommand,
        username,
        login,
        executeCommand,
        clearCommandHistories,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}
