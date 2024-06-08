import { useContext } from "react";
import { TerminalContext } from "@/context/TerminalContext";
import Input from "./Input";
import Output from "./Output";

export const CommandHistories = () => {
  const { commandHistories } = useContext(TerminalContext);

  return commandHistories.map((commandHistory, index) => (
    <div key={index}>
      <Input commandHistory={commandHistory} />
      <Output commandHistory={commandHistory} />
    </div>
  ));
};
