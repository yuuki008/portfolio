import { Command, TerminalContext } from "@/context/TerminalContext";
import { TerminalDirectory, TerminalFile } from "@/utils/FileSystem";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const Tree = (props: Props) => {
  const { currentDirectory, finishCommand } = useContext(TerminalContext);

  const [directory, _setDirectory] = useState(currentDirectory);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const renderTree = (
    node: TerminalDirectory | TerminalFile,
    level: number
  ) => {
    if (node instanceof TerminalDirectory) {
      const children = node.children.map((child: any) =>
        renderTree(child, level + 1)
      );
      return (
        <div key={node.name}>
          <div className="text-green-500 whitespace-wrap flex">{node.name}</div>
          <div className="ml-4">{children}</div>
        </div>
      );
    } else {
      return (
        <div key={node.name} className="text-green-500 whitespace-wrap flex">
          {node.name}
        </div>
      );
    }
  };

  return renderTree(directory, 0);
};
