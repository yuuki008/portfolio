import { TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect } from "react";

type Props = {
  commandName: string;
};

export const NotFoundCommand = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>{`${props.commandName}: Command not found. Use 'help' to see the command list.`}</div>
  );
};
