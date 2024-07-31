/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";
import { handle } from "frog/next";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { getProposal } from "@/server/queries/proposals";
import { getRound } from "@/server/queries/rounds";
import { roundState } from "@/utils/roundState";
import { env } from "~/env";

const app = new Frog({
  basePath: "/api/frames",
  title: "Nouns Esports",
  imageOptions: {
    fonts: [
      {
        name: "Luckiest Guy",
        source: "google",
      },
      {
        name: "Bebas Neue",
        source: "google",
      },
      {
        name: "Cabin",
        weight: 500,
        source: "google",
      },
      {
        name: "Cabin",
        weight: 600,
        source: "google",
      },
    ],
  },
});

app.frame("/round/:id", async (c) => {
  const round = await getRound({ id: c.req.param("id") });

  if (!round) {
    return c.error({ statusCode: 404, message: "Round not found" });
  }

  const state = roundState(round);

  return c.res({
    image: (
      <div
        style={{
          color: "white",
          backgroundColor: "#0C0C0C",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={round.image}
            style={{
              width: 120,
              height: 120,
              borderRadius: 12,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Cabin",
              backgroundColor:
                state === "Starting"
                  ? "#789AF4"
                  : state === "Proposing"
                    ? "#3569ee"
                    : state === "Voting"
                      ? "#bc30ed"
                      : "#E93737",
              borderRadius: "10000",
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 16,
              paddingBottom: 16,
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            {state === "Starting" ? "Starting" : ""}
            {state === "Proposing" ? "Proposing" : ""}
            {state === "Voting" ? "Voting" : ""}
            {state === "Ended" ? "Round Ended" : ""}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 600,
              margin: 0,
              fontFamily: "Bebas Neue",
            }}
          >
            {round.name}
          </h1>
          <p
            style={{
              fontSize: 36,
              margin: 0,
              color: "#909497",
              weight: 500,
              fontFamily: "Cabin",
            }}
          >
            {round.description}
          </p>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`${env.PUBLIC_DOMAIN}/rounds/${round.id}`}>
        View
      </Button.Link>,
      <Button.Link href={`${env.PUBLIC_DOMAIN}/rounds`}>
        All Rounds
      </Button.Link>,
    ],
    title: round.name,
    // ogImage: round.banner,
  });
});

// app.frame("/proposal/:id", async (c) => {
//   const proposal = await getProposal({ id: Number(c.req.param("id")) });

//   if (!proposal) {
//     return c.error({ statusCode: 404, message: "Proposal not found" });
//   }

//   return c.res({
//     image: (
//       <div
//         style={{
//           color: "white",
//           backgroundColor: "black",
//           display: "flex",
//           padding: 32,
//           fontSize: 60,
//         }}
//       >
//         {proposal.title}
//       </div>
//     ),
//     intents: [
//       <Button.Link href={`/rounds/${proposal.round}/proposals/${proposal.id}`}>
//         Read
//       </Button.Link>,
//       <Button.Link href={`/rounds/${proposal.round}`}>View Round</Button.Link>,
//     ],
//   });
// });

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
