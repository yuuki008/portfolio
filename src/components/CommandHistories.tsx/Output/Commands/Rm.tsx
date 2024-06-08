// NOTE: 健太さんの案
import { CommandHistory, TerminalContext } from "@/context/TerminalContext";
import { useContext, useEffect, useState } from "react";

type Props = {
  history: CommandHistory;
};

export const Rm = (props: Props) => {
  const args = props.history.command.split(" ");
  const { finishCommand } = useContext(TerminalContext);

  const [message, setMessage] = useState<string>("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (args[1] === "-rf") {
      setMessage("Don't worry, even rm -rf can't erase your talent 💪");
      setTimeout(() => {
        window.open("https://www.youtube.com/watch?v=gdZLi9oWNZg", "_blank");
        finishCommand(props.history.id);
      }, 1500);
    } else {
      setMessage("No one can erase our memories...");
      finishCommand(props.history.id);
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return message;
};
