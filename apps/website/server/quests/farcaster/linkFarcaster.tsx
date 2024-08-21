import createAction from "../createAction";

export const linkFarcaster = createAction(() => {
  return {
    description: <p>Link your Farcaster account</p>,
    check: async (user) => {
      if (user.farcaster) return true;

      return false;
    },
  };
});
