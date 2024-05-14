import Link from "@/components/Link";

export default function FooterLink(props: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={props.href}
      className="hover:text-white select-none transition-colors max-lg:text-center text-nowrap"
    >
      {props.children}
    </Link>
  );
}
