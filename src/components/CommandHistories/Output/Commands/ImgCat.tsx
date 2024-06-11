import { Command, TerminalContext } from "@/context/TerminalContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

const extentions = ["png", "jpg", "jpeg", "webp", "gif", "svg", "ico"];

export const ImgCat = (props: Props) => {
  const { finishCommand, currentDirectory } = useContext(TerminalContext);

  const fileName = props.command.command.split(" ")[1];
  const [url, setUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const f = async () => {
      const extention = fileName.split(".").slice(-1)[0];
      if (!extentions.includes(extention)) {
        finishCommand(props.command.id);
        return setErrorMessage(`${fileName}: Not an image file`);
      }

      const res = await fetch(`${currentDirectory.path()}/${fileName}`);
      if (!res.ok) {
        setTimeout(() => {
          finishCommand(props.command.id);
          setErrorMessage(`${fileName}: No such file`);
        }, 300);

        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setTimeout(() => {
        finishCommand(props.command.id);
        setUrl(url);
      }, 600);
    };
    f();
  }, [fileName]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (errorMessage) return errorMessage;
  if (!url) return "Loading...";

  return (
    <div className="my-4">
      <Image
        width={500}
        height={500}
        className="w-[80%] max-w-[500px] !relative"
        src={url}
        alt={fileName}
      />
    </div>
  );
};
