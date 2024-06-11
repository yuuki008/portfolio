import React, { useContext, useEffect, useState } from "react";
import { marked } from "marked";
import { Command, TerminalContext } from "@/context/TerminalContext";

type Props = {
  command: Command;
};

export const Preview = (props: Props) => {
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
      if (extention !== "md") {
        setMessage(`${fileName}: Not a markdown file`);
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
      const html = await marked(text);

      setTimeout(() => {
        setContent(html);
        finishCommand(props.command.id);
      }, 600);
    };

    f();
  }, [directory, fileName]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (message) return message;

  if (!content) return "";
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
