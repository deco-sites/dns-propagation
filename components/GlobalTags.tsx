import { Head } from "$fresh/runtime.ts";

function initDarkModeSnippet() {
  if (window.location.pathname.startsWith("/login")) return;

  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export default function GlobalTags() {
  return (
    <Head>
      <meta name="view-transition" content="same-origin" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
         body {
 font-family: var(--font-family);
}
      `,
        }}
      >
      </style>
      <script
        dangerouslySetInnerHTML={{
          __html: "(" + initDarkModeSnippet.toString() + ")()",
        }}
      >
      </script>
    </Head>
  );
}
