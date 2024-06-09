import { Command, TerminalContext } from "@/context/TerminalContext";
import Image from "next/image";
import { useContext, useEffect } from "react";

type Props = {
  command: Command;
};

export const Welcome = (props: Props) => {
  const { currentDirectory, finishCommand, updateCurrentDirectory } =
    useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return (
    <div>
      <Image src="/images/logo.png" alt="" width={280} height={280} />
      <p>
        Welcome to my portfolio!
        <br />I am a software engineer who loves to create web applications.
      </p>
      <p>
        I am currently working at{" "}
        <a
          href="https://androots.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          and roots, Inc
        </a>
        .
      </p>

      <p className="mt-4">
        * Repository:
        <a
          href="https://github.com/yuuki008/portfolio"
          className="text-blue-400 underline ml-2"
          target="_blank"
        >
          https://github.com/yuuki008/portfolio
        </a>
        <br />* Github:
        <a
          href="https://github.com/yuuki008"
          className="text-blue-400 underline ml-2"
          target="_blank"
        >
          https://github.com/yuuki008/portfolio
        </a>
        <br />* Zenn:
        <a
          href="https://zenn.dev/nomu"
          className="text-blue-400 underline ml-2"
        >
          https://zenn.dev/nomu
        </a>
        <br />* X:
        <a
          href="https://x.com/nomu487495"
          className="text-blue-400 underline ml-2"
        >
          https://x.com/nomu487495
        </a>
      </p>

      <p className="mt-4">
        If you want to know more about me, please type{" "}
        <span className="text-green-400">{`"help"`}</span>.
      </p>
    </div>
  );
};
