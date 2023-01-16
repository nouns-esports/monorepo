import Logo from "./Logo";

export default function Header() {
  return (
    <header class="fixed w-full flex items-center justify-between p-6">
      <div class="flex gap-3 items-center text-white font-londrina text-3xl pointer-events-auto cursor-default">
        <Logo size={40} />
        Nouns
      </div>
      <div class="flex gap-8">
        <nav class="flex items-center gap-6 pointer-events-auto">
          <Link name="Teams" href="#teams" />
          <Link name="Schedule" href="#schedule" />
          <Link name="About" href="#about" />
          <Link name="Shop" href="#shop" />
        </nav>
        <button class="bg-white p-1 px-4 border-4 hover:border-red border-transparent transition-colors duration-150 rounded-full pointer-events-auto">
          Join
        </button>
      </div>
    </header>
  );
}

function Link(props: { name: string; href: string }) {
  return (
    <a href={props.href} class="text-grey hover:text-white cursor-pointer">
      {props.name}
    </a>
  );
}
