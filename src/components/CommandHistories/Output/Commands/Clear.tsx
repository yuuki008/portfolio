import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect } from "react";

type Props = {
  command: Command;
};

export const Clear = (props: Props) => {
  const { finishCommand, clearCommandHistories } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.command.id);
    clearCommandHistories();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return <div>Clear</div>;
};
