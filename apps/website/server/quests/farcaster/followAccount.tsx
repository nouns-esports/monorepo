import Link from "@/components/Link";
import createAction from "../createAction";

export const followAccount = createAction((actionInputs) => {
  if (!actionInputs?.account) {
    throw new Error("Account input missing in action");
  }

  return {
    description: (
      <p>
        Follow{" "}
        <Link
          href={`https://warpcast.com/${actionInputs.account}`}
          newTab
          className="text-red hover:text-red/50 transition-colors"
        >
          @{actionInputs.account}
        </Link>
      </p>
    ),
    name: `Follow @${actionInputs.account}`,
    check: async (user) => {
      return false;
    },
  };
});
