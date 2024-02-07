// deno-lint-ignore-file
import { useSignal } from "@preact/signals";
import Icon from "../ui/Icon.tsx";
import type { VNode } from "preact";

export interface Props {
  label: string;
  items: Item[];
  renderItem?: any;
  classe?: string;
  prefix?: VNode<unknown>;
  sufix?: VNode<unknown>;
}

interface Item {
  text: string;
  href?: string;
  onClick?: () => void;
}

export default function Dropdown(props: Props) {
  const { label, items, renderItem, classe, prefix, sufix } = props;

  return (
    <details className="dropdown">
      <summary className={`m-1 btn ${classe}`}>
        <div class="flex flex-row gap-2 items-center">
          {prefix}
          {label}
          {sufix}
        </div>
      </summary>
      <ul
        className={`p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 ${classe}`}
      >
        {items.map((item) => {
          if (renderItem) {
            return renderItem(item);
          }
          return (
            <li>
              <a href={item.href}>{item.text}</a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
