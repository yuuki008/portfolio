import React, { useContext, useEffect, useState } from "react";
import { CommandHistory, TerminalContext } from "@/context/TerminalContext";

type Props = {
  history: CommandHistory;
};

export const Cat = (props: Props) => {
  const fileName = props.history.command.split(" ")[1];
  const extention = fileName.split(".").slice(-1)[0];
  const { currentDirectory, finishCommand } = useContext(TerminalContext);

  const [directory, _setDirectory] = useState(currentDirectory);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const f = async () => {
      if (extention !== "txt" && extention !== "md")
        setMessage(`${fileName}: Not a text file`);

      const res = await fetch(`${directory.path()}/${fileName}`);
      if (!res.ok) {
        setMessage(`${fileName}: No such file`);
        return finishCommand(props.history.id);
      }

      const text = await res.text();
      setContent(text);
      finishCommand(props.history.id);
    };

    f();
  }, [directory, fileName]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (message) return message;

  return (
    <div className="whitespace-pre-wrap text-[#00b6ee] my-2">{content}</div>
  );
};
