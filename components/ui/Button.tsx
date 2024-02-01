import { useCallback } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { forwardRef } from "preact/compat";

import type { ComponentType, JSX } from "preact";

import { IS_BROWSER } from "$fresh/runtime.ts";

import Spinner from "./Spinner.tsx";

const variants = {
  "default": "",
  "quiet": "btn-outline",
  "paddingless": "btn-link",
  "special": "btn-special",
  "destructive": "btn-destructive",
  "quietborderless": "btn-outline",
  "side-input": "btn-input",
};

export type Variant = keyof typeof variants;

export type Props =
  & Omit<
    JSX.IntrinsicElements["button"],
    "as" | "size" | "loading" | "disabled"
  >
  & {
    as?: keyof JSX.IntrinsicElements | ComponentType;
    variant?: Variant;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    disabled?: boolean;
    keepWidth?: string;
    loading?: boolean;
    loadingContent?: JSX.Element;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  variant = "default",
  as = "button",
  class: clx = "",
  disabled,
  children,
  iconLeft,
  iconRight,
  onClick,
  keepWidth,
  loading: _loading,
  loadingContent: _loadingContent,
  ...props
}, ref) => {
  const loading = useSignal(false);
  const Component = as as ComponentType<{
    disabled?: boolean;
    onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  }>;

  const onClickWithLoading = useCallback(
    async (e: JSX.TargetedMouseEvent<EventTarget>) => {
      try {
        const maybePromise = (onClick as any)?.(e);

        if (!maybePromise) {
          return;
        }

        loading.value = true;
        await maybePromise;
      } finally {
        loading.value = false;
      }
    },
    [onClick],
  );

  const loadingContent = _loadingContent ? _loadingContent : <Spinner />;

  return (
    <Component
      ref={ref}
      className={`btn ${variants[variant]} ${clx}`}
      disabled={disabled === false
        ? false
        : (!IS_BROWSER || disabled || loading.value)}
      onClick={onClickWithLoading}
      {...props}
    >
      {loading.value === true || _loading ? loadingContent : (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </Component>
  );
});

export default Button;
