import { CommandHistory, TerminalContext } from "@/context/TerminalContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

type Props = {
  history: CommandHistory;
};

const extentions = ["png", "jpg", "jpeg", "webp", "gif", "svg", "ico"];

export const ImgCat = (props: Props) => {
  const { finishCommand, currentDirectory } = useContext(TerminalContext);

  const fileName = props.history.command.split(" ")[1];
  const [url, setUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const f = async () => {
      const extention = fileName.split(".").slice(-1)[0];
      if (!extentions.includes(extention)) {
        finishCommand(props.history.id);
        return setErrorMessage(`${fileName}: Not an image file`);
      }

      const res = await fetch(`${currentDirectory.path()}/${fileName}`);
      if (!res.ok) {
        finishCommand(props.history.id);
        return setErrorMessage(`${fileName}: No such file`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      finishCommand(props.history.id);
      setUrl(url);
    };
    f();
  }, [fileName]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (errorMessage) return errorMessage;

  return (
    <div className="my-4">
      <Image
        className="w-[80%] max-w-[400px] !relative"
        layout="fill"
        objectFit="cover"
        src={url}
        alt={fileName}
      />
    </div>
  );
};
