import { env } from "~/env";
import { db, rounds as roundsTable } from "~/packages/db/schema";
import fs from "fs";
import { eq } from "drizzle-orm";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK({ pinataJWTKey: env.PINATA_JWT });

const rounds = await db.query.rounds.findMany();

for (const round of rounds) {
  if (
    round.image === "/games/smash-melee.webp" ||
    round.banner === "/games/smash-melee.webp"
  ) {
    continue;
  }

  if (round.image.startsWith("/")) {
    const ipfsPath = await pinToIPFS(round.image);

    console.log(`Updating round ${round.id} image to ${ipfsPath}`);

    await db
      .update(roundsTable)
      .set({ image: `https://ipfs.nouns.gg/ipfs/${ipfsPath}` })
      .where(eq(roundsTable.id, round.id));
  }

  if (round.banner.startsWith("/")) {
    const ipfsPath = await pinToIPFS(round.image);

    console.log(`Updating round ${round.id} image to ${ipfsPath}`);

    await db
      .update(roundsTable)
      .set({ banner: `https://ipfs.nouns.gg/ipfs/${ipfsPath}` })
      .where(eq(roundsTable.id, round.id));
  }
}

async function pinToIPFS(path: string) {
  const response = await pinata.pinFileToIPFS(
    fs.createReadStream(`../../apps/website/public${path}`),
    { pinataMetadata: { name: path } }
  );

  return response.IpfsHash;
}
