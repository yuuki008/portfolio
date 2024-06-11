import { Command, TerminalContext } from "@/context/TerminalContext";
import { useContext, useEffect } from "react";

type Props = {
  command: Command;
};

export const Exit = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => finishCommand(props.command.id), []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return "You can't exit from this terminal.";
};
