import { Show, createSignal } from "solid-js";

export default function Alert(props: { message: string; href: string }) {
  const [visible, setVisible] = createSignal(true);
  return (
    <Show when={visible()}>
      <div
        id="alert"
        class="flex relative w-full z-50 p-2 bg-red text-white text-sm  font-semibold items-center justify-center"
      >
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full whitespace-nowrap flex items-center justify-center"
        >
          {props.message}
          <span class="ml-2">{"🠊"}</span>
        </a>
        <span class="cursor-pointer" onClick={(e) => setVisible(false)}>
          {"\u{1F7AE}"}
        </span>
      </div>
    </Show>
  );
}
