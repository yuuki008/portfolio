import React, { memo } from "react";
import { Ls } from "./Commands/Ls";
import { Cd } from "./Commands/Cd";
import { Cat } from "./Commands/Cat";
import { Help } from "./Commands/Help";
import { History } from "./Commands/History";
import { DateCommand as Date } from "./Commands/Date";
import { Tree } from "./Commands/Tree";
import { NotFoundCommand } from "./Commands/NotFoundCommand";
import { ImgCat } from "./Commands/ImgCat";
import { Clear } from "./Commands/Clear";
import { Rm } from "./Commands/Rm";
import { Wget } from "./Commands/Wget";
import { Exit } from "./Commands/Exit";
import { CommandHistory } from "@/context/TerminalContext";

type Props = {
  commandHistory: CommandHistory;
};

export const CommandOutput = memo((props: Props) => {
  const { command } = props.commandHistory;

  const tokens = command.trim().split(" ");
  const commandName = tokens[0];

  switch (commandName) {
    case "ls":
      return <Ls history={props.commandHistory} />;
    case "cd":
      return <Cd history={props.commandHistory} />;
    // case "cat":
    //   return <Cat history={props.commandHistory} />;
    // case "imgcat":
    //   return <ImgCat history={props.commandHistory} />;
    // case "exit":
    //   return <Exit history={props.commandHistory} />;
    // case "help":
    //   return <Help history={props.commandHistory} />;
    // case "rm":
    //   return <Rm history={props.commandHistory} />;
    // case "history":
    //   return <History history={props.commandHistory} />;
    // case "date":
    //   return <Date history={props.commandHistory} />;
    // case "tree":
    //   return <Tree history={props.commandHistory} />;
    // case "clear":
    //   return <Clear history={props.commandHistory} />;
    // case "wget":
    //   return <Wget history={props.commandHistory} />;
    case "":
      break;
    default:
      return <NotFoundCommand commandName={commandName} />;
  }
});

CommandOutput.displayName = "CommandOutput";
export default CommandOutput;
