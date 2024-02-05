import { Signal } from "@preact/signals";

export interface Props {
  placeholder?: string;
  border?: boolean;
  ghost?: boolean;
  topLeftLabel?: string;
  TopRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  textValue: Signal<string>;
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
    textValue,
  } = props;

  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{topLeftLabel ? topLeftLabel : ""}</span>
          <span className="label-text">
            {TopRightLabel ? TopRightLabel : ""}
          </span>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className={`input ${ghost && "input-ghost"} w-full max-w-xs ${
            border && "input-bordered"
          }`}
          onChange={(e) => {
            textValue.value = (e.target as HTMLTextAreaElement).value;
          }}
        />
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
