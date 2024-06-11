import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const History = (props: Props) => {
  const { finishCommand, commandHistories } = useContext(TerminalContext);
  const commands = commandHistories.map((command) => command);

  const [histories, _setHistories] = useState(commands);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>
      {histories.map((command, index) => (
        <p key={index} className="pl-8">
          <span className="pr-4">{index + 1}</span>
          {command.input}
        </p>
      ))}
    </div>
  );
};
