import { twMerge } from "tailwind-merge";

export default function Spinner(props: {
  size?: number;
  thickness?: number;
  className?: string;
}) {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox={`0 0 ${props.size ?? 24} ${props.size ?? 24}`}
      className={twMerge("animate-spin", props.className)}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeWidth={props.thickness ?? 4}
        fill="none"
        className="stroke-grey-500"
      />
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
