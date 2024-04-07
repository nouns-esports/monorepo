import { Round } from "@/server/db/schema";

const rounds: Round[] = [
  // Offchain (Infinite)
  {
    id: "compete",
    name: "Compete",
    description:
      "**TLDR** <br/>Do you want to represent Nouns Esports at an upcoming esports event or league? Submit a proposal to help fund your participation in an upcoming tournament. <br/><br/>Questions? [Join our Discord.](https://discord.gg/nounsesports) <br/><br/>**Consider including the following details in your proposal:** <br/><br/>1. **Tournament information:** Provide details about the tournament, including the game title, the tournament format, the location, and the dates. Explain why this tournament is important to you and why you want to participate. <br/><br/>2. **Your credentials:** Highlight your credentials as an esports player or content creator. This can include your gaming experience, social media following, and any past successes in esports tournaments. <br/><br/>3. **Target audience:** Identify the target audience of the tournament and explain why this audience is relevant to Nouns. For example, if the tournament is focused on a particular game, explain why fans of that game would be interested in Nouns. <br/><br/>4. **Sponsorship benefits:** Outline the benefits of sponsoring your travel and accommodation for the tournament. This can include brand exposure, social media mentions, and other ways the brand can get involved. <br/><br/>5. **Budget:** Provide a detailed breakdown of the costs associated with attending the tournament, including airfare, hotel accommodations, food, and other expenses. Be sure to explain how the brand's sponsorship will cover these costs. <br/><br/>6. **ROI:** Explain the expected return on investment for the brand, including metrics such as reach, engagement, and conversions. Provide examples of other esports players or content creators who have successfully partnered with brands in the past. <br/><br/>7. **Partnership details:** Finally, outline the terms of the partnership, including the length of the partnership and the deliverables associated.",
    start: new Date(1682467200 * 1000),
    votingStart: new Date(1682467200 * 1000),
    end: null,
    tags: ["smash", "dota", "cs"],
    image: "/",
  },
  {
    id: "tournaments",
    name: "Tournaments",
    description:
      "**TLDR** <br/>Do you want Nouns Esports to support your upcoming esports event? Submit a proposal sharing your tournament concept. <br/><br/>Questions? [Join our Discord.](https://discord.gg/nounsesports) <br/><br/>**Consider including the following details in your proposal:** <br/><br/>1. **Overview of the tournament:** Start by giving a brief introduction about the tournament, including the game title, the tournament format, and the overall goal of the tournament. Make sure to highlight the key selling points of the tournament, such as the prize pool and the expected turnout. <br/><br/>2. **Target audience:** Identify the target audience of the tournament, including demographics and interests. Explain why Nouns should care about this audience and how the tournament can help reach this audience. <br/><br/>3. **Brand integration:** Explain how Nouns can be integrated into the tournament. This can include sponsorships, branded content, social media activations, and other ways the brand can get involved. <br/><br/>4. **Marketing and promotion:** Outline the marketing and promotional plan for the tournament. Social media campaigns, live coverage plans, and any other strategies to reach the target audience. <br/><br/>5. **Budget and ROI (Return on Investment):** Provide a detailed budget breakdown for the tournament and explain the expected return on investment for the brand. This can include metrics such as reach, engagement, and conversions. <br/><br/>6. **Experience:** Emphasize your experience in organizing esports tournaments and working with brands. Share any past success stories or case studies to demonstrate your track record.",
    start: new Date(1682467200 * 1000),
    votingStart: new Date(1682467200 * 1000),
    end: null,
    tags: ["events", "partnerships"],
    image: "/",
  },
  // Onchain
  {
    id: "builders-build",
    name: "Builders Build",
    description:
      "An open round where artists and builders are encouraged to propose any idea inspired by Nouns Esports. Everyone is welcome to propose. The proposals with the most votes will get awarded Nouns Esports Builders’ pfp. If you have any questions, please reach out to the community.",
    start: new Date(1701894000 * 1000),
    votingStart: new Date(1733948400 * 1000),
    end: new Date(1734121200 * 1000),
    tags: ["contributor", "art"],
    image: "/",
  },
  {
    id: "genesis-x",
    name: "Join our Smash roster for Genesis X",
    description:
      '<p>Nouns Esports invites you to join our Smash roster for Genesis X!</p><p><br></p><p>Check out the <a href="https://nouns.gg/aklo-video" rel="noopener noreferrer" target="_blank">video</a> for more insights.</p><p><br></p><p><strong>Offer Details:</strong></p><p>- Expenses Covered: Your travel, accommodation, and food expenses for attending Genesis will be fully taken care of. We\'re committed to supporting you at the same level as our other players.</p><p>- Merchandise: Gear up with jerseys, Noggles, and a care package of swag to represent Nouns at the event.</p><p>- Social Media Engagement: We expect active participation in sharing our key event posts. You\'ll also engage in creating content to enhance your brand, including collaborations with Aklo.</p><p><br></p><p><strong>To Compete:</strong> Submit a proposal explaining why you\'d be an excellent representative for Nouns at Genesis. Why should we choose you?</p><p><br></p><p><strong>To Vote:</strong> If you\'re a seasoned member of the Smash community, your insight is valuable to us. <a href="https://nouns.gg/signup" rel="noopener noreferrer" target="_blank">Signup here</a> to help choose our representative.</p><p><br></p><p>We look forward to seeing your submissions! GLHF ⌐◨-◨&nbsp;</p>',
    start: new Date(1705446527 * 1000),
    votingStart: new Date(1706310528 * 1000),
    end: new Date(1706742528 * 1000),
    tags: ["smash"],
    image: "/",
  },
  {
    id: "gaming-art-contest",
    name: "Gaming Art Contest",
    description:
      '<p><strong>Objective:</strong> Nouns Esports is on a quest to create a distinctive new brand and Intellectual Property (IP). </p><p><br></p><p><strong>Your Mission:</strong> Unleash your imagination and experiment with ideas that resonate with the heart of gaming and esports.  </p><p><br></p><p>We\'re looking for submissions that: </p><p>\t- Are deeply rooted in the gaming and esports universe featuring character based models. </p><p>\t- These characters should proudly sport \'Noggles\' ⌐◨-◨ – a signature accessory in our envisioned world.  </p><p>\t- Feel free to draw inspiration from popular games, incorporating unique features like specialized weapons, innovative clothing, etc. However, ensure originality to avoid any copyright infringements.</p><p><br></p><p>Here is some nounish <a href="https://nouns.gg/artwork-tweet" rel="noopener noreferrer" target="_blank">artwork</a> we have commissioned over the years that you can use to draw inspiration from.</p>',
    start: new Date(1707112800 * 1000),
    votingStart: new Date(1708322401 * 1000),
    end: new Date(1708927201 * 1000),
    tags: ["art"],
    image: "/",
  },
  {
    id: "collision-2024",
    name: "Join our Smash roster at Collision",
    description:
      '<p>Nouns Esports invites you to join our Smash roster at Collision 2024! </p><p><br></p><p><strong>The Opportunity: </strong></p><p><br></p><p>Your travel, accommodation, and food expenses for attending Collision will be fully taken care of by Nouns Esports. Nouns Esports will provide you with a jersey and a care package of swag to represent Nouns at the event. We expect active participation in sharing our key event posts before, during, and after the event. </p><p><br></p><p>In order to be eligible submit a proposal explaining why you\'d be an excellent representative for Nouns at Collision. Tell us about yourself, your previous results, and why our community should choose you. Check out the winner of the previous round, <a href="https://prop.house/0x23c3d161eae43e40ca67618ae6f7836ecc7cd481/9" rel="noopener noreferrer" target="_blank">Happymealz</a>, for inspiration. </p><p><br></p><p>If you\'re a seasoned member of the Smash community we’d love for you to join our community and help us choose a winner! Sign up to <a href="https://forms.nouns.gg/collision/" rel="noopener noreferrer" target="_blank">be a voter</a> on our website.</p>',
    start: new Date(1708391315 * 1000),
    votingStart: new Date(1709341716 * 1000),
    end: new Date(1709600916 * 1000),
    tags: ["smash"],
    image: "/",
  },
  {
    id: "battle-of-bc-2024",
    name: "Join our Smash roster at the Battle of BC",
    description:
      '<p>We\'re offering you $1,500 to join our Smash roster at the Battle of BC 2024! </p><p><br></p><p>Nouns Esports will provide you with a jersey and a care package of swag to represent Nouns at the event. We expect active participation in sharing our key event posts before, during, and after the event. </p><p><br></p><p>In order to be eligible submit a proposal explaining why you\'d be an excellent representative for Nouns at Battle of BC. Tell us about yourself, your previous results, and why our community should choose you. </p><p><br></p><p>If you\'re a seasoned member of the Smash community we’d love for you to join our community and help us choose a winner! Sign up to <a href="https://nouns.gg/signup" rel="noopener noreferrer" target="_blank">be a voter</a> on our website.</p>',
    start: new Date(1709074367 * 1000),
    votingStart: new Date(1710543168 * 1000),
    end: new Date(1710802368 * 1000),
    tags: ["smash"],
    image: "/",
  },
  {
    id: "goml-2024",
    name: "Join our Smash Roster at GOML!",
    description:
      '<p>Nouns Esports is offering 1 winner $1,500 to join our Smash roster at GOML!</p><p><br></p><p>Nouns Esports will provide you with a jersey and a care package of swag to represent Nouns at the event. We expect active participation in sharing our key event posts before, during, and after the event.</p><p><br></p><p>In order to be eligible submit a proposal explaining why you\'d be an excellent representative for Nouns at GOML. Tell us about yourself, your previous results, and why our community should choose you.</p><p><br></p><p>Please include a link to your preferred social media account so we know who you are!</p><p><br></p><p>If you\'re a seasoned member of the Smash community we’d love for you to join our community and help us choose a winner! Sign up to be a voter at <a href="https://forms.nouns.gg/signup/" rel="noopener noreferrer" target="_blank">https://forms.nouns.gg/signup/</a></p><p><br></p>',
    start: new Date(1711947600 * 1000),
    votingStart: new Date(1713502801 * 1000),
    end: new Date(1713762001 * 1000),
    tags: ["smash"],
    image: "/",
  },
  {
    id: "tipped-off-15",
    name: "Join our Smash Roster at Tipped Off 15!",
    description:
      '<p>Nouns Esports is offering 1 winner $1,500 to join our Smash roster at Tipped Off 15!</p><p><br></p><p>Nouns Esports will provide you with a jersey and a care package of swag to represent Nouns at the event. We expect active participation in sharing our key event posts before, during, and after the event.</p><p><br></p><p>In order to be eligible submit a proposal explaining why you\'d be an excellent representative for Nouns at Tipped Off 15. Tell us about yourself, your previous results, and why our community should choose you.</p><p><br></p><p>Please include a link to your preferred social media account so we know who you are!</p><p><br></p><p>If you\'re a seasoned member of the Smash community we’d love for you to join our community and help us choose a winner! Sign up to be a voter at <a href="https://forms.nouns.gg/signup/" rel="noopener noreferrer" target="_blank">https://forms.nouns.gg/signup/</a>&nbsp;</p>',
    start: new Date(1713934800 * 1000),
    votingStart: new Date(1715749201 * 1000),
    end: new Date(1716008401 * 1000),
    tags: ["smash"],
    image: "/",
  },
  {
    id: "combo-breaker-2024",
    name: "Join our Street Fighter Roster at COMBO BREAKER 2024!",
    description:
      '<p><strong>Description:</strong> Nouns Esports is offering 1 winner $1,500 to join our Street Fighter Roster at COMBO BREAKER 2024! </p><p><br></p><p>Nouns Esports will provide you with a jersey and a care package of swag to represent Nouns at the event. We expect active participation in sharing our key event posts before, during, and after the event. </p><p><br></p><p>In order to be eligible submit a proposal explaining why you\'d be an excellent representative for Nouns. Tell us about yourself, your previous results, and why our community should choose you. </p><p><br></p><p>Please include a link to your preferred social media account so we know who you are! </p><p><br></p><p>If you\'re a seasoned member of the Street Fighter community we’d love for you to join our community and help us choose a winner! Sign up to be a voter at <a href="https://forms.nouns.gg/signup/" rel="noopener noreferrer" target="_blank">https://forms.nouns.gg/signup/</a></p>',
    start: new Date(1712898000 * 1000),
    votingStart: new Date(1713502801 * 1000),
    end: new Date(1713762001 * 1000),
    tags: ["smash"],
    image: "/",
  },
  {
    id: "pokemon-art-contest",
    name: "Pokémon Art Contest",
    description:
      "<p>Nouns Esports is looking for Pokémon Artwork! </p><p><br></p><p>We all know there are a lot of amazing artists in the Pokémon community, and we want to highlight and support them! </p><p><br></p><p>In this round we are looking for breathtaking, wholesome, or fun artworks that include Pokémon (UNITE) and possibly combined with Nouns Esports. </p><p><br></p><p>From all participants, two winners will be chosen. </p><p><br></p><p>1st place: $500 </p><p>2nd place: $250 </p><p><br></p><p>To enter, submit a proposal with an introduction of yourself and the art you created. The proposal should also show us progress pictures and if you want, your portfolio, in the proposal to showcase your skills and have others see them as well. </p><p><br></p><p>If you are a member of the Pokémon or Pokémon UNITE community, you are welcome to join our community and vote for the winners! Apply to become a voter at https://nouns.gg/signup</p>",
    start: new Date(1711602000 * 1000),
    votingStart: new Date(1712811601 * 1000),
    end: new Date(1713243601 * 1000),
    tags: ["pokemon"],
    image: "/",
  },
  {
    id: "evo-japan-2024",
    name: "EVO JapanでNouns EsportsとBLVKHVNDに参加して300ドルをゲットしよう！",
    description:
      '<p>Nouns EsportsとBLVKHVNDでは、EVO Japanに参加する10名のプレイヤーを募集しております！選ばれた選手には、300ドル、Nouns Esports x BLVKHVNDジャージ、グッズパックが贈られます。﻿</p><p><br></p><p>Requirements:</p><p><br></p><p>Nouns Esportsのイベント関連の投稿をソーシャルメディアでシェアすること</p><p><br></p><p>EVO JapanでNounsとBLVKHVNDの代表にふさわしい理由や、あなたのゲームでの実績について、企画書を提出すること</p><p><br></p><p>Extra Opportunity:</p><p>スト6か鉄拳8の成績優秀者には、EVOラスベガスへの参加費として2000ドルがゲットできる!</p><p><br></p><p>FGCベテランへ:</p><p><a href="https://nouns.gg/signup-jp" rel="noopener noreferrer" target="_blank">https://nouns.gg/signup-jp</a> に投票者として登録し、勝者を選ぶのにご協力ください。</p><p><br></p><p>Nouns Esports x BLVKHVNDの代表として、ゲーミングキャリアを次のレベルに引き上げるために、今すぐ応募ください！</p><p><a href="https://twitter.com/nounsesports" rel="noopener noreferrer" target="_blank">Nouns Esports</a> &amp; <a href="https://twitter.com/BLVKHVND" rel="noopener noreferrer" target="_blank">BLVKHVND</a> をフォローしてください。</p>',
    start: new Date(1711730483 * 1000),
    votingStart: new Date(1712767284 * 1000),
    end: new Date(1713199284 * 1000),
    tags: ["FGC"],
    image: "/",
  },
];
