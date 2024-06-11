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
      <div className="text-blue-500 font-[600]">{"~" + currentPath}</div>
      <div className="flex">
        <span className="mr-2 text-green-500">{"❯"}</span>
        <span>{props.commandHistory.input}</span>
      </div>
    </div>
  );
});

Input.displayName = "Input";
export default Input;
