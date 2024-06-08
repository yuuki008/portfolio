import React, { useContext, useEffect, useState } from "react";
import { TerminalContext } from "@/context/TerminalContext";

export const CommandLine = () => {
  const {
    commandHistories,
    currentDirectory,
    executeCommand,
    clearCommandHistories,
  } = useContext(TerminalContext);

  const currentPath = currentDirectory?.path() || "";
  const [command, setCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(commandHistories.length);

  useEffect(() => {
    setHistoryIndex(commandHistories.length);
  }, [commandHistories]);

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const lastIndex = commandHistories.length - 1;
    if (e.key === "ArrowUp") {
      setHistoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (e.key === "ArrowDown") {
      setHistoryIndex((prevIndex) => Math.min(lastIndex, prevIndex + 1));
    } else if (e.ctrlKey && e.key === "l") {
      clearCommandHistories();
      setHistoryIndex(0);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command);
      setCommand("");
    }
  };

  useEffect(() => {
    if (historyIndex < commandHistories.length) {
      setCommand(commandHistories[historyIndex].command);
    }
  }, [historyIndex, commandHistories]);

  return (
    <div className="flex">
      <span className="text-green-500">{"guest"}</span>
      <span>:</span>
      <span className="text-blue-500">~{currentPath}</span>
      <span className="mx-1">$</span>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          onKeyDown={handleKeyDown}
          autoFocus={true}
          autoComplete="off"
          type="text"
          max={50}
          onChange={handleCommandChange}
          value={command}
          className="w-[400px] max-w-[400px] focus:outline-none bg-transparent appearance-none border-none overflow-visible"
        />
      </form>
    </div>
  );
};
