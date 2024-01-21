// import {
//   DOMParser,
//   Element,
//   HTMLDocument,
// } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
// import { processBanners } from "./processImages.ts";
//
// const getVTEXIOAccountName = (
//   data: Data,
//   document: HTMLDocument | null,
// ) => {
//   const templateRuntimeStr = document?.body.querySelector(
//     "template[data-varname]",
//   )?.innerHTML ?? "";
//
//   // TODO: PEGAR __RUNTIME__
//   const script = new DOMParser().parseFromString(
//     templateRuntimeStr,
//     "text/html",
//   )?.getElementsByTagName("script")[0]?.innerHTML ?? "{}";
//
//   const __runtime__: { account: string } = JSON.parse(script);
//
//   data.vtexconfig = JSON.stringify({
//     "account": __runtime__.account,
//     "locale": "pt-BR",
//     "salesChannel": "1",
//   });
// };

// const getVTEXPortalAccountName = (
//   data: Data,
//   document: HTMLDocument | null,
// ) => {
//   const head = document?.getElementsByTagName("head")[0];
//   const stripRegexUrl = /https:\/\/(?<account>\w*).(?<vtex>\w*)/;
//   for (const script of head?.getElementsByTagName("script") ?? []) {
//     if (data.vtexconfig) {
//       break;
//     }
//
//     const src = script.getAttribute("src");
//
//     if (!src) continue;
//
//     const { groups } = stripRegexUrl.exec(src) ?? {};
//     if (!groups) continue;
//
//     // Catch if the src link is https://account.(vtexassets|vteximg)....
//     if (groups.vtex === "vteximg" || groups.vtex === "vtexassets") {
//       data.vtexconfig = JSON.stringify({
//         "account": groups.account,
//         "locale": "pt-BR",
//         "salesChannel": "1",
//       });
//     }
//   }
// };

// const getLogo = (
//   data: Data,
//   document: HTMLDocument | null,
//   _siteUrl: string,
// ) => {
//   const head = document?.getElementsByTagName("head")[0];
//   // Get logo
//   // Try get logo from metatag
//   for (const meta of head?.getElementsByTagName("meta") ?? []) {
//     if (data.logos) {
//       break;
//     }
//     if (meta.getAttribute("property") === "og:image") {
//       const content = meta.getAttribute("content");
//       if (content) {
//         data.logos = [content];
//       }
//     }
//   }
//
//   if (!data.logos) {
//     const divLogos = document?.body.querySelectorAll('[class*="logo"');
//     const logosCandidates = [];
//
//     for (const divLogo of divLogos ?? []) {
//       logosCandidates.push(
//         ...((divLogo as Element).getElementsByTagName("img") ?? []),
//       );
//       logosCandidates.push(
//         ...((divLogo as Element).getElementsByTagName("svg") ?? []),
//       );
//     }
//
//     const logosFormatedSrcsOrSvg = logosCandidates.map((logo) => {
//       if (logo.tagName === "IMG") {
//         return logo.getAttribute("src") ?? logo.getAttribute("data-src");
//       }
//
//       return logo.outerHTML;
//     }).filter(Boolean).map((logo) => {
//       const siteUrl = _siteUrl.replace(/\/$/, "");
//       if (logo!.startsWith("/")) {
//         return `${siteUrl}${logo}`;
//       }
//
//       // LOGO is SVG or full URL
//       return logo as string;
//     });
//
//     data.logos = logosFormatedSrcsOrSvg;
//   }
//
//   // get favicon
//   for (const link of head?.querySelectorAll('link[rel="icon"]') ?? []) {
//     if (data.logos) break;
//
//     const logo = (link as Element).getAttribute("href");
//
//     if (logo) {
//       data.logos = [logo];
//     }
//   }
// };

// const getBanner = async (
//   data: Record<string, any>,
//   document: HTMLDocument | null,
//   _siteUrl: string,
// ) => {
//   // Get first banner
//   const elementsWithBanner = document?.body.querySelectorAll(
//     '[class*="banner"]',
//   );
//   const imgs = [];
//
//   for (const banner of elementsWithBanner ?? []) {
//     imgs.push(...((banner as Element).getElementsByTagName("img") ?? []));
//   }
//
//   const formatedBannerSrcs = imgs.map((img) => {
//     return img.getAttribute("src") ?? img.getAttribute("data-src");
//   }).filter(Boolean).map((bannerSrc) => {
//     const siteUrl = _siteUrl.replace(/\/$/, "");
//     if (bannerSrc!.startsWith("/")) {
//       return `${siteUrl}${bannerSrc}`;
//     }
//
//     return bannerSrc as string;
//   }).map((bannerSrc) => ({ src: bannerSrc }));
//
//   data.banners = (await processBanners(formatedBannerSrcs)).map(({ src }) =>
//     src
//   );
// };

// const getThemeColor = (data: Data, document: HTMLDocument | null) => {
//   const themeColor = document?.head.querySelector('meta[name="theme-color"]') ??
//     document?.head.querySelector('meta[name="msapplication-TileColor"]');
//
//   if (themeColor) {
//     data.themeColor = themeColor?.getAttribute("content") ?? undefined;
//   }
// };
//
// const getTitle = (data: Data, document: HTMLDocument | null) => {
//   const title = document?.head.getElementsByTagName("title")[0];
//
//   if (title?.innerText) {
//     data.title = title?.innerText;
//   }
//
//   if (!data.title) {
//     const ogTitle = document?.querySelector('[property="og:title"]')
//       ?.getAttribute("content");
//
//     if (ogTitle) {
//       data.title = ogTitle;
//     }
//   }
// };

type Data = {
  vtexconfig?: string;
  banners?: string[];
  logos?: string[];
  themeColor?: string;
  title?: string;
  favicon?: string;
  categories?: string[];
};

export default function processHtml(_pageSrc: string, _siteUrl: string) {
  const data: Data = {};
  // const document = new DOMParser().parseFromString(
  //   pageSrc,
  //   "text/html",
  // );
  // const generator = document?.querySelector('meta[name="generator"]');
  //
  // if (generator?.getAttribute("content")?.startsWith("vtex.render")) {
  //   getVTEXIOAccountName(data, document);
  // } else {
  //   // Get account name
  //   getVTEXPortalAccountName(data, document);
  // }
  //
  // getLogo(data, document, siteUrl);
  //
  // await getBanner(data, document, siteUrl);
  //
  // getThemeColor(data, document);
  //
  // getTitle(data, document);

  return data;
}
