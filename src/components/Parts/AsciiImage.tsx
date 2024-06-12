import dynamic from "next/dynamic";
import p5Types from "p5";
import { useState } from "react";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

type Props = {
  filePath: string;
  width: number;
  height: number;
  brightness: number;
  color?: {
    r: number;
    g: number;
    b: number;
  };
};

export const AsciiImage = (props: Props) => {
  const [quotes, setQuotes] = useState("");
  const [image, setImage] = useState<p5Types.Image | null>(null);
  let startIndex = 0;

  const preload = (p5: p5Types) => {
    p5.loadImage(props.filePath, (img: p5Types.Image) => {
      setImage(img);
    });

    p5.loadStrings("quotes.txt", (result) => {
      setQuotes(result.join(" "));
    });
  };

  const setup = (p5: p5Types, canvasParentRef: any) => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    p5.createCanvas(props.width, props.height).parent(canvasParentRef);
    p5.textFont("Courier-Bold");
  };

  const draw = (p5: p5Types) => {
    if (!image || !quotes) return;

    p5.background(0);
    p5.frameRate(10);

    let charIndex = startIndex;
    let w = p5.width / image.width;
    let h = p5.height / image.height;
    image.loadPixels();

    for (let j = 0; j < image.height; j++) {
      for (let i = 0; i < image.width; i++) {
        const pixelIndex = (i + j * image.width) * 4;
        // NOTE: 画像自体が暗いので明るく
        const r = image.pixels[pixelIndex + 0] * props.brightness;
        const g = image.pixels[pixelIndex + 1] * props.brightness;
        const b = image.pixels[pixelIndex + 2] * props.brightness;
        const avg = (r + g + b) / 3;

        p5.noStroke();
        p5.fill(avg);
        p5.textSize(w * 1.2);
        p5.textAlign(p5.CENTER, p5.CENTER);

        p5.text(
          quotes.charAt(charIndex % quotes.length),
          i * w + w * 0.5,
          j * h + h * 0.5
        );
        charIndex++;
      }
    }

    startIndex++;
  };

  return (
    <div className="mx-auto">
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
};
