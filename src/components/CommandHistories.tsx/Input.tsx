import {
  CommandHistory,
  TerminalContext,
  username,
} from "@/context/TerminalContext";
import React, { memo, useContext, useState } from "react";

type Props = {
  commandHistory: CommandHistory;
};

const Input = memo((props: Props) => {
  const { currentDirectory } = useContext(TerminalContext);

  const [currentPath, _setCurrentPath] = useState<string>(
    currentDirectory.path()
  );

  return (
    <div>
      <p className="flex">
        <span className="text-green-500">{username}</span>
        <span>:</span>
        <span className="text-blue-500">~{currentPath}</span>
        <span className="mx-1">$</span>
        <span>{props.commandHistory.input}</span>
      </p>
    </div>
  );
});

Input.displayName = "Input";
export default Input;
