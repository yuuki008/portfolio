import { Command, TerminalContext } from "@/context/TerminalContext";
import { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const Wget = (props: Props) => {
  const filename = props.command.command.split(" ")[1];
  const { currentDirectory, finishCommand } = useContext(TerminalContext);

  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const f = async () => {
      const response = await fetch(`${currentDirectory.path()}/${filename}`);

      if (!response.ok) {
        setErrorMessage("File not found");
        finishCommand(props.command.id);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      finishCommand(props.command.id);
    };
    f();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return errorMessage;
};
