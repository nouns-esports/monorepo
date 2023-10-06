"use client";

export default function CollectionViewer(props: { children: React.ReactNode }) {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${collections[currentCollection].image})`,
      // }}
      className="relative h-[calc(100vh_-_2.25rem)] bg-no-repeat bg-cover bg-center flex items-center justify-center transition-all"
    >
      {props.children}
    </div>
  );
}
