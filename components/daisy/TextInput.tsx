import { Signal } from "@preact/signals";
import Icon from "../ui/Icon.tsx";
import type { VNode } from "preact";

export interface Props {
  placeholder?: string;
  border?: boolean;
  ghost?: boolean;
  topLeftLabel?: string;
  TopRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  class: string;
  prefix?: VNode<unknown>;
  onChange?: (e: Event) => void;
}

export default function TextInput(props: Props) {
  const {
    placeholder,
    border,
    topLeftLabel,
    TopRightLabel,
    bottomLeftLabel,
    bottomRightLabel,
    ghost,
    prefix,
    class: _class,
    onChange: _onChange,
  } = props;

  return (
    <>
      <label className="form-control w-full max-w-md box-border !bg-transparent">
        <div className="label">
          <span className="label-text">{topLeftLabel ? topLeftLabel : ""}</span>
          <span className="label-text">
            {TopRightLabel ? TopRightLabel : ""}
          </span>
        </div>
        <div
          class={`flex flex-row gap-2 items-center ${
            border && "input-bordered"
          } ${ghost && "input-ghost"} input 
          ${_class}
        `}
        >
          {prefix}
          <input
            type="text"
            placeholder={placeholder}
            className={`bg-transparent w-full max-w-md`}
            onChange={_onChange}
          />
        </div>
        <div className="label">
          <span className="label-text">
            {bottomLeftLabel ? bottomLeftLabel : ""}
          </span>

          <span className="label-text">
            {bottomRightLabel ? bottomRightLabel : ""}
          </span>
        </div>
      </label>
    </>
  );
}
{/* <div class="flex flex-col gap-2 w-full box-border"><label class="input border-base-300 focus-within:border-base-700"><div class="flex flex-row items-center flex-grow"><svg width="24" height="24" stroke-width="2" class="w-5 h-5 mr-2 text-base-500"><use href="/sprites.svg?__frsh_c=00f3912fc57a0efffbc22e5841110f0fd70ee9a3#search"></use></svg><input id="P0-17" type="text" placeholder="Search" value="" class="font-normal disabled:cursor-not-allowed read-only:cursor-not-allowed disabled:text-base-500 read-only:text-base-500 text-base-700 w-full bg-transparent focus:outline-none"></div></label></div> */}
