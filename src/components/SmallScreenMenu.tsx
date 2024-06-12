import React from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  close: () => void;
};

export const SmallScreenMenu = (props: Props) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 z-[100]">
      <button
        onClick={props.close}
        className="text-white cursor-pointer absolute right-0 top-0"
      >
        <IoIosClose className="w-[70px] h-[70px]" />
      </button>
      <div className="mt-20 px-10 text-sm leading-[1.5rem] font-[Hiragino]">
        ※ このサイトは 600px 以下の画面サイズでは最適に表示されません。
        <br />
        スマホの方は画面を横にしてご覧ください。
        <br />
        できれば PC で見ていただけると嬉しいです。
      </div>
    </div>
  );
};
