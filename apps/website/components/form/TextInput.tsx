import { twMerge } from "tailwind-merge";

export default function TextInput(props: {
  name?: string;
  label?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  value?: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <div className={twMerge("flex flex-col gap-2 w-full", props.className)}>
      {props.label ? (
        <label htmlFor={props.name} className="text-white font-lg font-bold">
          {props.label}
        </label>
      ) : (
        ""
      )}
      <input
        key={props.name}
        type="text"
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        className={twMerge(
          "bg-grey-800 rounded-xl text-white placeholder-grey-400 py-2 px-3 outline-none border-grey-600 border-[1px]",
          props.small ? "w-40" : "w-full"
        )}
      />
      {props.error ? <small className="text-red">{props.error}</small> : ""}
    </div>
  );
}
