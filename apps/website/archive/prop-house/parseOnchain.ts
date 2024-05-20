import { Proposal, Vote, db, proposals as proposalsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import fs from "fs";

const data = [
  {
    title: "Help Europe's Melee Documentary Content Creator Get To Tipped Off ",
    tldr: "Help Island Isolated Brit Get Out And Make Content In The Field",
    body: '<h1>Why You Should Vote For Chaler</h1><p>I have been part of the melee scene for 8 years as a player and TO but I have always been enamoured with the story\'s of the best players in our game and in recent times I have started making documentaries about the all the different kinds of stories in our beautiful game. However there is only so much I can do from my little island nation. The opportunity to get to talk to these players I admire so much in person is not something that I get very often as well as the chance to record in person footage and interviews that come across way better in a documentary than those taken on discord. I firmly believe that getting the chance to go out there and see these events in person will only make the videos I produce better but unfortunately the funds from my still young channel aren\'t exactly enough to get me out there on my own, if I were to win it would be my first ever time visiting the states.</p><h1><br></h1><h1><img src="https://ipfs.backend.prop.house/ipfs/QmRqcQ7EpSn2QvUFzaUcmXq46RU5eS99DUpPMo3JefPGG9" width="166" height="239.35684647302904" style="font-size: 16px; font-weight: 400; letter-spacing: 0.02em; color: var(--brand-black);"></h1><p>Distracted from my tournament set by the camera </p><p><br></p><p><br></p><h1>Why A Content Creator??</h1><p>You may be thinking why get this guy to a tournament not your exciting top player. That\'s a great question! I fully believe that content is such an important part of our ecosystem for the game in its current state. It helps build storylines and helps you build a greater understanding of the onslaught of new top players showing their face in the scene. As well as introduce more people into the game, I have been told personally by people I helped them discover the game and that\'s just so cool as well as all of the other creators making stuff that shows this great game to people is more important now than ever. </p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmQXaEozmky6ckDXWwJCAw1Ztu2eB5hra4JkpeMDSbCjw7" style="" width="163" height="289.64460784313724"></p><p>Picture me trying to green screen myself to this tournament</p><p><br></p><h1>What I Can Do Exactly </h1><p>This tournament has a rare appearance from the one of the greatest of all time in Armada. I have actually already agreed with armada to get an interview with him for a dedicated video on the legend himself. However I would much prefer to be able to interview the man in person to create an all round better video without having to use discord footage allowing the documentary to be more professional. </p><p>I would also make a variety of more personal stuff while there to be able to bring more light to the tournament experience which I think is very lacking in the current content scene through the creation of vlogs and shorts to hopefully bring more Finally I really just want to meet people who do the same thing I do. In all honestly its a little lonely in the smash content game out in Europe so meeting people who do similar things is something that I would greatly treasure on a personal level</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmWtAoQctE9x1YvuwFQiq8Y1C59RHKgG77skii6hy2vLAs" style="" width="320" height="260.55727554179566"></p><p>I made this wow this took a lot of work</p><p><br></p><h1>Why Nouns</h1><p>Nouns have helped many of my fellow Europeans get out to America from Happymealz to max what nouns is doing to help these players who cant easily get out to these events is just amazing and I am hoping I can be the next one to go out there and experience what its like to go to an American tournament that I have seen on the screen so many times.</p><p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmWZ9fYW7fwKzSxfiiVKgFdtvJVViU9As539Ydbq7xqPHT" style="" width="724" height="321.2797934322034"></p><p>Stuff I have made </p><p><br></p><p><br></p>',
    receivedAt: 1715197919,
    proposer: {
      id: "0xE9b362c5497Ea845a12e0dE59E062B7523106ADb",
    },
    votes: [
      {
        voter: {
          id: "0x651e2daCBF1FF16aC4FaDD67Aa23a2E1612924a1",
        },
        receivedAt: 1715810592,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xa87Daa2Bc3bd0eCca4C9111776BAB2c9d44D6c6B",
        },
        receivedAt: 1715893891,
        votingPower: "6",
      },
      {
        voter: {
          id: "0x2f16B37C4b2F9A4637550A24CFd8225D7a0Aefce",
        },
        receivedAt: 1715817227,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xC705519E6Ae96264693844f5B3E58bAbB3E8D9c5",
        },
        receivedAt: 1715979279,
        votingPower: "10",
      },
      {
        voter: {
          id: "0x4B16a1D917EB241471Dcb1c18f943811A53F714d",
        },
        receivedAt: 1715969896,
        votingPower: "10",
      },
      {
        voter: {
          id: "0x111c80d3747Ba73B21757a0465a4826685Ba8D38",
        },
        receivedAt: 1715969297,
        votingPower: "10",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1715832325,
        votingPower: "4",
      },
      {
        voter: {
          id: "0xE9b362c5497Ea845a12e0dE59E062B7523106ADb",
        },
        receivedAt: 1715805070,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xC5E2D7ce7Db890DB4DC8fB9F797A4F9262BaB76e",
        },
        receivedAt: 1715818411,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x922d1fCBc42BA761685871726dcf68dBeeDF2267",
        },
        receivedAt: 1715805070,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xE3f27DEFf96fe178e87559F36Cbf868B9E75967D",
        },
        receivedAt: 1716006374,
        votingPower: "3",
      },
      {
        voter: {
          id: "0x15A37c86c1104fE1f1C9a49B6a2c519d12320bcb",
        },
        receivedAt: 1715826206,
        votingPower: "10",
      },
    ],
  },
  {
    title: "Get chaka to Tipped Off!!!",
    tldr: "iam a sicknasty gam3r and i wanna show me stuff B)",
    body: '<p><img src="https://ipfs.backend.prop.house/ipfs/QmY9FL9zQzuv3ptbF4PeYzjrkPc3fNZ55rbqWxriZNudpD" style="cursor: nwse-resize;" width="199" height="194.3359375"></p><p><br></p><p><br></p><p><br></p><p>Alberta TO, AB &amp; Gaylee PR, Waddling Enthusiast. Creator of multiple Homer Simpson Melee character images. (I will draw a Homer wherever you desire if you vote for me!)</p><p><br></p><p><a href="twitter.com/chaka_slaka" rel="noopener noreferrer" target="_blank">twitter.com/chaka_slaka</a></p><p><br></p><p>I been makin beeeeg bounds wit me mentality and I\'d love to show what I\'ve been working on. I love Melee and I can do some funny little voices..</p><p><br></p><p>I am from the middle of nowhere northern Alberta!!!!!!!!!!!!!!!!!!!!!! I never been that far south before !!!!!!!!!!!!</p><p><br></p><p>i will do some goofy stuff for ya if u vote 4 me :)</p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVaXNeAi7tTczWJtBtgZnfcPJ5CMtKpiYnDrMur5pHKag" style="" width="378" height="250.83225208526412"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbhMt8hGWcQayC7gTmMQmjvza9PsiNHfPLKpVQHgU5aJ4" style="" width="293" height="390.65985398065476"></p><p><br></p><p><br></p>',
    receivedAt: 1715218138,
    proposer: {
      id: "0x60b249ADc877C3A8992EF879dBb65B788F32BA9a",
    },
    votes: [],
  },
  {
    title: "Help get the 2nd-best solo-Sheik main in the world to Tipped Off!",
    tldr: "Nouns | Spark has a nice ring to it!",
    body: "<p>Hey how's it going, I'm Spark! I'm the 2nd-best solo-Sheik main in the world, ranked #24 worldwide, and ranked #1 in Arizona.</p><p>I've been playing Melee competitively since 2014, with big dreams to become the best. 10 years later, I'm not exactly the best, but #24 isn't half-bad!</p><p><br></p><p>I started my journey in Tracy, California (CenCal/NorCal), at age 16. With my playstyle centered around quick movement, fast execution, and obsessive-perfectionist punish game with Sheik's deadly reaction techchase, I climbed the ranks relatively quickly! It was only later on that I was forced to realize that unbending perfectionism has its drawbacks... Needless to say, it's been a fun adventure of thrilling competition and introspection.</p><p><br></p><p>During the holidays, I usually spend about 2 months visiting my family in Pakistan. With Melee practice being so limited over there, it's hard to maintain motivation to keep chasing that coveted #1 spot. Despite being unable to really play against any human beings while over there, I am able to maintain practice by analyzing match videos, \"labbing\" hypothetical solutions to situations, and practicing my execution/punish game. Despite this break, I've had some pretty great performances! Most notably, I placed 4th at Pat's House 4, a major tournament --  beating KoDoRiN (#11 worldwide), moky (#4 worldwide), and Jmook (#3 worldwide), the best Sheik player in the world.</p><p><br></p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmUo5yH2StG5gqBpoaQnBxSTYxphPKCvwRskThW8YTLcoK\" style=\"\" width=\"524\" height=\"417.2865168539326\"></p><p><br></p><p>I'm a player notorious for traveling to everything I possibly can, under terrible circumstances. I'll fly the most budget airline with the most absurd layovers, I'll sleep on the floor of a generous friend's hotel, I'll do whatever it takes -- all for the sake of attempting to place in the money at an out-of-state tournament in order to break even on the trip itself. Anything for my favorite game, and anything for my dream.</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmRyMWtJc178PnsNUwcHRcsmCNDS9Vq9gvaWUApVSbpYDp\" style=\"\" width=\"494\" height=\"572.7444831000435\"></p><p><br></p><p>Although... I'd very much like for that not to be the case! With the funding for Tipped Off combined with my frugal techniques, I should be able to spread it out to pay for GOML, Smash Camp and Ghost Town, three tournaments close to that weekend which I also plan on attending.</p><p><br></p><p>As an unsponsored player, it's not easy for me to attend tournaments. I pursue Melee full-time, I don't have any sources of income that aren't Melee-related. Recently, as a result of Metafy's new changes, I've lost an important income stream -- the Sheik course I created with them, \"Sheik Deconstructed.\"</p><p><br></p><p>Despite my performances, due to the state of the scene itself, there isn't really much of a financial incentive -- it's all about the love of the game. I've been chasing this dream for 10 years with no regrets. It's only thanks to a select few organizations that dare to give Melee a chance that a lot of our players can even continue to play, which is why I have so much love and respect for Nouns and what they stand for. Full-time sponsoring players like Cody and Aklo as well as giving other players a chance with the Prop House incentive -- I can't thank you enough for what you're doing for my favorite game. I can only hope to be a part of it as well.</p><p><br></p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmNZpomsX2K5d4TPuwEGEtY5Dn1THaymryb5eCXjc5QGfM\" style=\"\" width=\"308\" height=\"461.7613410229953\"></p><p><br></p><p><br></p>",
    receivedAt: 1715247390,
    proposer: {
      id: "0x12402eaCBf96784d273d006775b0498f0E11A872",
    },
    votes: [],
  },
  {
    title: "Help get the 2nd-best solo-Sheik main in the world to Tipped Off!",
    tldr: "Nouns | Spark has a nice ring to it!",
    body: "<p>Hey how's it going, I'm Spark! I'm the 2nd-best solo-Sheik main in the world, ranked #24 worldwide, and ranked #1 in Arizona.</p><p>I've been playing Melee competitively since 2014, with big dreams to become the best. 10 years later, I'm not exactly the best, but #24 isn't half-bad!</p><p><br></p><p>I started my journey in Tracy, California (CenCal/NorCal), at age 16. With my playstyle centered around quick movement, fast execution, and obsessive-perfectionist punish game with Sheik's deadly reaction techchase, I climbed the ranks relatively quickly! It was only later on that I was forced to realize that unbending perfectionism has its drawbacks... Needless to say, it's been a fun adventure of thrilling competition and introspection.</p><p><br></p><p>During the holidays, I usually spend about 2 months visiting my family in Pakistan. With Melee practice being so limited over there, it's hard to maintain motivation to keep chasing that coveted #1 spot. Despite being unable to really play against any human beings while over there, I am able to maintain practice by analyzing match videos, \"labbing\" hypothetical solutions to situations, and practicing my execution/punish game. Despite this break, I've had some pretty great performances! Most notably, I placed 4th at Pat's House 4, a major tournament -- beating KoDoRiN (#11 worldwide), moky (#4 worldwide), and Jmook (#3 worldwide), the best Sheik player in the world.</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmUo5yH2StG5gqBpoaQnBxSTYxphPKCvwRskThW8YTLcoK\" style=\"\" width=\"537\" height=\"427.624335106383\"></p><p><br></p><p>I'm a player notorious for traveling to everything I possibly can, under terrible circumstances. I'll fly the most budget airline with the most absurd layovers, I'll sleep on the floor of a generous friend's hotel, I'll do whatever it takes -- all for the sake of attempting to place in the money at an out-of-state tournament in order to break even on the trip itself. Anything for my favorite game, and anything for my dream.</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmRyMWtJc178PnsNUwcHRcsmCNDS9Vq9gvaWUApVSbpYDp\" style=\"\" width=\"578\" height=\"670.1850079744817\"></p><p><br></p><p>Although... I'd very much like for that not to be the case! With the funding for Tipped Off combined with my frugal techniques, I should be able to spread it out to pay for GOML, Smash Camp and Ghost Town, three tournaments close to that weekend which I also plan on attending.</p><p><br></p><p>As an unsponsored player, it's not easy for me to attend tournaments. I pursue Melee full-time, I don't have any sources of income that aren't Melee-related. Recently, as a result of Metafy's new changes, I've lost an important income stream -- the Sheik course I created with them, \"Sheik Deconstructed.\"</p><p><br></p><p>Despite my performances, due to the state of the scene itself, there isn't really much of a financial incentive -- it's all about the love of the game. I've been chasing this dream for 10 years with no regrets. It's only thanks to a select few organizations that dare to give Melee a chance that a lot of our players can even continue to play, which is why I have so much love and respect for Nouns and what they stand for. Full-time sponsoring players like Cody and Aklo as well as giving other players a chance with the Prop House incentive -- I can't thank you enough for what you're doing for my favorite game. I can only hope to be a part of it as well.</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmNZpomsX2K5d4TPuwEGEtY5Dn1THaymryb5eCXjc5QGfM\" style=\"\" width=\"314\" height=\"470.75\"></p><p><br></p><p><br></p>",
    receivedAt: 1715247793,
    proposer: {
      id: "0x12402eaCBf96784d273d006775b0498f0E11A872",
    },
    votes: [
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1715807632,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1715832325,
        votingPower: "1",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1715798876,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xC5E2D7ce7Db890DB4DC8fB9F797A4F9262BaB76e",
        },
        receivedAt: 1715818411,
        votingPower: "9",
      },
      {
        voter: {
          id: "0xE3f27DEFf96fe178e87559F36Cbf868B9E75967D",
        },
        receivedAt: 1716006374,
        votingPower: "3",
      },
      {
        voter: {
          id: "0x75640B1eB20E9473AD40Fcb600B016eefcAE2A7F",
        },
        receivedAt: 1715798154,
        votingPower: "10",
      },
    ],
  },
  {
    title: "Help Get Goodie To Tipped Off 15 !",
    tldr: "I’m Goodie, largely considered to be the best player in Australia, and I would love to be able to attend Tipped Off 15:)",
    body: '<p>As a Melee player from Australia, opportunities to travel to the states come few and far between. I eventually plan to move to America so traveling to events becomes easier but right now my only chance for getting to events is through sponsorships. Unfortunately in Australia it is basically impossible to find anyone who’s love and passion for the game matches mine. In my previous opportunities to travel to America I got to meet a myriad of different players who all had a love for the game and a drive that I had only ever seen in myself (and Joshman lol). Seeing these kinds of people only fueled my love and passion for melee even more and has made me so much more determined to be able to live in America so I can not only be among those people but surpass them as well. I would love for the chance to represent Nouns at Tipped Off, I have a drive that is unmatched and I am extremely determined to further prove to the world outside of Australia just how cracked I am B)<img src="https://ipfs.backend.prop.house/ipfs/Qmc5PsmTPd281MZrDKPPHfCBZk7wMoiwTL4c8yHEwKDYah"></p><p><br></p><p><br></p>',
    receivedAt: 1715304945,
    proposer: {
      id: "0x52Ffd21B0503F30E5DDEE8161c594D4cBcfAb974",
    },
    votes: [
      {
        voter: {
          id: "0xa87Daa2Bc3bd0eCca4C9111776BAB2c9d44D6c6B",
        },
        receivedAt: 1715893891,
        votingPower: "4",
      },
      {
        voter: {
          id: "0xC8072ee5521A382164Ff74857a32c3CACaE8F69a",
        },
        receivedAt: 1715802066,
        votingPower: "10",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1715807632,
        votingPower: "8",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1715832325,
        votingPower: "3",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1715798876,
        votingPower: "6",
      },
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1715798512,
        votingPower: "5",
      },
      {
        voter: {
          id: "0xE3f27DEFf96fe178e87559F36Cbf868B9E75967D",
        },
        receivedAt: 1716006374,
        votingPower: "4",
      },
      {
        voter: {
          id: "0xc7E49b53671A36323256380Ad4beD5FDc90842Fe",
        },
        receivedAt: 1715750411,
        votingPower: "10",
      },
    ],
  },
  {
    title: "MattDamon - Revival of Staten Island's Best ICies",
    tldr: "Lover of Nouns and Melee and will make SWEET content",
    body: '<p>9 years ago, MattTaylorLoL [then "MattDamon"] wave dashed backwards for the first time and won his first on-stage Bo3.</p><p>https://www.twitch.tv/videos/24144599</p><p><br></p><p>Professional Smash Player, ChillinDude thought the match was so pivotal for my career, he reviewed it here:</p><p>https://www.twitch.tv/videos/25062279?filter=all&amp;sort=time</p><p><br></p><p>I then went on to an incredible smash commentary career of about three months interviewing legends like Sweedish Delight:</p><p>https://www.twitch.tv/videos/11830869</p><p><br></p><p>10 Years Later, I took 1 stock off Aklo.</p><p><br></p><p>I love the Smash Community. </p><p>I was on the desk for the very last melee CoinBox.</p><p>Mang0 mis-read "MattDamien" as "MattDamon" and literally named me. </p><p>I\'ve seen the Smash Documentary atleast 10 times.</p><p><br></p><p>I have extra pairs of Noggles to hand out to people to make great content. </p><p><br></p><p>Vote MattTaylorLoL for TippedOff15</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZfXozZy58WF6mJj9G6LJNHfCmgPGrsN6GbU4HhmCXXyQ"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmTcNxbJMg6oS43TdTDdkcdTb9jHgM8ivnYP91uWHaMDBH"></p><p><br></p><p><br></p>',
    receivedAt: 1715727998,
    proposer: {
      id: "0x94f88B353674B2AcC82A2Fec99c00764aE631F00",
    },
    votes: [
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1715807632,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1715832325,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1715798876,
        votingPower: "2",
      },
      {
        voter: {
          id: "0x94f88B353674B2AcC82A2Fec99c00764aE631F00",
        },
        receivedAt: 1715797114,
        votingPower: "10",
      },
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1715798512,
        votingPower: "5",
      },
    ],
  },
] as const;

const proposals: Omit<Proposal, "id">[] = [];
const votes: Omit<Vote, "id">[] = [];

const round = "tipped-off-15";

async function getStuff() {
  for (const p of data) {
    proposals.push({
      title: p.title,
      user: p.proposer.id,
      round,
      description: p.body,
      value: `0`,
      createdAt: new Date(p.receivedAt * 1000),
      hidden: false,
      published: true,
    });

    const proposalId = await db.query.proposals.findFirst({
      where: and(
        eq(proposalsTable.round, round),
        eq(proposalsTable.user, p.proposer.id)
      ),
    });

    if (!proposalId) {
      throw new Error(
        `No proposal id found for round ${round} and user ${p.proposer.id}`
      );
    }

    for (const v of p.votes) {
      votes.push({
        user: v.voter.id,
        round,
        count: parseInt(v.votingPower),
        timestamp: new Date(v.receivedAt * 1000),
        proposal: proposalId.id,
      });
    }
  }

  fs.writeFile(
    "./archive/prop-house/proposal-output.json",
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
    "./archive/prop-house/vote-output.json",
    JSON.stringify(votes),
    (err) => {
      if (err) {
        console.error("An error occurred:", err);
        return;
      }
      console.log("Data successfully written to output.json");
    }
  );
}

getStuff();
