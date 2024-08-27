import createAction from "../createAction";

export const linkDiscord = createAction(async () => {
  return {
    description: <p>Link your Discord account</p>,
    url: "/nexus",
    check: async (user) => {
      if (!user.discord) return false;

      return true;
    },
  };
});
