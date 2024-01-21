import Text, { Variant } from "./Text.tsx";
import { valueOf } from "../../sdk/utils/signal.ts";
import type { JSX } from "preact";

interface Props {
  title: string;
  description: string;
  optional: boolean;
  for: string;
  class?: string;
  readOnly?: JSX.SignalLike<boolean | undefined> | boolean;
  disabled?: JSX.SignalLike<boolean | undefined> | boolean;
  variant?: Variant | undefined;
}

function Label({
  title,
  description,
  for: htmlFor,
  optional,
  class: labelClass,
  readOnly,
  disabled,
  variant = "body-regular",
}: Partial<Props>) {
  const interactive = !valueOf(readOnly) && !valueOf(disabled);

  return (
    <div class="flex flex-col">
      {title && title !== "__resolveType" && (
        <div class="flex flex-row flex-nowrap items-center gap-1">
          <label for={htmlFor} class={labelClass}>
            <Text
              variant={variant}
              tone={interactive ? "base-700" : "base-500"}
            >
              {title}
            </Text>
          </label>
          {optional && (
            <Text
              variant="caption-regular"
              tone={interactive ? "base-500" : "base-500"}
            >
              (optional)
            </Text>
          )}
        </div>
      )}

      {description && (
        <Text
          id={`${htmlFor}-helper`}
          variant="caption-regular"
          tone={interactive ? "base-500" : "base-500"}
        >
          {description}
        </Text>
      )}
    </div>
  );
}

export default Label;
