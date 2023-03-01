import { Show, createSignal } from "solid-js";

export default function Alert(props: { message: string; href: string }) {
  const [visible, setVisible] = createSignal(true);

  return (
    <Show when={visible()}>
      <div
        id="alert"
        class="flex relative w-full z-40 p-2 bg-red text-white text-sm  font-semibold items-center justify-center"
      >
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          class="w-full whitespace-nowrap flex items-center justify-center"
        >
          {props.message}
          <img src="/icons/arrow2.svg" class="ml-2 w-3" />
        </a>
        <img
          src="/icons/close.svg"
          class="cursor-pointer w-3"
          onClick={(e) => setVisible(false)}
        />
      </div>
    </Show>
  );
}
