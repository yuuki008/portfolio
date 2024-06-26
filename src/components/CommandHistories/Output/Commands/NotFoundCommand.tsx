import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect } from "react";

type Props = {
  command: Command;
};

export const NotFoundCommand = (props: Props) => {
  const command = props.command.command.split(" ")[0];
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>{`${command}: Command not found. Use 'help' to see the command list.`}</div>
  );
};
