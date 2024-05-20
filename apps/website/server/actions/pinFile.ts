"use server";

import { onlyPassMemberAction } from "@/server/actions";
import { z } from "zod";
import { pinataClient } from "@/server/clients/pinata";

export const pinFile = onlyPassMemberAction(
  z.object({
    user: z.string().min(1),
    name: z.string().min(1),
    file: z.custom<File>(),
  }),
  async (input, context) => {
    return pinataClient.pinFileToIPFS(input.file, {
      pinataMetadata: { name: input.name },
    });
  }
);
