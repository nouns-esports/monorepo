import { Diamond } from "lucide-react";

export default function Attribution(props: { small?: boolean }) {
  return (
    <div className="rounded-md w-full h-full flex drop-shadow-lg overflow-hidden bg-gradient-to-br from-[#F3B5FD] to-[#F66FD0] text-white font-semibold items-center gap-2 pr-2">
      <img
        src="https://pbs.twimg.com/profile_images/1672093318598266881/JH1ZbbDM_400x400.jpg"
        className="h-full"
      />
      Pumey
      {/* <Diamond className="text-[#E651E9] pr-2 h-full flex aspect-square" /> */}
    </div>
  );
}
