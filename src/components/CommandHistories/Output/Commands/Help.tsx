import {
  Command as CommandType,
  TerminalContext,
} from "@/context/TerminalContext";
import { useContext, useEffect } from "react";

const basicCommands = [
  {
    command: "help [-a]",
    description:
      "Display a list of commands. Use 'help -a' to see all commands",
  },
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
    command: "preview [md_file]",
    description: "Display a preview of a markdown file",
  },
  {
    command: "imgcat [img_file]",
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
    command: "history",
    description: "Display a list of all commands entered",
  },
];

const subCommands = [
  {
    command: "rm [-rf]",
    description: "Do not execute this command",
  },
  {
    command: "vim",
    description: "Open the Vim text editor",
  },
  {
    command: "vi",
    description: "Open the Vi text editor",
  },
  {
    command: "emacs",
    description: "Open the Emacs text editor",
  },
  {
    command: "git",
    description: "Version control system to track change in code",
  },
  {
    command: "sudo",
    description: "Execute a command as the superuser",
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
      {props.description}
    </div>
  );
};

type HelpProps = {
  command: CommandType;
};
export const Help = (props: HelpProps) => {
  const option = props.command.command.split(" ")[1];
  const { finishCommand } = useContext(TerminalContext);

  // NOTE: 初回マウント時にのみ実行するため、eslintの警告を無効化
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    finishCommand(props.command.id);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div>
      <p>Basic commands</p>
      <div className="pl-6">
        {basicCommands.map((command) => (
          <Command key={command.command} {...command} />
        ))}
      </div>
      {option === "-a" || option === "--all" ? (
        <>
          <p className="mt-2">Sub commands</p>
          <div className="pl-6">
            {subCommands.map((command) => (
              <Command key={command.command} {...command} />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
