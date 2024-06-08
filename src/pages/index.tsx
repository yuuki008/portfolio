import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useEffect } from "react";
import { TerminalContext } from "@/context/TerminalContext";
import { CommandLine } from "@/components/CommandLine";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isCommandRunning } = useContext(TerminalContext);

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
      <div>{isCommandRunning ? <></> : <CommandLine />}</div>
    </div>
  );
}
