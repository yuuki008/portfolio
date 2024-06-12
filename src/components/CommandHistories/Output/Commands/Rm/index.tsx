import { AsciiImage } from "@/components/Parts/AsciiImage";
import { Command, TerminalContext } from "@/context/TerminalContext";
import { useContext, useEffect, useState } from "react";
import { Rf } from "./Rf";

type Props = {
  command: Command;
};

export const Rm = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);
  const args = props.command.command.split(" ");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRf, setIsRf] = useState<boolean>(false);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (args[1] === "-rf") {
      setIsRf(true);
    } else {
      setIsRf(false);
      finishCommand(props.command.id);
    }

    setIsLoading(false);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // メッセージ候補
  // - No one can erase our memories...
  // - The web never forget. Unknow
  // - One on the internet, always on the internet. Unknow
  // - The Internet is written in ink, not pencil. Unknow
  // - Some things can't be forggotten. the notebook
  // - Memories are forever. Skyfall (2012)
  // - You can't escape your past. The Lion King (1994)

  if (isLoading) return "";

  return (
    <div className="my-4">
      {isRf ? (
        <Rf command={props.command} />
      ) : (
        <>
          <div>REJECTED...</div>
          <AsciiImage
            filePath="/images/terminator.png"
            width={400}
            height={400}
            brightness={3.0}
          />
        </>
      )}
    </div>
  );
};
