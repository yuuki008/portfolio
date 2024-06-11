import { Command, TerminalContext } from "@/context/TerminalContext";
import { TerminalDirectory } from "@/utils/FileSystem";
import { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const Cd = (props: Props) => {
  const { currentDirectory, finishCommand, updateCurrentDirectory } =
    useContext(TerminalContext);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const root = (dir: TerminalDirectory) => {
    let current = dir;
    while (current.parent) {
      current = current.parent;
    }
    return current;
  };

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const path = props.command.command.split(" ")[1];

    if (path == "/" || path == "~" || !path) {
      const dir = root(currentDirectory);
      updateCurrentDirectory(dir);
      return;
    }

    const tokens = path.split("/").filter((t) => t);
    let current = currentDirectory;

    for (const token of tokens) {
      if (token == ".") continue;
      if (token === "..") {
        current = current.parent || current;
        continue;
      }

      const child = current.children.find(
        (c) => c.name === token && c instanceof TerminalDirectory
      );

      if (!child || !(child instanceof TerminalDirectory)) {
        setErrorMessage(`cd: no such directory ${token}`);
        break;
      }

      current = child;
    }
    updateCurrentDirectory(current);

    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (errorMessage) {
    return errorMessage;
  }

  return "";
};
