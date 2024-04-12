import fs from "fs";
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK({
  pinataJWTKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzE4MWY5OC05MDhlLTQ3Y2YtYWZiZC1iMzczNTU3OWY5OWQiLCJlbWFpbCI6InNhbUBub3Vucy5nZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1MTI4OWM2Y2Y1NTYzNzY5M2I2OCIsInNjb3BlZEtleVNlY3JldCI6IjE2ZjhkNTg1YTczMWVjNDJjZTgxNjAzMWJlNjQyMmIxNTU1Y2QxM2VkOWE4MDAzYTljY2QwYWYxNjgxNDFlYmUiLCJpYXQiOjE3MTI3ODY3ODh9.XHrqzhlooffuDGmIvtfCC8GJE2vJpCyzqf7m01T8MHY",
});

let count = 0;

fs.readdir(
  "./apps/website/archive/prop-house/output/images",
  async (err, files) => {
    for (const file of files) {
      const readStream = fs.createReadStream(
        `./apps/website/archive/prop-house/output/images/${file}`
      );

      const res = await pinata.pinFileToIPFS(readStream, {
        pinataMetadata: { name: file },
      });
      count++;

      console.log(count, res.Timestamp);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
);
