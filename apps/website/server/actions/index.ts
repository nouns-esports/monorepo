import { createSafeActionClient } from "next-safe-action";

export const onlyAdminAction = createSafeActionClient({});

export const onlyUserAction = createSafeActionClient({});

export const onlyPassMemberAction = createSafeActionClient({});
