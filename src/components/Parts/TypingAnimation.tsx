import React from "react";
import { TypeAnimation } from "react-type-animation";

type Props = {
  sequence: any[];
  speed: any;
  style?: any;
};

export const TypingAnimation = (props: Props) => {
  const CURSOR_CLASS_NAME = "custom-type-animation-cursor";

  return (
    <div>
      <TypeAnimation
        cursor={false}
        style={{
          display: "block",
          whiteSpace: "pre",
          lineHeight: 1.5,
          ...props.style,
        }}
        className={CURSOR_CLASS_NAME}
        deletionSpeed={80}
        speed={props.speed}
        sequence={props.sequence}
      />

      <style global jsx>{`
        .custom-type-animation-cursor::after {
          content: "|";
          animation: cursor 1.1s infinite step-start;
        }
        @keyframes cursor {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
