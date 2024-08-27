import createAction from "../createAction";

export const joinServer = createAction(async () => {
  return {
    description: <p>Join the Discord server</p>,
    url: "/discord",
    check: async (user) => {
      if (!user.discord) return false;

      return true;
    },
  };
});
