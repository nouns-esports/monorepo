import { MessageSquare, RefreshCcw } from "lucide-react";
import { ArrowFatUp } from "phosphor-react-sc";

export default function CastReactions(props: {
  hash: string;
  user?: {
    liked: boolean;
    recast: boolean;
  };
}) {
  return (
    <div className="flex items-center gap-3">
      <MessageSquare className="w-5 h-5 text-grey-200 hover:text-white transition-colors  " />
      <RefreshCcw className="w-5 h-5 text-grey-200 hover:text-white transition-colors" />
      <ArrowFatUp className="w-5 h-5 text-grey-200 hover:text-red transition-colors" />
    </div>
  );
}
