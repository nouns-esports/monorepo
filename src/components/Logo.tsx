export default function Logo(props: { size: number }) {
  return (
    <img
      src="logo.png"
      alt="Nouns Esports Logo"
      draggable={false}
      style={{ width: `${props.size}px`, height: `${props.size}px` }}
      class="group-hover:rotate-12 transition-transform duration-150 delay-0"
    />
  );
}
