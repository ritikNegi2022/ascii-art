import { RefObject } from "react";

class Cell {
  x: number;
  y: number;
  symbol: string;
  color: string;
  constructor(x: number, y: number, symbol: string, color: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

class AsciiEffect {
  #imageCellArray: Cell[] = [];
  #pixels: ImageData | null = null;
  #ctx: CanvasRenderingContext2D;
  #width: number;
  #height: number;

  #values: {
    resolution: string;
    color_type: "original" | "custom";
    color: string;
    font: string;
  };

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    image: HTMLImageElement,
    values: { [key: string]: any }
  ) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#ctx.drawImage(image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    this.#values = values as {
      resolution: string;
      color_type: "original" | "custom";
      color: string;
      font: string;
    };
  }
  #convert_to_symbol(average: number) {
    if (average > 250) return "@";
    if (average > 240) return "*";
    if (average > 220) return "+";
    if (average > 200) return "#";
    if (average > 180) return "&";
    if (average > 160) return "%";
    if (average > 140) return "_";
    if (average > 120) return ":";
    if (average > 100) return "$";
    if (average > 80) return "/";
    if (average > 60) return "_";
    if (average > 40) return "X";
    if (average > 20) return "W";
    return "";
  }
  #scan_image() {
    this.#imageCellArray = [];
    if (this.#pixels) {
      for (
        let y = 0;
        y < this.#pixels.height;
        y += parseInt(this.#values.resolution)
      ) {
        for (
          let x = 0;
          x < this.#pixels.width;
          x += parseInt(this.#values.resolution)
        ) {
          const posX = x * 4;
          const posY = y * 4;
          const pos = posY * this.#pixels.width + posX;
          if (this.#pixels.data[pos + 3] > 128) {
            const red = this.#pixels.data[pos];
            const green = this.#pixels.data[pos + 1];
            const blue = this.#pixels.data[pos + 2];
            const total = red + green + blue;
            const alpha = this.#pixels.data[pos + 3];
            const average = total / 3;
            const color =
              this.#values.color_type === "custom"
                ? this.#values.color
                : "rgba(" +
                  red +
                  ", " +
                  green +
                  ", " +
                  blue +
                  ", " +
                  alpha +
                  ")";

            const symbol = this.#convert_to_symbol(average);
            if (total > 200) {
              this.#imageCellArray.push(new Cell(x, y, symbol, color));
            }
          }
        }
      }
    }
  }
  #draw_ascii() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (let i = 0; i < this.#imageCellArray.length; i++) {
      this.#ctx.font =
        parseInt(this.#values.resolution) * parseInt(this.#values.font) +
        "px Verdana";
      this.#imageCellArray[i].draw(this.#ctx);
    }
  }
  draw() {
    this.#scan_image();
    this.#draw_ascii();
    return true;
  }
}

export default function genrateArt(
  canvas_ref: RefObject<HTMLCanvasElement>,
  values: { [key: string]: any },
  image: string,
  cb_func: (e: boolean) => void
) {
  if (canvas_ref.current) {
    const canvas = canvas_ref.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const image1 = new Image();
      image1.src = image;
      let effect;
      image1.onload = function initialize() {
        canvas.width = image1.width;
        canvas.height = image1.height;
        effect = new AsciiEffect(
          ctx,
          image1.width,
          image1.height,
          image1,
          values
        );
        const imageChanged = effect.draw();
        cb_func(imageChanged);
      };
    }
  }
}
