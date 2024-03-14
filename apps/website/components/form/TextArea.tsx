export default function TextArea(props: {
  label: string;
  placeholder: string;
  lines?: number;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-white font-lg font-bold">{props.label}</label>
      <textarea
        placeholder={props.placeholder}
        className="bg-darkgrey rounded-xl text-white placeholder-lightgrey py-2 px-3"
        rows={props.lines ?? 4}
      />
    </div>
  );
}
