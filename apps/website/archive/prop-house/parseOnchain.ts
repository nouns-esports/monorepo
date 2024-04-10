import { Proposal, Vote } from "@/server/db/schema";
import fs from "fs";

const data = [
  {
    title: "Get VOx to BoBC!!",
    tldr: "Do you like puff? probably not. you should vote for me anyway though.",
    body: "<p>Im VOx, a puff player from upstate new york. Ive never ben to a major, and its a goal of mine for a while. if you want to see this mediocre puff at bobc you should vote for me </p>",
    receivedAt: 1710011795,
    proposer: {
      id: "0xF3F4ddE743D7c87b1019A6C793977205d58602E6",
    },
    votes: [],
  },
  {
    title: "Slippi Part Timer Hits the Main Stage",
    tldr: "A life long dedication creates a formidable smasher.",
    body: "<p>upon stumbling back into Smash Bros Melee back in 2014, the game has been a constant in my life. In 2020, there was the release of the rollback net code client, Slippi, which as allowed me to hone my skillset to a formidable level. Having logged in over 30,000 matches over 3 years, I’ve had the wonderful experience of making many friends and testing my skill against high level competition</p>",
    receivedAt: 1710504472,
    proposer: {
      id: "0xF5d3400a6383F06e2b4993837ce73b50fe5bA920",
    },
    votes: [
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1710658679,
        votingPower: "1",
      },
    ],
  },
  {
    title: "(Paladin) I want to see if my practice is paying off!",
    tldr: "I am a fox player from TN, ranked #2 next to Grab, I would love the chance to compete at BoBC and rep Nouns!",
    body: '<p>Hey, I\'m Hrant "Paladin" Hanissian, a fox player from TN, I am actively ranked #2 in the state under Grab who is currently ranked 64th in the world. I started playing melee when I was 12 after watching Mango play Armada at MLG 2014 and have been hooked ever since. The majority of my gaming has taken place online through tools like smashladder so in person events are still pretty new to me despite how long I\'ve been in the scene so this opportunity would mean a lot.</p><p><br></p><p>The majority of my impact on the scene has been online as well, I\'m currently a moderator of the central Melee Online discord, I try and help make the scene a better place just trying to eliminate instances of toxicity that take place! Through this opportunity I\'ve also met a lot of inspiring people that also volunteer their time to aid the scene and foster a better community and a positive place to find games.</p><p><br></p><p> I\'ve been reassessing my approach to competing and changing my methods of conscious practice. I would love the opportunity to apply my practice at a major! Last year I placed around 33rd-49th at the majors I was able to attend and think I have what it takes to push past that given more opportunities. I am not able to travel as often as I would like, as a current full time student, and would love to see what I am capable of given more opportunities to compete. </p><p><br></p><p>I also have a cat named Rufus that I adore.</p><p><br></p><p>Thank you,</p><p>Hrant</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmRaJSQ8eabWDZFnFQ4zw6jLdCgDpvQJq3n44w261oxbae"><img src="https://ipfs.backend.prop.house/ipfs/QmXVQS1YP9v7pV9H5F2LBqANQQMj8a31eaBxSogAXnD8Tj" style="" width="465" height="381.6623376623377"><img src="https://ipfs.backend.prop.house/ipfs/QmWHTRPwZjYeHCbYAc3WgAtSefXyzR2MuERDasop5rhkoW" style="" width="286" height="381.3268286026201"></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZGGgSPDV1ghL9b9wEHJSzHXxhgeski4kxnFBLGj26xGQ" style="" width="292" height="355.6247362869198"><img src="https://ipfs.backend.prop.house/ipfs/QmVmiGYehVuTy5awu6wJVjWicn8bGQUsWJ1oNSP3yoTmED" style="" width="613" height="348.42840289429535"></p><p><br></p><p><br></p><p><br></p><p><br></p>',
    receivedAt: 1710016283,
    proposer: {
      id: "0xe6498AA51662Ba1396B8bd12C81FAA618c60Bf61",
    },
    votes: [
      {
        voter: {
          id: "0x51C6b737C1ef6d06733A1F48924fDe1BE57337F1",
        },
        receivedAt: 1710717703,
        votingPower: "4",
      },
      {
        voter: {
          id: "0x2bEa6FB8d74B8bA8A79ee8339FBEd293dB9C4277",
        },
        receivedAt: 1710801705,
        votingPower: "8",
      },
      {
        voter: {
          id: "0xE3f27DEFf96fe178e87559F36Cbf868B9E75967D",
        },
        receivedAt: 1710802218,
        votingPower: "5",
      },
      {
        voter: {
          id: "0x91dCCAA260CC4616E1a6e6b693DB7207C5E42937",
        },
        receivedAt: 1710801536,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xa87Daa2Bc3bd0eCca4C9111776BAB2c9d44D6c6B",
        },
        receivedAt: 1710801894,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1710632501,
        votingPower: "2",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1710780406,
        votingPower: "10",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1710658679,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1710780950,
        votingPower: "5",
      },
      {
        voter: {
          id: "0x75640B1eB20E9473AD40Fcb600B016eefcAE2A7F",
        },
        receivedAt: 1710701494,
        votingPower: "5",
      },
      {
        voter: {
          id: "0x2666f0C8FB58d182f2Dd79475DCA4A07B3724607",
        },
        receivedAt: 1710801520,
        votingPower: "10",
      },
    ],
  },
  {
    title: "meleesadposts",
    tldr: "i will buy a camera and rip off slime on the scene bar for bar",
    body: "<p>donkey kong wants to go to canada. if you vote for me and i get in, ill make a couple great youtube vids out of the experience!</p><p><br></p><p>One video aims to be a spiritual successor to the \"Slime on the Scene\" series. I have had this drafted up for a while and have a couple bits planned for players that are all confirmed to be at BoBC! </p><p><br></p><p>Another will be a general vlog of my time at the major as well. I thought it would be really exciting to try to catch every close off stream set and document the ground floor of melee tournaments (for example: Jackzilla Big House/Genesis stream) which isn't shown a lot.</p><p><br></p><p>I also really want make a video interviewing some 0-2ers as well LOL</p><p><br></p><p>I also really value the time i get at majors, and the practice I get there is infinitely valuable to me. I get like 4 hours of sleep at majors because the practice I get there is just unrivaled.  Your support would be appreciated. My recent slew of Melee performances have demonstrated a lot improvement, and I wan't to continue it here and hopefully return the favor by bringing you laughs.</p>",
    receivedAt: 1710020971,
    proposer: {
      id: "0xcEb0b073a97CD5bB48E876ef415Dfe8f4DC03cb0",
    },
    votes: [],
  },
  {
    title: "jaye 4 bobc",
    tldr: "i am like if borp and drephen stacked paper and was a girlthing",
    body: "<p>i go 0-2 at my dallas local because i dont l-cancel but u never know i could make a run………..</p><p><br></p><p>i studied swagonomics at the school of hard knox and graduated magna cum laude so nouns hit my line..</p>",
    receivedAt: 1710022979,
    proposer: {
      id: "0x995A51c0965d9Ea85b80cb363e1335c6EFa576f8",
    },
    votes: [],
  },
  {
    title: "Vote for CJ",
    tldr: "I already have a passport and my parent’s generation ruined the economy",
    body: "<p>Been playing melee for 20 years and I’m seasoned…but I almost exclusively play for the clips. Trying to go to BOBC5 without tapping in to my 401k. You probably won’t vote in the actual election, but I hope you still vote for me here. Love you all. </p>",
    receivedAt: 1710026454,
    proposer: {
      id: "0x937E691D54c6cBbF68C00004a625F510069aB8C2",
    },
    votes: [],
  },
  {
    title: "hello i am spark.",
    tldr: "hello i am spark. i am now an unsponsored gamer which means the vibes are off. send help.",
    body: "<p>hello i am spark. i am now an unsponsored gamer which means the vibes are off. send help. begging u lowkey. i understand that i have had many opportunities in my day and that there are many other wonderful gamers who are likely more deserving of this opportunity, but i would still like to throw my hat in the ring. please forgive my gluttony in this regard. thank u.</p>",
    receivedAt: 1710073778,
    proposer: {
      id: "0x12402eaCBf96784d273d006775b0498f0E11A872",
    },
    votes: [
      {
        voter: {
          id: "0xE3f27DEFf96fe178e87559F36Cbf868B9E75967D",
        },
        receivedAt: 1710802218,
        votingPower: "5",
      },
      {
        voter: {
          id: "0x75640B1eB20E9473AD40Fcb600B016eefcAE2A7F",
        },
        receivedAt: 1710784882,
        votingPower: "5",
      },
      {
        voter: {
          id: "0x3f9413E785020f3B37A838A1E5a72Ba81CA7F514",
        },
        receivedAt: 1710801520,
        votingPower: "10",
      },
    ],
  },
  {
    title: "give salami money",
    tldr: "if you don’t vote for me or paladin i will falco side b off a cliff",
    body: '<p><img src="https://ipfs.backend.prop.house/ipfs/QmXfZgcq6D7KGu1MYypD27yQBKzbEYgqZfXTQaNzhimbgZ"></p><p><br></p><p><br></p>',
    receivedAt: 1710097670,
    proposer: {
      id: "0x45E7b80e9790C5c5dF0B5D8Ff1efF7e773ED938D",
    },
    votes: [],
  },
  {
    title:
      "Wintersalamander for BoBc cuz I want to experience my first major while explorin",
    tldr: "I have watched competitive melee for awhile kicked out house and am currently exploring the world. Experience new things",
    body: "<p>I got kicked out of my house, so I am currently backpacking through America, but getting to see Canada would be really cool too. I have lost track of how long I've been watching pro melee but at least by 2016 I was. I have played at regionals in the past, but I've gotten a lot better at melee since I last competed. It would be cool to see how I fare at a major, and getting to watch top level sets in person would be crazy. I mainly play fox but have a secondary marth as well.</p>",
    receivedAt: 1710163846,
    proposer: {
      id: "0x808388c6461Fa51D2a0F6a26c0AF118D5412C2B6",
    },
    votes: [
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1710658679,
        votingPower: "1",
      },
    ],
  },
  {
    title: "Get Wizzy to BOBC",
    tldr: "Get Wizzy to BOBC",
    body: '<p>Vote for me if you want to see the most insane sickest coolest super great super duper amazing insane level Falcon gameplay!!!!<img src="https://ipfs.backend.prop.house/ipfs/QmdfzCo22bvbZTTGw1ZEYNVeMuvicswNyjePpM76xW8GTJ"></p><p><br></p><p><br></p>',
    receivedAt: 1710381963,
    proposer: {
      id: "0x21185e92559737c5fc7BdF8b4b930714f92735FF",
    },
    votes: [
      {
        voter: {
          id: "0x51C6b737C1ef6d06733A1F48924fDe1BE57337F1",
        },
        receivedAt: 1710717703,
        votingPower: "6",
      },
      {
        voter: {
          id: "0x2bEa6FB8d74B8bA8A79ee8339FBEd293dB9C4277",
        },
        receivedAt: 1710801705,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1710632501,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1710658679,
        votingPower: "6",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1710780950,
        votingPower: "2",
      },
    ],
  },
] as const;

const proposals: Omit<Proposal, "id">[] = [];
const votes: Omit<Vote, "id" | "proposal">[] = [];

data.forEach((p) => {
  proposals.push({
    title: p.title,
    user: p.proposer.id,
    round: "battle-of-bc-2024",
    description: p.body,
    value: `0`,
    createdAt: new Date(p.receivedAt * 1000),
  });

  p.votes.forEach((v) => {
    votes.push({
      user: v.voter.id,
      round: "battle-of-bc-2024",
      count: parseInt(v.votingPower),
      timestamp: new Date(v.receivedAt * 1000),
    });
  });
});

fs.writeFile(
  "./apps/website/archive/prop-house/proposal-output.json",
  JSON.stringify(proposals),
  (err) => {
    if (err) {
      console.error("An error occurred:", err);
      return;
    }
    console.log("Data successfully written to output.json");
  }
);

fs.writeFile(
  "./apps/website/archive/prop-house/vote-output.json",
  JSON.stringify(votes),
  (err) => {
    if (err) {
      console.error("An error occurred:", err);
      return;
    }
    console.log("Data successfully written to output.json");
  }
);
