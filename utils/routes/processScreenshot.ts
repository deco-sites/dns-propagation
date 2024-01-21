import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

const BROWSERLESS_TOKEN = Deno.env.get("BROWSERLESS_TOKEN");

export class Screenshot {
  url: string;
  img: Image | null;

  constructor(url: string) {
    this.url = url;
    this.img = null;
  }

  async getScreenshotForUrl() {
    const options = {
      "url": this.url,
      "options": {
        "type": "png",
        "clip": {
          "height": 400,
          "width": 1280,
          "x": 0,
          "y": 0,
        },
        "fullPage": false,
        "encoding": "binary",
      },
    };

    const png = await fetch(
      "https://chrome.browserless.io/screenshot?token=" + BROWSERLESS_TOKEN,
      {
        method: "POST",
        body: JSON.stringify(options),
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      },
    );
    if (png.status >= 300) {
      return null;
    }
    const value = new Uint8Array(await (await png.blob()).arrayBuffer());
    this.img = await Image.decode(value);
    return png.body;
  }

  hasImg() {
    return !!this.img;
  }

  getColor() {
    const colorValue = this.img!.getPixelAt(1, 1);
    let newColorValue = this.img!.getPixelAt(1, 1);
    let uniqueNewColorSize = 0;
    for (let i = 2; i < 200; i++) {
      const newNewColorValue = this.img!.getPixelAt(1, i);
      if (colorValue === newColorValue) {
        newColorValue = newNewColorValue;
      } else {
        uniqueNewColorSize += 1;
        if (newNewColorValue != newColorValue) {
          if (uniqueNewColorSize < 10) { // TOO SMALL!
            return [colorValue, colorValue];
          }
        } else {
          return [colorValue, newColorValue];
        }
      }
    }
    if (newColorValue != newColorValue) {
      if (uniqueNewColorSize < 10) { // TOO SMALL!
        return [colorValue, colorValue];
      }
    } else {
      return [colorValue, newColorValue];
    }
  }
}
