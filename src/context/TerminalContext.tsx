import { TerminalDirectory, TerminalFile } from "@/utils/FileSystem";
import React, { createContext, useEffect, useState, useCallback } from "react";
import { DirectoryResource } from "@/pages/_app";

type TerminalContextType = {
  commandHistories: CommandHistory[];
  isCommandRunning: boolean;
  isFinishedFirstview: boolean;
  currentDirectory: TerminalDirectory;
  finishFirstview: () => void;
  updateCurrentDirectory: (directory: TerminalDirectory) => void;
  finishCommand: (commandId: number) => void;
  executeCommand: (input: string) => void;
  clearCommandHistories: () => void;
};

export const TerminalContext = createContext<TerminalContextType>(
  {} as TerminalContextType
);

type Props = {
  children: React.ReactNode;
  rootDirectory: DirectoryResource;
};

export type Command = {
  id: number;
  command: string;
  finished: boolean;
  running: boolean;
};

export type CommandHistory = {
  input: string;
  commands: Command[];
  finished: boolean;
};

export const username = "guest";

export function TerminalProvider({ children, rootDirectory }: Props) {
  const [commandHistories, setCommandHistories] = useState<CommandHistory[]>(
    []
  );
  const [isFinishedFirstview, setIsFinishedFirstview] = useState(false);
  const [currentDirectory, setCurrentDirectory] =
    useState<TerminalDirectory | null>(null);
  const [isCommandRunning, setIsCommandRunning] = useState(false);
  const [commandQueue, setCommandQueue] = useState<Command[]>([]);

  /**
   * キュー内の次のコマンドを実行する
   */
  const executeNextCommand = useCallback(() => {
    if (commandQueue.length === 0) {
      setIsCommandRunning(false);
      return;
    }

    const nextCommand = commandQueue[0];
    setCommandQueue((prev) => prev.slice(1));

    setCommandHistories((prev) =>
      prev.map((history) =>
        history.commands.some((cmd) => cmd.id === nextCommand.id)
          ? {
              ...history,
              commands: history.commands.map((cmd) =>
                cmd.id === nextCommand.id ? { ...cmd, running: true } : cmd
              ),
            }
          : history
      )
    );
  }, [commandQueue]);

  /**
   * 入力されたコマンドを実行し、キューに追加する
   */
  const executeCommand = (input: string) => {
    const commands = input.split("&").map((cmd, index) => ({
      id: Date.now() + index,
      command: cmd.trim(),
      finished: false,
      running: index === 0,
    }));

    setCommandHistories((prev) => [
      ...prev,
      { input, commands, finished: false },
    ]);

    setCommandQueue(commands.slice(1));
    setIsCommandRunning(true);
  };

  /**
   * 指定されたコマンドIDのコマンドを完了し、次のコマンドを実行する
   */
  const finishCommand = useCallback(
    (commandId: number) => {
      setCommandHistories((prev) =>
        prev.map((history) => ({
          ...history,
          commands: history.commands.map((cmd) =>
            cmd.id === commandId
              ? { ...cmd, running: false, finished: true }
              : cmd
          ),
          finished: history.commands.every((cmd) =>
            cmd.id === commandId ? true : cmd.finished
          ),
        }))
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
  const finishFirstview = () => setIsFinishedFirstview(true);

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
        } else {
          const childDirectory = new TerminalDirectory(child.name);
          directory.children.push(childDirectory);
          childDirectory.parent = directory;
          buildTree(childDirectory, child);
        }
      });
    };

    buildTree(root, rootDirectory);
    setCurrentDirectory(root);
  }, [rootDirectory]);

  // 現在のディレクトリが設定されていない場合、何も表示しない
  if (!currentDirectory) return <></>;

  return (
    <TerminalContext.Provider
      value={{
        commandHistories,
        isCommandRunning,
        isFinishedFirstview,
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
