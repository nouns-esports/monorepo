import Button from "./Button";

export default function Gallery() {
  return (
    <div className="relative rounded-xl h-96 max-lg:h-80 aspect-[7/4] flex-shrink-0 overflow-hidden">
      <div className="absolute z-10 top-0 left-0 w-full h-full flex flex-col justify-between p-6 pointer-events-none">
        <div>
          <p className="text-white text-lg">We're redefining esports</p>
          <h1 className="text-white font-luckiest-guy text-4xl">
            Learn about our mission
          </h1>
        </div>
        <div className="flex items-center justify-between pointer-events-auto">
          <Button href="/about">Learn more</Button>
          <div className="flex gap-1 pr-6">
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-white" />
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex scrollbar-hidden overflow-scroll snap-x snap-mandatory scroll-smooth">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="select-none w-full h-full object-cover object-top brightness-75 snap-center"
        >
          <source src="/landing.webm" type="video/webm" />
          <source src="/landing.mp4" type="video/mp4" />
        </video>
        <img
          src="/artwork/1.png"
          draggable={false}
          className="object-cover w-full h-full snap-center"
        />
        <img
          src="/artwork/2.png"
          draggable={false}
          className="object-cover w-full h-full snap-center"
        />
      </div>
    </div>
  );
}
