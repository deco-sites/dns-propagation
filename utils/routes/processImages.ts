import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

export const toColor = (num: number) => {
  num >>>= 0;
  const a = (num & 0xFF) / 255,
    b = (num & 0xFF00) >>> 8,
    g = (num & 0xFF0000) >>> 16,
    r = (num & 0xFF000000) >>> 24;
  return [r, g, b, a];
};

export const processBanners = async (banners: Array<{ src: string }>) => {
  const validBanners = [];
  for (const banner of banners) {
    const response = await fetch(banner.src);
    try {
      const image = await Image.decode(
        new Uint8Array(await (await response.blob()).arrayBuffer()),
      );
      if (image.width > 800) {
        validBanners.push({ "banner": banner, "width": image.width });
      }
    } catch {
      // nothing to do...
    }
  }
  validBanners.sort((a, b) => (b.width - a.width));

  return validBanners.length === 0
    ? banners
    : validBanners.map((x) => x.banner);
};
