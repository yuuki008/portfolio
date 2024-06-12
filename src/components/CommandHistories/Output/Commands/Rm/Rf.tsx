import { AsciiImage } from "@/components/Parts/AsciiImage";
import { TypingAnimation } from "@/components/Parts/TypingAnimation";
import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useState, useEffect } from "react";

type Props = {
  command: Command;
};

const infoSequencesData = [
  {
    label: "Timestamp:",
    value: "Timestamp: " + new Date().toLocaleString(),
    delay: 300,
  },
  {
    label: "UserAgent:",
    value: "UserAgent: *********************",
    delay: 300,
  },
  { label: "IP Address:", value: "IP Address: ***.***.***.***", delay: 300 },
  { label: "Location:", value: "Location: **********", delay: 300 },
  { label: "Command:", value: "Command: rm -rf", delay: 300 },
];

const titleSequence = [
  300,
  "**ALERT: Intrusion Detection System (IDS) Alert**",
];

export const Rf = (props: Props) => {
  const { finishCommand } = useContext(TerminalContext);
  const [isTitleSequenceFinished, setIsTitleSequenceFinished] = useState(false);
  const [isAttentionSequenceFinished, setIsAttentionSequenceFinished] =
    useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

  const AttentionMessageSequence = [
    500,
    `**ATTENTION:**
Suspicious command detected. This action has been logged and reported.
The system administrator has been alerted. Further actions will be closely monitored.`,
    `**ATTENTION:**
Suspicious command detected. This action has been logged and reported.
The system administrator has been alerted. Further actions will be closely monitored.
`,
    () => setIsAttentionSequenceFinished(true),
  ];

  const lastMessageSequence = [
    1000,
    `Sorry, this was just a joke. 😅`,
    () => finishCommand(props.command.id),
  ];

  const handleNextSequence = () => {
    setCurrentSequenceIndex((prev) => prev + 1);
  };

  const getInfoSequences = () => {
    return infoSequencesData.map((sequence) => [
      sequence.value,
      sequence.delay,
      handleNextSequence,
    ]);
  };

  return (
    <div>
      <AsciiImage
        filePath="/images/terminator2.png"
        width={300}
        height={360}
        brightness={1.3}
      />
      <TypingAnimation
        style={{ color: "#FF0000", marginTop: "16px" }}
        sequence={[...titleSequence, () => setIsTitleSequenceFinished(true)]}
        speed={40}
      />
      {isTitleSequenceFinished && (
        <div className="p-4">
          {getInfoSequences().map((sequence, index) =>
            index <= currentSequenceIndex ? (
              <TypingAnimation key={index} sequence={sequence} speed={80} />
            ) : null
          )}
        </div>
      )}
      {currentSequenceIndex >= infoSequencesData.length && (
        <TypingAnimation
          style={{ color: "#FFFF00" }}
          sequence={AttentionMessageSequence}
          speed={80}
        />
      )}
      {isAttentionSequenceFinished && (
        <div className="mt-10">
          <TypingAnimation sequence={lastMessageSequence} speed={80} />
        </div>
      )}
    </div>
  );
};
