import { AsciiImage } from "@/components/Parts/AsciiImage";
import { TypingAnimation } from "@/components/Parts/TypingAnimation";
import { Command, TerminalContext } from "@/context/TerminalContext";
import React, { useContext, useState, useEffect } from "react";

type Props = {
  command: Command;
};

const generateTimestamp = () => "Timestamp: " + new Date().toLocaleString();

const infoSequencesData = [
  { label: "Timestamp:", value: generateTimestamp, delay: 300 },
  {
    label: "UserAgent:",
    value: "UserAgent: *********************",
    delay: 300,
  },
  { label: "IP Address:", value: "IP Address: ***.***.***.***", delay: 300 },
  { label: "Location:", value: "Location: **********", delay: 300 },
  { label: "Command:", value: "Command: rm -rf", delay: 300 },
];

const titleSequence = ["**ALERT: Intrusion Detection System (IDS) Alert**"];

export const Rf = ({ command }: Props) => {
  const { finishCommand } = useContext(TerminalContext);
  const [isTitleSequenceFinished, setIsTitleSequenceFinished] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

  const lastMessageSequence = [
    500,
    `**ATTENTION:**
Suspicious command detected. This action has been logged and reported.
The system administrator has been alerted. Further actions will be closely monitored.`,
    `**ATTENTION:**
Suspicious command detected. This action has been logged and reported.
The system administrator has been alerted. Further actions will be closely monitored.


Sorry, this was just a joke. 😅`,
    () => finishCommand(command.id),
  ];

  const handleNextSequence = () => {
    setCurrentSequenceIndex((prev) => prev + 1);
  };

  const getInfoSequences = () =>
    infoSequencesData.map((sequence, index) => [
      sequence.label,
      typeof sequence.value === "function" ? sequence.value() : sequence.value,
      sequence.delay,
      () => handleNextSequence(),
    ]);

  return (
    <div>
      <TypingAnimation
        style={{ color: "rgb(239 68 6)" }}
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
        <TypingAnimation sequence={lastMessageSequence} speed={80} />
      )}
    </div>
  );
};
