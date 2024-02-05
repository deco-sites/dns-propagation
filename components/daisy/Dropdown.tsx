// deno-lint-ignore-file
import { useSignal } from "@preact/signals";

export interface Props {
  label: string;
  items: Item[];
  renderItem?: any;
}

interface Item {
  text: string;
  href?: string;
  onClick?: () => void;
}

export default function Dropdown(props: Props) {
  const { label, items, renderItem } = props;

  return (
    <details className="dropdown">
      <summary className="m-1 btn">{label}</summary>
      <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
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
