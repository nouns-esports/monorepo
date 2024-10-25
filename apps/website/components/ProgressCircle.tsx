import { twMerge } from "tailwind-merge";

export default function ProgressCircle(props: {
  value: number;
  min: number;
  max: number;
  size: number;
}) {
  const radius = props.size / 2 - 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={props.size} height={props.size}>
      <circle
        className="fill-none stroke-grey-400"
        style={{ strokeWidth: props.size / 6 }}
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
      />
      <circle
        className="fill-none stroke-gold-500"
        style={{ strokeWidth: props.size / 6 }}
        cx={props.size / 2}
        cy={props.size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={
          circumference *
          (1 - props.value / (props.value < props.min ? props.min : props.max))
        }
        transform={`rotate(-180 ${props.size / 2} ${props.size / 2})`}
      />
    </svg>
  );
}
