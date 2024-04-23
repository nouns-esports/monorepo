/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";
import { handle } from "frog/next";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { getProposal } from "@/server/queries/proposals";
import { getRound } from "@/server/queries/rounds";

const app = new Frog({
  basePath: "/",
});

// app.frame("/", (c) => {
//   return c.res({
//     image: (
//       <div
//         style={{
//           color: "white",
//           backgroundColor: "red",
//           display: "flex",
//           fontSize: 60,
//         }}
//       >
//         Hello World!
//       </div>
//     ),
//     intents: [<Button>Hello World</Button>],
//   });
// });

app.frame("/frames/round/:id", async (c) => {
  const round = await getRound({ id: c.req.param("id") });

  if (!round) {
    return c.error({ statusCode: 404, message: "Round not found" });
  }

  return c.res({
    image: round.image,
    // <div
    //   style={{
    //     // color: "white",
    //     // backgroundColonewLocalck",
    //     // display: "flex",
    //     height: "100%",
    //     width: "100%",
    //     backgroundImage: `url(${round.image})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     // padding: 32,
    //     // fontSize: 60,
    //   }}
    // >
    //   Rounds
    // </div>
    intents: [
      <Button.Link href={`/rounds/${round.id}`}>View Round</Button.Link>,
      <Button>View Proposals</Button>,
      <Button>🠘 Prev</Button>,
      <Button>Next 🠚</Button>,
    ],
  });
});

app.frame("/frames/proposal/:id", async (c) => {
  const proposal = await getProposal({ id: Number(c.req.param("id")) });

  if (!proposal) {
    return c.error({ statusCode: 404, message: "Proposal not found" });
  }

  return c.res({
    image: (
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          display: "flex",
          padding: 32,
          fontSize: 60,
        }}
      >
        {proposal.title}
      </div>
    ),
    intents: [
      <Button.Link href={`/rounds/${proposal.round}/proposals/${proposal.id}`}>
        View Proposal
      </Button.Link>,
      <Button>Read Inline</Button>,
      <Button>🠘 Prev</Button>,
      <Button>Next 🠚</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
