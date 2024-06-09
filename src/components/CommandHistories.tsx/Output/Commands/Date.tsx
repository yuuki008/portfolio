import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const DateCommand = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);
  const [date, setDate] = useState("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setDate(new Date().toLocaleString());
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return <div>{date}</div>;
};
