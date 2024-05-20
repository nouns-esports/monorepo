import { env } from "@/env";
import pinataSDK from "@pinata/sdk";

export const pinataClient = new pinataSDK({
  pinataJWTKey: env.PINATA_JWT,
});
