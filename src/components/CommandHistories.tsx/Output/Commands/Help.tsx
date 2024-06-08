import { CommandHistory, TerminalContext } from "@/context/TerminalContext";
import { useContext, useEffect } from "react";

const basicCommands = [
  {
    command: "welcome",
    description: "Display a welcome message",
  },
  {
    command: "ls",
    description: "list directory contents",
  },
  {
    command: "cd [dir]",
    description: "Change the shell working directory",
  },
  {
    command: "cat [file]",
    description: "Concatenate and display the content of files",
  },
  {
    command: "imgcat [image_file]",
    description: "Display an image",
  },
  {
    command: "tree",
    description: "Display directory tree",
  },
  {
    command: "date",
    description: "Display the current date and time",
  },
  {
    command: "help",
    description: "Display this help message",
  },
  {
    command: "history",
    description: "Display a list of all commands entered",
  },
  {
    command: "clear",
    description: "Clear the terminal screen",
  },
  {
    command: "exit",
    description: "Close the terminal",
  },
  {
    command: "wget [file] ",
    description: "Download a file",
  },
  {
    command: "rm",
    description: "Do not execute this command",
  },
];

type CommandProps = {
  command: string;
  description: string;
};

const Command = (props: CommandProps) => {
  return (
    <div className="flex">
      <span className="w-[200px] text-left block">{props.command}</span>
      {`:${props.description}`}
    </div>
  );
};

type HelpProps = {
  history: CommandHistory;
};
export const Help = (props: HelpProps) => {
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.history.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>
      <p>Basic commands</p>
      <div className="pl-2 mt-1">
        {basicCommands.map((command) => (
          <Command key={command.command} {...command} />
        ))}
      </div>
    </div>
  );
};
