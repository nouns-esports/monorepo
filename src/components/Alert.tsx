import { Show, createSignal } from "solid-js";

export default function Alert(props: { message: string }) {
  const [visible, setVisible] = createSignal(true);
  return (
    <Show when={visible()}>
      <div
        id="alert"
        onClick={() => setVisible(false)}
        class="w-full whitespace-nowrap cursor-pointer relative p-2 text-sm z-50 text-white font-semibold flex items-center justify-center bg-red"
      >
        {props.message}
        <span class="ml-2">{"\u{1F7AE}"}</span>
      </div>
    </Show>
  );
}
