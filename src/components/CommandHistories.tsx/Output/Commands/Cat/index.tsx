import React, { useContext, useEffect, useState } from "react";
import { Command, TerminalContext } from "@/context/TerminalContext";

type Props = {
  command: Command;
};

export const Cat = (props: Props) => {
  const fileName = props.command.command.split(" ")[1];
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
        return finishCommand(props.command.id);
      }

      const text = await res.text();
      setContent(text);
      finishCommand(props.command.id);
    };

    f();
  }, [directory, fileName]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (message) return message;

  return (
    <div className="whitespace-pre-wrap m-4 text-sm  text-white font-helvetica">
      {content}
    </div>
  );
};
