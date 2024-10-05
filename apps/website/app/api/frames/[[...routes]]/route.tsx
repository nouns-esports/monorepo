/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";
import { handle } from "frog/next";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { getProposal } from "@/server/queries/proposals";
import { getRound } from "@/server/queries/rounds";
import { roundState } from "@/utils/roundState";
import { env } from "~/env";
import {
  getPriorVotes,
  getUserVotesForRound,
  getVotes,
} from "@/server/queries/votes";
import { getUser } from "@/server/queries/users";
import { userToProfile } from "@/utils/userToProfile";
import { rounds } from "~/packages/db/schema";

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

app.frame("/rounds/:id", async (c) => {
  const round = await getRound({ id: c.req.param("id") });

  if (!round) {
    return c.error({ statusCode: 404, message: "Round not found" });
  }

  const state = roundState({
    start: round.start,
    votingStart: round.votingStart,
    end: round.end,
  });

  const start = new Date(round.start);

  return c.res({
    image: (
      <div
        style={{
          color: "white",
          backgroundColor: "#121213",
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
              width: 150,
              height: 150,
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
          {state === "Upcoming" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <p
                style={{
                  fontFamily: "Cabin",
                  weight: 500,
                  fontSize: 36,
                  lineHeight: 0.6,
                  color: "#909497",
                }}
              >
                Starts
              </p>
              <p
                style={{
                  fontFamily: "Cabin",
                  weight: 500,
                  fontSize: 40,
                  lineHeight: 0.6,
                  color: "white",
                }}
              >
                {start.toLocaleString("default", { month: "long" })}{" "}
                {start.getDate()}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Cabin",
                backgroundColor:
                  state === "Proposing"
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
              {state === "Proposing" ? "Proposing" : ""}
              {state === "Voting" ? "Voting" : ""}
              {state === "Ended" ? "Ended" : ""}
            </div>
          )}
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
        <p
          style={{
            fontSize: 36,
            margin: 0,
            color: "#909497",
            weight: 500,
            fontFamily: "Cabin",
          }}
        >
          nouns.gg/rounds/{round.id}
        </p>
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
    ogImage: round.banner,
  });
});

app.frame("/rounds/:round/votes/:user", async (c) => {
  return c.res({
    image: `${env.PUBLIC_DOMAIN}/api/frames/rounds/${c.req.param("round")}/votes/${c.req.param("user")}/img`,
    intents: [
      <Button.Link href={`${env.PUBLIC_DOMAIN}/rounds/${c.req.param("round")}`}>
        View Round
      </Button.Link>,
    ],
    imageAspectRatio: "1:1",
    browserLocation: `/rounds/${c.req.param("round")}`,
  });
});

app.image("/rounds/:round/votes/:user/img", async (c) => {
  const user = await getUser({ id: c.req.param("user") });

  if (!user) {
    return c.res({
      image: <div style={{ display: "flex", color: "red" }}>No user found</div>,
    });
  }

  const round = await getUserVotesForRound({
    round: c.req.param("round"),
    user: c.req.param("user"),
    wallet: user.wallet?.address,
  });

  if (!round) {
    return c.res({
      image: (
        <div style={{ display: "flex", color: "red" }}>
          User did not vote in the round or it doesnt exist
        </div>
      ),
    });
  }

  if (round.votes.length < 1) {
    return c.res({
      image: (
        <div style={{ display: "flex", color: "red" }}>User has no votes</div>
      ),
    });
  }

  const profile = userToProfile(user);

  const state = roundState({
    start: round.start,
    votingStart: round.votingStart,
    end: round.end,
  });
  //

  return c.res({
    headers: {
      "Cache-Control": "max-age=0",
    },
    image: (
      <div
        style={{
          color: "white",
          backgroundColor: "#121213",
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
              width: 150,
              height: 150,
              borderRadius: 12,
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Cabin",
              backgroundColor: state === "Voting" ? "#bc30ed" : "#E93737",
              borderRadius: "10000",
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 16,
              paddingBottom: 16,
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            {state === "Voting" ? "Voting" : ""}
            {state === "Ended" ? "Ended" : ""}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 32,
              alignItems: "center",
            }}
          >
            <img
              src={profile.pfp}
              style={{ width: 90, height: 90, borderRadius: "100%" }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 600,
                fontFamily: "Bebas Neue",
              }}
            >
              {profile.name}'s Votes
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            {round.votes.slice(0, 5).map((vote) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 64,
                  width: "100%",
                  backgroundColor: "#1A1A1A",
                  paddingLeft: 32,
                  paddingRight: 32,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    display: "block",
                    lineClamp: 1,
                    fontSize: 36,
                    fontFamily: "Cabin",
                  }}
                >
                  {vote.proposal.title.replace(
                    /[^a-zA-Z0-9 \-_\!\@\#\$\%\^\&\*\(\)\+\=\"\'\?\/\>\<,\.\{\}\[\]\|\\\~\`\;\:\n\r\t]/g,
                    ""
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="16"
                    viewBox="0 0 10 7"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d="M4.35124 0.280489L0.215046 4.78915C-0.273086 5.32138 0.123629 6.15385 0.864453 6.15385H9.13683C9.30263 6.15398 9.46495 6.10853 9.60437 6.02294C9.74378 5.93734 9.85437 5.81523 9.92289 5.67123C9.99142 5.52723 10.015 5.36744 9.99074 5.211C9.9665 5.05456 9.8955 4.9081 9.78624 4.78915L5.65005 0.281312C5.5691 0.192957 5.46927 0.122143 5.35726 0.0736226C5.24526 0.0251026 5.12366 0 5.00064 0C4.87763 0 4.75603 0.0251026 4.64402 0.0736226C4.53202 0.122143 4.43219 0.192135 4.35124 0.280489Z"
                      fill="white"
                    />
                  </svg>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 36,
                      fontFamily: "Cabin",
                    }}
                  >
                    {vote.count.toString()}
                  </div>
                </div>
              </div>
            ))}
            {round.votes.length > 5 ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 36,
                  fontFamily: "Cabin",
                }}
              >
                +{(round.votes.length - 5).toString()} more
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            display: "flex",
            color: "#909497",
            fontFamily: "Cabin",
          }}
        >
          nouns.gg/rounds/{round.id}
        </div>
      </div>
    ),
    imageOptions: {
      width: 1200,
      height: 1200,
    },
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
//           backgroundColor: "#121213",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           height: "100%",
//           width: "100%",
//           padding: 48,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <img
//             src={round.image}
//             style={{
//               width: 150,
//               height: 150,
//               borderRadius: 12,
//             }}
//           />
//           {state === "Upcoming" ? (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "flex-end",
//               }}
//             >
//               <p
//                 style={{
//                   fontFamily: "Cabin",
//                   weight: 500,
//                   fontSize: 36,
//                   lineHeight: 0.6,
//                   color: "#909497",
//                 }}
//               >
//                 Starts
//               </p>
//               <p
//                 style={{
//                   fontFamily: "Cabin",
//                   weight: 500,
//                   fontSize: 40,
//                   lineHeight: 0.6,
//                   color: "white",
//                 }}
//               >
//                 {start.toLocaleString("default", { month: "long" })}{" "}
//                 {start.getDate()}
//               </p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 fontFamily: "Cabin",
//                 backgroundColor:
//                   state === "Proposing"
//                     ? "#3569ee"
//                     : state === "Voting"
//                       ? "#bc30ed"
//                       : "#E93737",
//                 borderRadius: "10000",
//                 paddingLeft: 32,
//                 paddingRight: 32,
//                 paddingTop: 16,
//                 paddingBottom: 16,
//                 fontSize: 32,
//                 fontWeight: 600,
//               }}
//             >
//               {state === "Proposing" ? "Proposing" : ""}
//               {state === "Voting" ? "Voting" : ""}
//               {state === "Ended" ? "Ended" : ""}
//             </div>
//           )}
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 16,
//           }}
//         >
//           <h1
//             style={{
//               fontSize: 64,
//               fontWeight: 600,
//               margin: 0,
//               fontFamily: "Bebas Neue",
//             }}
//           >
//             {round.name}
//           </h1>
//           <p
//             style={{
//               fontSize: 36,
//               margin: 0,
//               color: "#909497",
//               weight: 500,
//               fontFamily: "Cabin",
//             }}
//           >
//             {round.description}
//           </p>
//         </div>
//         <p
//           style={{
//             fontSize: 36,
//             margin: 0,
//             color: "#909497",
//             weight: 500,
//             fontFamily: "Cabin",
//           }}
//         >
//           nouns.gg/rounds/{round.id}
//         </p>
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
