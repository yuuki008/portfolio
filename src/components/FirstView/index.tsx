import React, { useContext, useState } from "react";
import { TerminalContext } from "@/context/TerminalContext";
import { classes } from "@/utils/classes";
import Image from "next/image";
import { Matrix } from "./Matrix";

export const FirstView = () => {
  const { finishFirstview } = useContext(TerminalContext);

  const [isEndHackingAnimation, setIsHackingAnimation] = useState(false);

  const onClickScreen = () => {
    setIsHackingAnimation(true);
    setTimeout(() => finishFirstview(), 3000);
  };

  return (
    <div
      onClick={onClickScreen}
      className={classes(
        "fixed top-0 left-0 w-screen h-screen overflow-hidden transition-all duration-[3000ms] ease-in-out",
        isEndHackingAnimation ? "opacity-0 z-0" : "opacity-100 z-[100]"
      )}
    >
      <Matrix
        isEndHackingAnimation={isEndHackingAnimation}
        onClickScreen={onClickScreen}
      />

      <div className="absolute mt-[20vh] left-1/2 -translate-x-1/2 z-10 flex flex-col justify-center">
        <Image
          src="/images/logo.png"
          alt=""
          width={280}
          height={280}
          className="w-[280px] h-[280px] mx-auto rounded-full shadow-2xl"
        />
        <div>
          <div className="text-white text-center">
            <h1 className="text-[40px] mb-2 font-bold">{`Hi, I'm Yuuki008`}</h1>
            <p className="text-[25px]">click to start ...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
