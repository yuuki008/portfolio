import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect } from "react";

type Props = {
  command: Command;
};
export const Share = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    window.open(
      "https://twitter.com/intent/tweet?hashtags=Yuuki008,TerminalPortfolio&url=https://terminal.yuuki008.dev",
      "_blank"
    );
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return "";
};
