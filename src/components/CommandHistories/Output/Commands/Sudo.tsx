import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const Sudo = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);
  const [message, setMessage] = useState<string>("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  const NeverGiveUpVideoUrl = "https://www.youtube.com/watch?v=tYzMYcUty6s";
  useEffect(() => {
    setMessage(`sudo: Permission denied. You don't have the power yet.`);
    setTimeout(() => {
      window.open(NeverGiveUpVideoUrl, "_blank");
      finishCommand(props.command.id);
    }, 500);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return message;
};
