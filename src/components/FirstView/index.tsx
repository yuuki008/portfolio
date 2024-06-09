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
        isEndHackingAnimation ? "opacity-0" : "opacity-100"
      )}
    >
      <Matrix
        isEndHackingAnimation={isEndHackingAnimation}
        onClickScreen={onClickScreen}
      />

      <div className="absolute mt-[28vh] left-1/2 -translate-x-1/2 z-10 flex flex-col justify-center">
        <Image
          src="/logos/color.webp"
          alt=""
          width={230}
          height={230}
          className="w-[230px] h-[230px] mx-auto mb-5 rounded-full shadow-2xl"
        />
        <div className="backdrop-blur-sm p-4 bg-black bg-opacity-50 rounded z-10">
          <div className="text-white text-center">
            <h1 className="text-4xl">{`Welcome to Yuuki008's Terminal`}</h1>
            <p className="text-2xl mt-4">Click to start exploring...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
