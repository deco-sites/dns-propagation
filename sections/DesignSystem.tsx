// deno-lint-ignore-file no-explicit-any
import { Color } from "https://deno.land/x/color@v0.3.0/mod.ts";
import { useId } from "preact/hooks";
import { Head } from "$fresh/runtime.ts";

export interface Palette {
  /** @format color */
  "base-000": string;
  /** @format color */
  "base-100": string;
  /** @format color */
  "base-200": string;
  /** @format color */
  "base-300": string;
  /** @format color */
  "base-400": string;
  /** @format color */
  "base-500": string;
  /** @format color */
  "base-600": string;
  /** @format color */
  "base-700": string;
  /** @format color */
  "critical-100": string;
  /** @format color */
  "critical-200": string;
  /** @format color */
  "critical-800": string;
  /** @format color */
  "critical-900": string;
  /** @format color */
  "warning-100": string;
  /** @format color */
  "warning-200": string;
  /** @format color */
  "warning-800": string;
  /** @format color */
  "warning-900": string;
  /** @format color */
  "positive-100": string;
  /** @format color */
  "positive-200": string;
  /** @format color */
  "positive-800": string;
  /** @format color */
  "positive-900": string;
  /** @format color */
  "highlight-100": string;
  /** @format color */
  "highlight-200": string;
  /** @format color */
  "highlight-800": string;
  /** @format color */
  "highlight-900": string;
  /** @format color */
  "notification-500": string;
  /** @format color */
  "decorative-one-500": string;
  /** @format color */
  "decorative-one-900": string;
  /** @format color */
  "decorative-two-500": string;
  /** @format color */
  "decorative-two-900": string;
  /** @format color */
  "decorative-three-500": string;
  /** @format color */
  "decorative-three-900": string;
}

const light: Theme = {
  "name": "light",
  "palette": {
    "base-000": "#FFFFFF",
    "base-100": "#FAFAFA",
    "base-200": "#EFF0F0",
    "base-300": "#C9CFCF",
    "base-400": "#949E9E",
    "base-500": "#616B6B",
    "base-600": "#162121",
    "base-700": "#0D1717",
    "critical-100": "#FBEDEA",
    "critical-200": "#FBEDEA",
    "critical-800": "#D44D2B",
    "critical-900": "#B44125",
    "warning-100": "#FDF8E7",
    "warning-200": "#FDF8E7",
    "warning-800": "#BA8D0D",
    "warning-900": "#98730B",
    "positive-100": "#EAFAF2",
    "positive-200": "#EAFAF2",
    "positive-800": "#219259",
    "positive-900": "#1A7346",
    "highlight-100": "#E9F0FB",
    "highlight-200": "#E9F0FB",
    "highlight-800": "#2E6ED9",
    "highlight-900": "#2E6ED9",
    "notification-500": "#FF6E6E",
    "decorative-one-500": "#02F67C",
    "decorative-one-900": "#27AE6B",
    "decorative-two-500": "#76CAD0",
    "decorative-two-900": "#113032",
    "decorative-three-500": "#DA8FFF",
    "decorative-three-900": "#9900E5",
  },
};

const dark: Theme = {
  "name": "dark",
  "palette": {
    "base-000": "#070D0D",
    "base-100": "#0C1313",
    "base-200": "#111717",
    "base-300": "#303D3D",
    "base-400": "#809191",
    "base-500": "#AFB6B6",
    "base-600": "#E4E7E7",
    "base-700": "#FAFAFA",
    "critical-100": "#2A1009",
    "critical-200": "#2A1009",
    "critical-800": "#DC7156",
    "critical-900": "#E1826B",
    "warning-100": "#334037",
    "warning-200": "#334037",
    "warning-800": "#F4CE61",
    "warning-900": "#F6D579",
    "positive-100": "#092A1A",
    "positive-200": "#092A1A",
    "positive-800": "#2FD080",
    "positive-900": "#59D998",
    "highlight-100": "#243545",
    "highlight-200": "#243545",
    "highlight-800": "#669FFF",
    "highlight-900": "#669FFF",
    "notification-500": "#FF6E6E",
    "decorative-one-500": "#27AE6B",
    "decorative-one-900": "#02F67C",
    "decorative-two-500": "#113032",
    "decorative-two-900": "#76CAD0",
    "decorative-three-500": "#550080",
    "decorative-three-900": "#DA8FFF",
  },
};

export interface Theme {
  name: string;
  palette: Palette;
}

export interface Font {
  /**
   * @default 'Albert Sans'
   */
  fontFamily: string;
  /**
   * @default @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&display=swap');
   * \@format css
   */
  styleInnerHtml: string;
}

export interface Props {
  themes?: Theme[];
  fonts?: Font;
}

const stringify = ({ name, palette }: Theme, modifier = ".") => `
${modifier}${name} {
  ${
  Object
    .entries(palette)
    .map(([name, value]) => {
      const hsl = Color.string(value).hsl();
      return `--${name}: ${hsl.hue()}, ${hsl.saturation()}%, ${hsl.lightness()}%;`;
    })
    .join("\n")
}}
`;

function Section({
  themes: maybeThemes = [],
  fonts = {
    fontFamily: "Albert Sans",
    styleInnerHtml:
      "@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');",
  },
}: Props) {
  const id = useId();
  const themes = maybeThemes.length > 0 ? maybeThemes : [light, dark];
  const [root] = themes;

  return (
    <Head>
      <style
        id={`__DESIGN_SYSTEM_FONT-${id}`}
        dangerouslySetInnerHTML={{ __html: fonts.styleInnerHtml }}
      />
      <style
        id={`__DESIGN_SYSTEM_FONT_VAR-${id}`}
        dangerouslySetInnerHTML={{
          __html: `:root { --font-family: ${fonts.fontFamily} }`,
        }}
      />
      <style
        id={`theme-:root`}
        dangerouslySetInnerHTML={{
          __html: stringify({ ...root, name: "root" }, ":"),
        }}
      />
      {themes.map((theme, index) => (
        <style
          id={`theme-.${theme.name}-${index}`}
          dangerouslySetInnerHTML={{ __html: stringify(theme) }}
        />
      ))}
    </Head>
  );
}

function ComponentsPreview() {
  return (
    <div class="rounded-box bg-base-000 border-base-700 text-base-700 not-prose grid gap-3 border p-6">
      <div class="grid grid-cols-4 gap-2 md:grid-cols-4">
        <button class="btn">Default</button>
        <button class="btn" disabled>Disabled</button>
        <button class="btn btn-special">Primary</button>
        <button class="btn btn-destructive">Secondary</button>
      </div>
      <div class="grid grid-cols-4 gap-2 md:grid-cols-4">
        <button class="btn btn-outline">Default outline</button>
        <button class="btn btn-outline" disabled>Disabled outline</button>
        <button class="btn btn-outline btn-special">Primary outline</button>
        <button class="btn btn-outline btn-destructive">
          Secondary outline
        </button>
      </div>
      <div class="grid grid-cols-4 gap-2 md:grid-cols-4">
        <button class="btn btn-link">Default link</button>
        <button class="btn btn-link" disabled>Disabled link</button>
        <button class="btn btn-link btn-special">Primary link</button>
        <button class="btn btn-link btn-destructive">Secondary link</button>
      </div>
      <div class="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4">
        <span class="badge">Default</span>
        <span class="badge badge-primary">Primary</span>
        <span class="badge badge-secondary">Secondary</span>
        <span class="badge badge-accent">Accent</span>
        <span class="badge badge-info">Info</span>
        <span class="badge badge-success">Success</span>
        <span class="badge badge-warning">Warning</span>
        <span class="badge badge-error">Error</span>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 md:flex-row">
          <div class="md:w-1/2">
            <div class="tabs">
              <button class="tab tab-lifted">Tab</button>{" "}
              <button class="tab tab-lifted tab-active">Tab</button>
              <button class="tab tab-lifted">Tab</button>
            </div>{" "}
            <div class="flex flex-col">
              <span class="link">I'm a simple link</span>
              <span class="link link-primary">I'm a simple link</span>{" "}
              <span class="link link-secondary">I'm a simple link</span>{" "}
              <span class="link link-accent">I'm a simple link</span>
            </div>
          </div>{" "}
          <div class="flex flex-col gap-3 md:w-1/2">
            <progress value="20" max="100" class="progress">
              Default
            </progress>{" "}
            <progress
              value="25"
              max="100"
              class="progress progress-primary"
            >
              Primary
            </progress>{" "}
            <progress
              value="30"
              max="100"
              class="progress progress-secondary"
            >
              Secondary
            </progress>{" "}
            <progress
              value="40"
              max="100"
              class="progress progress-accent"
            >
              Accent
            </progress>{" "}
            <progress
              value="45"
              max="100"
              class="progress progress-info"
            >
              Info
            </progress>{" "}
            <progress
              value="55"
              max="100"
              class="progress progress-success"
            >
              Success
            </progress>{" "}
            <progress
              value="70"
              max="100"
              class="progress progress-warning"
            >
              Warning
            </progress>{" "}
            <progress
              value="90"
              max="100"
              class="progress progress-error"
            >
              Error
            </progress>
          </div>
        </div>{" "}
        <div class="flex flex-col gap-3 md:flex-row">
          <div class="stats bg-base-300 border-base-300 border md:w-1/2">
            <div class="stat">
              <div class="stat-title">Total Page Views</div>{" "}
              <div class="stat-value">89,400</div>{" "}
              <div class="stat-desc">21% more than last month</div>
            </div>
          </div>{" "}
          <div class="flex flex-wrap items-center justify-center gap-3 md:w-1/2">
            <div
              class="radial-progress"
              style="--value:60; --size:3.5rem;"
            >
              60%
            </div>{" "}
            <div
              class="radial-progress"
              style="--value:75; --size:3.5rem;"
            >
              75%
            </div>{" "}
            <div
              class="radial-progress"
              style="--value:90; --size:3.5rem;"
            >
              90%
            </div>
          </div>
        </div>
      </div>{" "}
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 md:flex-row">
          <div class="md:w-1/2">
            <div>
              <input type="checkbox" class="toggle" />{" "}
              <input type="checkbox" class="toggle toggle-primary" />{" "}
              <input type="checkbox" class="toggle toggle-secondary" />{" "}
              <input type="checkbox" class="toggle toggle-accent" />
            </div>{" "}
            <div>
              <input type="checkbox" class="checkbox" />{" "}
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
              />{" "}
              <input
                type="checkbox"
                class="checkbox checkbox-secondary"
              />{" "}
              <input type="checkbox" class="checkbox checkbox-accent" />
            </div>{" "}
            <div>
              <input type="radio" name="radio-1" class="radio" />{" "}
              <input
                type="radio"
                name="radio-1"
                class="radio radio-primary"
              />{" "}
              <input
                type="radio"
                name="radio-1"
                class="radio radio-secondary"
              />{" "}
              <input
                type="radio"
                name="radio-1"
                class="radio radio-accent"
              />
            </div>
          </div>{" "}
          <div class="md:w-1/2">
            <input
              type="range"
              min="0"
              max="100"
              class="range range-xs"
            />{" "}
            <input
              type="range"
              min="0"
              max="100"
              class="range range-xs range-primary"
            />{" "}
            <input
              type="range"
              min="0"
              max="100"
              class="range range-xs range-secondary"
            />{" "}
            <input
              type="range"
              min="0"
              max="100"
              class="range range-xs range-accent"
            />
          </div>
        </div>{" "}
        <div class="flex flex-col gap-3 md:flex-row">
          <div class="flex flex-col gap-3 md:w-1/2">
            <input
              type="text"
              placeholder="Default"
              class="input input-bordered w-full"
            />{" "}
            <input
              type="text"
              placeholder="Primary"
              class="input input-primary input-bordered w-full"
            />{" "}
            <input
              type="text"
              placeholder="Secondary"
              class="input input-secondary input-bordered w-full"
            />{" "}
            <input
              type="text"
              placeholder="Accent"
              class="input input-accent input-bordered w-full"
            />
          </div>{" "}
          <div class="flex flex-col gap-3 md:w-1/2">
            <input
              type="text"
              placeholder="Info"
              class="input input-info input-bordered w-full"
            />{" "}
            <input
              type="text"
              placeholder="Success"
              class="input input-success input-bordered w-full"
            />{" "}
            <input
              type="text"
              placeholder="Warning"
              class="input input-warning input-bordered w-full"
            />{" "}
            <input
              type="text"
              placeholder="Error"
              class="input input-error input-bordered w-full"
            />
          </div>
        </div>{" "}
        <div class="navbar bg-neutral text-neutral-content rounded-box">
          <div class="flex-none">
            <button class="btn btn-square btn-ghost">
              {/* TODO: <Icon id="Bars3" strokeWidth={0.1} size={24} />  */}
            </button>
          </div>{" "}
          <div class="flex-1">
            <button class="btn btn-ghost text-xl normal-case">
              deco.cx
            </button>
          </div>
        </div>{" "}
        <div class="flex gap-3">
          <div class="flex flex-grow flex-col gap-3">
            <div class="text-4xl font-bold">Text Size 1</div>{" "}
            <div class="text-3xl font-bold">Text Size 2</div>{" "}
            <div class="text-2xl font-bold">Text Size 3</div>{" "}
            <div class="text-xl font-bold">Text Size 4</div>{" "}
            <div class="text-lg font-bold">Text Size 5</div>{" "}
            <div class="text-sm font-bold">Text Size 6</div>{" "}
            <div class="text-xs font-bold">Text Size 7</div>
          </div>{" "}
          <ul class="steps steps-vertical">
            <li class="step step-primary">Step 1</li>{" "}
            <li class="step step-primary">Step 2</li>{" "}
            <li class="step">Step 3</li> <li class="step">Step 4</li>
          </ul>
        </div>
      </div>{" "}
      <div class="flex flex-col gap-3">
        <div class="alert">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-info h-6 w-6 flex-shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              >
              </path>
            </svg>{" "}
            <span>12 unread messages. Tap to see.</span>
          </div>
        </div>{" "}
        <div class="alert alert-info">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="h-6 w-6 flex-shrink-0 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              >
              </path>
            </svg>{" "}
            <span>New software update available.</span>
          </div>
        </div>{" "}
        <div class="alert alert-success">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              >
              </path>
            </svg>{" "}
            <span>Your purchase has been confirmed!</span>
          </div>
        </div>{" "}
        <div class="alert alert-warning">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              >
              </path>
            </svg>{" "}
            <span>Warning: Invalid email address!</span>
          </div>
        </div>{" "}
        <div class="alert alert-error">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              >
              </path>
            </svg>{" "}
            <span>Error! Task failed successfully.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const snippet = () => {
  const applyTheme = (theme: string) => {
    const container = document.getElementById("theme") as HTMLDivElement;
    container.classList.value = theme;
    localStorage.setItem("color-theme", theme);
  };

  document.getElementById("theme-switcher")?.addEventListener("change", (e) => {
    const selected = (e.target as any)?.selectedOptions[0].value as string;
    applyTheme(selected);
  });

  const theme = localStorage.getItem("color-theme");
  if (theme) {
    applyTheme(theme);
    (document.getElementById("theme-switcher") as HTMLSelectElement).value =
      theme;
  }
};

export function Preview(props: Props) {
  return (
    <>
      <Section {...props} />

      <div id="theme">
        <div class="flex flex-col">
          {props.themes && (
            <div class="m-3 px-3 py-2 rounded border border-solid border-gray-400 w-min flex flex-nowrap">
              <label for="theme-switcher">Theme:</label>
              <select id="theme-switcher">
                {props.themes.map(({ name }) => (
                  <option value={name}>{name}</option>
                ))}
              </select>
              <script dangerouslySetInnerHTML={{ __html: `(${snippet})();` }} />
            </div>
          )}
          <ComponentsPreview />
        </div>
      </div>
    </>
  );
}

export default Section;
