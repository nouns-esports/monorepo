import createAction from "../createAction";

export const linkTwitter = createAction(async () => {
  return {
    description: <p>Link your Twitter account</p>,
    url: "/nexus",
    check: async (user) => {
      if (!user.twitter) return false;

      return true;
    },
  };
});