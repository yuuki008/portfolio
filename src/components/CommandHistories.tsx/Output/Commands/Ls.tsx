import { Command, TerminalContext } from "@/context/TerminalContext";
import { classes } from "@/utils/classes";
import { TerminalDirectory } from "@/utils/FileSystem";
import { useContext, useEffect, useState } from "react";

type Props = {
  command: Command;
};

export const Ls = (props: Props) => {
  const { currentDirectory, finishCommand } = useContext(TerminalContext);

  const [directory, _setDirectory] = useState(currentDirectory);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => finishCommand(props.command.id), []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="w-full">
      {directory?.children.map((child: any, index: number) => (
        <div
          className={classes(
            child instanceof TerminalDirectory ? "text-blue-500" : "text-white"
          )}
          key={index}
        >
          {child.name}
        </div>
      ))}
    </div>
  );
};
