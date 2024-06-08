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
      <FirstView />
      <div
        className={classes(
          "relative z-10 bg-black transition-all duration-[2000ms] ease-in-out",
          isFinishedFirstview ? "z-10 opacity-100" : "z-0 opacity-0"
        )}
      >
        <CommandHistories />
        <div>{isCommandRunning ? <></> : <CommandLine />}</div>
      </div>
    </div>
  );
}
