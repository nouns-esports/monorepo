import Link from "@/components/Link";
import createAction from "../createAction";

export const castInChannel = createAction((actionInputs) => {
  if (!actionInputs?.channel) {
    throw new Error("Channel input missing in action");
  }

  return {
    description: (
      <p>
        Cast in the{" "}
        <Link
          href={`https://warpcast.com/~/channel/${actionInputs.channel}`}
          newTab
          className="text-red hover:text-red/50 transition-colors"
        >
          /{actionInputs.channel}
        </Link>{" "}
        channel
      </p>
    ),
    check: async (user) => {
      return false;
    },
  };
});
