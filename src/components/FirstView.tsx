import React, { useContext } from "react";
import { TypingAnimation } from "./Parts/TypingAnimation";
import { TerminalContext } from "@/context/TerminalContext";
import { classes } from "@/utils/classes";
import Logo from "../../public/logos/color.png";
import Image from "next/image";

export const FirstView = () => {
  const { finishFirstview, isFinishedFirstview } = useContext(TerminalContext);

  const titleSequences = [
    "WELCOME TO YUUKI008 TERMINAL",
    1000,
    "WAITING FOR CONNECT .",
    300,
    "WAITING FOR CONNECT ..",
    300,
    "WAITING FOR CONNECT ...",
    300,
    "WAITING FOR CONNECT ....",
    300,
    "WAITING FOR CONNECT .....",
    1000,
    () => finishFirstview(),
  ];

  return (
    <div className={`relative`}>
      <div
        onClick={() => finishFirstview()}
        className={classes(
          "fixed w-screen h-screen text-center text-green-500 transition-all duration-[2000ms] ease-in-out",
          isFinishedFirstview ? "z-0 opacity-0" : "z-10 opacity-100"
        )}
      >
        <div className="absolute top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Image
            className="w-[350px] mx-auto mb-14"
            src={Logo.src}
            width={350}
            height={350}
            alt=""
          />
          <div className="text-[45px] leading-[45px] font-digital tracking-wider">
            <TypingAnimation speed={20} sequence={titleSequences} />
          </div>
        </div>
      </div>
    </div>
  );
};
