import { AsciiImage } from "@/components/Parts/AsciiImage";
import { TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useEffect } from "react";

export const Welcome = () => {
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="text-center mx-auto py-8">
      <div className="w-[500px] mx-auto mb-10">
        <AsciiImage
          filePath="terminal/images/zurukumo.jpg"
          width={500}
          height={500}
          brightness={2.5}
        />
      </div>
      <div className="text-left max-w-[800px] px-10 mx-auto leading-[1.5]">
        <br />
        Welcome to zurukumo terminal!
        <br />
        This Website was created for zurukumo.
        <br />
        <div className="my-4">
          For a list of available commands, type
          <span className="ml-2 text-green-500">help</span>.
        </div>
      </div>
    </div>
  );
};
