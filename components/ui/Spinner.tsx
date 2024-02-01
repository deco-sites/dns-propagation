import Icon from "./Icon.tsx";
import type { ComponentProps } from "preact";

type Props = Omit<ComponentProps<typeof Icon>, "id">;

function Spinner({ class: _class, ...props }: Props) {
  return <Icon {...props} id="loader-2" class={`animate-spin ${_class}`} />;
}

export default Spinner;
