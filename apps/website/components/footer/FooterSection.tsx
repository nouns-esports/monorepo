export default function FooterSection(props: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-[500px]:items-center gap-2">
      <h3 className="text-2xl font-bebas-neue text-white max-lg:text-center">
        {props.title}
      </h3>
      <div className="flex flex-col gap-2 max-[500px]:flex-row max-[500px]:gap-6">
        {props.children}
      </div>
    </div>
  );
}
