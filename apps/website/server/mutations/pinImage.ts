"use server";

import { env } from "~/env";
import { getAuthenticatedUser } from "../queries/users";

export async function pinImage(formData: FormData) {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("No user session found");
  }

  const image = formData.get("file") as File;

  // 25 MB in bytes
  if (image.size > 25 * 1024 * 1024) {
    throw new Error("Image is too large");
  }

  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.PINATA_JWT}`,
      },
      body: formData,
    }
  );

  const data = (await response.json()) as { IpfsHash: string };

  if (!response.ok) {
    throw new Error("Could not upload file");
  }

  return data.IpfsHash;
}
