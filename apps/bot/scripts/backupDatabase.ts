import path from "path";
import { db } from "~/packages/db/schema";
import { UTApi } from "uploadthing/server";
import { env } from "~/env";
import archiver from "archiver";
import fs from "fs";

const uploadThingClient = new UTApi({ apiKey: env.UPLOADTHING_SECRET });

export async function backupDatabase() {
  const tables = Object.keys(db.query) as Array<keyof typeof db.query>;

  if (!fs.existsSync(path.join(__dirname, `../cache`))) {
    fs.mkdirSync(path.join(__dirname, `../cache`));
  }

  const file = Bun.file(path.join(__dirname, `../cache/backup.json`));
  const writer = file.writer();

  writer.write("{");
  for (let i = 0; i < tables.length; i++) {
    // @ts-ignore
    const data = await db.query[tables[i]].findMany();

    writer.write(
      `"${tables[i]}":${JSON.stringify(data)}${i === tables.length - 1 ? "" : ","}`
    );
  }
  writer.write("}");

  const zipFile = archiver("zip", { zlib: { level: 9 } });

  zipFile.on("warning", (error) => {
    console.log("warning:", error);
  });

  zipFile.on("error", (error) => {
    console.error("error occurred :", error);
  });

  const name = new Date().toTimeString().replaceAll(":", "_");

  const writeStream = fs.createWriteStream(
    path.join(__dirname, `../cache/${name}.zip`)
  );
  zipFile.pipe(writeStream);

  zipFile.append(
    fs.createReadStream(path.join(__dirname, `../cache/backup.json`)),
    { name: "backup.json" }
  );

  await zipFile.finalize();

  const stream = fs.createReadStream(
    path.join(__dirname, `../cache/${name}.zip`)
  );

  const chunks: any[] = [];

  stream.on("data", (chunk) => {
    chunks.push(chunk);
  });

  stream.on("end", async () => {
    const buffer = Buffer.concat(chunks);
    const final = new File([buffer], `${name}.zip`, {
      type: "application/zip",
    });

    await uploadThingClient.uploadFiles(final);
  });
}
