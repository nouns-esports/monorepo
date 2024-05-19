import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { privyClient } from "../clients/privy";
import { getPass } from "../queries/pass";

export async function getUserIdFromSession() {
  const session = cookies().get("privy-token")?.value;

  if (!session) {
    throw new Error("No Privy session found");
  }

  try {
    return (await privyClient.verifyAuthToken(session)).userId;
  } catch (error) {
    throw new Error("Invalid Privy session");
  }
}

export const onlyAdminAction = createSafeActionClient({
  async middleware() {
    const user = await getUserIdFromSession();

    if (![""].includes(user)) {
      throw new Error("You are not authorized to perform this action");
    }

    return { user };
  },
});

export const onlyUserAction = createSafeActionClient({
  async middleware(parsedInput) {
    const user = await getUserIdFromSession();

    if (user !== parsedInput.user) {
      throw new Error("You can only perform this action for yourself");
    }

    return { user };
  },
});

export const onlyPassMemberAction = createSafeActionClient({
  async middleware() {
    const user = await getUserIdFromSession();

    const pass = await getPass({ user });

    if (!pass) {
      throw new Error("A pass membership is required to perform this action");
    }

    return { user, pass: pass.tier };
  },
});
