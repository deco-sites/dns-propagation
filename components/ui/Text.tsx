import { JSX } from "preact";
import { forwardRef } from "preact/compat";
import { Palette } from "../../sections/DesignSystem.tsx";

export type Variant =
  | "hero-large"
  | "hero-medium"
  | "hero-small"
  | "display"
  | "heading"
  | "subheading"
  | "body-strong"
  | "body-regular"
  | "caption-strong"
  | "caption-regular";

const variants: Record<Variant, `text-${Variant} font-${Variant}`> = {
  "hero-large": "text-hero-large font-hero-large",
  "hero-medium": "text-hero-medium font-hero-medium",
  "hero-small": "text-hero-small font-hero-small",
  "display": "text-display font-display",
  "heading": "text-heading font-heading",
  "subheading": "text-subheading font-subheading",
  "body-strong": "text-body-strong font-body-strong",
  "body-regular": "text-body-regular font-body-regular",
  "caption-strong": "text-caption-strong font-caption-strong",
  "caption-regular": "text-caption-regular font-caption-regular",
};

export type Tone =
  | Extract<
    keyof Palette,
    | "base-700"
    | "base-500"
    | "base-400"
    | "critical-900"
    | "warning-900"
    | "positive-900"
    | "highlight-900"
    | "highlight-100"
    | "base-000"
  >
  | "black";

const tones: Record<
  Tone,
  `text-${keyof Palette | "black"}`
> = {
  "base-700": "text-base-700",
  "base-500": "text-base-500",
  "base-400": "text-base-400",
  "critical-900": "text-critical-900",
  "warning-900": "text-warning-900",
  "highlight-900": "text-highlight-900",
  "highlight-100": "text-highlight-100",
  "base-000": "text-base-000",
  "positive-900": "text-positive-900",
  "black": "text-black",
};

type Props = Omit<JSX.IntrinsicElements["span"], "as"> & {
  tone?: Tone;
  variant?: Variant;
  hover?: boolean;
  truncate?: boolean;
  as?: JSX.ElementType;
};

const Text = forwardRef<HTMLSpanElement, Props>((
  {
    tone = "base-700",
    variant: _variant = "body-regular",
    hover,
    class: _class = "",
    truncate,
    children,
    as,
    ...props
  },
  ref,
) => {
  const toneClass = tones[tone];
  const variant = variants[_variant];
  const _children = truncate
    ? <span class="truncate">{children}</span>
    : children;
  const Component = as ??
    ("span" as NonNullable<typeof as>);

  return (
    <Component
      {...props}
      children={_children}
      class={`${toneClass} ${
        hover && `hover:underline`
      } ${variant} inline-flex items-center justify-start gap-1 ${
        truncate ? "min-w-0 w-full flex-1" : ""
      } ${_class}`}
      ref={ref}
    />
  );
});

export default Text;
