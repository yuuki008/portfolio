import { TerminalDirectory, TerminalFile } from "@/utils/FileSystem";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { DirectoryResource } from "@/pages/_app";

type TerminalContextType = {
  commandHistories: CommandHistory[];
  isCommandRunning: boolean;
  finishedFirstview: boolean;
  currentDirectory: TerminalDirectory;
  finishFirstview: () => void;
  updateCurrentDirectory: (directory: TerminalDirectory) => void;
  finishCommand: (id: number) => void;
  executeCommand: (command: string) => void;
  clearCommandHistories: () => void;
};
export const TerminalContext = createContext<TerminalContextType>(
  {} as TerminalContextType
);

type Props = {
  children: React.ReactNode;
  rootDirectory: DirectoryResource;
};

export type CommandHistory = {
  id: number;
  command: string;
  isRunning: boolean;
};

export const username = "guest";

export function TerminalProvider({ children, rootDirectory }: Props) {
  const [commandHistories, setCommandHistories] = useState<CommandHistory[]>(
    []
  );
  const [finishedFirstview, setFinishedFirstview] = useState(false);
  const [currentDirectory, setCurrentDirectory] =
    useState<TerminalDirectory | null>(null);
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const [commandQueue, setCommandQueue] = useState<string[]>([]);

  /**
   * キュー内の次のコマンドを実行する
   */
  const executeNextCommand = useCallback(() => {
    if (commandQueue.length === 0) {
      setIsCommandRunning(false);
      return;
    }

    const nextCommand = commandQueue[0];
    const newCommand = {
      command: nextCommand,
      isRunning: true,
      id: Date.now(),
    };
    setCommandHistories((prev) => [...prev, newCommand]);
    setCommandQueue((prev) => prev.slice(1));

    // コマンドの実行はここで行う（例: コマンド実行関数を呼び出す）
  }, [commandQueue]);

  /**
   * コマンドを実行し、キューに追加する
   */
  const executeCommand = (command: string) => {
    const commands = command.split("&").map((cmd) => cmd.trim());

    setIsCommandRunning(true);
    const newCommand = {
      command: commands[0],
      isRunning: true,
      id: Date.now(),
    };
    setCommandHistories((prev) => [...prev, newCommand]);
    if (commands.length === 1) return;

    setCommandQueue([...commands.slice(1)]);
  };

  /**
   * コマンドの終了を通知し、次のコマンドを実行する
   */
  const finishCommand = useCallback(
    (id: number) => {
      setCommandHistories((prev) =>
        prev.map((command) =>
          command.id === id ? { ...command, isRunning: false } : command
        )
      );
      executeNextCommand();
    },
    [executeNextCommand]
  );

  /**
   * 現在のディレクトリを更新する
   */
  const updateCurrentDirectory = (directory: TerminalDirectory) =>
    setCurrentDirectory(directory);

  /**
   * 初回表示を終了する
   */
  const finishFirstview = () => setFinishedFirstview(true);

  /**
   * コマンド履歴をクリアする
   */
  const clearCommandHistories = () => setCommandHistories([]);

  /**
   * ディレクトリツリーを構築する
   */
  useEffect(() => {
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
        commandHistories,
        isCommandRunning,
        finishedFirstview,
        currentDirectory,
        finishFirstview,
        updateCurrentDirectory,
        finishCommand,
        executeCommand,
        clearCommandHistories,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}
