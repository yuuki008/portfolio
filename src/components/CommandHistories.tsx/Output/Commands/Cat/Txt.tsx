import React from "react";

type Props = {
  fileName: string;
  content: string;
};

export const Txt = (props: Props) => {
  return (
    <div className="border m-3 max-w-[1000px]">
      <div className="flex p-2 border-b">File: {props.fileName} </div>
      <div className="p-4">
        <div className="whitespace-pre-wrap tracking-wider text-white">
          {props.content}
        </div>
      </div>
    </div>
  );
};
