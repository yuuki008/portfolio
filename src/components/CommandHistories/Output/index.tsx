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
import { Command, CommandHistory } from "@/context/TerminalContext";
import { Welcome } from "./Commands/Welcome";
import { Preview } from "./Commands/Preview";

type Props = {
  commandHistory: CommandHistory;
};

const CommandOutput = (props: { command: Command }) => {
  if (!props.command.running && !props.command.finished) return <></>;

  const tokens = props.command.command.split(" ");
  const commandName = tokens[0];

  switch (commandName) {
    case "ls":
      return <Ls command={props.command} />;
    case "cd":
      return <Cd command={props.command} />;
    case "cat":
      return <Cat command={props.command} />;
    case "preview":
      return <Preview command={props.command} />;
    case "imgcat":
      return <ImgCat command={props.command} />;
    case "exit":
      return <Exit command={props.command} />;
    case "help":
      return <Help command={props.command} />;
    case "rm":
      return <Rm command={props.command} />;
    case "history":
      return <History command={props.command} />;
    case "date":
      return <Date command={props.command} />;
    case "tree":
      return <Tree command={props.command} />;
    case "clear":
      return <Clear command={props.command} />;
    case "wget":
      return <Wget command={props.command} />;
    case "welcome":
      return <Welcome command={props.command} />;
    case "":
      break;
    default:
      return <NotFoundCommand command={props.command} />;
  }
};

export const Output = memo((props: Props) => {
  const { commands } = props.commandHistory;

  return commands.map((command) => (
    <div className="mb-2" key={command.id}>
      <CommandOutput command={command} />
    </div>
  ));
});

Output.displayName = "Output";
export default Output;
