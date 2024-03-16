import cn from "classnames";

export default function TextInput(props: {
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
    <div className={cn("flex flex-col gap-2 w-full", props.className)}>
      {props.label ? (
        <label className="text-white font-lg font-bold">{props.label}</label>
      ) : (
        ""
      )}
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        className={cn(
          "bg-darkgrey rounded-xl text-white placeholder-lightgrey py-2 px-3",
          props.small ? "w-40" : "w-full"
        )}
      />
      {props.error ? <small className="text-red">{props.error}</small> : ""}
    </div>
  );
}
