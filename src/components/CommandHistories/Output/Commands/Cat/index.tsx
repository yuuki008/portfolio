import React, { useContext, useEffect, useState } from "react";
import { Command, TerminalContext } from "@/context/TerminalContext";

type Props = {
  command: Command;
};

export const Cat = (props: Props) => {
  const { currentDirectory, finishCommand } = useContext(TerminalContext);

  const [fileName, setFileName] = useState<string>("");
  const [directory, _setDirectory] = useState(currentDirectory);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const f = async () => {
      const fileName = props.command.command.split(" ")[1];
      if (!fileName) {
        setMessage("cat: missing file operand");
        finishCommand(props.command.id);
        return;
      }

      setFileName(fileName);

      const extention = fileName.split(".").slice(-1)[0];

      if (extention !== "txt" && extention !== "md") {
        setMessage(`${fileName}: Not a text file`);
        finishCommand(props.command.id);
        return;
      }

      const res = await fetch(`${directory.path()}/${fileName}`);
      if (!res.ok) {
        setTimeout(() => {
          setMessage(`${fileName}: No such file`);
          finishCommand(props.command.id);
        }, 300);
        return;
      }

      const text = await res.text();

      setTimeout(() => {
        setContent(text);
        finishCommand(props.command.id);
      }, 600);
    };

    f();
  }, [directory, fileName]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (message) return message;

  if (!content) return "";

  return (
    <div className="border m-3 max-w-[1000px]">
      <div className="flex p-2 border-b">File: {fileName} </div>
      <div className="p-4">
        <div className="whitespace-pre-wrap tracking-wider text-white">
          {content}
        </div>
      </div>
    </div>
  );
};
