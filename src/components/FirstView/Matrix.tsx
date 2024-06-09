import { classes } from "@/utils/classes";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {
  isEndHackingAnimation: boolean;
  onClickScreen: () => void;
};

export const Matrix = (props: Props) => {
  useEffect(() => {
    const s = window.screen;
    const canvas = document.getElementById(
      "firstviewCanvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = s.width);
    const h = (canvas.height = s.height);
    const p = Array(Math.floor(w / 10) + 1).fill(0);
    const random = (items: string[]) =>
      items[Math.floor(Math.random() * items.length)];
    const hex = "0123456789ABCDEF".split("");

    if (!ctx) return;

    setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#0F0";
      p.map((v, i) => {
        ctx.fillText(random(hex), i * 10, v);
        p[i] = v >= h || v > 50 + 10000 * Math.random() ? 0 : v + 10;
      });
    }, 1000 / 30);
  }, []);

  return (
    <div
      className={classes(
        "fixed w-full h-full z-0 bg-black transition-all duration-[3000ms] ease-in-out",
        props.isEndHackingAnimation ? "scale-[8]" : "scale-1"
      )}
    >
      <canvas id="firstviewCanvas"></canvas>
    </div>
  );
};
