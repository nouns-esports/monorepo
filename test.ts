import { JSDOM } from "jsdom";
import fs from "fs";
import { InitialEditorStateType } from "@lexical/react/LexicalComposer";

const heading1 = {
  children: [
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: "Heading 1",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "heading",
  version: 1,
  tag: "h1",
};

const heading2 = {
  children: [
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: "heading 2",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "heading",
  version: 1,
  tag: "h2",
};
const heading3 = {
  children: [
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: "Heading 3",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "heading",
  version: 1,
  tag: "h3",
};

const blankSpace = {
  children: [],
  direction: null,
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 0,
};

const paragraph = {
  children: [
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: "Paragraph",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 0,
};

const bold = {
  children: [
    {
      detail: 0,
      format: 1,
      mode: "normal",
      style: "",
      text: "Bold",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 1,
};

const italic = {
  children: [
    {
      detail: 0,
      format: 2,
      mode: "normal",
      style: "",
      text: "Italic",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 2,
};

const underline = {
  children: [
    {
      detail: 0,
      format: 8,
      mode: "normal",
      style: "",
      text: "Underline",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 8,
};

const link = {
  children: [
    {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "Link",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "link",
      version: 1,
      rel: "noreferrer",
      target: null,
      title: null,
      url: "https://nouns.gg",
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 0,
};

const boldUnderlinedLink = {
  children: [
    {
      children: [
        {
          detail: 0,
          format: 9,
          mode: "normal",
          style: "",
          text: "Bold Underlined Link",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "link",
      version: 1,
      rel: "noreferrer",
      target: null,
      title: null,
      url: "https://nouns.gg",
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 9,
};

const ul = {
  children: [
    {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "Bullet 1",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 1,
    },
    {
      children: [
        {
          detail: 0,
          format: 1,
          mode: "normal",
          style: "",
          text: "Bullet 2",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 2,
    },
    {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Bullet 3",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "link",
          version: 1,
          rel: "noreferrer",
          target: null,
          title: null,
          url: "https://nouns.gg",
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 3,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "list",
  version: 1,
  listType: "bullet",
  start: 1,
  tag: "ul",
};

const ol = {
  children: [
    {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "Numbered 1",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 1,
    },
    {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "Numbered 2",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 2,
    },
    {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: "Numbered 3",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "listitem",
      version: 1,
      value: 3,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "list",
  version: 1,
  listType: "number",
  start: 1,
  tag: "ol",
};

const image = {
  children: [
    {
      altText: "Yellow flower in tilt shift lens",
      caption: {
        editorState: {
          root: {
            children: [],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
      },
      height: 0,
      maxWidth: 500,
      showCaption: true,
      src: "/assets/yellow-flower.a2a7c7a2.jpg",
      type: "image",
      version: 1,
      width: 0,
    },
  ],
  direction: null,
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 0,
};

const paragraphwithstyling = {
  children: [
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: "A single paragraph with ",
      type: "text",
      version: 1,
    },
    {
      detail: 0,
      format: 1,
      mode: "normal",
      style: "",
      text: "bold",
      type: "text",
      version: 1,
    },
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: ", ",
      type: "text",
      version: 1,
    },
    {
      detail: 0,
      format: 2,
      mode: "normal",
      style: "",
      text: "italic",
      type: "text",
      version: 1,
    },
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: ", and ",
      type: "text",
      version: 1,
    },
    {
      detail: 0,
      format: 8,
      mode: "normal",
      style: "",
      text: "underlined",
      type: "text",
      version: 1,
    },
    {
      detail: 0,
      format: 0,
      mode: "normal",
      style: "",
      text: " text within it",
      type: "text",
      version: 1,
    },
  ],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
  textFormat: 0,
};

// Text format codes
const BOLD = 1;
const ITALIC = 2;
const UNDERLINE = 8;
// const BOLD_AND_ITALIC = 3;
// const BOLD_AND_UNDERLINE = 9;
// const ITALIC_AND_UNDERLINE = 10;

function createText(props: {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}) {
  return {
    detail: 0,
    format:
      (props.bold ? BOLD : 0) +
      (props.italic ? ITALIC : 0) +
      (props.underline ? UNDERLINE : 0),
    mode: "normal",
    style: "",
    text: props.text,
    type: "text",
    version: 1,
  };
}

function createParagraph() {
  return {
    children: [] as any[],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "paragraph",
    version: 1,
    textFormat: 0,
  };
}

function createLink(props: { url: string }) {
  return {
    children: [] as any,
    direction: "ltr",
    format: "",
    indent: 0,
    type: "link",
    version: 1,
    rel: "noreferrer",
    target: "_blank",
    title: null,
    url: props.url,
  };
}

function createHeading(props: { level: number }) {
  return {
    children: [] as any,
    direction: "ltr",
    format: "",
    indent: 0,
    type: "heading",
    version: 1,
    tag: `h${props.level}`,
  };
}

function createImage(props: { src: string; alt: string }) {
  return {
    children: [
      {
        altText: props.alt,
        caption: {
          editorState: {
            root: {
              children: [],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            },
          },
        },
        height: 0,
        maxWidth: 500,
        showCaption: false,
        src: props.src,
        type: "image",
        version: 1,
        width: 0,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "paragraph",
    version: 1,
    textFormat: 0,
  };
}

function createListItem(props: { value: number }) {
  return {
    children: [] as any,
    direction: "ltr",
    format: "",
    indent: 0,
    type: "listitem",
    version: 1,
    value: props.value,
  };
}

function createUnorderedList() {
  return {
    children: [] as any,
    direction: "ltr",
    format: "",
    indent: 0,
    type: "list",
    version: 1,
    listType: "bullet",
    start: 1,
    tag: "ul",
  };
}

function createOrderedList() {
  return {
    children: [] as any,
    direction: "ltr",
    format: "",
    indent: 0,
    type: "list",
    version: 1,
    listType: "number",
    start: 1,
    tag: "ul",
  };
}

// Create builder functions for each type
// Write a parser that takes in the prop house html and reconstructs the tree using the builder functions, handle edge cases

// for (const child of dom.window.document.body.children) {
//   // H1
//   if (child.tagName === "H1") {
//     if (child.textContent === null) throw new Error("H1 missing text content");

//     lexicalState.children.push(
//       createHeading({ text: child.textContent, level: 1 })
//     );

//     continue;
//   }

//   // H2
//   if (child.tagName === "H2") {
//     if (child.textContent === null) throw new Error("H2 missing text content");

//     lexicalState.children.push(
//       createHeading({ text: child.textContent, level: 2 })
//     );

//     continue;
//   }

//   // H3
//   if (child.tagName === "H3") {
//     if (child.textContent === null) throw new Error("H3 missing text content");

//     lexicalState.children.push(
//       createHeading({ text: child.textContent, level: 3 })
//     );

//     continue;
//   }

//   // IMG
//   if (child.tagName === "P" && child.children[0]?.tagName === "IMG") {
//     lexicalState.children.push(
//       createImage({
//         src:
//           // @ts-ignore
//           child.children[0].src,
//         alt:
//           // @ts-ignore
//           child.children[0].alt ?? "",
//       })
//     );

//     continue;
//   }

//   // P
//   if (child.tagName === "P") {
//     if (child.children[0]?.tagName === "BR") continue;

//     let lexicalParagraph = createParagraph();

//     for (const nestedChild of child.children) {
//       if (nestedChild?.tagName === "IMG") {
//         throw new Error("P with IMG has mutliple children");
//       }

//       // STRONG
//       if (nestedChild.tagName === "STRONG") {
//         if (
//           nestedChild.textContent === null ||
//           nestedChild.textContent === " "
//         ) {
//           continue;
//         }

//         lexicalParagraph.children.push(
//           createText({ text: nestedChild.textContent, bold: true })
//         );
//       }

//       // A
//       if (nestedChild.tagName === "A") {
//         if (nestedChild.textContent === null) {
//           throw new Error("A of P missing text content");
//         }

//         lexicalParagraph.children.push(
//           createLink({
//             text: nestedChild?.textContent,
//             url:
//               // @ts-ignore
//               nestedChild.href,
//           })
//         );
//       }
//     }
//   }

//   // UL
//   if (child.tagName === "UL") {
//     let lexicalList = createUnorderedList();

//     for (let i = 0; i < child.children.length; i++) {
//       const listItem = child.children[i];

//       if (listItem?.tagName !== "LI") continue;

//       let lexicalListItem = createListItem({ value: i + 1 });

//       for (const nestedChild of listItem.children) {
//         // STRONG
//         if (nestedChild.tagName === "STRONG") {
//           if (
//             nestedChild.textContent === null ||
//             nestedChild.textContent === " "
//           ) {
//             continue;
//           }

//           lexicalListItem.children.push(
//             createText({ text: nestedChild.textContent, bold: true })
//           );
//         }

//         // A
//         if (nestedChild.tagName === "A") {
//           if (nestedChild.textContent === null) {
//             throw new Error("A of LI missing text content");
//           }

//           lexicalListItem.children.push(
//             createLink({
//               text: nestedChild?.textContent,
//               url:
//                 // @ts-ignore
//                 nestedChild.href,
//             })
//           );
//         }

//       }

//       lexicalList.children.push(lexicalListItem);
//     }

//     lexicalState.children.push(lexicalList);
//   }

//   // OL
//   if (child.tagName === "OL") {
//     let lexicalList = createOrderedList();

//     for (let i = 0; i < child.children.length; i++) {
//       const listItem = child.children[i];

//       if (listItem?.tagName !== "LI") continue;

//       let lexicalListItem = createListItem({ value: i + 1 });

//       for (const nestedChild of listItem.children) {
//         // STRONG
//         if (nestedChild.tagName === "STRONG") {
//           if (
//             nestedChild.textContent === null ||
//             nestedChild.textContent === " "
//           ) {
//             continue;
//           }

//           lexicalListItem.children.push(
//             createText({ text: nestedChild.textContent, bold: true })
//           );
//         }

//         // A
//         if (nestedChild.tagName === "A") {
//           if (nestedChild.textContent === null) {
//             throw new Error("A of LI missing text content");
//           }

//           lexicalListItem.children.push(
//             createLink({
//               text: nestedChild?.textContent,
//               url:
//                 // @ts-ignore
//                 nestedChild.href,
//             })
//           );
//         }
//       }

//       lexicalList.children.push(lexicalListItem);
//     }

//     lexicalState.children.push(lexicalList);
//   }
// }

// console.log(lexicalState);
// fs.writeFileSync("output.json", JSON.stringify(lexicalState));

const html =
  '<p>[A version of this proposal may be also read using this notion link with some more visual elements: <a href="https://metasports.notion.site/Metasports-x-Nouns-Esports-Prop-House-Grant-1-bdba41500b3e441abfb6516e4379104c" rel="noopener noreferrer" target="_blank">here</a>]</p><p><br></p><h1><strong>OBJECTIVES AND OVERVIEW</strong></h1><p><br></p><ol><li>To spotlight the Southeast Asian Marvel Snap scene and grow it within the region</li><li>Introducing/proliferating the Nouns Meme in Southeast Asia through grassroots esports (Rally more tournament organizer and player knowledge of Nouns Esports in the region)</li><li>To onboard web2 gamers onto web3 through the use of POAPs as a foot in the door</li></ol><p><br></p><p>At Metasports, one of our most beloved IPs is Community Showdown (or ComShow). ComShow is a modular IP we use to hold tournaments featuring a variety of titles to allow casual players to experience what it is like to play in a professionally-produced esports tournaments. Some titles we’ve done in recent years:</p><ul><li>ComShow Valorant, with Grab and Legion by Lenovo</li><li>ComShow CS:GO, with VP Game</li><li>ComShow Pokemon VGC, with Razer and Mogul</li></ul><p><br></p><p><strong>“Nouns ComShow: Marvel Snap”</strong></p><p>We would love to bring Nouns Esports to it’s first touch in APAC/SEA through our dedicated ComShow series for Marvel Snap—with Nouns Esports to be called: <strong>Nouns ComShow: Marvel Snap</strong>.</p><ul><li>10-12 Campaign</li><li>8 Weekly Tournaments</li><li>64 Participants</li><li>$225 Prizepool each week</li><li>$125 from Nouns Esports to takeover Lead Sponsor and main brand integration</li><li>Remaining $100 provided from existing grant from Community Gaming</li></ul><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmSzvCtbT1ong2RvzqHmPoLMgpwnPFWowaG2YkAkQfocom"></p><p><br></p><p><br></p><h1><strong>TARGET AUDIENCE</strong></h1><p><br></p><p>By utilizing a web2 title, Metasports aims to reach web2-leaning casual players looking to test their mettle against other enthusiasts. Key metrics from our last ComShow featuring Marvel Snap:</p><ul><li>We had initially planned room for 64 players per tournament, but had to adjust as we received well over 64 entries for all three tournaments, resulting in 376 total players joining.</li><li>186 total matches were played with $800 total being disbursed to the top players of each tournament.</li></ul><p><br></p><p>As a tournament will be ran every week for eight weeks, we’re aiming to fill all 64 slots for each Swiss-style tournament, amounting to 512 total players but definitely expecting a little over that number to register based on previous experience. Registration will be open to casual and competitive players alike, and each player will also be asked for a wallet address in order to register for the tournaments. This will be how we distribute the POAP SBTs through Nouns allowing you to have a record of our participants as well as allowing them to be soft-onboarded to Nouns.</p><p><br></p><h1><strong>BRAND INTEGRATION</strong></h1><p><br></p><p>We would honored to have Nouns Esports come on as a Title Sponsor for this ComShow run, to be titled “Nouns ComShow: Marvel Snap”</p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmf1fUjjfnxpDL4EPfpK6AyhMxHHxc1utTgCNZuT8zevAM"></p><p><br></p><h1><strong>MARKETING AND PROMOTION</strong></h1><p><br></p><p><strong>World Class Asset Production</strong></p><p>Our creative engine, <a href="https://overdrive.gg/" rel="noopener noreferrer" target="_blank"><strong>Overdrive Studios</strong></a>, has created stunning key visuals and broadcast assets for tournaments all across the globe, and will be ready to facilitate the creation of the aforementioned for our Nouns ComShow. Overdrive is an award winning Esports design studio in Southeast Asia with clients globally:</p><p>Overdrive Website: <a href="https://overdrive.gg/" rel="noopener noreferrer" target="_blank">https://overdrive.gg/</a></p><p><br></p><p><strong>The Right Distribution Channel</strong></p><p><strong>Facebook Page.</strong> Nouns ComShow will be pushed through the SEAesport facebook page, a long-standing media and community IP in Southeast Asian esports—having been official media for events like The International in Singapore and ESL Genting.</p><p>SEAesport Facebook Page: <a href="https://www.facebook.com/SEAesport" rel="noopener noreferrer" target="_blank">https://www.facebook.com/SEAesport</a></p><p>Facebook is strong for streaming and content in SEA, the Philippines particularly, you’ll find the the SEAesport page stats below:</p><ul><li>51k followers</li><li>380k+ engagements per month</li><li>26.8k average peak impressions per month</li></ul><p>Our main CALL-TO-ACTION across content will be:</p><ul><li>Join the official Nouns Esports Discord; and,</li><li>“Learn more about Nouns and Nouns Esports at _____”, provided links or the podcast proposed in this document</li></ul><p><br></p><p><strong>Press Release.</strong> We’ll be creating a press release for distribution to media contacts we have in the region to bring light to Nouns Esports first foray into Southeast Asia. Some contacts we’ll distribute to:</p><ul><li>Yahoo Esports</li><li>Inquirer Esports</li><li>BitPinas</li><li>The MegaMaxi</li><li>WhatToPlay/TingBits</li></ul><p><br></p><p><strong>[Optional] Podcast on Nouns with PPD + Sasquatch.</strong> Produced in our studio, we can produce (hosting PPD and/or Sasquatch removtely) a video podcast for release in SEAesport Youtube and pushed on social media for evergreen content on what Nouns Esports is</p><p><br></p><p><strong>Regarding Broadcast.</strong> During ComShow, we usually do live giveaways to entice viewership, however while we are excited to broadcast live gameplay of Marvel Snap, there is no official spectator or observer mode available yet, and as such we are looking to grow the grassroots Marvel Snap scene in anticipation of this feature being released. We offer the podcast as high-value evergreen content as a great substitute.</p><p><br></p><p><strong>POAPS SBTs and Community Gaming.</strong> In order to bridge attendees with web3, we will be providing POAP SBTs to all participants (competitors and viewers[opt-in] alike) in an effort to bring a mainly web2-facing player base and audience on-chain. Exposure to play through Community Gaming also allows some native discovery to wallets and crypto distribution</p><p><br></p><h1><strong>OUR EXPERIENCE</strong></h1><p><br></p><p>As a media house with deep roots in esports and early natives to web3, Metasports’s expertise lies in holistic 360° Tournament Operations: total tournament production. From rulebooks and tournament formats to broadcast overlays and stage design, Metasports has been organizing events from top to bottom to deliver experiences gamers love.</p><p>The <strong>Lunacian Sports League</strong> (LSL) is one of our biggest IPs: as the first and longest-running professionally-organized esports league for one of the leading Web3 game titles: Axie Infinity. A Metasports production, LSL has been organizing with the support of Sky Mavis since early 2021.</p><p><br></p><p>During our fourth season in 2022, we saw 2,050 participants fight to lay claim to their share of a $50,000 USDC prize pool in over 2900+ games played across 8 qualifiers and playoffs. With over 109.8k live views on FB and Twitch and 1.3M+ social reach across the LSL Facebook and Twitter, a captive audience watched eagerly as players all across the globe competed for top spots in our tournament. You can learn more about the Lunacian Sports League and our ongoing fifth season <a href="https://docs.google.com/presentation/d/1WxhwSpbv0cMXDVf8YFkMfyT-yu0D2jpu-rXB3KskBXQ/edit?usp=sharing" rel="noopener noreferrer" target="_blank">here</a>, as well as on our <a href="https://twitter.com/LSL_GG" rel="noopener noreferrer" target="_blank">official socials</a>.</p><p><br></p><p>Website: <a href="https://www.lsl.gg/lsl-season-3" rel="noopener noreferrer" target="_blank">https://www.lsl.gg/lsl-season-3</a></p><p>In 2020, we held the first local <strong>VALORANT tournament in the Philippines co-presented by GrabFood</strong> using the ComShow IP to support the worldwide launch of Valorant. We teamed up with GrabFood, Legion by Lenovo, Mogul, and XSplit to bring a premiere grassroots tournament for the Philippines with endorsement from Riot Games.</p><p><br></p><p>The members of the tournament’s winning team later got scouted to compete for one of the PH’s leading Valorant pro teams. With over $2,000 USD in prize pool and another $2,000 in vouchers and giveaways, this 6-week campaign saw over 500 registered players compete in 350 qualifying matches with over 330,000+ minutes viewed and a staggering 620,000+ in social reach through our official channels.</p><p><br></p><h1><strong>BUDGET AND ROI</strong></h1><p><br></p><p>Budget ask: $1,000+ USDC, all going to prize pool, distributed evenly across 8 tournaments happening weekly.</p><p>We take no profit or operations costs from the grant for this event.</p><p><br></p><p>Metasports will handle the 360 Tournament Ops for the Nouns ComShow tournament production. Nouns Esports will also receive  to our SEAesport official Facebook page followers by coming on as a Title Sponsor of ComShow, and can expect 40+ social media posts with Nouns-powered branding for the duration of this campaign, as well as two (2) Facebook boosted awareness posts (1 per month of the campaign).</p><p>Some stats about our SEAesport Facebook page:</p><ul><li><strong>51k followers</strong></li><li><strong>380k+ engagements per month</strong></li><li><strong>26.8k average peak impressions per month</strong></li></ul><p><br></p><p>Metasports also has a pre-existing grant from <strong>Community Gaming</strong> that will be utilized alongside the requested budget. Winners will receive half their winnings in fiat courtesy of Community Gaming’s grant, while the other half will be from the requested prize pool budget to be disbursed on the chain, in a bid to soft-onboard winners on-chain.</p><p>To outline this better:</p><ul><li><strong>Of the budget, $125 USDC will be awarded each week over the course of two (2) months, for a total of $1,000 awarded across 8 tournaments over 8 weeks.</strong></li><li><strong>Of the Community Gaming grant, $100 USD will be awarded in fiat each week over the course of two (2) months, for a total of $800 awarded across 8 tournaments over 8 weeks.</strong></li></ul><p><br></p><p>With 8 tournaments and 64 players each, this would mean 512 players <strong>minimum</strong> that will be engaged through this campaign to be soft-onboarded on-chain, though we are expecting greater than that in registrations from experience.<strong> </strong></p>';

const dom = new JSDOM(html);

// type LexicalNode = {
//   children: LexicalNode[];
// };

let lexicalState = {
  children: [] as any[],
  direction: "ltr",
  format: "",
  indent: 0,
  type: "root",
  version: 1,
};

function traverse(
  domNode: (typeof dom.window.document.body.childNodes)[number],
  lexicalNode: { children: any[] },
  listIndex: number | undefined = undefined
) {
  for (const child of domNode.childNodes) {
    // Text
    if (child.nodeName === "#text") {
      if (child.textContent === null) continue;

      lexicalNode.children.push(
        createText({
          text: child.textContent,
          bold: child.parentNode?.nodeName === "STRONG",
        })
      );
    }

    if (child.nodeName === "STRONG") {
      traverse(child, lexicalNode);
    }

    if (child.nodeName === "A") {
      const link = createLink({
        url:
          //@ts-ignore
          child.href,
      });
      lexicalNode.children.push(link);

      traverse(child, link);
    }

    if (child.nodeName === "IMG") {
      const img = createImage({
        src:
          // @ts-ignore
          child.src,
        alt:
          // @ts-ignore
          child.alt ?? "",
      });

      lexicalNode.children.push(img);

      traverse(child, img);
    }

    if (child.nodeName === "H1") {
      const heading = createHeading({ level: 1 });
      console.log(child.childNodes[0]?.nodeName);

      lexicalNode.children.push(heading);

      traverse(child, heading);
    }

    if (child.nodeName === "H2") {
      const heading = createHeading({ level: 2 });

      lexicalNode.children.push(heading);

      traverse(child, heading);
    }

    if (child.nodeName === "H3") {
      const heading = createHeading({ level: 3 });

      lexicalNode.children.push(heading);

      traverse(child, heading);
    }

    if (child.nodeName === "OL") {
      const ol = createOrderedList();

      lexicalNode.children.push(ol);

      child.childNodes.forEach((node, index) => traverse(node, ul, index + 1));
    }

    if (child.nodeName === "UL") {
      const ul = createUnorderedList();

      lexicalNode.children.push(ul);

      child.childNodes.forEach((node, index) => traverse(node, ul, index + 1));
    }

    if (child.nodeName === "LI" && listIndex !== undefined) {
      const listItem = createListItem({ value: listIndex });

      lexicalNode.children.push(listItem);

      traverse(child, listItem);
    }

    if (child.nodeName === "P" && child.childNodes[0]?.nodeName !== "BR") {
      const paragraph = createParagraph();

      lexicalNode.children.push(paragraph);

      traverse(child, paragraph);
    }
  }
}

traverse(dom.window.document.body, lexicalState);

// console.log(lexicalState);
fs.writeFileSync("output.json", JSON.stringify({ root: lexicalState }));
