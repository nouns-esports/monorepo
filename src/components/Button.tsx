export default function Button(props: { children: string; href: string }) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      class="relative"
      draggable={false}
    >
      <div class="absolute w-full h-full bg-red rounded-full" />
      <div class="relative select-none hover:translate-x-1 hover:-translate-y-1 duration-300 py-3 px-[22px] text-xl bg-white rounded-full flex items-center justify-center leading-none font-bebas whitespace-nowrap">
        {props.children}
      </div>
    </a>
  );
}
