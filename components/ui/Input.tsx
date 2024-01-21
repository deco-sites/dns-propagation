import { useId } from "preact/hooks";
import { forwardRef } from "preact/compat";
import Label from "./Label.tsx";
import Text from "./Text.tsx";
import Icon from "./Icon.tsx";
import type { JSX, VNode } from "preact";
import { clx } from "../../sdk/clx.ts";

type Props = Omit<JSX.IntrinsicElements["input"], "prefix"> & {
  title?: string;
  description?: string;
  optional?: boolean;
  adornment?: string;
  warning?: string;
  error?: string;
  success?: string;
  id?: string;
  class?: string;
  prefix?: VNode<unknown>;
  forInputLabel?: string;
};

type State =
  | "error"
  | "success"
  | "disabled"
  | "readonly"
  | "warning"
  | "default";

const labelStyles: Record<State, string> = {
  "readonly": "bg-base-200 border-base-400 cursor-not-allowed",
  "disabled": "bg-base-200 border-base-400 cursor-not-allowed",
  "success": "border-positive-900 focus-within:border-positive-900",
  "error": "border-critical-900 focus-within:border-critical-900",
  "warning": "border-warning-900 focus-within:border-warning-900",
  "default": "border-base-300 focus-within:border-base-700",
};

const Input = forwardRef<HTMLInputElement, Props>(({
  readOnly,
  title,
  description,
  optional,
  adornment,
  error,
  warning,
  success,
  disabled,
  id,
  prefix,
  forInputLabel,
  class: _class,
  ...props
}, ref) => {
  id = id ? id : useId();
  const state = typeof error === "string"
    ? "error"
    : typeof warning === "string"
    ? "warning"
    : typeof success === "string"
    ? "success"
    : disabled
    ? "disabled"
    : readOnly
    ? "readonly"
    : "default";

  return (
    <div class="flex flex-col gap-2 w-full box-border">
      {title && (
        <Label
          for={id}
          title={title}
          description={description}
          optional={optional}
          readOnly={readOnly}
          disabled={disabled}
        />
      )}
      <label
        class={clx(
          `input`,
          labelStyles[state],
        )}
        for={forInputLabel}
      >
        <div class="flex flex-row items-center flex-grow">
          {prefix}
          <input
            id={id}
            type="text"
            class={clx(
              "font-normal disabled:cursor-not-allowed read-only:cursor-not-allowed disabled:text-base-500 read-only:text-base-500 text-base-700 w-full bg-transparent focus:outline-none",
              _class,
            )}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
            ref={ref}
          />
        </div>
        {adornment && (
          <Text variant="caption-regular" tone="base-500">{adornment}</Text>
        )}
      </label>
      {Boolean(error?.length) && (
        <Text variant="caption-strong" tone="critical-900">
          <Icon id="alert-circle" size={16} />
          {error}
        </Text>
      )}
      {Boolean(success?.length) && (
        <Text variant="caption-strong" tone="positive-900">
          <Icon id="circle-check" size={16} />
          {success}
        </Text>
      )}
    </div>
  );
});

export default Input;
