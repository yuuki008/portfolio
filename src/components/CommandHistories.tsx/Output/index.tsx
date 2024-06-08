import { CommandHistory } from "@/context/TerminalContext";
import { memo } from "react";

type Props = {
  commandHistory: CommandHistory;
};

export const Output = memo((props: Props) => {
  const { command, isRunning } = props.commandHistory;

  return (
    <div>
      <p className="text-white">
        {isRunning ? (
          <span className="text-green-500">Running...</span>
        ) : (
          <span>{command}</span>
        )}
      </p>
    </div>
  );
});

Output.displayName = "Output";
export default Output;
