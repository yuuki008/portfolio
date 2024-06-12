import { Command, TerminalContext } from "@/context/TerminalContext";
import { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const Exit = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  const IllMissingYouVideoUrl = "https://www.youtube.com/watch?v=NKMtZm2YuBE";
  useEffect(() => {
    setMessage(`Goodbye!`);
    setTimeout(() => {
      window.location.href = IllMissingYouVideoUrl;
    }, 500);
  }, []);

  return message;
};
