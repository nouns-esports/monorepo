import { awards, db, proposals, rounds } from "@/db/schema";

export async function GET() {
  await db.insert(rounds).values([
    {
      id: "test-round-1",
      name: "Test Round 1",
      description: "This is a test round for demo purposes only.",
      image: "/artwork/1.png",
      start: new Date(1713571200000),
      votingStart: new Date(1714089600000),
      end: new Date(1714262400000),
      tags: ["test"],
    },
    {
      id: "test-round-2",
      name: "Test Round 2",
      description: "This is a second test round for demo purposes only.",
      image: "/artwork/2.png",
      start: new Date(1713571200000),
      votingStart: new Date(1713744000000),
      end: new Date(1714003200000),
      tags: ["test"],
    },
  ]);

  await db.insert(awards).values([
    {
      round: "test-round-1",
      place: 1,
      type: "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      value: "100000000",
    },
    {
      round: "test-round-1",
      place: 2,
      type: "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      value: "100000000",
    },
    {
      round: "test-round-1",
      place: 3,
      type: "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      value: "100000000",
    },
    {
      round: "test-round-1",
      place: 4,
      type: "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      value: "100000000",
    },
    {
      round: "test-round-1",
      place: 5,
      type: "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      value: "100000000",
    },
    {
      round: "test-round-2",
      place: 1,
      type: "eip155:8453:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      value: "100000000",
    },
  ]);

  await db.insert(proposals).values([
    {
      round: "test-round-2",
      user: "privyId",
      title: "Test Proposal",
      description:
        'This is a test proposal for demo purposes only. It also includes some images... <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png" /> <img src="https://paperandinkprinting.com/wp-content/uploads/2019/08/canstockphoto22402523-arcos-creator.com_-1024x1024.jpg" /> <img src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg" />',
      value: "0",
      createdAt: new Date(),
    },
    {
      round: "test-round-2",
      user: "privyId2",
      title: "Test Proposal 2",
      description: "This is a second test proposal for demo purposes only.",
      value: "0",
      createdAt: new Date(),
    },
    {
      round: "test-round-2",
      user: "privyId3",
      title: "Test Proposal 3",
      description:
        'This is a third test proposal for demo purposes only. <img src="https://www.familyeducation.com/sites/default/files/styles/scale800w/public/2022-09/Test%20Anxiety.jpg" />',
      value: "0",
      createdAt: new Date(),
    },
    {
      round: "test-round-2",
      user: "privyId4",
      title: "Test Proposal 4",
      description:
        'This is a fourth test proposal for demo purposes only. <img src="https://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg" />',
      value: "0",
      createdAt: new Date(),
    },
    {
      round: "test-round-2",
      user: "privyId5",
      title: "Test Proposal 5",
      description: "This is a fifth test proposal for demo purposes only.",
      value: "0",
      createdAt: new Date(),
    },
  ]);

  return new Response("Seeded");
}
