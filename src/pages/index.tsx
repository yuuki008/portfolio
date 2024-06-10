import { useContext, useEffect } from "react";
import { TerminalContext } from "@/context/TerminalContext";
import { CommandLine } from "@/components/CommandLine";
import { CommandHistories } from "@/components/CommandHistories.tsx";
import { FirstView } from "@/components/FirstView";
import { classes } from "@/utils/classes";

export default function Home() {
  const { isCommandRunning, isFinishedFirstview } = useContext(TerminalContext);

  useEffect(() => {
    /**
     * 常に入力フォームが画面の最下部に表示する
     */
    const resizeObserver = new ResizeObserver(() => {
      window.scrollTo(0, document.body.clientHeight);
    });

    resizeObserver.observe(document.body);

    /**
     * クリック時に入力フォームにフォーカスする
     */
    window.addEventListener("click", () => {
      const input = document.querySelector("input");
      if (input) input.focus();
    });
  }, []);

  return (
    <div className="bg-black p-4 text-white">
      {isFinishedFirstview ? <></> : <FirstView />}

      <div
        className={classes(
          "relative bg-black transition-all z-10 duration-500 ease-in-out",
          isFinishedFirstview ? "opacity-100" : "opacity-0"
        )}
      >
        <CommandHistories />
        <div>{isCommandRunning ? <></> : <CommandLine />}</div>
      </div>
    </div>
  );
}
