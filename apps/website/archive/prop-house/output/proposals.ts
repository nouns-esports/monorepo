import { Proposal } from "@/db/schema";
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

const proposals: Omit<Proposal, "id">[] = [
  // Tournatments
  {
    title: "Tipped Off 14 + Nouns Esports",
    user: "0xc7E49b53671A36323256380Ad4beD5FDc90842Fe",
    round: "tournaments",
    description:
      '<p><strong>Overview of the tournament:</strong></p><p><br></p><ul><li>Super Smash Bros. Melee is one of the oldest and most revered esports in the competitive arena. Starting back in 2001, Melee has attracted much attention with its focus on grassroots events and lack of developer support. Over the past year, Melee has lost its three largest circuit tournaments leading to a bit of a hole in the competitive scene, and the re-emergence of the grassroots environment from where it once thrived. Despite these organizations such as VGBootCamp, Panda, and Beyond the Summit now being gone from the scene, Melee viewership is still reaching new heights as Project Slippi (a free PC version of Melee that has nearly flawless net code) has made the game more accessible and popular than ever. </li></ul><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmRGuDbtTR7JxCikcrPZw4UWUZ6bpNmDUMGXAnCuoMRPUt"></p><p><br></p><p><br></p><ul><li>Tipped Off is the longest-running grassroots Melee major in the South-Eastern United States. Starting back in 2007, Tipped Off has been a pillar of both the Georgia and Southeast community by constantly providing the best events possible at the best price point. This year Tipped Off has leveled up, housing top players such as Mang0, Zain, Jmook, Cody Schwab, Amsa, Axe, Joshman, Moky, and many more to become the highest level of competition of any Melee tournament in this region of the country for the past 22 years.</li></ul><p><br></p><ul><li><strong>Event Dates:</strong> June 3rd &amp; 4th</li><li><strong>Location:</strong> Kennesaw State University, Marrieta Campus. Metro-Atlanta Area</li></ul><p>-Competitor passes are available until 5/30</p><p>-Spectator passes are available at the door</p><ul><li><strong>Current Prize Pool:</strong> $4,000</li><li><strong>Number of players:</strong> Currently have 203 confirmed competitors. Expecting around 250-300</li><li><strong>Spectators:</strong> Expecting 300-350</li></ul><p><br></p><p><strong>Target audience:</strong></p><ul><li>Biggest Melee tournament in the Southeast</li><li>One of the 5 Smash Majors confirmed for 2023</li><li>7 of the top 10 players are confirmed to attend</li><li>This is the first time this has happened in the Southeast in the 22 years since the game\'s release</li></ul><p><br></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmP8amJGYFv8kVnw6LctHcPxPYzppLs5r1mgHyNeyYbJox"></p><p><br></p><p><strong>Brand integration:</strong></p><p><br></p><ul><li>Nouns integration into ad reels and tournament stream overlay</li><li>Nouns “Noggles” and merch for commentators</li><li>Spoken acknowledgment of sponsorship during top 8 sets from commentators and tournament organizer</li><li>Customized Nouns logo on the Tipped Off Awards</li><li>Create a Tipped Off 14 POAP to be redeemed by attendees and event spectators</li><li>The final announcement of POAP opportunity will be before the grand finals</li><li>Raffle at the end of the event</li><li>Potential prizes:</li></ul><p>-Gamecube Controller</p><p>-Custom-painted Gamecube</p><ul><li>Nouns Lanyards for player attendee badges</li></ul><p><br></p><p><strong>Marketing and promotion:</strong></p><ul><li>Live coverage and tournament announcements on <a href="https://twitter.com/TippedOffSSB" rel="noopener noreferrer" target="_blank">https://twitter.com/TippedOffSSB</a></li><li>Streaming on Twitch.tv/Mang0 or Cody Schwab</li></ul><p><br></p><p><strong>Budget and ROI (Return on Investment):</strong></p><ul><li>$1800 for Tier 1 Sponsorship</li><li>Pairs of plastic Noggles for casters</li><li>Paper Noggles to pass out to attendees</li></ul><p><br></p><p><strong>Experience:</strong></p><ul><li>Ohan</li></ul><p>-Lengthy history with organizing platform fighter tournaments stretching back nearly a decade. In that time I have worked on massive events with millions of dollars in prize money such as Dreamhack ATL, Smash World Tour Finals 2021, BCX 2022, and BEMI2023.</p><p><br></p><p><br></p><p><br></p><p>Thank you so much for your consideration! </p><p><br></p><p>Chandler "Ohan" Browning</p><p><br></p><p><br></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmYZwjUuVZgtBGMpDmDThRtbvhL9yPPvnJzPeEyqeWFmHN" width="552" height="367.89928343949043" style=""></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>',
    value: "1800000000",
    createdAt: new Date("2023-05-10T16:12:57.672Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns ComShow: Marvel Snap",
    user: "0xdb97335f619aac56458e7d5E7A945B6dA0D36578",
    round: "tournaments",
    description:
      '<p>[A version of this proposal may be also read using this notion link with some more visual elements: <a href="https://metasports.notion.site/Metasports-x-Nouns-Esports-Prop-House-Grant-1-bdba41500b3e441abfb6516e4379104c" rel="noopener noreferrer" target="_blank">here</a>]</p><p><br></p><h1><strong>OBJECTIVES AND OVERVIEW</strong></h1><p><br></p><ol><li>To spotlight the Southeast Asian Marvel Snap scene and grow it within the region</li><li>Introducing/proliferating the Nouns Meme in Southeast Asia through grassroots esports (Rally more tournament organizer and player knowledge of Nouns Esports in the region)</li><li>To onboard web2 gamers onto web3 through the use of POAPs as a foot in the door</li></ol><p><br></p><p>At Metasports, one of our most beloved IPs is Community Showdown (or ComShow). ComShow is a modular IP we use to hold tournaments featuring a variety of titles to allow casual players to experience what it is like to play in a professionally-produced esports tournaments. Some titles we’ve done in recent years:</p><ul><li>ComShow Valorant, with Grab and Legion by Lenovo</li><li>ComShow CS:GO, with VP Game</li><li>ComShow Pokemon VGC, with Razer and Mogul</li></ul><p><br></p><p><strong>“Nouns ComShow: Marvel Snap”</strong></p><p>We would love to bring Nouns Esports to it’s first touch in APAC/SEA through our dedicated ComShow series for Marvel Snap—with Nouns Esports to be called: <strong>Nouns ComShow: Marvel Snap</strong>.</p><ul><li>10-12 Campaign</li><li>8 Weekly Tournaments</li><li>64 Participants</li><li>$225 Prizepool each week</li><li>$125 from Nouns Esports to takeover Lead Sponsor and main brand integration</li><li>Remaining $100 provided from existing grant from Community Gaming</li></ul><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmSzvCtbT1ong2RvzqHmPoLMgpwnPFWowaG2YkAkQfocom"></p><p><br></p><p><br></p><h1><strong>TARGET AUDIENCE</strong></h1><p><br></p><p>By utilizing a web2 title, Metasports aims to reach web2-leaning casual players looking to test their mettle against other enthusiasts. Key metrics from our last ComShow featuring Marvel Snap:</p><ul><li>We had initially planned room for 64 players per tournament, but had to adjust as we received well over 64 entries for all three tournaments, resulting in 376 total players joining.</li><li>186 total matches were played with $800 total being disbursed to the top players of each tournament.</li></ul><p><br></p><p>As a tournament will be ran every week for eight weeks, we’re aiming to fill all 64 slots for each Swiss-style tournament, amounting to 512 total players but definitely expecting a little over that number to register based on previous experience. Registration will be open to casual and competitive players alike, and each player will also be asked for a wallet address in order to register for the tournaments. This will be how we distribute the POAP SBTs through Nouns allowing you to have a record of our participants as well as allowing them to be soft-onboarded to Nouns.</p><p><br></p><h1><strong>BRAND INTEGRATION</strong></h1><p><br></p><p>We would honored to have Nouns Esports come on as a Title Sponsor for this ComShow run, to be titled “Nouns ComShow: Marvel Snap”</p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmf1fUjjfnxpDL4EPfpK6AyhMxHHxc1utTgCNZuT8zevAM"></p><p><br></p><h1><strong>MARKETING AND PROMOTION</strong></h1><p><br></p><p><strong>World Class Asset Production</strong></p><p>Our creative engine, <a href="https://overdrive.gg/" rel="noopener noreferrer" target="_blank"><strong>Overdrive Studios</strong></a>, has created stunning key visuals and broadcast assets for tournaments all across the globe, and will be ready to facilitate the creation of the aforementioned for our Nouns ComShow. Overdrive is an award winning Esports design studio in Southeast Asia with clients globally:</p><p>Overdrive Website: <a href="https://overdrive.gg/" rel="noopener noreferrer" target="_blank">https://overdrive.gg/</a></p><p><br></p><p><strong>The Right Distribution Channel</strong></p><p><strong>Facebook Page.</strong> Nouns ComShow will be pushed through the SEAesport facebook page, a long-standing media and community IP in Southeast Asian esports—having been official media for events like The International in Singapore and ESL Genting.</p><p>SEAesport Facebook Page: <a href="https://www.facebook.com/SEAesport" rel="noopener noreferrer" target="_blank">https://www.facebook.com/SEAesport</a></p><p>Facebook is strong for streaming and content in SEA, the Philippines particularly, you’ll find the the SEAesport page stats below:</p><ul><li>51k followers</li><li>380k+ engagements per month</li><li>26.8k average peak impressions per month</li></ul><p>Our main CALL-TO-ACTION across content will be:</p><ul><li>Join the official Nouns Esports Discord; and,</li><li>“Learn more about Nouns and Nouns Esports at _____”, provided links or the podcast proposed in this document</li></ul><p><br></p><p><strong>Press Release.</strong> We’ll be creating a press release for distribution to media contacts we have in the region to bring light to Nouns Esports first foray into Southeast Asia. Some contacts we’ll distribute to:</p><ul><li>Yahoo Esports</li><li>Inquirer Esports</li><li>BitPinas</li><li>The MegaMaxi</li><li>WhatToPlay/TingBits</li></ul><p><br></p><p><strong>[Optional] Podcast on Nouns with PPD + Sasquatch.</strong> Produced in our studio, we can produce (hosting PPD and/or Sasquatch removtely) a video podcast for release in SEAesport Youtube and pushed on social media for evergreen content on what Nouns Esports is</p><p><br></p><p><strong>Regarding Broadcast.</strong> During ComShow, we usually do live giveaways to entice viewership, however while we are excited to broadcast live gameplay of Marvel Snap, there is no official spectator or observer mode available yet, and as such we are looking to grow the grassroots Marvel Snap scene in anticipation of this feature being released. We offer the podcast as high-value evergreen content as a great substitute.</p><p><br></p><p><strong>POAPS SBTs and Community Gaming.</strong> In order to bridge attendees with web3, we will be providing POAP SBTs to all participants (competitors and viewers[opt-in] alike) in an effort to bring a mainly web2-facing player base and audience on-chain. Exposure to play through Community Gaming also allows some native discovery to wallets and crypto distribution</p><p><br></p><h1><strong>OUR EXPERIENCE</strong></h1><p><br></p><p>As a media house with deep roots in esports and early natives to web3, Metasports’s expertise lies in holistic 360° Tournament Operations: total tournament production. From rulebooks and tournament formats to broadcast overlays and stage design, Metasports has been organizing events from top to bottom to deliver experiences gamers love.</p><p>The <strong>Lunacian Sports League</strong> (LSL) is one of our biggest IPs: as the first and longest-running professionally-organized esports league for one of the leading Web3 game titles: Axie Infinity. A Metasports production, LSL has been organizing with the support of Sky Mavis since early 2021.</p><p><br></p><p>During our fourth season in 2022, we saw 2,050 participants fight to lay claim to their share of a $50,000 USDC prize pool in over 2900+ games played across 8 qualifiers and playoffs. With over 109.8k live views on FB and Twitch and 1.3M+ social reach across the LSL Facebook and Twitter, a captive audience watched eagerly as players all across the globe competed for top spots in our tournament. You can learn more about the Lunacian Sports League and our ongoing fifth season <a href="https://docs.google.com/presentation/d/1WxhwSpbv0cMXDVf8YFkMfyT-yu0D2jpu-rXB3KskBXQ/edit?usp=sharing" rel="noopener noreferrer" target="_blank">here</a>, as well as on our <a href="https://twitter.com/LSL_GG" rel="noopener noreferrer" target="_blank">official socials</a>.</p><p><br></p><p>Website: <a href="https://www.lsl.gg/lsl-season-3" rel="noopener noreferrer" target="_blank">https://www.lsl.gg/lsl-season-3</a></p><p>In 2020, we held the first local <strong>VALORANT tournament in the Philippines co-presented by GrabFood</strong> using the ComShow IP to support the worldwide launch of Valorant. We teamed up with GrabFood, Legion by Lenovo, Mogul, and XSplit to bring a premiere grassroots tournament for the Philippines with endorsement from Riot Games.</p><p><br></p><p>The members of the tournament’s winning team later got scouted to compete for one of the PH’s leading Valorant pro teams. With over $2,000 USD in prize pool and another $2,000 in vouchers and giveaways, this 6-week campaign saw over 500 registered players compete in 350 qualifying matches with over 330,000+ minutes viewed and a staggering 620,000+ in social reach through our official channels.</p><p><br></p><h1><strong>BUDGET AND ROI</strong></h1><p><br></p><p>Budget ask: $1,000+ USDC, all going to prize pool, distributed evenly across 8 tournaments happening weekly.</p><p>We take no profit or operations costs from the grant for this event.</p><p><br></p><p>Metasports will handle the 360 Tournament Ops for the Nouns ComShow tournament production. Nouns Esports will also receive  to our SEAesport official Facebook page followers by coming on as a Title Sponsor of ComShow, and can expect 40+ social media posts with Nouns-powered branding for the duration of this campaign, as well as two (2) Facebook boosted awareness posts (1 per month of the campaign).</p><p>Some stats about our SEAesport Facebook page:</p><ul><li><strong>51k followers</strong></li><li><strong>380k+ engagements per month</strong></li><li><strong>26.8k average peak impressions per month</strong></li></ul><p><br></p><p>Metasports also has a pre-existing grant from <strong>Community Gaming</strong> that will be utilized alongside the requested budget. Winners will receive half their winnings in fiat courtesy of Community Gaming’s grant, while the other half will be from the requested prize pool budget to be disbursed on the chain, in a bid to soft-onboard winners on-chain.</p><p>To outline this better:</p><ul><li><strong>Of the budget, $125 USDC will be awarded each week over the course of two (2) months, for a total of $1,000 awarded across 8 tournaments over 8 weeks.</strong></li><li><strong>Of the Community Gaming grant, $100 USD will be awarded in fiat each week over the course of two (2) months, for a total of $800 awarded across 8 tournaments over 8 weeks.</strong></li></ul><p><br></p><p>With 8 tournaments and 64 players each, this would mean 512 players <strong>minimum</strong> that will be engaged through this campaign to be soft-onboarded on-chain, though we are expecting greater than that in registrations from experience.<strong> </strong></p>',
    value: "1000000000",
    createdAt: new Date("2023-05-15T13:20:14.664Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Proposal for The Noggles Cup - Fortnite Edition",
    user: "0x965E30796C562c87a6859613D9408a7480bD914D",
    round: "tournaments",
    description:
      '<p>Dear voters,</p><p><br></p><p>I am writing to present a proposal for the Noggles Cup - Fortnite Edition, a highly anticipated tournament that aims to bring together professional Fortnite players from South America for an exciting competition. The event will not only showcase the exceptional skills of these players but also provide significant exposure for Nouns Esports.</p><p><br></p><p>To assist with everything necessary to ensure we have everything set and ready for the cup, I have&nbsp;<a href="https://twitter.com/Ment0sbtw" rel="noopener noreferrer" target="_blank">https://twitter.com/Ment0sbtw</a>&nbsp;- Organizer&nbsp;<a href="https://twitter.com/Zikaue" rel="noopener noreferrer" target="_blank">https://twitter.com/Zikaue</a>&nbsp;- Organizer to help, they are known for their work at&nbsp;<a href="https://twitter.com/GamersClubFN" rel="noopener noreferrer" target="_blank">https://twitter.com/GamersClubFN</a>&nbsp;and have years of experience at organizing and hosting events.</p><p><br></p><p>I have&nbsp;<a href="https://twitter.com/bacondzn" rel="noopener noreferrer" target="_blank">https://twitter.com/bacondzn</a>&nbsp;for the arts, we\'ll need: 1 for the invitations, 1 for announcement, 1 for the winners. I think you are all familiar with his work, I\'ve been posting at Mojak and Origins\' proposal thread, he is very talented and I think he deserves to be with us on this.</p><p><br></p><p><br></p><p>Format:</p><p>The Noggles Cup - Fortnite Edition will be an Arena Duo tournament featuring 50 duos. To ensure a high level of competition, we will invite 40 duos directly to the event. Additionally, we will conduct a qualifying round to allow 10 additional duos to secure their spots in the tournament.</p><p><br></p><p>There are two possible qualifying scenarios:</p><p>One Qualify - Top 10: The top 10 duos from the qualifying round will advance to the Noggles Cup.</p><p>OR</p><p>Two Qualifies - Top 5: The top 5 duos from each qualifying round will advance to the Noggles Cup.</p><p><br></p><p>Prizes:</p><p>We believe that offering attractive prizes will not only motivate the participants but also generate interest among the Fortnite community.</p><p><br></p><p>The prize distribution for the top 3 duos is as follows:</p><p>1st Place: $300 2nd Place: $200 3rd Place: $100</p><p><br></p><p>I thought about giving a 50$ bonus for Mojak and Origins if they are the Noggles Cup winners (can change that if you feel we don\'t need it).</p><p><br></p><p>Expenses:</p><p>To ensure the smooth execution of the Noggles Cup - Fortnite Edition, we have estimated the following budget:</p><p><br></p><p>Organizers: $450</p><p>Editor: $30</p><p>Fees for transfers (sad reality): $70</p><p><br></p><p>The organizers\' expenses will cover various aspects such as event management, logistics, prize distribution, and coordination with the participants. The artist\'s fee will be allocated to ensure the production of high-quality content, including promotional videos and highlights.</p><p><br></p><p>Promotion and Exposure:</p><p>We are committed to maximizing exposure for the Noggles Cup - Fortnite Edition. The event will be extensively streamed, allowing Fortnite enthusiasts from around the world to witness the intense competition. We anticipate that this tournament will attract significant attention due to the participation of over 80 professional Fortnite players from South America.</p><p><br></p><p>To enhance the reach of the event, we will utilize social media platforms, particularly Twitter, for the invitation process. 40 duos were selected and will be invited via Twitter, and to secure their spots, they will be required to post about their invitation, along with the hashtag #NogglesFortniteCup (we can change the #) and tag @nounsesports @mojakkkk and @originsbtw .</p><p><br></p><p>This approach will create a buzz among the Fortnite community and increase the visibility of Nouns Esports. The Noggles Cup - Fortnite Edition is a fantastic opportunity for Nouns Esports to establish its brand as a leader in organizing high-quality Fortnite tournaments. With the participation of professional players, attractive prizes, and extensive promotion, we anticipate a successful and engaging event that will captivate the Fortnite community.</p><p><br></p><p>We kindly request your consideration and support for this proposal. Please feel free to reach out to us if you require any further information or have any questions regarding the Noggles Cup - Fortnite Edition. We look forward to your positive response.</p><p><br></p><p>(List of duos that\'ll be invited to the cup:&nbsp;<a href="https://docs.google.com/document/d/1IMviaEUxkIs8HW9hRGHizZx-snBZKDJO/edit?usp=share_link&amp;ouid=104819803980468078375&amp;rtpof=true&amp;sd=true" rel="noopener noreferrer" target="_blank">https://docs.google.com/document/d/1IMviaEUxkIs8HW9hRGHizZx-snBZKDJO/edit?usp=share_link&amp;ouid=104819803980468078375&amp;rtpof=true&amp;sd=true</a>)</p><p><br></p><p>Writer and Proposer:</p><p><br></p><p>Bright Spark</p><p><br></p><p>Contributor&nbsp;<a href="https://twitter.com/nounsesports" rel="noopener noreferrer" target="_blank">@nounsesports</a></p><p>Community Manager&nbsp;<a href="https://twitter.com/Nebula_web3" rel="noopener noreferrer" target="_blank">@Nebula_web3</a></p><p>Nouncil Member&nbsp;<a href="https://twitter.com/NounsBr" rel="noopener noreferrer" target="_blank">@NounsBr</a></p><p><br></p><p><br></p><p>Thank you for your time and attention.</p><p><br></p>',
    value: "1200000000",
    createdAt: new Date("2023-05-12T21:59:17.980Z"),
    hidden: false,
    published: true,
  },
  {
    title: "GEMS Cup: Women Division | Americas",
    user: "0xf28a6F153c6F0594E22e31875747AeF2b56e2C3A",
    round: "tournaments",
    description:
      "<p>Overview of the tournament</p><p>GEMS Cup is a weekly Dota 2 tournament that aims to promote inclusivity and diversity within the gaming landscape. The tournament features a single elimination format, attracting talented teams with players from minoritized genders. With a $35 USDC prize pool, GEMS Cup offers an exciting platform for participants to showcase their skills and talents. We currently have a significant turnout of both participants and viewers, with an average viewership of 50 on the main channel and 50 to 100 on player perspectives streams.</p><p><br></p><p>Target audience</p><p>Our target audience for GEMS Cup extends beyond passionate gamers to include families who enjoy watching and engaging with esports tournaments. This demographic consists of gaming enthusiasts across various age groups, including parents, siblings, and friends of the participating players. By partnering with GEMS Cup, Nouns Esports will have the opportunity to connect with not only the players but also their support systems, fostering positive brand associations and building relationships with a broader audience.</p><p><br></p><p>Brand integration</p><p>As an official sponsor, Nouns Esports will receive prominent logo placement on tournament assets, including livestream overlays, banners, and player's perspective streams, enhancing brand visibility to a passionate and diverse audience. Additionally, branded content integration opportunities, such as sponsored segments during broadcasts and interviews, will allow for organic brand promotion. By aligning Nouns Esports with GEMS Cup, we can leverage the tournament's reach and credibility to enhance brand recognition, while also creating opportunities for the entire gaming community to forge meaningful connections with a diverse range of gamers. This partnership fosters inclusivity, showcases Nouns Esports' commitment to embracing and celebrating differences, and reinforces a sense of unity within the gaming landscape.</p><p><br></p><p>Marketing and promotion</p><p>Our marketing strategy primarily relies on the active participation of the players to generate organic exposure. By encouraging them to share the tournament assets on their personal social media platforms, we aim to reach their followers and the wider gaming community. This grassroots approach allows us to create buzz and generate interest in GEMS Cup. Additionally, we will prominently showcase Nouns branding on tournament assets to enhance brand recognition. Through this combined effort, we strive to engage the gaming community and esports enthusiasts, creating an immersive viewing experience through professional casting, comprehensive analysis, and engaging post-game interviews.</p><p><br></p><p>Budget and ROI</p><p>We believe that this partnership offers a strong return on investment for Noun Esports. Metrics such as reach, engagement, and conversions will be tracked throughout the tournament to provide concrete data on the campaign's success.</p><p><br></p><p>Here's the budget breakdown for the GEMS Cup weekly tournament:</p><p><br></p><p><strong>Total Estimated Budget Requested: $1400 USDC</strong></p><p><br></p><p><strong>Prize Pool Allocation:</strong></p><p>- First Place: $25 USDC per tournament</p><p>- Second Place: $10 USDC per tournament</p><p><br></p><p><strong>Tournament Operations:</strong></p><p>- Staffing and Administration: Covered by Chompix Gaming</p><p>- Tournament Platform Fees: Covered by Chompix Gaming</p><p>- Equipment and Technical Setup: Covered by Chompix Gaming</p><p><br></p><p><strong>Marketing and Promotion:<strong/></p><p>- Social Media Advertising: Covered by Chompix Gaming</p><p>- Influencer Collaborations: Covered by Chompix Gaming</p><p>- Graphic Design and Creatives: Covered by Chompix Gaming</p><p><br></p><p><strong>Livestream Production:</strong></p><p>- Commentator: Covered by Chompix Gaming</p><p>- Streaming Platform Fees: Covered by Chompix Gaming</p><p><br></p><p>With a budget of $1400 USDC, we can cover approximately 20 weeks of tournaments (assuming two tournaments per week).</p><p><br></p><p>Experience</p><p>[Chompix Gaming](https://liquipedia.net/dota2/User:Chompix/Chompix_Gaming) has extensive experience in organizing esports tournaments and working with brands. We have successfully executed similar events in the past, forging strong partnerships and delivering impactful results. Our commitment to professionalism, attention to detail, and understanding of the gaming landscape within the Dota 2 community make us the ideal partner for Noun Esports initiatives.</p><p><br></p><p><br></p><p><strong>Previous Event: GEMS Cup 4</strong></p><p><br></p><p>- Event Assets: [GEMS Cup Logo Design](https://www.behance.net/gallery/169863687/GEMS-CUP-Logo-Design)</p><p>- Liquipedia Userspace: [GEMS Cup 4](https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/4)</p><p>- Event Clip: [GEMS Cup 4 Clip](https://youtu.be/OeL-eVxAcWM)</p><p>- VOD: [GEMS Cup 4 VOD](https://www.twitch.tv/videos/1813270619)</p><p>- Commentator Experience: [Chompix](https://liquipedia.net/dota2/User:Chompix/Broadcasts)</p><p><br></p><p>Stream Metrics</p><p>##GEMS Cup 4 Final Bo3: Soul Angels vs Team Calvas</p><p>  - [Liquipedia](https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/4) Userspace</p><p>  - [TwitchTracker](https://twitchtracker.com/chompixgaming/streams/48439609949)</p><p>  - Stream Duration: 1h58m | Avg Viewers: 35 | Peak Viewers: 50</p><p><br></p><p>GEMS Cup 3 Final Bo3: Soul Angels vs Team Valquirias</p><p>  - [Liquipedia](https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/3) Userspace</p><p>  - Main Stream [TwitchTracker](https://twitchtracker.com/chompixgaming/streams/48392464957)</p><p>  - Stream Duration: 2h50m | Avg Viewers: 32 | Peak Viewers: 45</p><p>  - Player's Perspective: belica [TwitchTracker](https://twitchtracker.com/belica_/streams/41288638761)</p><p>&nbsp; &nbsp; &nbsp; - Stream Duration: 1h54m | Avg Viewers: 251 | Peak Viewers: 330</p><p><br></p><p>GEMS Cup 2 Final Bo3: Equipo Rocket vs Team Calvas</p><p>  - [Liquipedia](https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/2) Userspace</p><p>  - Main Stream [TwitchTracker](https://twitchtracker.com/chompixgaming/streams/48359807789)</p><p>  - Stream Duration: 2h57m | Avg Viewers: 64 | Peak Viewers: 104</p><p><br></p><p>GEMS Cup 1 Final Bo3: Equipo Rocket vs Team Valquirias</p><p>  - [Liquipedia](https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/1) Userspace</p><p>  - Main Stream [TwitchTracker](https://twitchtracker.com/chompixgaming/streams/48320031581)</p><p>  - Stream Duration: 2h56m | Avg Viewers: 64 | Peak Viewers: 82</p><p><br></p><p><br></p><p><br></p><p><br></p><p><img src=\"https://prophouse.mypinata.cloud/ipfs/QmUKGuDtH28aUfA2jrrmd2eboqxFkmcfHB94jrcMkF9Jy5\"></p><p><br></p><p><br></p>",
    value: "1400000000",
    createdAt: new Date("2023-05-10T21:31:47.232Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "Nouns Esports 1 Week Mobile Legends Bang Bang Tournament in Philippines",
    user: "0x5016c719AcF8F5C61Ae4A8eC33453B686c1C4325",
    round: "tournaments",
    description:
      '<p><strong>Introduction</strong>: I am writing this proposal to launch/create a 2 Days Mobile Legends Bang Bang Tournament 5v5 &amp; 1v1 Category our in Barangay Bagay Tuguegarao City, Cagayan Philippines to create impact, spread more awareness and introduced to all of the people in the said event that Nouns Esports is a Web 3-based esports organization that aims to onboard MOBA fans into the world of Web 3 and spread awareness about the benefits of decentralized technologies in esports. This proposal aims to outline the idea of creating a Mobile Legends Bang Bang tournament in Barangay Bagay, Tuguegarao City, Cagayan, Philippines, to achieve these goals.</p><p><br></p><p><strong>Objective:</strong> The main objective of this tournament is to onboard MOBA fans into the world of Web 3 by introducing them to Nouns Esports and its decentralized platform. The tournament will also spread awareness about Nouns Esports and its mission to revolutionize esports with Web 3 technologies. Furthermore, this tournament will provide a platform for local players to showcase their skills, compete against each other, and win attractive prizes branding with Nouns Esports. </p><p><br></p><pre class="ql-syntax" spellcheck="false">Tournament Structure: The tournament will be held in a LAN setup at a local venue in Barangay Bagay and will consist of a series of matches that will be played over several weeks. The tournament will have different stages, such as the Qualifiers, Group Stage, Playoffs, and the Grand Finals for 1 Week. Each stage will have its unique requirements and rules, which players must adhere to.\n</pre><p><br></p><p><strong>Budget Ask &amp; Allocation:</strong></p><p><br></p><p>$500 USDC (2 Days) </p><p><br></p><ol><li>Venue Rental -  $100 USDC</li><li>Equipment Rental (Tables, Extensions, Chargers, Wifi Internet &amp; etc.) - $100 USDC</li><li>Prize Pool - $200 USDC (distributed among the top-performing players)</li></ol><p><br></p><ul><li>First Place - $100 USDC (recieving a cash , trophy , certificates &amp; cc0 nouns esports merch)</li><li>Second Place - $60 USDC (recieving a cash , trophy , certificates &amp; cc0 nouns esports merch)</li><li>Third Place - $40 USDC  (recieving a cash , certificates &amp; cc0 nouns esports merch)</li></ul><p><br></p><pre class="ql-syntax" spellcheck="false">For 5v5 Category will be Single Round Robin Best of 1 the Top 4 Teams will proceed to the Semi Finals Round up to the Final Bound \n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\nFor 1v1 Category Organizers|Us will be picking to onboard our MOBA audience in the said event to play on our 1v1 and the said category has a Last man Standing Round Elimination  ( Exhibition Game )\n\nRules for 1v1: Marksman Only\n\nEither First Blood or Break the First Tower Wins!\nONLY MID \nBUFF FARMING ONLY\nNO FARMING\nFREE TO RECALL\n</pre><p><br></p><p><br></p><p>       4.Marketing and Promotion - $50 USDC (social media campaigns, targeted advertising, etc.)</p><p>       5.Miscellaneous Expenses - $50 USDC</p><p><br></p><p><br></p><p><strong>Deliverables:</strong> LAN setup for the tournament at a local venue in Barangay Bagay. Attractive prizes for the winners and runners-up of the tournament. Marketing and promotional activities to spread awareness about Nouns Esports and its mission to revolutionize esports with Web 3 technologies. Onboarding of MOBA fans into the world of Web 3 by introducing them to Nouns Esports and its decentralized platform. </p><p><br></p><h3>Droposal Idea: ROI</h3><ul><li>When this event has been concluded, We will be doing partnering to our possible artist on the community to create one piece of art collection that we can be a community minted on zora as open edition with a 100% of the fund will goes into our Nouns Esports Treasury :)</li></ul><p><br></p><p><br></p><p><strong>Conclusion</strong>: In conclusion, the Nouns Esports Mobile Legends Bang Bang tournament in Barangay Bagay is an excellent opportunity to onboard MOBA fans into the world of Web 3 and spread awareness about Nouns Esports and its mission. The tournament will provide a platform for local players to showcase their skills, compete against each other, and win attractive prizes. With the right marketing and promotional activities, this tournament has the potential to become a significant event in the local esports industry.</p><p><br></p><p>Writer Proposer: </p><p><br></p><p><strong>Bossjcrypto.eth</strong></p><p>Pinoy Nouns Founder</p><p>IRL Proliferator</p><p>Writer Proposer</p><p>Gnars Athelete</p><p>Videographer</p><p>Meme Creator</p><p>Charity Community Manager</p><p>Event Organizer</p><p><br></p><p><strong>Past Nounish Work:</strong></p><p><a href="https://lilnouns.wtf/lilnoun/7594" rel="noopener noreferrer" target="_blank">IRL Lil Nouns Ads Waiting Shed (Bus Stop) Prop #106</a></p><p><a href="https://prop.house/nsfw/what-did-we-miss/2672" rel="noopener noreferrer" target="_blank">NSFW Winning Retro Proposal Nouns Dao Giveback to Aeta Agta People (FIP) ⌐◨-◨</a></p><p><a href="https://prop.house/nsfw/what-did-we-miss/2672" rel="noopener noreferrer" target="_blank">TNS #NounsGiveBack Winning Entry</a></p><p><a href="https://twitter.com/bossj_eth/status/1622012993004511232?s=20&amp;t=Crv2io4lBcAlAuoDU8BzLg" rel="noopener noreferrer" target="_blank">IRL Open Category Art Contest &amp; DIY Community Art in our College School</a></p><p><br></p><p>Twitter handle:&nbsp;<a href="https://twitter.com/bossj_eth" rel="noopener noreferrer" target="_blank">bossj_eth</a></p><p>Discord: bossj.eth#0939</p><p>Pinoy Nouns :&nbsp;<a href="https://twitter.com/PinoyNouns" rel="noopener noreferrer" target="_blank">PinoyNouns</a></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmeZwr5TJyhLXNxS43ei2ha8mySLVf1LtcCjMr19wN5Dqs"></p><p><br></p><p>Thankyou for reading our proposal, looking forward to make this happen. If you have questions &amp; feedback you can dm me or comment it down below so that we can discuss what the best for this proposals! To God be the glory.</p>',
    value: "500000000",
    createdAt: new Date("2023-05-10T03:50:58.827Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Warehouse War 3 w/ Nouns Esports",
    user: "0x7D7da60B89fc2DFc9ce0eee3fF180221b46A1965",
    round: "tournaments",
    description:
      "<p><strong>The Tournament:</strong></p><p><br></p><p>Warehouse War is the largest recurring regional events for Super Smash Brothers in the state of Tennessee and following in the legacy of large events of the past such as WTFox. The Southeast has long since been under-represented in the national stage and our community is large and hungry for well-run events with lots of exposure and attention. Our previous iterations have exceeded community expectations and we're looking to expand and grow as much as possible with help from the community as well as potential partners like Nouns.</p><p><br></p><p><strong>Date/Location/Misc:</strong></p><p><br></p><p>July 29th, 2023. Nashville, Tennessee. Rocketown Skatepark within walking distance of Broadway (Downtown strip of Nashville and the Nissan Stadium for the Tennessee Titans). We have currently 204 confirmed pre-registered entrants and looking to grow between now and then to exceed 300. We're running Super Smash Brothers Melee, P+, and Ultimate.</p><p><br></p><p><strong>Notable Entrants:</strong></p><p><br></p><p>Magi, Grab, Paladin, Will, YDelerious, Dany, Jin, Tavares, Majersk, Blue, Panko, Reeve, Hunybear, and many more to come especially with your assistance</p><p><br></p><p><strong>What we can do for you:</strong></p><p><br></p><p>We'll have ad reads during the stream to discuss what you all are all about as well as having our commentators speak directly about Nouns and anything specific that you all with for us to represent. We'll have slide cards displayed during downtime and during designated ad breaks to show off your brand. Nouns logo represented on all marketing and tournament badges and shirts. If you all wish to provide the Nouns glasses for our commentators or staff/attendees to raise brand awareness we can also do that.</p><p><br></p><p>Sponsors:</p><p><br></p><p>Metafy - $200</p><p>901_Esports - $250</p><p>Smash Paws - $500</p><p>Juvee - 14 12-pack cases for players/staff</p><p>Nashville Valley Smash - $900 ($300 pot bonus for Melee/P+/Ultimate)</p><p><br></p><p>Sponsor $ primarily goes towards bringing out notable players from surrounding regions as well as paying for flights/accommodations of headliner players that the community wants to bring out. Some also goes towards venue costs depending on the amount raised via venue fee from attendees.</p><p>Note: Sponsors are also welcome to request where their money goes if they wish (i.e. flying out a particular player or a pot bonus for a certain game of their choice)</p><p><br></p><p><strong>Experience:</strong></p><p><br></p><p>8+ Years in the Melee and Project M/+ scene working directly in the Tennessee area. I'm the head Tournament Organizer for the Warehouse War series and worked heavily alongside the WTFox series, ETSUCon events, and Unpunishable tournament series. Extensive connections and knowledge base of players in the southeast region from the Carolinas, Tennessee, Kentucky, Alabama, Georgia, etc. </p><p><br></p><p>https://www.start.gg/tournament/warehouse-war-2-ft-logan-grab-iori-dany-madtyro-ydelirious/details</p><p>https://www.start.gg/tournament/warehouse-war-a-middle-tn-melee-pm-regional/details</p><p>https://www.start.gg/tournament/etsu-con-2018/details</p><p>https://www.start.gg/tournament/etsu-con-2017-100-pot-bonus-for-smash-4-melee/details</p><p>https://www.start.gg/tournament/etsu-con-2023/details</p><p>https://www.start.gg/tournament/unpunishable-v-noggin-floggin/details</p><p>https://www.start.gg/tournament/unpunishable-4-oil-panic-x-conapalooza/details</p><p>https://www.start.gg/tournament/unpunishable-3-road-to-famicon-the-worm-show/details</p><p>https://www.start.gg/tournament/wtfox-2/details</p><p><br></p><p><strong>Socials:</strong></p><p>https://twitter.com/coxspelledc_o_x (My personal Twitter)</p><p>https://twitter.com/TNMelee (Tennessee Melee and P+ Twitter I run)</p><p>https://www.twitch.tv/btssmash (Main stream. 422k followers)</p><p>https://www.twitch.tv/btssmash2 (Second stream. 105k followers)</p><p>https://www.twitch.tv/tennesseemelee (Our state Twitch stream)</p><p>https://www.twitch.tv/wagr0 (Side stream we will have owned by one of the stream runners at Tipped Off)</p><p><br></p><p><br></p>",
    value: "1000000000",
    createdAt: new Date("2023-06-05T05:52:45.681Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Midwest Dota 2 League",
    user: "0x353eF54dbc4797a539E7b6D79556754F0c2cD65A",
    round: "tournaments",
    description:
      "<p>Overview:&nbsp;</p><p>The Midwest Dota 2 League is a North American Dota 2 grassroots league that is primarily focused on bringing high quality and high integrity tournaments to amateur Dota 2 players. It was founded in 2016 in a small LAN café in Peoria IL and has since grown to over 1200 members in its community discord. Originally, the league had only 4 teams and would host a small tournament. Each season saw the league grow more and more, with COVID being a huge catalyst bringing more players to the league. Now, we have 40-48 teams each season, with about 200-250 players signing up for the league. We have players that play mostly in the US Midwest but also from all over the world including South America, Canada, Russia, UK, and more. Players play in the online or LAN tournament and compete for the community funded prize pool. As an organization, MD2L has given out close to $13,000 in prize pool money.</p><p>With the rising costs of equipment, talent, insurance and venues, funding would go directly towards supporting our in-person tournaments. This is what makes MD2L unique compared to other amateur Dota 2 leagues. MD2L’s owner’s inspiration for starting the league was based on the idea that playing a game in which people are very passionate about in person would add so much to the experience while simultaneously take away a lot of the negative parts of playing the game online (toxicity/griefing etc.)&nbsp;Even though the game is very popular in the esports world, there wasn’t a league with this kind of service until MD2L arrived on scene. With this unique approach, MD2L has gained quite a bit of popularity in the greater Dota 2 community.</p><p>Target Audience:</p><p>Our next LAN is scheduled at Scrims Esports Center in Lisle IL during March 2024. The venue fits 100 players, and we expect to fill to capacity, with more players filling in online. It is typically a double elimination tournament. Demographics include: 80% male, 20% female, most ages from 18-40 years old, with each season leaving close to a hundred thousand impressions.</p><p>Brand Integration:&nbsp;</p><p>Nouns can be integrated into the tournament through partnering with MD2L. Nouns will be included in marketing, advertising, logos, tournament content space, and much more.</p><p>Marketing and Promotion:</p><p>Discord advertising to the MD2L community, social media campaigns done by the DuPage County Sports Commission, live coverage from talent and known Dota 2 personalities (including OD Pixel, BSJ, KBBQ, lukiluki in the past) really helps with views and impressions.</p><p>Budget and ROI</p><p>While MD2L is a community funded and does operate to profit as an organization, there is lots of room for Nouns to expect return on investment from the target audience. Every season of MD2L has led to about a 20% growth in total player base and teams, while keeping most players engaged in the community with each season leaving close to a hundred thousand impressions.</p><p>Experience</p><p>MD2L has worked with several organizations in the past including Monster Energy at 2 LAN tournaments, local shops including card game shops, local restaurants, and more. Each LAN tournament has also had the County’s sports commission involved with obtaining local sponsorships and partnering with hotels for discounted group rates.</p>",
    value: "1500000000",
    createdAt: new Date("2023-06-02T21:01:08.597Z"),
    hidden: false,
    published: true,
  },
  {
    title: "AMAesport MLBB tournament 2023",
    user: "0x49EE24dF690f61618B83fe6f8F1B5507528bb402",
    round: "tournaments",
    description:
      '<p><strong>Esport event</strong></p><p><br></p><p>AMA Education System is holding its Annual AMAESports 2023 MLBB Tournament which will be participated by different feeder schools of the 63 member Campuses all over the country of AMA Education System. 🥰</p><p><br></p><p><br></p><p><br></p><p>This is the biggest Tournament by far organized by an education system in partnership with the Transportation Network Companies or TNC, the largest Southeast Asian multi-gaming organization of the Philippines. ❤️😁</p><p><br></p><p> <strong>https://news.amaes.edu.ph/2023/05/ama-education-system-and-tnc-group.html?m=1</strong></p><p><br></p><p><br></p><p><br></p><p>We are inviting all the Esports enthusiasts particularly the current Grade 10, 11 and 12 to compete in the “Local Branch Qualifier” with other participating teams from different public and private schools in Naga City and neighboring towns within and outside Camarines Sur. Winner from this match will advance to AMAES Interbranch Regional Competition until they reach the National Level where they will compete with the best of the best teams across the country and win big prizes and opportunities to compete in international tournament organized by the TNC. 😱😍</p><p><br></p><p><br></p><p><br></p><p><strong>Team</strong></p><p><br></p><p>Team abat abe-fairview is competing against provinces and we are aiming to win the national title and we are already qualified to compete against best players on june 3 and head to national battle wearing nouns noggles team shirts printed with nouns and big banners with nounsesport leaflets.</p><p><br></p><p><br></p><p><br></p><p><strong>Viewers</strong></p><p><br></p><p>mlbb is the number 1 online game in the country with millions of gamers enthusiasts most of the gamers in the country play MLBB</p><p><br></p><p><br></p><p><br></p><p>Our team abe-fairveiw qualifed link info</p><p><br></p><p>https://www.facebook.com/100011199095629/posts/1862586654124620/?mibextid=JgRRn7n7jRVACbyL<img src="https://prophouse.mypinata.cloud/ipfs/QmQ6iAt39j6HnPpxJhSBkLzmCv7bisEvkXKiWejM9qVYMi"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmayjJ2veRCYhA87LU7TeEYuZVeN7f2RDk4P9CyWwfHucT"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmdDEGDSZAPdZd5K6js6yVoXaz9EXSbxqjJkeVeDbX5HUG"></p><p><br></p><p><br></p>',
    value: "1000000000",
    createdAt: new Date("2023-06-04T11:01:44.036Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Warehouse War 3 w/ Nouns Esports",
    user: "0x7D7da60B89fc2DFc9ce0eee3fF180221b46A1965",
    round: "tournaments",
    description:
      "<p>(Resubmitting per our discussion on the Contributor call on 6/9 as previous proposal is soon to expire)</p><p><br></p><p><strong>The Tournament:</strong></p><p><br></p><p>Warehouse War is the largest recurring regional events for Super Smash Brothers in the state of Tennessee and following in the legacy of large events of the past such as WTFox. The Southeast has long since been under-represented in the national stage and our community is large and hungry for well-run events with lots of exposure and attention. Our previous iterations have exceeded community expectations and we're looking to expand and grow as much as possible with help from the community as well as potential partners like Nouns.</p><p><br></p><p><strong>Date/Location/Misc:</strong></p><p><br></p><p>July 29th, 2023. Nashville, Tennessee. Rocketown Skatepark within walking distance of Broadway (Downtown strip of Nashville and the Nissan Stadium for the Tennessee Titans). We have currently 204 confirmed pre-registered entrants and looking to grow between now and then to exceed 300. We're running Super Smash Brothers Melee, P+, and Ultimate.</p><p><br></p><p><strong>Notable Entrants:</strong></p><p><br></p><p>Magi, Grab, Paladin, Will, YDelerious, Dany, Jin, Tavares, Majersk, Blue, Panko, Reeve, Hunybear, and many more to come especially with your assistance</p><p><br></p><p><strong>What we can do for you:</strong></p><p><br></p><p>We'll have ad reads during the stream to discuss what you all are all about as well as having our commentators speak directly about Nouns and anything specific that you all with for us to represent. We'll have slide cards displayed during downtime and during designated ad breaks to show off your brand. Nouns logo represented on all marketing and tournament badges and shirts. If you all wish to provide the Nouns glasses for our commentators or staff/attendees to raise brand awareness we can also do that.</p><p><br></p><p>Sponsors:</p><p><br></p><p>Metafy - $200</p><p>901_Esports - $250</p><p>Smash Paws - $500</p><p>Juvee - 14 12-pack cases for players/staff</p><p>Nashville Valley Smash - $900 ($300 pot bonus for Melee/P+/Ultimate)</p><p><br></p><p>Sponsor $ primarily goes towards bringing out notable players from surrounding regions as well as paying for flights/accommodations of headliner players that the community wants to bring out. Some also goes towards venue costs depending on the amount raised via venue fee from attendees.</p><p>Note: Sponsors are also welcome to request where their money goes if they wish (i.e. flying out a particular player or a pot bonus for a certain game of their choice)</p><p><br></p><p><strong>Experience:</strong></p><p><br></p><p>8+ Years in the Melee and Project M/+ scene working directly in the Tennessee area. I'm the head Tournament Organizer for the Warehouse War series and worked heavily alongside the WTFox series, ETSUCon events, and Unpunishable tournament series. Extensive connections and knowledge base of players in the southeast region from the Carolinas, Tennessee, Kentucky, Alabama, Georgia, etc. </p><p><br></p><p>https://www.start.gg/tournament/warehouse-war-2-ft-logan-grab-iori-dany-madtyro-ydelirious/details</p><p>https://www.start.gg/tournament/warehouse-war-a-middle-tn-melee-pm-regional/details</p><p>https://www.start.gg/tournament/etsu-con-2018/details</p><p>https://www.start.gg/tournament/etsu-con-2017-100-pot-bonus-for-smash-4-melee/details</p><p>https://www.start.gg/tournament/etsu-con-2023/details</p><p>https://www.start.gg/tournament/unpunishable-v-noggin-floggin/details</p><p>https://www.start.gg/tournament/unpunishable-4-oil-panic-x-conapalooza/details</p><p>https://www.start.gg/tournament/unpunishable-3-road-to-famicon-the-worm-show/details</p><p>https://www.start.gg/tournament/wtfox-2/details</p><p><br></p><p><strong>Socials:</strong></p><p>https://twitter.com/coxspelledc_o_x (My personal Twitter)</p><p>https://twitter.com/TNMelee (Tennessee Melee and P+ Twitter I run)</p><p>https://www.twitch.tv/btssmash (Main stream. 422k followers)</p><p>https://www.twitch.tv/btssmash2 (Second stream. 105k followers)</p><p>https://www.twitch.tv/tennesseemelee (Our state Twitch stream)</p><p>https://www.twitch.tv/wagr0 (Side stream we will have owned by one of the stream runners at Tipped Off)</p><p><br></p><p><br></p><p><br></p>",
    value: "1000000000",
    createdAt: new Date("2023-06-14T04:23:51.660Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "Nouns Esports Mobile Legends Bang Bang Tournament in Local Baranggay Philippines",
    user: "0x5016c719AcF8F5C61Ae4A8eC33453B686c1C4325",
    round: "tournaments",
    description:
      '<p><strong>Introduction</strong>: I am writing this proposal to launch/create a Mobile Legends Bang Bang Tournament 5v5 &amp; 1v1 Category our in Barangay Bagay Tuguegarao City, Cagayan Philippines to create impact, spread more awareness and introduced to all of the people in the said event that Nouns Esports is a Web 3-based esports organization that aims to onboard MOBA fans into the world of Web 3 and spread awareness about the benefits of decentralized technologies in esports. This proposal aims to outline the idea of creating a Mobile Legends Bang Bang tournament in Barangay Bagay, Tuguegarao City, Cagayan, Philippines, to achieve these goals.</p><p><br></p><p><strong>Objective:</strong>&nbsp;The main objective of this tournament is to onboard MOBA fans into the world of Web 3 by introducing them to Nouns Esports and its decentralized platform. The tournament will also spread awareness about Nouns Esports and its mission to revolutionize esports with Web 3 technologies. Furthermore, this tournament will provide a platform for local players to showcase their skills, compete against each other, and win attractive prizes branding with Nouns Esports.</p><p><br></p><pre class="ql-syntax" spellcheck="false">Tournament Structure: The tournament will be held in a LAN setup at a local venue in Barangay Bagay and will consist of a series of matches that will be played over several weeks. The tournament will have different stages, such as the Qualifiers, Group Stage, Playoffs, and the Grand Finals for 1 Week. Each stage will have its unique requirements and rules, which players must adhere to.\n</pre><p><br></p><p><strong>Budget Ask &amp; Allocation:</strong></p><p><br></p><p>$500 USDC </p><p><br></p><ol><li><strong>Venue Rental - $0 FREE LGU\'s of the barangay sponsor</strong></li><li><strong>Equipment Rental (Tables, Extensions, Chargers, Wifi Internet &amp; etc.) - $100 USDC</strong></li><li><strong>Prize Pool - $200 USDC (distributed among the top-performing players)</strong></li></ol><p><br></p><ul><li><strong>First Place - $100 USDC (recieving a cash , trophy , certificates &amp; cc0 nouns esports merch)</strong></li><li><strong>Second Place - $60 USDC (recieving a cash , trophy , certificates &amp; cc0 nouns esports merch)</strong></li><li><strong>Third Place - $40 USDC (recieving a cash , certificates &amp; cc0 nouns esports merch)</strong></li></ul><p><br></p><pre class="ql-syntax" spellcheck="false">For 5v5 Category will be Single Round Robin Best of 1 the Top 4 Teams will proceed to the Semi Finals Round up to the Final Bound \n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\nFor 1v1 Category Organizers|Us will be picking to onboard our MOBA audience in the said event to play on our 1v1 and the said category has a Last man Standing Round Elimination  ( Exhibition Game )\n\nRules for 1v1: Marksman Only\n\nEither First Blood or Break the First Tower Wins!\nONLY MID \nBUFF FARMING ONLY\nNO FARMING\nFREE TO RECALL\n</pre><p><br></p><p>4.Marketing and Promotion - $50 USDC (social media campaigns, targeted advertising, etc.)</p><p>5.Miscellaneous Expenses - $50 USDC</p><p><br></p><p><strong>Deliverables:</strong>&nbsp;LAN setup for the tournament at a local venue in Barangay Bagay. Attractive prizes for the winners and runners-up of the tournament. Marketing and promotional activities to spread awareness about Nouns Esports and its mission to revolutionize esports with Web 3 technologies. Onboarding of MOBA fans into the world of Web 3 by introducing them to Nouns Esports and its decentralized platform.</p><p><br></p><h3>Droposal Idea: ROI</h3><ul><li><strong>When this event has been concluded, We will be doing partnering &amp; scouting to our possible local community best players to create a team that can compete to huge MLBB tournaments and proliferate more Nouns Esports :)</strong></li></ul><p><br></p><p><strong>Conclusion</strong>: In conclusion, the Nouns Esports Mobile Legends Bang Bang tournament in Barangay Bagay is an excellent opportunity to onboard MOBA fans into the world of Web 3 and spread awareness about Nouns Esports and its mission. The tournament will provide a platform for local players to showcase their skills, compete against each other, and win attractive prizes. With the right marketing and promotional activities, this tournament has the potential to become a significant event in the local esports industry.</p><p><br></p><p>Writer Proposer:</p><p><br></p><p><strong>Bossjcrypto.eth</strong></p><p>Pinoy Nouns Founder</p><p>IRL Proliferator</p><p>Writer Proposer</p><p>Gnars Athelete</p><p>Videographer</p><p>Meme Creator</p><p>Charity Community Manager</p><p>Event Organizer</p><p><br></p><p><strong>Past Nounish Work:</strong></p><p><a href="https://lilnouns.wtf/lilnoun/7594" rel="noopener noreferrer" target="_blank">IRL Lil Nouns Ads Waiting Shed (Bus Stop) Prop #106</a></p><p><a href="https://prop.house/nsfw/what-did-we-miss/2672" rel="noopener noreferrer" target="_blank">NSFW Winning Retro Proposal Nouns Dao Giveback to Aeta Agta People (FIP) ⌐◨-◨</a></p><p><a href="https://prop.house/nsfw/what-did-we-miss/2672" rel="noopener noreferrer" target="_blank">TNS #NounsGiveBack Winning Entry</a></p><p><a href="https://twitter.com/bossj_eth/status/1622012993004511232?s=20&amp;t=Crv2io4lBcAlAuoDU8BzLg" rel="noopener noreferrer" target="_blank">IRL Open Category Art Contest &amp; DIY Community Art in our College School</a></p><p><br></p><p>Twitter handle:&nbsp;<a href="https://twitter.com/bossj_eth" rel="noopener noreferrer" target="_blank">bossj_eth</a></p><p>Discord: bossj.eth#0939</p><p>Pinoy Nouns :&nbsp;<a href="https://twitter.com/PinoyNouns" rel="noopener noreferrer" target="_blank">PinoyNouns</a></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmeZwr5TJyhLXNxS43ei2ha8mySLVf1LtcCjMr19wN5Dqs"></p><p><br></p><p>Thankyou for reading our proposal, looking forward to make this happen. If you have questions &amp; feedback you can dm me or comment it down below so that we can discuss what the best for this proposals! To God be the glory.</p>',
    value: "500000000",
    createdAt: new Date("2023-06-27T07:38:33.867Z"),
    hidden: false,
    published: true,
  },
  {
    title: "LCA: Final Offensive League Sponsorship by Nouns",
    user: "0xbdaC0E485524a93568aCa49a431CCC5Da7F89215",
    round: "tournaments",
    description:
      '<h1>LCA\'S COMMITMENT TO NORTH AMERICAN COUNTER STRIKE</h1><p><br></p><p>Lights, Camera, Action (LCA) continues to push for the display of up and coming talent within the <strong>Counter Strike Scene in North America</strong>. Through this we have provided services to organizations and players within the scene that seek <strong>high quality production and promotion</strong>. This upcoming league seeks to reinforce the values of <strong>Innovation, Quality, Integrity, and Passion</strong>. We have been pushing for these goals since our establishment in 2021 and after 2 years we are ready to run a league that provides the up and coming generations of Counter-Strike with an event they can shine in and get the proper coverage for their achievement.</p><p><br></p><h1>LCA: FINAL OFFENSIVE LEAGUE</h1><p><br></p><p>This league has <strong>48 teams</strong> participating with <strong>over 240 players</strong> involved to compete in our event. This comes with <strong>40000 Twitter followers</strong> from the organizations of the teams involved. A variety of scenes are involved in this event including Collegiate, NA FE (Female), hidden: false, Open Players, and ECL Players. This diversity of groups allows for a great stage for all communities to interact and compete against one another.</p><h2>Important Info:</h2><p>-Event Dates: <strong>July 15-August 18th</strong></p><p>-Location: <strong>Online</strong></p><p>-Current Prize Pool: <strong>$2,000</strong></p><p><br></p><h1>BROADCASTING AND COVERAGE</h1><p><br></p><p>We will display this competition with our large Social Media presence through our Twitch Channel and many other up and coming community casters and streamers, such as your very own Bobby "stamina" Eitrem. Every single stream will follow standards set by LCA which includes the sponsors of the event\'s logo and information.</p><p><br></p><p>LCA\'s Main Stream will be <strong>providing high quality products</strong> such as a Customized LCA HUD, Pregame and Postgame Show, Custom Map Introductions, and Enhanced Graphics.</p><p><br></p><h1>SOCIAL MEDIA PRESENCE</h1><p><br></p><h2>LCA Twitter <strong>@LCABroadcasting</strong>:</h2><p>-Followers: 1330</p><p>-Combined Staff Followers: 43,321</p><p>-Total Impressions: 1,086,507</p><h2>LCA Twitch <strong>ttv/LCABroadcasting</strong>:</h2><p>-Followers: 1.9K</p><p>-Hours Watched: 13.2K</p><p>-Average Viewers During Marquee Matchups: 69</p><p>-Peak Viewers: 931</p><p><br></p><h1>NOUNS INVOLVEMENT</h1><h2><br></h2><h2>Social Media:</h2><p>-Logo Placement on League Twitter Graphics</p><p>-Sponsorship Announcement</p><p>-Promotion of Nouns Esports</p><h2>Twitch Livestream:</h2><p>-Sponsored Desk Segments (i.e. "Nouns Pregame Show")</p><p>-15-60 Sec Video ADs</p><p>-On Air AD Reads</p><p>-Logo Placement In Game</p><h2>Budget and Return on Investment:</h2><p>-$1500 for Sponsorship </p><p>--$1000 Added to Prize Pool</p><p>--$500 Payment of Production Staff (Producers/Casters)</p><p>-Pairs of paper noggles for LCA Casters (Playoffs)</p><p><br></p><p><br></p><p><br></p><p><br></p><p>Thank you for your consideration in supporting North American Counter-Strike and LCA,</p><p><br></p><p>Christopher Wear</p><p><br></p><p><br></p><p><br></p><p>Below are some graphics highlighting past mentions.</p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmb3pNqiiMDb8UJP4FcGeMrBw9SGrT9htcdYBr6Gk4BA1g"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmdbWQMd2KVC15i2iDPXbtrVoEpkUcNJeQDo81tiEMdvrE"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmW1oTwykTHdJY5kCC3DDKyiwtv4Y7Srxz2uS2XqnHJ2G1"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmRp2pZFyDXjv5sy3XHQVQJvwy6nQwWSwx4kUE33iVbCEp"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmPgLadbhFbKHjam8XqbHtVDq7WXrk85o3nVKZpcUYGr5Q"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmV8C9QqwPQy115NQDz2oWh5jNytc4a1MaMNhvm3jp6QC3"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmc6GqTi4rC7zigGfCGKMtE4jvHL8tHS1pfcg4hSskKkpo"></p><p><br></p><p><br></p>',
    value: "1500000000",
    createdAt: new Date("2023-07-04T19:23:02.658Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports Creator Map - Fortnite Tournament",
    user: "0x7Aad263162cbdCc89D13858588f5AbD4b359139C",
    round: "tournaments",
    description:
      "<p>Tournament Overview:</p><p><br></p><p>The Nouns Esports Fortnite Tournament is an exciting event aimed at promoting talent and competitiveness in the game, the tournament will take place on a map created exclusively for the event and will be available for every single fortnite player around the world, which will bring profits to everyone involved. </p><p><br></p><p>The tournament will feature a format of qualifiers and invitations, with 10 spots available for the top players competing in the qualifiers and 22 invites extended to professional players and content creators.</p><p><br></p><p>Tournament Format:</p><p><br></p><ul><li>Qualifiers (2 Stages): A total of 10 spots will be filled through two qualifiers, each with 5 spots available. Players will compete in the Late Game, and the top 5 players with the highest scores across all lobbies will advance to the finals.</li><li>Invited Players (22): 22 professional players and content creators have been directly invited to participate in the tournament.</li><li><br></li></ul><p>Prize Pool - Nouns Esports commits to offering a total prize pool of $1000, distributed as follows:</p><p><br></p><ul><li>1st Place: $400</li><li>2nd Place: $250</li><li>3rd Place: $150</li><li>4th Place: $100</li><li>5th Place: $100</li></ul><p><br></p><p>Profit Sharing - In addition to the cash prize pool, profits generated by the tournament will be divided as follows:</p><p><br></p><ul><li>30% to Nouns Esports</li><li>25% to player Moja</li><li>25% to player Ed</li><li>20% to Kronos, the map creator used in the tournament</li></ul><p><br></p><p>The remaining 200$ will go to planning and managing expenses.</p><p><br></p><p>Benefits for Nouns Esports - By sponsoring the Nouns Esports Fortnite Tournament, Nouns Esports will have the opportunity to:</p><p><br></p><ul><li>Increase brand visibility, with prominent branding in tournament promotion and materials.</li><li>Connect with a passionate Fortnite audience, including players, viewers, and fans of the game.</li><li>Reinforce its commitment to the eSports scene by directly supporting competition and players.</li><li>Opportunity to run brand advertisements and messaging during the tournament.</li></ul><p><br></p><p>At least 15 of the 22 invitees will be streaming the tournament, combined they should have more than 4,000 unique viewers watching the tournament.</p><p><br></p><p>Invitees list:</p><p><br></p><p>1: black</p><p>2: suetam</p><p>3: pulga</p><p>4: ed</p><p>5: moja</p><p>6: diguera</p><p>7: felipersa</p><p>8: kingbr</p><p>9: axadasz</p><p>10: k1ng</p><p>11: seeyun</p><p>12: pingulegal</p><p>13: ktz</p><p>14: phzin</p><p>15: scarpa</p><p>16: frosty</p><p>17: teuzz</p><p>18: edson</p><p>19: night</p><p>20: fazer</p><p>21: kbr</p><p>22: luluzito </p><p><br></p><p>Nouns Esports Commitment - Nouns Esports commits to providing the necessary funding for the total prize pool and operational costs of the tournament. Additionally, Nouns Esports will be recognized as the official sponsor of the event and will have exclusive marketing and promotional rights during the tournament.</p><p><br></p><p>Final Remarks:</p><p><br></p><p>The Nouns Esports Fortnite Tournament has the potential to become a standout event in the Fortnite eSports scene. We appreciate your interest in supporting this tournament and look forward to discussing further details and partnership opportunities in a future meeting.</p><p><br></p><p><br></p><p>Sincerely,</p><p><br></p><p>Bright - Contributor </p><p><br></p><p>Discord: brightspark.</p><p><br></p><p><br></p><p><br></p><p>About Map Creator Profit:</p><p><br></p><p>https://dev.epicgames.com/documentation/en-us/fortnite-creative/engagement-payouts-in-fortnite-creative</p><p>https://www.theverge.com/2023/3/28/23659492/fortnite-creator-economy-2-0-epic-games-catch</p><p>https://www.engadget.com/epic-will-share-40-percent-of-fortnite-purchase-revenue-with-creators-192924916.html</p><p><br></p>",
    value: "1200000000",
    createdAt: new Date("2023-10-03T21:40:55.881Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Galint Melee Open 2023 & Nouns Esports",
    user: "0xDE8EEb486e8a30eB93911e6352AB66E353Ee4AA1",
    round: "tournaments",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmNu4DsxdsSkC8vDGYFZo5usCRHDCXRFg3QaFowCfKT82K" style="letter-spacing: 0.02em; color: var(--brand-black);" width="604" height="302"></p><p><strong>Event Overview</strong></p><p>The Galint Melee Open (‘GMO’) series is one of the largest and most significant online tournament series for the Super Smash Bros. Melee competitive scenes. Launched in January of 2021 during the COVID-19 pandemic, the event ran high-production value, innovative online events leveraging cutting-edge Melee related tools. We pioneered how online Smash tournaments operate, utilizing startgg, Discord, and Slippi to make it all possible. The event is a showcase for some of the scene’s most talented event organizers, broadcast producers, content creators, and most importantly, competitors.&nbsp;</p><p><br></p><p>As it is online, this event is far more accessible to the community than having to travel to an in-person major tournament while still offering an amazing competitor and spectator experience. GMO 2023 is the return of the event series, being the first iteration since December 2022. We were able to keep Melee alive during a time when the world came to a halt, and strong online tournaments contribute to the longevity of our over 20 year old game.</p><p><br></p><p>Beyond multiple brackets of competition, the event also features a content segment where some of the best content creators in the scene will be premiering their latest or exclusive content. Instead of your Saturday morning cartoons, we’re bringing you a Saturday morning content block.</p><p><br></p><p>Our events have historically included some of the most influential competitors and commentators in the community, including folks such as: Mang0, Hungrybox, Cody Schwab, aMSa, Zain, Moky, Aklo, Kodorin, n0ne, Salt, Toph, Vish, The Crimson Blur, TurnDownForWalt, and hundreds more.&nbsp;</p><p><br></p><p><strong>Event Details</strong></p><p>Saturday, November 4th 2023 from 11:00 AM to 9:00 PM PT</p><p>Free-to-enter, open to North American Competitors (US/CAN/MEX)&nbsp;</p><p>2-hour Morning Content Segment</p><p>End-of-show Exhibition Matches</p><p>NA East &amp; West Singles Brackets, Matchmaking Ladders, Doubles Side Event</p><p>Broadcast on <a href="https://twitch.tv/galintgaming" rel="noopener noreferrer" target="_blank">https://twitch.tv/galintgaming</a>, VODs on <a href="https://youtube.com/c/galintgaming" rel="noopener noreferrer" target="_blank">https://youtube.com/c/galintgaming</a></p><p>Marketing and promotion on <a href="https://x.com/galintgaming" rel="noopener noreferrer" target="_blank">https://x.com/galintgaming</a></p><p>Expected 300 to 500 competitors, and 10,000 unique broadcast viewers</p><p><br></p><p><strong>Nouns Esports Integration</strong></p><p>“Noggles” for commentator shout-outs</p><p>“Noggles” On-stream Giveaway</p><p>Nouns integration into ad-slide rotation, video ad reels, overlay logo-rotation</p><p>Nouns-player ‘Aklo’ Interview Video featured in Content Segment, created by us</p><p>Merch Shop Collaboration Opportunity</p><p><br></p><p><strong>Our Ask</strong></p><p>$1750 USDC to be used towards event operation costs, prize pool contribution.</p><p><br></p><p><strong>Our Experience</strong></p><p>Galint Gaming Inc. is a Vancouver, Canada based esports company focussed on community, events, and technology. Our team has been hosting esports events for over a decade around the world. Our flagship event series, Battle of BC, was one of the most significant tournaments of 2023 with nearly 2000 attendees and well over a million unique viewers for Smash Bros. Melee &amp; Ultimate.</p>',
    value: "1750000000",
    createdAt: new Date("2023-10-02T22:22:00.885Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Save Santa Paws",
    user: "0x9E4D14FbBa2590cd9D723Ad0dd966c790361e064",
    round: "tournaments",
    description:
      '<p><strong> Our Project:</strong> Santa Paws is a passion project that comes from our founder KD_LinkStain.</p><p>She has rescued and rehomed over 60 animals in the past 5 years and wanted a way to combine her love for animals and video games in one place.</p><p><br></p><p>The way we have come up how to do this is having genuine animal shelter animals at the event who need homes and have their adoption fees waived. There will be 8 dogs there who need homes. The top 8 for Super Smash Brothers Ultimate, Super Smash Brothers Melee, and Rivals of Aether will all get to pick a shelter dog to walk out for their sets with. We will highlight the players and their selected friends for the day.</p><p><br></p><p>We have several people coming in from not only the US. But globally as well. We have players from Guatemala, France, Canada, Mexico, and so many more. KD and her team have spent the past 6 months traveling and making lifelong connections within the community with friends and competitors alike. all while sharing the passion of Santa Paws.</p><p><br></p><p>Our event was originally sponsored by 2 major businesses, they decided to back out a little over barely a month away from the month. This put an extreme financial strain on the Santa Paws team immediately. As KD was the financial backing of the whole entire grassroots operation aside from the sponsors. It was split 3 ways 35%,35%,30%.</p><p><br></p><p>This immediately put Santa Paws in a deficit of 65% for the tournament that is considered an A+ Tier for Melee and 2 players from an A+ Tier for Ultimate.</p><p><br></p><p>As a last-ditch effort and Hail Mary, KD made a plea to the smash community to help save Santa Paws. It ended up being a huge success with 471k views as well as over 706 retweets a little over a week ago. That link is here with our short video of 4 minutes.</p><p><br></p><p>https://x.com/SantaPawsSSBU/status/1721689901559656891?s=20</p><p><br></p><p><strong> Our Team: </strong>Cagt3000, Emerae , Sushinap , Syntax, KD_LinkStain , Solitaire, Burner, Skrat. (Can provide all contact information)</p><p><br></p><p>Everyone on our team has no less than 4 years of community experience. Cagt, KD , and Emerae have a a combined 15+ years of experience in organizing tournaments for the community.</p><p><br></p><p><strong> Tournament completion: December 8th is the start date. We will end on December 10th.</strong></p><p><br></p><p><strong> How will it have an impact? : </strong>Our tournament is the first of what will be many to serve not only our gaming community but our furry friends who need help as well. It will make an impact by providing that fun holiday experience that we all love in the mornings on Christmas but also having your favorite players in attendance as well!  Making an impact around the holidays always goes so far because people tend to be so giving and charitable when it comes to Christmas holidays!</p><p><br></p><p><strong> What would you do if selected?: </strong>We will 100% credit Nouns for helping save Santa Paws. We are working extremely hard daily to make sure Santa Paws is still possible. Thank you all for taking time to read this! We hope you consider our tournament for funding!</p><p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/Qmc6o5DJqESqtNfy8ufzms42PC7cVRVVGo8KBeS7f4yUTs"></p><p><br></p><p><br></p>',
    value: "2.5000000",
    createdAt: new Date("2023-11-14T02:17:28.823Z"),
    hidden: false,
    published: true,
  },
  {
    title: "ggQuest x The Machines Arena",
    user: "0x86a1d85Aa48343527D659A5682102D585a4B6fef",
    round: "tournaments",
    description:
      '<p><strong>Funds requested:</strong></p><p>$2,500</p><p><br></p><p>TL:DR: Sponsor the upcoming 4v4 esports tournament in collaboration with Ronin Network and The Machines Arena, featuring 64 top players.</p><p><br></p><p><img src="" width="576" height="576" style="cursor: nwse-resize;"></p><p><br></p><p>Description:</p><p><strong>Overview of the tournament:</strong></p><p><br></p><p><img src=""></p><p><br></p><p><br></p><p>We\'re excited to host a 4v4 esports tournament in collaboration with Ronin Network and The Machines Arena.</p><p>The competition will feature 64 of the best esports players, competing in a double-elimination bracket format.</p><p>With an emphasis on community engagement and top-tier gameplay, the event promises to offer exceptional entertainment and exposure for sponsors.</p><p><br></p><p><strong>Event Dates:</strong> 3/06/2023</p><p><strong>Prize Pool &amp; Giveaway:</strong> TBD</p><p><strong>Tournament Format:</strong> Double elimination bracket, 16 teams, 64 players</p><p><br></p><p><strong>Target audience:</strong></p><ul><li>Hardcore esports enthusiasts</li><li>Casual viewers interested in competitive gaming</li><li>Web3 gaming industry community</li></ul><p><br></p><p><strong>Reasons Nouns should care about this audience:</strong></p><ul><li>Access to a large and diverse audience in the esports community</li><li>Opportunity to expand branding and market reach</li><li>Establish a foothold in the rapidly growing web3 gaming industry</li></ul><p><br></p><p><strong>Brand integration (Tier 2: Silver Sponsor):</strong></p><ul><li>Mention in the first tweet of the tournament Twitter thread</li><li>Opportunity to provide custom prizes for winners (e.g. Nouns branded POAP NFTs)</li><li>Nouns related video footage played during commercial breaks</li><li>Reserved spot for the Nouns community in the tournament</li><li>Brand displayed during every Instant Replay/Replay-On-Demand</li></ul><p><br></p><p><strong>Marketing and promotion:</strong></p><ul><li>Social media coverage on platforms like Twitter, Facebook, and Instagram</li><li>Live streaming the tournament matches on Twitch (<a href="https://www.twitch.tv/gg_Quest" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/gg_Quest</a>)</li><li>Engaging Content Creators to stream the event</li></ul><p><br></p><p><strong>Budget and ROI (Return on Investment):</strong></p><ul><li>$2,500 Tier 2 Silver Sponsorship</li><li>Reach: Exposure to thousands of esports fans and the web3 gaming industry</li><li>Engagement: Increased interaction with gamers and potential customers</li><li>Conversion: Enhanced brand recognition and potential partnerships in the web3 gaming sector</li></ul><p><br></p><p><strong>Experience:</strong></p><ul><li>Proven track record of organizing high-quality tournaments</li><li>Success in attracting high viewership for past events</li><li>Collaborations with prominent names in the web3 gaming industry</li><li>Check out our previous tournaments:</li><li>ggDeadrop Tournament I:<a href="https://pentagonal-nyala-d5b.notion.site/Tournament-Moments-e9a78e75e8fa4b66b19f6315de12679c" rel="noopener noreferrer" target="_blank"> Moments</a> | <a href="https://www.notion.so/ggQuest-x-The-Machines-Arena-Tournament-Sponsorship-Packages-6551d35c6d9b42f58867382b459fabef?p=d7ebd7b21ba94797ab5f5f81f52d9a8b&amp;pm=c" rel="noopener noreferrer" target="_blank">&nbsp;Stats</a> (100k Reach, 5k views, 85 live)</li><li>ggDeadrop Tournament II:<a href="https://www.notion.so/ggQuest-x-The-Machines-Arena-Tournament-Sponsorship-Packages-6551d35c6d9b42f58867382b459fabef?p=766c15579d8f4b59b88c85f8c6725dbe&amp;pm=c" rel="noopener noreferrer" target="_blank"> Moments</a> |<a href="https://www.notion.so/ggQuest-x-The-Machines-Arena-Tournament-Sponsorship-Packages-6551d35c6d9b42f58867382b459fabef?p=6919d01898d146a8b83b205da7d94be7&amp;pm=c" rel="noopener noreferrer" target="_blank"> Stats</a> (100k Reach 6k views, 167 live)</li></ul><p><br></p><p><br></p><p>You can find additional information on below page:</p><p><br></p><p>https://www.notion.so/ggQuest-x-The-Machines-Arena-Tournament-Sponsorship-Packages-6551d35c6d9b42f58867382b459fabef</p><p><br></p><p><br></p><p>Cheers!</p><p><br></p><p><br></p>',
    value: "2500000000",
    createdAt: new Date("2023-05-16T18:45:03.033Z"),
    hidden: false,
    published: true,
  },
  {
    title: "EUROPEAN HALO INFINITE PRO SERIES CIRCUIT",
    user: "0xc714233E7b1d7CfA057a7e7225bDA362BAc51248",
    round: "tournaments",
    description:
      '<h1><strong>EUROPEAN HALO INFINITE PRO SERIES CIRCUIT</strong></h1><p><br></p><h2><strong><u>1.&nbsp;Overview of the tournament</u></strong></h2><p>Halo Infinite is a competitive FPS game, actually based in 4 regions : North America, Europe, Mexico and LATAM, Australia and New Zealand (ANZ). In Halo Infinite first year (2022) we had an EU Pro Circuit managed by HCS (Halo Championship Series). But this year (2023), hidden: false, they choose to change the circuit format and to make a full Open Circuit. We aim with this project to bring back this Pro Circuit, with EU Top16 Teams from Opens qualified to challenge into 5 Monthly $1000 USDC Tournaments.</p><p><br></p><h2><strong><u>2.&nbsp;Target audience</u></strong></h2><p>Our target audience for this EU Halo Pro Series Circuit extends beyond Europe and beyond European Halo Community. We aim to bring viewers all around the world, watching Top European Teams competing in this circuit. We aim to bring HCS attention to our circuit and get support and visibility from them, like they did previously for our EU Halo FFA Spring Series Circuit.</p><p><br></p><p>With EU Pro Teams competing in our circuit, we will put all our efforts to bring visibility to the competition and to Nouns Esports.</p><p><br></p><p>By partnering with us, Nouns Esports will have the opportunity to connect with the European Halo community with a consequent audience. All the tournaments will be broadcasted by our partners <a href="https://twitter.com/UK_UniHalo" rel="noopener noreferrer" target="_blank"><strong>@UK_UniHalo</strong></a> on their twitch channel and promoted regularly on all our social medias.</p><p><br></p><h2><strong><u>3.&nbsp;Brand integration</u></strong></h2><p>As our partner, Nouns Esports will receive logo placement on every tournament assets, including livestream overlays, roadmap, and social medias announcements, enhancing brand visibility to our audience. Additionally, we would like to extend the brand integration by interviewing you during, at least, the first tournament of the circuit to introduce your structure to the community.</p><p><br></p><h2><strong><u>4.&nbsp;Marketing and promotion</u></strong></h2><p>As I said previously every tournament will be promoted on our social medias (Team Vuelta, UK_UniHalo, VaktorTV). The circuit state will also be updated regularly on Twitter. We aim to bring visibility to the circuit and to Nouns Esports using the Top EU Organisations competing in our circuit and with our promotional strategy on our social medias.</p><p><br></p><h2><strong><u>5.&nbsp;Budget and ROI (Return on Investment)</u></strong></h2><p>We believe this partnership offers you a strong visibility and a new audience to reach for Nouns Esports and a formidable opportunity to extend your brand on a new scene.</p><h2><strong><u>6.&nbsp;Experience</u></strong></h2><p>Experience in organising EU Halo Tournaments Circuits :</p><ul><li>EU HALO FFA SPRING SERIES 350€ CIRCUIT (Weekly) : (<a href="https://twitter.com/HCS/status/1653181187240923136" rel="noopener noreferrer" target="_blank">https://twitter.com/HCS/status/1653181187240923136</a>)</li><li>EU EGL HALO 4V4 $150 OPEN TOURNAMENTS (Monthly) : (<a href="https://twitter.com/EGL_Europe/status/1639374666681790468" rel="noopener noreferrer" target="_blank">https://twitter.com/EGL_Europe/status/1639374666681790468</a>)</li></ul><p><br></p><h2><strong><u>7. Format</u></strong></h2><p>This project aims to create an EU Pro Circuit on Halo Infinite in 2023:</p><ul><li><strong>Total Prize Pool : $5000 USDC</strong></li><li><strong>5 Open Qualifiers Monthly</strong></li><li><strong>5 Cups Monthly</strong></li><li><strong>Double Elimination</strong></li><li><strong>HCS Rules</strong></li><li><strong>TOP16 EU Teams</strong></li><li><strong>$1000 USDC per Cup</strong></li></ul><p><strong>\t\t\t\t\tTOP1 : $400 USDC</strong></p><p><strong>\t\t\t\t\tTOP2 : $300 USDC</strong></p><p><strong>\t\t\t\t\tTOP3 : $200 USDC</strong></p><p><strong>\t\t\t\t\tTOP4 : $100 USDC</strong></p><p><br></p><p><strong>Broadcast Team : </strong><a href="https://twitter.com/UK_UniHalo" rel="noopener noreferrer" target="_blank"><strong>@UK_UniHalo</strong></a><strong> / </strong><a href="https://twitch.tv/UniversityHaloLeague" rel="noopener noreferrer" target="_blank"><strong>https://twitch.tv/UniversityHaloLeague</strong></a></p><ul><li>Complete Broadcast Team</li><li>Production</li><li>Host</li><li>Casters</li><li>Observers</li><li>Tournament Admins</li><li>Twitch Moderators</li></ul><p><br></p><p><strong>Visibility and Viewerships</strong></p><p><br></p><p><strong>Pro Teams Competing :</strong></p><ul><li><a href="https://twitter.com/Quadrant" rel="noopener noreferrer" target="_blank">QUADRANT</a></li><li><a href="https://twitter.com/natusvincere" rel="noopener noreferrer" target="_blank">NATUS VINCERE</a> (NAVI)</li><li><a href="https://twitter.com/Aw0babobs" rel="noopener noreferrer" target="_blank">AW0BABOBS</a></li><li><a href="https://twitter.com/JLINGZesports" rel="noopener noreferrer" target="_blank">JLINGZ ESPORTS</a></li><li><a href="https://twitter.com/BH3_Esport" rel="noopener noreferrer" target="_blank">BH3 ESPORTS</a></li></ul><p><br></p><p><strong>Partners :</strong></p><ul><li><a href="https://twitter.com/FACEITHalo" rel="noopener noreferrer" target="_blank">@FACEITHALO</a></li><li><a href="https://twitter.com/TeamVUELTA" rel="noopener noreferrer" target="_blank">@TeamVUELTA</a> and <a href="https://twitter.com/OneXWear" rel="noopener noreferrer" target="_blank">@OneXWear</a></li><li><a href="https://twitter.com/UK_UniHalo" rel="noopener noreferrer" target="_blank">@UK_UniHalo</a></li></ul><p><br></p><h2><strong><u>8. Roadmap</u></strong></h2><p><img src="https://prophouse.mypinata.cloud/ipfs/QmZ8BazVNNBLtLZokhrtK94b3cqwxsdBHnFaY7cfDUeV9w"></p>',
    value: "5000000000",
    createdAt: new Date("2023-05-12T18:07:05.671Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Warehouse War 3 w/ Nouns Esports",
    user: "0x9cCF68eC3B60352BBfd9058f3d577560EFb49299",
    round: "tournaments",
    description:
      "<h2>Description:</h2><p>(Resubmitting per our discussion on the Contributor call on 6/9 as previous proposal is soon to expire)</p><h2>The Tournament:</h2><p>Warehouse War is the largest recurring regional events for Super Smash Brothers in the state of Tennessee and following in the legacy of large events of the past such as WTFox. The Southeast has long since been under-represented in the national stage and our community is large and hungry for well-run events with lots of exposure and attention. Our previous iterations have exceeded community expectations and we're looking to expand and grow as much as possible with help from the community as well as potential partners like Nouns.</p><h2>Date/Location/Misc:</h2><p>August 20th, 2023. Nashville, Tennessee. Rocketown Skatepark within walking distance of Broadway (Downtown strip of Nashville and the Nissan Stadium for the Tennessee Titans). We have currently 204 confirmed pre-registered entrants and looking to grow between now and then to exceed 300. We're running Super Smash Brothers Melee, P+, and Ultimate.</p><p>Notable Entrants:</p><p>Magi, Grab, Paladin, Will, YDelerious, Dany, Jin, Tavares, Majersk, Blue, Panko, Reeve, Hunybear, and many more to come especially with your assistance.</p><p>What we can do for you:</p><p>We'll have ad reads during the stream to discuss what you all are all about as well as having our commentators speak directly about Nouns and anything specific that you all with for us to represent. We'll have slide cards displayed during downtime and during designated ad breaks to show off your brand. Nouns logo represented on all marketing and tournament badges and shirts. If you all wish to provide the Nouns glasses for our commentators or staff/attendees to raise brand awareness we can also do that.</p><h2>Sponsors:</h2><p>Metafy - $200</p><p>901_Esports - $250</p><p>Smash Paws - $500</p><p>Juvee - 14 12-pack cases for players/staff</p><p>Nashville Valley Smash - $900 ($300 pot bonus for Melee/P+/Ultimate)</p><p>Sponsor $ primarily goes towards bringing out notable players from surrounding regions as well as paying for flights/accommodations of headliner players that the community wants to bring out. Some also goes towards venue costs depending on the amount raised via venue fee from attendees.</p><p>Note: Sponsors are also welcome to request where their money goes if they wish (i.e. flying out a particular player or a pot bonus for a certain game of their choice)</p><h2>Experience:</h2><p>8+ Years in the Melee and Project M/+ scene working directly in the Tennessee area. I'm the head Tournament Organizer for the Warehouse War series and worked heavily alongside the WTFox series, ETSUCon events, and Unpunishable tournament series. Extensive connections and knowledge base of players in the southeast region from the Carolinas, Tennessee, Kentucky, Alabama, Georgia, etc.</p><p>https://www.start.gg/tournament/warehouse-war-2-ft-logan-grab-iori-dany-madtyro-ydelirious/details</p><p>https://www.start.gg/tournament/warehouse-war-a-middle-tn-melee-pm-regional/details</p><p>https://www.start.gg/tournament/etsu-con-2018/details</p><p>https://www.start.gg/tournament/etsu-con-2017-100-pot-bonus-for-smash-4-melee/details</p><p>https://www.start.gg/tournament/etsu-con-2023/details</p><p>https://www.start.gg/tournament/unpunishable-v-noggin-floggin/details</p><p>https://www.start.gg/tournament/unpunishable-4-oil-panic-x-conapalooza/details</p><p>https://www.start.gg/tournament/unpunishable-3-road-to-famicon-the-worm-show/details</p><p>https://www.start.gg/tournament/wtfox-2/details</p><h2>Socials:</h2><p>https://twitter.com/coxspelledc_o_x (My personal Twitter)</p><p>https://twitter.com/TNMelee (Tennessee Melee and P+ Twitter I run)</p><p>https://www.twitch.tv/btssmash (Main stream. 422k followers)</p><p>https://www.twitch.tv/btssmash2 (Second stream. 105k followers)</p><p>https://www.twitch.tv/tennesseemelee (Our state Twitch stream)</p><p>https://www.twitch.tv/wagr0 (Side stream we will have owned by one of the stream runners at Tipped Off)</p><h2>THANKS!</h2>",
    value: "1000000000",
    createdAt: new Date("2023-07-30T09:58:04.569Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Proposal for The Noggles Cup - Fortnite Edition",
    user: "0x3d5FFDE7A481Fe31549f7bFE53DD850b23c689dE",
    round: "tournaments",
    description:
      '<p>I am writing to present a proposal for the Noggles Cup - Fortnite Edition, a highly anticipated tournament that aims to bring together professional Fortnite players from South America for an exciting competition. The event will not only showcase the exceptional skills of these players but also provide significant exposure for Nouns Esports.</p><p><br></p><p>To assist with everything necessary to ensure we have everything set and ready for the cup, I have&nbsp;<a href="https://twitter.com/Ment0sbtw" rel="noopener noreferrer" target="_blank">https://twitter.com/Ment0sbtw</a>&nbsp;- Organizer&nbsp;<a href="https://twitter.com/Zikaue" rel="noopener noreferrer" target="_blank">https://twitter.com/Zikaue</a>&nbsp;- Organizer to help, they are known for their work at&nbsp;<a href="https://twitter.com/GamersClubFN" rel="noopener noreferrer" target="_blank">https://twitter.com/GamersClubFN</a>&nbsp;and have years of experience at organizing and hosting events.</p><p><br></p><p>I have&nbsp;<a href="https://twitter.com/bacondzn" rel="noopener noreferrer" target="_blank">https://twitter.com/bacondzn</a>&nbsp;for the arts, we\'ll need: 1 for the invitations, 1 for announcement, 1 for the winners. I think you are all familiar with his work, I\'ve been posting at Mojak and Origins\' proposal thread, he is very talented and I think he deserves to be with us on this.</p><p><strong>Format:</strong></p><p>The Noggles Cup - Fortnite Edition will be an Arena Duo tournament featuring 50 duos. To ensure a high level of competition, we will invite 40 duos directly to the event. Additionally, we will conduct a qualifying round to allow 10 additional duos to secure their spots in the tournament.</p><p><br></p><p><strong>There are two possible qualifying scenarios:</strong></p><p>One Qualify - Top 10: The top 10 duos from the qualifying round will advance to the Noggles Cup.</p><p>OR</p><p>Two Qualifies - Top 5: The top 5 duos from each qualifying round will advance to the Noggles Cup.</p><p><br></p><p><strong>Prizes:</strong></p><p>We believe that offering attractive prizes will not only motivate the participants but also generate interest among the Fortnite community.</p><p>The prize distribution for the top 3 duos is as follows:</p><p>1st Place: $250 2nd Place: $150 3rd Place: $75</p><p><br></p><p>I thought about giving a 50$ bonus for Mojak and Origins if they are the Noggles Cup winners (can change that if you feel we don\'t need it).</p><p><br></p><p><strong>Expenses:</strong></p><p>To ensure the smooth execution of the Noggles Cup - Fortnite Edition, we have estimated the following budget:</p><p><br></p><p>Organizers: $200</p><p>Editor: $25</p><p>Fees for transfers (sad reality): $50</p><p>The organizers\' expenses will cover various aspects such as event management, logistics, prize distribution, and coordination with the participants. The artist\'s fee will be allocated to ensure the production of high-quality content, including promotional videos and highlights.</p><p><br></p><p><strong>Promotion and Exposure:</strong></p><p>We are committed to maximizing exposure for the Noggles Cup - Fortnite Edition. The event will be extensively streamed, allowing Fortnite enthusiasts from around the world to witness the intense competition. We anticipate that this tournament will attract significant attention due to the participation of over 80 professional Fortnite players from South America.</p><p><br></p><p>To enhance the reach of the event, we will utilize social media platforms, particularly Twitter, for the invitation process. 40 duos were selected and will be invited via Twitter, and to secure their spots, they will be required to post about their invitation, along with the hashtag #NogglesFortniteCup (we can change the #) and tag @nounsesports @mojakkkk and @originsbtw .</p><p>This approach will create a buzz among the Fortnite community and increase the visibility of Nouns Esports. The Noggles Cup - Fortnite Edition is a fantastic opportunity for Nouns Esports to establish its brand as a leader in organizing high-quality Fortnite tournaments. With the participation of professional players, attractive prizes, and extensive promotion, we anticipate a successful and engaging event that will captivate the Fortnite community.</p><p><br></p><p>We kindly request your consideration and support for this proposal. Please feel free to reach out to us if you require any further information or have any questions regarding the Noggles Cup - Fortnite Edition. We look forward to your positive response.</p><p><br></p><p>(List of duos that\'ll be invited to the cup:&nbsp;<a href="https://docs.google.com/document/d/1IMviaEUxkIs8HW9hRGHizZx-snBZKDJO/edit?usp=share_link&amp;ouid=104819803980468078375&amp;rtpof=true&amp;sd=true" rel="noopener noreferrer" target="_blank">https://docs.google.com/document/d/1IMviaEUxkIs8HW9hRGHizZx-snBZKDJO/edit?usp=share_link&amp;ouid=104819803980468078375&amp;rtpof=true&amp;sd=true</a>)</p><p><br></p><p><strong>Writer and Proposer:</strong></p><p>Bright Spark</p><p>Contributor&nbsp;<a href="https://twitter.com/nounsesports" rel="noopener noreferrer" target="_blank">@nounsesports</a></p><p>Community Manager&nbsp;<a href="https://twitter.com/Nebula_web3" rel="noopener noreferrer" target="_blank">@Nebula_web3</a></p><p>Nouncil Member&nbsp;<a href="https://twitter.com/NounsBr" rel="noopener noreferrer" target="_blank">@NounsBr</a></p><p><br></p><p><br></p><p><strong>Thank you for your time and attention.</strong></p>',
    value: "800000000",
    createdAt: new Date("2023-08-01T06:24:00.357Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "1v1 ME IN GYMCLASS VR TO WIN CUSTOM MADE NIKE AF1 SHOES MADE BY GYMCLASS VR",
    user: "0x7DCab39470BcB2DE58146B948e20fC5342aa4a18",
    round: "tournaments",
    description:
      '<p>I will be hosting a 1v1 tournament in GymClass vr on YouTube live for my viewer to participate in, the first person to beat me wins the shoes for completely free. The tournament will be placed in the game in my GM court, you can get in by following my in game name (Aomine VR)</p><p>this will be streamed on YouTube and to get in you must state the secret code that will be in the pinned chat in the live. Each person will have 1 opportunity to 1v1 me every 5 people that I go against (you can 1v1 me and if you lose, after 5 people have had their go you are free to try again). This will be hosted on this YouTube channel&nbsp;<a href="https://youtube.com/@AomineVR" rel="noopener noreferrer" target="_blank">https://youtube.com/@AomineVR</a>&nbsp;and will be on Thursday 8pm est! If no one beats me it will follow up onto Friday 8pm est. I’m doing this because my subscribers have supported me so much and I wouldn’t be here without them and I want to give back by giving them an opportunity to win these custom GYMCLASSVR shoes. I will also be doing this while wearing nouns esports glasses so everyone can see them! Then after the tournament is complete I will post it into a video on YouTube for everyone to watch. I hope you can join me and try your best to beat me, I won’t hold back ;)!<img src="https://prophouse.mypinata.cloud/ipfs/QmdE8mtWcpcy9bSAgGA9HzQ2yEbjWcNCi5CjNS2e9JPYHK"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmZZwKGYTixW28SmK1UeQjYWvXpNRebVcfuHW4NeBed4rw"></p><p><br></p><p><br></p>',
    value: "null000000",
    createdAt: new Date("2023-05-10T19:49:22.069Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Phantoms Esports X Nouns Esports : Free Fire Winter Warzone 2023",
    user: "0xeC343da51bb3f0b8C4D31CD199881BA0439DAE9E",
    round: "tournaments",
    description:
      '<p><strong>Event Overview</strong></p><p><br></p><p><br></p><p><br></p><p>With the Free Fire Winter Warzone 2023 is a tournament for underdogs teams which plays T2 &amp; T3 scrims. The event will be online and registration will be open for 12 days and the tournament matches will be concluded in 3 days.</p><p><br></p><p><br></p><p><br></p><p><strong>Event Details</strong></p><p><br></p><p><br></p><p><br></p><p>Registration duration - 22 Nov to 2 Dec</p><p><br></p><p><br></p><p><br></p><p>Participating regions - India,Bangladesh,Nepal</p><p><br></p><p><br></p><p><br></p><p>Expected no. of team - 200-250 (800-1000 participants) *Each team will have 4 players.</p><p><br></p><p><br></p><p><br></p><p>Matches duration - 4 Dec to 6 Dec</p><p><br></p><p><br></p><p><br></p><p>Live stream on - https://www.youtube.com/@Phantoms-esports</p><p><br></p><p><br></p><p><br></p><p>Marketing - The event will be marketed among 100k-200k gamers. We will be using Discord communities to market the event &amp; all.</p><p><br></p><p><strong>Nouns Esports Integration</strong></p><p><br></p><p>Tournament promoted as<strong> Free Fire Winter Warzone 2023 powered by Nouns Esports</strong></p><p><br></p><p>Tournament poster will include Nouns Esports logo &amp; name.</p><p><br></p><p>Integration of Nouns Esports during live streaming: -</p><p><br></p><p>Shout Out by caster.</p><p><br></p><p>Overlay graphics. </p><p><br></p><p><br></p><p><strong>Our ask :-</strong></p><p><br></p><p>$400 to cover prize pool and operational cost of event.</p><p><br></p><p><strong>About us:-</strong></p><p><br></p><p>Phantoms Esports is a South Asia based Esports organization and Web3 gaming guild.We are working to uplift the eSports community and revolutionize it with the Web3 ecosystem. Phantoms Esports is partnering with  brands and platforms to push Esports and Web3 Gaming all over the world. Phantoms Esports also aims to promote web3 Gaming by educating university students about it.</p><p><br></p><p>Our socials :-</p><p><br></p><p><a href="https://linktr.ee/Phantomsesports26" rel="noopener noreferrer" target="_blank">Phantoms eSports | Twitter, Instagram | Linktree</a></p>',
    value: "400000000",
    createdAt: new Date("2023-11-10T16:50:15.627Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Midwest Dota 2 League LAN",
    user: "0x353eF54dbc4797a539E7b6D79556754F0c2cD65A",
    round: "tournaments",
    description:
      "<p>Midwest Dota 2 League or MD2L. </p><p>We have been in operation since 2017, hosting amateur Dota 2 tournaments for casual Dota players. We have given out over $12,000 for the prize pool. Funding will help us with our annual Chicago LAN in Spring 2024. </p>",
    value: "1000000000",
    createdAt: new Date("2023-05-15T18:24:38.926Z"),
    hidden: false,
    published: true,
  },
  {
    title: "GEMS Cup: Women Division | Americas",
    user: "0x1b7C75571E53f10881E2cc6a5bca72493dfd7168",
    round: "tournaments",
    description:
      '<h2>Overview of the tournament</h2><p>GEMS Cup is a weekly Dota 2 tournament that aims to promote inclusivity and diversity within the gaming landscape. The tournament features a single elimination format, attracting talented teams with players from minoritized genders. With a $35 USDC prize pool, GEMS Cup offers an exciting platform for participants to showcase their skills and talents. We currently have a significant turnout of both participants and viewers, with an average viewership of 50 on the main channel and 50 to 100 on player perspectives streams.</p><h2>Target audience</h2><p>Our target audience for GEMS Cup extends beyond passionate gamers to include families who enjoy watching and engaging with esports tournaments. This demographic consists of gaming enthusiasts across various age groups, including parents, siblings, and friends of the participating players. By partnering with GEMS Cup, Nouns Esports will have the opportunity to connect with not only the players but also their support systems, fostering positive brand associations and building relationships with a broader audience.</p><h2>Brand integration</h2><p>As an official sponsor, Nouns Esports will receive prominent logo placement on tournament assets, including livestream overlays, banners, and player\'s perspective streams, enhancing brand visibility to a passionate and diverse audience. Additionally, branded content integration opportunities, such as sponsored segments during broadcasts and interviews, will allow for organic brand promotion. By aligning Nouns Esports with GEMS Cup, we can leverage the tournament\'s reach and credibility to enhance brand recognition, while also creating opportunities for the entire gaming community to forge meaningful connections with a diverse range of gamers. This partnership fosters inclusivity, showcases Nouns Esports\' commitment to embracing and celebrating differences, and reinforces a sense of unity within the gaming landscape.</p><h2>Marketing and promotion</h2><p>Our marketing strategy primarily relies on the active participation of the players to generate organic exposure. By encouraging them to share the tournament assets on their personal social media platforms, we aim to reach their followers and the wider gaming community. This grassroots approach allows us to create buzz and generate interest in GEMS Cup. Additionally, we will prominently showcase Nouns branding on tournament assets to enhance brand recognition. Through this combined effort, we strive to engage the gaming community and esports enthusiasts, creating an immersive viewing experience through professional casting, comprehensive analysis, and engaging post-game interviews.</p><h2>Budget and ROI</h2><p>We believe that this partnership offers a strong return on investment for Noun Esports. Metrics such as reach, engagement, and conversions will be tracked throughout the tournament to provide concrete data on the campaign\'s success.</p><p><br></p><p>Here\'s the budget breakdown for the GEMS Cup weekly tournament:</p><p><strong>Total Estimated Budget Requested: $1400 USDC</strong></p><p><br></p><p><strong>Prize Pool Allocation:</strong></p><ul><li>First Place: $25 USDC per tournament</li><li>Second Place: $10 USDC per tournament</li></ul><p><br></p><p><strong>Tournament Operations:</strong></p><ul><li>Staffing and Administration: Covered by Chompix Gaming</li><li>Tournament Platform Fees: Covered by Chompix Gaming</li><li>Equipment and Technical Setup: Covered by Chompix Gaming</li></ul><p><br></p><p><strong>Marketing and Promotion:</strong></p><ul><li>Social Media Advertising: Covered by Chompix Gaming</li><li>Influencer Collaborations: Covered by Chompix Gaming</li><li>Graphic Design and Creatives: Covered by Chompix Gaming</li></ul><p><strong>Livestream Production:</strong></p><ul><li>Commentator: Covered by Chompix Gaming</li><li>Streaming Platform Fees: Covered by Chompix Gaming</li></ul><p><br></p><p>With a budget of $1400 USDC, we can cover approximately 20 weeks of tournaments (assuming two tournaments per week).</p><h2>Experience</h2><p><a href="https://liquipedia.net/dota2/User:Chompix/Chompix_Gaming" rel="noopener noreferrer" target="_blank">Chompix Gaming</a>&nbsp;has extensive experience in organizing esports tournaments and working with brands. We have successfully executed similar events in the past, forging strong partnerships and delivering impactful results. Our commitment to professionalism, attention to detail, and understanding of the gaming landscape within the Dota 2 community make us the ideal partner for Noun Esports initiatives.</p><p><strong>Previous Event: GEMS Cup 4</strong></p><p><br></p><ul><li>Event Assets:&nbsp;<a href="https://www.behance.net/gallery/169863687/GEMS-CUP-Logo-Design" rel="noopener noreferrer" target="_blank">GEMS Cup Logo Design</a></li><li>Liquipedia Userspace:&nbsp;<a href="https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/4" rel="noopener noreferrer" target="_blank">GEMS Cup 4</a></li><li>Event Clip:&nbsp;<a href="https://youtu.be/OeL-eVxAcWM" rel="noopener noreferrer" target="_blank">GEMS Cup 4 Clip</a></li><li>VOD:&nbsp;<a href="https://www.twitch.tv/videos/1813270619" rel="noopener noreferrer" target="_blank">GEMS Cup 4 VOD</a></li><li>Commentator Experience:&nbsp;<a href="https://liquipedia.net/dota2/User:Chompix/Broadcasts" rel="noopener noreferrer" target="_blank">Chompix</a></li></ul><h2>Stream Metrics</h2><h2>GEMS Cup 4 Final Bo3: Soul Angels vs Team Calvas</h2><ul><li><a href="https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/4" rel="noopener noreferrer" target="_blank">Liquipedia</a>&nbsp;Userspace</li><li><a href="https://twitchtracker.com/chompixgaming/streams/48439609949" rel="noopener noreferrer" target="_blank">TwitchTracker</a></li><li>Stream Duration: 1h58m | Avg Viewers: 35 | Peak Viewers: 50</li></ul><p><br></p><h2>GEMS Cup 3 Final Bo3: Soul Angels vs Team Valquirias</h2><ul><li><a href="https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/3" rel="noopener noreferrer" target="_blank">Liquipedia</a>&nbsp;Userspace</li><li>Main Stream&nbsp;<a href="https://twitchtracker.com/chompixgaming/streams/48392464957" rel="noopener noreferrer" target="_blank">TwitchTracker</a></li><li>Stream Duration: 2h50m | Avg Viewers: 32 | Peak Viewers: 45</li><li>Player\'s Perspective: belica&nbsp;<a href="https://twitchtracker.com/belica_/streams/41288638761" rel="noopener noreferrer" target="_blank">TwitchTracker</a></li></ul><p>&nbsp;&nbsp;&nbsp;- Stream Duration: 1h54m | Avg Viewers: 251 | Peak Viewers: 330</p><h2>GEMS Cup 2 Final Bo3: Equipo Rocket vs Team Calvas</h2><ul><li><a href="https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/2" rel="noopener noreferrer" target="_blank">Liquipedia</a>&nbsp;Userspace</li><li>Main Stream&nbsp;<a href="https://twitchtracker.com/chompixgaming/streams/48359807789" rel="noopener noreferrer" target="_blank">TwitchTracker</a></li><li>Stream Duration: 2h57m | Avg Viewers: 64 | Peak Viewers: 104</li></ul><p><br></p><h2>GEMS Cup 1 Final Bo3: Equipo Rocket vs Team Valquirias</h2><ul><li><a href="https://liquipedia.net/dota2/User:Chompix/GEMS_Cup/1" rel="noopener noreferrer" target="_blank">Liquipedia</a>&nbsp;Userspace</li><li>Main Stream&nbsp;<a href="https://twitchtracker.com/chompixgaming/streams/48320031581" rel="noopener noreferrer" target="_blank">TwitchTracker</a></li><li>Stream Duration: 2h56m | Avg Viewers: 64 | Peak Viewers: 82</li></ul><p><img src="https://prophouse.mypinata.cloud/ipfs/QmapZSqYUbBLTcyRTYuMP5Lq9QLpcwkuCrvMuH4nw7Uezc"></p><p><br></p><p><br></p>',
    value: "1400000000",
    createdAt: new Date("2023-07-31T15:10:10.855Z"),
    hidden: false,
    published: true,
  },
  // Compete
  {
    title: "THOME - DREAMHACK DALLAS PROJECT",
    user: "0x20C8c369F68dB2B67dfCF368395652cF24826E2e",
    round: "compete",
    description:
      '<p><br></p><pre class="ql-syntax" spellcheck="false">THOME - DREAMHACK DALLAS PROJECT\n\n⦁ 1  TOURNAMENT DETAILS\n\nMode : Zero Build Duos\nFormat : The top 12 duos from Heats 1, 2, 3 and the\ntop 14 duos from Heat 4 will qualify for the Finals (totaling 50 duos). In the Finals, all duos have a guaranteed prize pool of 1000$.\nLocal : Dallas, Texas - USA\n\nSchedule :\nFriday, June 2 : Heat 1 - 3pm to 6pm\nHeat 2 - 7pm to 10pm\n\n\nSaturday, June 3 : Heat 3 - 3pm to 6pm\nHeat 4 - 7pm to 10pm Sunday, June 4 : Finals - 12pm to 3pm\nPrize Pool :    PLACEMENT    PRIZE\n\n\n1st    $45,000\n2nd    $25,000\n3rd    $18,000\n4th    $15,000\n5th    $12,000\n6th    $10,000\n7th    $9,000\n8th    $8,000\n9th    $7,000\n10th    $6,000\n11th    $5,000\n12th    $5,000\n\nPLACEMENT PRIZE\n13th    $5,000\n14th    $5,000\n15th    $5,000\n16th    $4,000\n17th    $4,000\n18th    $4,000\n19th    $4,000\n20th    $4,000\n21-30th    $2,000\n31-40th    $1,500\n41-50th    $1,000\n\n\nTotaling 250,000$\n\n\n\n\n\n\nSome words from Thome about Dreamhack Dallas :\n\n“This will be my last fortnite championship. I am going to move to Canada and start focusing on Content Creation, I want to do something memorable.”\n\n⦁  2 THOME CREDENTIALS\nGabriel Thomé is a professional player and content creator, with excellent numbers and results, below is his\n analytics :\n\n\n\nTwitter : Twitch:\n162K followers 467K followers\n\nInstagram : 100K followers\n\nTikTok : YouTube : Earnings :\n110K followers 5.2K followers\n42.000$\n\n\n\n⦁ 3  DREAMHACK AUDIENCE\n\nDreamHack is one of the main Fortnite tournaments in the world, bringing together the main players\nfrom different regions.\nEngaging millions of concurrent viewers.\n\n\n\n\n⦁   4 SPONSORSHIP BENEFITS\nGabriel Thome is a content creator with great numbers, and is willing to represent Nouns on his social networks, in addition DreamHack has a huge audience, this partnership should yield a good image for Nouns.\n\n⦁  5  BUDGET\nFlights: 1.100 \nPc Rental: 665/680$\nTicket: 129$ \nHotel: 328$ \nUbers: 100/200\n\nFoods: 200$\n\nTotal=2.500\n\n⦁ 6   ROI\n\nWe hope this partnership will yield thousands of views for Nouns and Thome is willing to offer 50% of his prize pool won at DreamHack Dallas\n\n⦁  7  PARTNERSHIP DETAILS\n\nThis partnership would last until the end of DreamHack Dallas, until then Thome has the responsibility of representing Nouns on his social networks, as well as Nouns must bear the costs of the budget. 50% of the prize pool Thome wins at DreamHack Dallas must go to Nouns.\n</pre><p><br></p><p><br></p><p><br></p>',
    value: "2950000000",
    createdAt: new Date("2023-05-10T02:49:32.555Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports NBA2K Team",
    user: "0x10bCb64cFfDbdd200Be865138A33aD9A843dF242",
    round: "compete",
    description:
      '<p>Hello everyone, </p><p><br></p><p>\tim typing here hoping myself and my team can work together with Nouns, probably not everyone here is very familiar with this NBA 2K games, but I can make sure that it\'s worth investing for us because it\'s not much we are gonna ask for. Just imagine basketball players/arena/design/jerseys with all the stuff about Nouns. We need an organization we can represent on all the tournaments we are gonna participate on. And we basically want Nouns pay our entry fee\'s, that\'s it, we don\'t ask for salaries or nothing. </p><p>\tUsually the league admins ask for about ~50euro per team to enter their league, they do take about a month-2 months to finish, depends how fast paced it is. Majority of the teams already have orgs, also some CS teams like LDLC, Movistar Riders etc have their NBA2K teams so there are big orgs that are in this with us. </p><p>\tI am streaming on twitch all the league games, my all time high was 70+ viewers, the average I would say is atleast 10-30, it\'s not much I understand, but we are not asking for much also in exchange, I can rep the brand on the channel or something, whatever it takes for us to find us a place that we can stick with long term, representing one and only team. </p><p>\tHopefully we can have talk about possibilities of this project because it\'s cheap and possibly good for both sides.</p><p><br></p><p>my twitter: https://twitter.com/Extreme5K</p><p>my twitch: https://twitch.tv/extreme5k</p><p><br></p><p>1. Tournament information: I can\'t describe one specific tournament for NBA 2K23, because there are plenty, but the one we are looking into at the moment is https://twitter.com/DLA2KL, pretty sure next season starts in about two weeks. The format usually is two conferences/groups with ~20 teams each that u have to play twice in regular season, then top 32 goes into playoffs where u play bo3 series.</p><p><br></p><p>2. Your credentials: I am a big esports player since very long time. With nba games I am familiar since 2018, and playing it competitively since 2020, didn\'t reach much yet, but recently our team finished 4th in of the tier 2 leagues. </p><p><br></p><p>3. Target audience: Well Nouns is a pretty big name, so everyone wo gonna see us play with their name on, they gonna atleast follow it on twitter or start looking more into it, about it, Like I mentioned before I have an average 10-30 views with an all time high 70+-, and hopefully these numbers will go up in the future as we can make ourselves bigger names in the community.</p><p><br></p><p>4. Sponsorship benefits: Everytime we play the league on, we will post it on twitter, your brand will get atleast little bit more popular that\'s for sure, because not everyone knows Nouns. You are gonna have your own in game basketball court and jerseys to represent the brand. I am even down to put something on my own twitch channel since I will be representing the team possibly.</p><p><br></p><p>5. Budget: It\'s not much, every league owner asks about 50euro per team to join the league. So let\'s say if we are gonna play in 2 leagues at the same time it\'s gonna be around 100euro, the league take 1-2months to complete, so lets round it up and say its 50-100euro per month that we ask for the entry fee\'s.</p><p><br></p><p>6. ROI: Im not sure how can we return the investment, but what we can make sure is to represent the brand for a long term, making it more popular, maybe it will help buy merch or something. Like I said 90% of the nba 2k community teams have big orgs under their name, LDLC, DUX Gaming, BSK, Bayern, Movistar Riders, Partizan, Crvena Zvezda, Fenerbache and more, all of these big names have their own nba 2k team. </p><p><br></p><p>7. Partnership details: We want to stay under Nouns game as long as possible, we play the game competitively for multiple years. Having to find an org that we can stay with is hard but also is what we are hoping for. So maybe we can stay with Nouns for long term - multiple years, as long as we play nba game. </p><p>\tLet\'s say for now we make a deal until september, (it\'s when the new nba 2k24) releases. So from this 05-11 until 08-31 does that sound good? Let\'s say its just a trial period, and if we do good enough maybe can just become long stable term team, we can confirm we won\'t ask for more, because the leagues fee\'s stay the same all the time, and we do not ask for salaries or something specific, we just want to compete under this name.<img src="https://prophouse.mypinata.cloud/ipfs/QmTC7gHVt2LZv9gEqcdt6uC4GLzKtdDQwxUyGPFsMvq3uR"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmcqZJYsEwzQ989kaT9yGWEaw3JKsiyebBb1fyXyKKkQBy"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmeLSdXqdr4PqPNTUGD3pDfsU27x7BWneJLgBLq1uM9jRx"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmXCXu6hTcyxbHDzBxqu2KrQ7KvNes2AHxqQbmTeTaCL9i"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmPD56oZ1wvE3TVsnSLoMKWgcy3GL7hkjuAremjpWw2m4x"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmSKWP3bY6N8YhbvhgccPQsSDtGLbEKwUXbCXWLKJKegHM"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmam3maxLZoz8VsrZrp1zBXw6RrKaoXbixSKqiMaghGpiq"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmR5KAncxjcEt1kCSG5diKDZ9rr4qNe81tjAnUAPSeFsgB"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmVHRCHZioSn4KwnHx6GHTKpWy38oHNCnB3Ehzq5DGpgoL"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmVLeARNTX5LtbF9KwBa8KWeb2z2uD5JSjN6ckEUFtm2DX"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmbQqQYKCgYnEdBme3Hw3kpnDip5Y1CssaAqJfANcDPDss"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmeXowvXia2jKYy75zVanhHiiAZh7jnSxwrBQxtHHeVoni"></p><p><br></p><p><br></p>',
    value: "450000000",
    createdAt: new Date("2023-05-11T12:40:12.394Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Content Sponsorship Collaboration with NOUN for 3xpGG",
    user: "0x648b53726D55c24a4C173CCF7f7EAEC38018a281",
    round: "compete",
    description:
      '<p>1. Event information:</p><p>3xpGG is hosting the first ever web3 gaming event in LA covering ALL things web3 gaming including esports tournaments. first looks, and finished gaming products are yet to be seen by the general public. The dates are June 7th and 8th at the Pasadena Convention Center. I want to go to this event because I am a content creator in the web3 space giving the most UP TO DATE news on all games in the space and this is a great opportunity for content and exposure for games and creators attending.</p><p><br></p><p>2. My Credentials:</p><p>I have been in the gaming content creation space since High School circa 2014. Over the past year, I have dedicated myself to being the creator that brings web3 gaming to the general gaming audience to showcase the integrity of the blockchain and AAA titles like Star Atlas, Illuvium, STG Football, etc. Over the past 3 months (90 days), hidden: false, I took a halt to streaming and dedicated myself to creating content on Youtube, Tiktok, as well as shorts. During this stretch of grinding nothing but content for 90 days, I have amassed 265 subscribers totaling at the current moment 414, 112.4k Views (on youtube alone), hidden: false, 943 hours of watch time, totaling 210k impressions. In such a short time, I have amassed incredible numbers and have been showcasing web3 games regularly on my channel. Those are just my youtube numbers, I can also add that I have a following of 2,000 on Twitter, as well as 700 on TikTok, with total views of over 200,000. I am also the Co-Host of the web3 gamer podcast with Iceyyy Gaming as well as in touch with many prominent creators in the space such as YellowPanther, SpikeReacts, Kate Irwin, etc. (all data can be provided with screenshots if need be)</p><p><br></p><p>3.Target Audience:</p><p><br></p><p>The target audience for this type of content will be competitive gamers and casual alike age ranges of 14-45. Not only will I be showcasing these games, but I will also be a part of the Champions Assenscion e-sports competition which I will record document, and post on the channel. Every single piece of content that I post would have a NOUN ad in it as well as can put a logo in the corner of each video I make for the event.</p><p><br></p><p>4.NOUN Brand Exposure </p><p><br></p><p>Every single piece of content that I post would have a NOUN ad in it as well as can put a logo in the corner of each video I make for the event. The amount of following I am gaining in such a short amount of time as well as the impressions and click through rate I am already gaining on ALL video content platforms can add a great amount of exposure for the NOUN organization.Over the past 3 months (90 days), hidden: false, I took a halt to streaming and dedicated myself to creating content on Youtube, Tiktok, as well as shorts. During this stretch of grinding nothing but content for 90 days, I have amassed 265 subscribers totaling at the current moment 414, 112.4k Views (on youtube alone), hidden: false, 943 hours of watch time, totaling 210k impressions. In such a short time, I have amassed incredible numbers and have been showcasing web3 games regularly on my channel. Those are just my youtube numbers, I can also add that I have a following of 2,000 on Twitter with over 400k impressions, as well as 700 on TikTok, with total views of over 200,000. In this proposal, I can make 5 or more videos from this event, ALL which will have NOUN ad in each video.</p><p><br></p><p>5. Budget </p><p>I am requesting 1,500 USDC to cover my airfare, hotel, and ticket expenses.</p><p><br></p><p>Flight: NYC-LA $550 </p><p>Hotel: 3 Nights hotel $800</p><p>Ticket: $250</p><p>Total- 1500</p><p><br></p><p>6.ROI </p><p>So for the ROI category, I will copy and paste my youtube impressions and engagement as well as twitter. As I stated previously all videos from this event will be sponsored by you so you will always be in the videos.</p><p>Youtube (90 days) - 414 total subscribers 112.4K views 943 hours of watch time 210k global impressions</p><p>Twitter (28 days) - 420k impressions 9k profile visits 1500 followers </p><p>Tiktok (60 days) - 85k views 5,600 likes 1,000 profile views</p><p>The brand will get exposure on all of those channels because I post the same video content on all 3 video media sites.</p><p>With Waypoint Gaming run by Spike, I am used to doing promotions all of the time most recently with Celestia Ultimate (NFT champions). We did a video giveaway and the video overnight got 2k impressions on Youtube, and amassed the brand twitter account followed by hundreds in a 3-day giveaway video.</p><p><br></p><p>7. Deliverables</p><p>noun will receive a 5-video minimum ad sponsorship that will spread across Youtube, Tiktok, and Twitter for all 3xpGG content that I will be filming at the event. In return, I would receive 1500 for travel accommodations to the event. The videos will be posted over the course of the month of June. the event is June 8-9, when I return the content will go into the editing phase. 2 videos per week, 5 videos spanning the entire month of June.</p><p><br></p><p><br></p><p>UPDATE  5/18 Spoke with creator BLU3MOJO and came up with an idea for a split accommodation.</p><p><br></p><p>REVISED:</p><p>Paisan - $750</p><p>MOJO - $750</p><p><br></p><p>3 videos from myself, 3 videos from MOJO. 2  creators then get help for some  travel expenses to the show.</p><p><br></p><p><br></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmafpxJ1XeEuJDj2qNjrU2JaiX2go4SijySzqu71J2n44A"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmXKBW2hji3CkHhqHrunW5f1z4miCrKD1q25paoN6vJjSE"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmbAFbb73RteKnNBfLmYYPxysqCUH5pRpSugUPRMBSq8rT"></p><p><br></p><p><br></p>',
    value: "1500000000",
    createdAt: new Date("2023-05-11T16:18:07.156Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports Tekken 7 team",
    user: "0x3216Ba40B951D72C0330046Ca526156d7B8E29FC",
    round: "compete",
    description:
      "<p><strong>Description:</strong></p><p>Hello team Nouns ESports, My name is Hafiz Hamza and i am a professional Tekken 7 player from Pakistan.</p><p>You must search about Pakistan Tekken community. </p><p>I noticed that Nouns Esports doesn't have it's own Tekken 7 team.</p><p><br></p><p><strong>Introduction to Tekken 7:</strong></p><p>Basically Tekken 7 is a individual fighting game. We don't need teams to compete in tournaments.</p><p><br></p><p><strong>My Proposal:</strong></p><p>I want to join Nouns Esports organization as a player at the moment. I am playing Tekken for 15 years since i was 10 years old.</p><p>I have a lot of knowledge, skills and experience in this game. I have played many tournaments till now.</p><p>In Tekken 7 i won two tournaments. I want to compete in more tournaments because now the Tekken scene is much bigger than before worth millions of dollars.</p><p>I am sharing here some important links related to upcoming big tournaments.</p><p><br></p><p>It's going to take place in Saudi Arabia </p><p><br></p><p><br></p><p>https://twitter.com/Gamers8GG/status/1645777469700730880?t=JhbkTnCihpeOAtyJ5D6v7A&amp;s=19</p><p><br></p><p>Here's Bandai Namco Twitter link, around 20+ big events announced this year.</p><p><br></p><p>https://twitter.com/BNEesports?t=PZIPP_In3vatJnzJQ8K-8w&amp;s=09</p><p><br></p><p>It's really amazing because Tekken 7 is a popular game, it's played in Europe, Asia, USA and it's has a very big fan following.</p><p><br></p><p><strong>Budget: </strong></p><p>Tekken 7 tournaments are LAN tournaments, means it's associated with travelling if you want to participate in any tournament you must be present there physically. I will need traveling expenses including Tournaments entry fee, food and residence. 1 national tournament costs me around 60$. There will be around 4 to 5 tournaments every month. I will need monthly wages around 300$ or traveling expenses which is almost the same amount.</p><p><br></p><p><strong>Why choose me? </strong></p><p>I have 15 years of experience in Tekken which is more than enough i think.</p><p>Pakistani Tekken community is the strongest of all. </p><p>Here's my social links:</p><p><br></p><p>https://twitter.com/GenuineGuy11?t=gS_8K-jkrwRF613SqwqemQ&amp;s=09</p><p><br></p><p>Email: hamzamunir496@gmail.com</p><p><br></p><p>Instagram</p><p><br></p><p>https://instagram.com/genuinguy11?igshid=OTk0YzhjMDVlZA==</p><p><br></p><p><br></p><p>Currently i am participating as an individual but i believe that soon there will be many organization with Tekken 7 teams. some of big companies already supporting players like, Red bull, toougly eSports, genuine gaming, echofox etc.</p><p>I know which player has more potential so if you ever needed i will make a professional team for Nouns Esports!!!</p><p> </p><p><strong>ROI</strong>: Just like other sponsored players have a contract with organization, the organization gets specific percentage % out of prize money. Sometimes it is 15% or 20% may be. We can have the same deal for sure. </p><p><br></p><p><strong>Sponsorship Benefits:</strong></p><p> Everytime we play the league on, we will post it on twitter, your brand will get atleast little bit more popular that's for sure, because not everyone knows Nouns. You are gonna have your own in game Tekken 7 court and jerseys to represent the brand. I am even down to put something on my own twitch channel since I will be representing the team possibly. When we stram on twitch it gets minimum 1500+ views. Tekken 7 has a fan base all over the world. </p><p><br></p><p><strong>Partnership details</strong>: i want to stay under Nouns game as long as possible, i play the game competitively for multiple years. Having to find an org that i can stay with is hard but also is what i am hoping for. So maybe i can stay with Nouns for long term - multiple years, as long as i play Tekken game.</p><p><br></p><p>I played against an international player for the first time just two weeks ago and eliminated him out of tournament.</p><p>I eliminated Philippines best Tekken 7 player 'PBE Doujin' of tournament.</p><p><br></p><p>You can watch here. </p><p><br></p><p><img src=\"https://prophouse.mypinata.cloud/ipfs/QmPeAym9ATrVn8oJt6DGQYQ7fdPqeRqnTuBtEiC5FBAdxd\"></p><p> </p><p>It proves that i have potential to compete in international events and make Nouns eSports feel proud. I need your support to make this happen.</p><p>We can do a lot more in future if our collaboration gets successful. </p><p>I hope you understand my concerns.</p><p>If you need any other information please don't hesitate to reach me. </p><p><br></p>",
    value: "300000000",
    createdAt: new Date("2023-05-27T12:12:01.972Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Help me attend 3XP expo at Los angeles",
    user: "0xd5b1Ad83FBdd3357d6D132A66D2d9aF7587F085E",
    round: "compete",
    description:
      '<p>As a volunteer at 3XP expo event being held on June 8-9 at Los angeles i will be working alongwith my team to setup  and also will be receiving frontdesk registrations.</p><p><br></p><p>Being an E-sports player, this is the biggest opportunity of my life to volunteer in such a big event.</p><p><br></p><p>It will boost my Esports career and also i will get the opportunity to meet and work with E-sports pl<span style="letter-spacing: 0.02em; color: var(--brand-black);">ayers coming from different parts of the globe.</span></p><p><br></p><p>I request you to help me raise some funds so that I can volunteer at 3XP expo.</p><p><br></p><p>I have attached my invitation letter from 3XP as a proof.</p><p><br></p><p>Thanking you,</p><p>Kashfi anwar </p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmPj664rs7XtxUwjqCX2VtoCrMSgUwofja7UsVoYp4zG82"></p><p><br></p><p><br></p>',
    value: "1500000000",
    createdAt: new Date("2023-05-31T05:38:22.206Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Origins + Frosty @DreamHack Open ft. Fortnite - Sweden",
    user: "0x965E30796C562c87a6859613D9408a7480bD914D",
    round: "compete",
    description:
      "<p>Dear voters,</p><p><br></p><p>We are seeking funding support for the players Origins and Frosty to participate in Dreamhack Sweden https://dreamhack.com/summer/fortnite/, an event held in Jönköping from June 16th to 18th. This funding will cover part of the expenses such as airplane tickets, accommodation, transportation, food, event tickets, and a manager to ensure a smooth and successful experience.</p><p><br></p><p> Origins and Frosty are top-tier players in the esports community, boasting a combined follower count of over 650,000 on their social media platforms:</p><p><br></p><p>Frosty:</p><p>https://twitter.com/yfrostyx?s=21&amp;t=iFDSwd_bPYgcodIft8bspA</p><p>https://instagram.com/vinicius.frosty?igshid=NTc4MTIwNjQ2YQ==</p><p>https://www.youtube.com/channel/UC03D8yx1iIKPtfDroE1qbwA</p><p><br></p><p>Origins:</p><p>https://www.twitch.tv/originsbtw</p><p>https://twitter.com/originsbtw</p><p>https://www.youtube.com/channel/UCjWvOanRUHh2EhcRYINxfQw/featured</p><p><br></p><p>They have also achieved remarkable accomplishments individually, with Origins currently holding the title of the best no build player in Brazil, and Frosty standing among the top players in their field.</p><p><br></p><p>Dreamhack Sweden is scheduled to take place from June 16th to 18th, making it a time-sensitive opportunity. We kindly request a prompt response within the next two days to secure the necessary arrangements for the event.</p><p><br></p><p>Origins and Mojak recently had a chance to qualify for the Gamers8 Riyadh tournament in Saudi Arabia. Unfortunately, they faced numerous challenges during the qualifiers. Their drop location was limited and shared with another duo who did not follow the agreed-upon strategy, ultimately compromising Origins and Mojak's performance. Additionally, on the one map they decided to deviate from the strategy, they managed to score 80 points, showcasing their true potential. However, due to the timing, it was too late to secure the qualification. We see this opportunity to compete at Dreamhack Sweden as a second chance for Origins and an opportunity for redemption, now with Frosty as his duo.</p><p><br></p><p>To enable Origins and Frosty's participation, we are seeking funding in the amount of 3,500 USDC. While this amount will not cover all the incurred expenses, we are committed to covering the remaining costs ourselves if we receive the support of Nouns Esports. Here is a breakdown of the expected expenses:</p><p><br></p><ul><li>Airplane tickets: $3,500</li><li>Food: $60 x 2 per day</li><li>Transportation: $200</li><li>Hotel: $973</li><li>Dreamhack Sweden event tickets: $85 x 2 + taxes</li><li>Manager: $400</li></ul><p><br></p><p>In return for Nouns Esports' funding support, Origins and Frosty are committed to promoting and showcasing the brand extensively on their social media platforms. They will create engaging content, including videos and posts, before and during and right after the event, highlighting their journey and experience as representatives of Nouns Esports. This content will be designed to reach their combined follower base of over 650,000 and increase brand visibility.</p><p><br></p><p>It is important to note that the requested budget does not cover all expenses. However, with your assistance, we aim to represent Nouns Esports with excellence at Dreamhack Sweden and secure a spot to compete at Gamers8 Riyadh, Saudi Arabia in July.</p><p><br></p><p>We sincerely appreciate your consideration and support for this endeavor. The opportunity to represent Nouns Esports at such a renowned event would not only showcase the skill and dedication of Origins and Frosty but also strengthen the brand presence and recognition of Nouns Esports within the esports community. </p><p><br></p><p>Given the time-sensitive nature of this request, we kindly ask for a response within the next two days. Thank you very much for your attention and consideration. We eagerly await the opportunity to represent Nouns Esports on the international stage.</p><p><br></p><p>Sincerely,</p><p><br></p><p>bright spark#1084</p>",
    value: "3500000000",
    createdAt: new Date("2023-06-07T00:46:25.326Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "Need sponsorship to start my Gaming/eSports career in Mobile Gaming eSports ",
    user: "0x7Aa1c37D42346F3E9c60983530191cc4150Aa9F4",
    round: "compete",
    description:
      "<h1><img src=\"https://prophouse.mypinata.cloud/ipfs/Qmbjdhe8N3v8nMHvYXJDwx2V7BwUAYEqafhAGxioMBfK5s\"></h1><h1><br></h1><h1><img src=\"https://prophouse.mypinata.cloud/ipfs/QmUofrZhNobyn8m5n61VWMfd4g8PC69AdsQXdkFmiuRUFN\"></h1><h1><br></h1><h1><img src=\"https://prophouse.mypinata.cloud/ipfs/QmRdtfC8Q9UHzLHR8AxRqmNMxHhWf7DjaqrcLhfW5wRqM3\"></h1><h1><br></h1><h1><img src=\"https://prophouse.mypinata.cloud/ipfs/QmPpwYJ9ec6NR9f7drkBL9CqyXz4qbYydbhWKPEFpAdgKc\"></h1><h1>Hello Nouns eSports, I'm Aren, I'm a former pro clash royale player, I'm not played in the official league ( ClashRoyale league ) but in other leagues. I've given you some of my matches screenshots⤵️ against World's top pros and CRL World Finalists. But because of some community reasons, I left the game. But I wanna make my career in Gaming/eSports and I wanna GoPro in the upcoming Mobile title Valorant Mobile. But because of a bad device, I can't do so. I need your help to upgrade my device. I know I'm totally random for you out of nowhere asking help. But Believe me i have talent and skills to become the best. Plz Help and Support. Please🙏 let's have a Conversation. If you need any type of information or anything. Please🙏 DM me. My Twitter/Instagram:- Aren0g. It'll be a Life Changing opportunity for me, Give me One Chance to work with you. Remember everyone starts from Zero. Plz🙏 Answer🤞</h1><h1><br></h1>",
    value: "1000000000",
    createdAt: new Date("2023-06-04T06:51:58.346Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Go to EVO2023",
    user: "0x78c779391BBF505e841f4019829D8E3A955da1Fc",
    round: "compete",
    description:
      '<h1><strong>Tournament Information</strong></h1><p>EVO2023</p><p>August 4 - August 6</p><p>In Las Vegas</p><p>The world\'s largest fighting game festival.</p><p>I will be participating in the Street Fighter 6 division.</p><p>The tournament will be a double elimination format.</p><p>The first and second days are qualifiers and the last day is the final tournament.</p><p>For me, EVO is a special tournament and an essential part of my career as a</p><p>player.</p><p>This year\'s EVO will be one of the most watched, especially with the release of</p><p>Street Fighter 6.</p><p><br></p><p><br></p><h1><strong>Credentials</strong></h1><p>I am a professional Street Fighter gamer operating in Japan. I also have a</p><p>professional license recognized by a Japanese organization. </p><p>I have also been ranked first in Street Fighter V\'s online point ranking.</p><p>In the end, I finished second in the world.</p><p>I am a member of a gaming team, but the team does not provide travel support.</p><p><br></p><p><strong>Twitter follower 2400</strong></p><p><a href="https://twitter.com/ITK_itsukick" rel="noopener noreferrer" target="_blank"><strong>https://twitter.com/ITK_itsukick</strong></a></p><p><br></p><p><strong>Twitch follower 5000</strong></p><p><a href="https://www.twitch.tv/fps_itsukick" rel="noopener noreferrer" target="_blank"><strong>https://www.twitch.tv/fps_itsukick</strong></a></p><p><br></p><p><strong>Video</strong></p><p><a href="https://youtu.be/qvXOQyBoNo8" rel="noopener noreferrer" target="_blank">https://youtu.be/qvXOQyBoNo8</a></p><p><a href="https://youtu.be/CUvJrSwSU3U" rel="noopener noreferrer" target="_blank">https://youtu.be/CUvJrSwSU3U</a></p><p><br></p><p><br></p><h1><strong>Tournament Achievements</strong></h1><p>2020</p><p>A.M.G Cup 2on2 1st</p><p>FAVCUP mini Top4</p><p>A.M.G Cup 3on3 1st</p><p>Tokyo Online Party 3on3 1st</p><p>TOPANGA TV CUP2 2nd</p><p>Capcom Pro Tour Online 2020 Asia East2 Top4</p><p>iXA CUP 2on2 1st</p><p><br></p><p>2021</p><p>THE ONLINE WARRIOR#51 3rd</p><p>THE ONLINE WARRIOR#53 1st</p><p>THE ONLINE WARRIOR#55 2nd</p><p>A.M.G M-CUP SFV 2on2 1st</p><p>CAPCOM Pro Tour 2021 Japan3 65th</p><p><br></p><p>2022</p><p>CAPCOM Pro Tour 2021 Japan4 13th</p><p>THE ONLINE WARRIOR#66 1st</p><p>CAPCOM Pro Tour 2022 Japan 49th</p><p>CAPCOM Pro Tour 2022 World Warrior Japan2 25th</p><p><br></p><p>2023</p><p>EVO Japan 2023 65th</p><p>Tokyo Online Party 3on3 10th 2nd</p><p><br></p><p><br></p><h1><strong>Sponsor Benefits</strong></h1><p>I will strongly promote your brand on my social networking sites and on my live streams. Whenever I have the opportunity to wear my uniform to tournaments, your brand logo will be printed prominently and will be seen by many people.Especially considering that this year already has over 9,000 people who entered, there are sure to be more eyes both in the venue as well as on the livestream who will have a chance to see the Nouns logo.</p><p>Last year\'s EVO2022 had a total of 8049 participants, with a peak viewership of 62351 and an average viewership of 24625.</p><p><br></p><p><br></p><h1><strong>Budget</strong></h1><p>Airfare 1,900USDC</p><p>Round-trip airfare from Japan to Las Vegas.</p><p>All participation fees and local accommodation expenses are to be paid by me.</p><p><br></p><p><br></p><h1><strong>Target Audience</strong></h1><p>People who like fighting games and are interested in esports.</p><p>Also, it is very rare for Nouns to enter fighting games, so the team should get a lot of attention.</p><p><br></p><p><br></p><h1><strong>ROI</strong></h1><p>Since Noggles and shirts will be worn at the tournament, people who see them will notice Nouns and buy Nouns esports products, which will increase the Nouns brand power.</p><p>Even if I\'m not #1, just staying in the Top 64 is a power of word of mouth.</p><p><br></p><p><br></p><h1><strong>Partnership Details</strong></h1><p>For the time being, EVO2023 is the only tournament that has been decided, so</p><p>how about a contract from July 30, 2023, before the tournament, to August 6,</p><p>2023, during the tournament?</p><p>However, you will be participating in many international tournaments in the</p><p>future. I will continue to rely on Nouns for assistance, as I cannot expect any</p><p>help from my gaming team. I believe that with long term activity and my good</p><p>performance I can grow the Nouns brand.</p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmZmfk1TPBF2Zz1w6JvWDKCgBEqPY18zzg6DwgznaSJxML"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmSQxkT2DKaGkuTKmzLBdKrGga1F7dAXB9rMvHRS2vD82s"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmQFWnLffy32dwg88R9epSK9wJZDLNT7v2CN4APqGUnftQ"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmcMBL9jXVwJK9eqP9FthrrKWn4XY8s6AMQUYKvau8LXfS"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmdxLBbhbhqsxzHdXWAjfCLPCGj2FJabxMkPEz9EpUurf7"></p><p><br></p><p><br></p>',
    value: "1900000000",
    createdAt: new Date("2023-07-08T11:59:35.484Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports Farlight 84 Team",
    user: "0x14Aa7CAFb8871cAFA3E02688B66150a8EC338579",
    round: "compete",
    description:
      '<p>Hello everyone, </p><p><br></p><p>My name is Micah "geo" Peoples and I am writing this proposal in hopes to grow the Nouns Esports community and awareness of the brand, particularly in the APAC region, with a newly released, up-and-coming battle royale game Farlight 84 through creating our own tournaments, competing in tournaments as they become available, like the All-Capsuler CUP, and creating content around the game.</p><p><br></p><p><strong>Why work with Terra Squad?</strong></p><p><br></p><p>Started in 2021, Terra Squad maintains a roster of competitive gamers and streamers who stream out of a house in Manila Philippines. We started streaming and competing in p2e games like Axie Infinity, with multiple of our streamers reaching the top 95th percentile on the leaderboards in multiple seasons and earning AXS rewards. Our gamers have a background in Mobile Legends, ranking in the highest tier. Currently we have a player that is top 50 in Farlight 84. </p><p><br></p><p><span style="letter-spacing: 0.02em; color: var(--brand-black);">twitter: https://twitter.com/terrasquadgg</span></p><p>facebook: https://www.facebook.com/Terrasquadgg/ <strong>(1k+ likes)</strong></p><p>twitch: https://www.twitch.tv/terrasquadgg <strong>(751 subs)</strong></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmd3HZjsrfqEnYiPnzFkquTjwDtFrrxZbgmNFCUawe1WD1"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmVWgQFar3tLHWyvMSxMp2JXkozWzBvu6RFZ2MxCJr9c9o"></p><p><br></p><p>Some of our streamers have their own pages, like divinedianasaur with 22k subs on twitch: https://www.twitch.tv/divinedianasaur</p><p><br></p><p>Now we\'ve transitioned to web2 games, particularly Valorant, Call of Duty Mobile, and now having a large focus on Farlight 84. </p><p><br></p><p>We\'ve been slowly building a Farlight 84 community, currently it\'s about 100 people. A lot of them are primarily interested in tournaments with cash prizes, so once those kick off, growth will accelerate.  </p><p><br></p><p><strong>Why Farlight 84?</strong></p><p><br></p><p>Farlight 84 is one of the fastest growing battle royale games with over 10 million downloads in just a few months. As a new game it encourages creators and helps promote those that show results, and a new game gives us the opportunity to have good SEO and become notable influencers for the game. </p><p><br></p><p><strong>What will the funds be used for?</strong></p><p><br></p><p>There are a few costs regarding Farlight 84</p><ul><li>Each time you create a room to play a custom match with custom participants, that costs 99 diamonds (~$1)</li><li>Each time you want to create a clan that costs 200 diamonds ($2)</li></ul><p><br></p><p>We will be hosting weekly tournaments with a cash prize ($10-$50) and each time we\'ll need a custom room. This will draw attention so we can have an official Farlight 84 sanctioned Nouns Esports Farlight 84 tournament. </p><p><br></p><p><strong>The Content Play</strong></p><p><br></p><p>Our philosophy is to use content to aggregate eyeballs and drive our KPIs. We stream on our twitch usually 5 times a week for 3 hours, usually getting 10 viewers with a peak of 150 on our page and 350 on dianasuar\'s page. Our team creates brand assets from twitch banners, to intro/outro graphics, to jerseys that can be used in our content to help increase Nouns Esports brand awareness  </p><p><br></p><p><strong>Conclusion </strong></p><p><br></p><p>I see this as a few months test trial and if you all deem it successful, we continue from there. Hopefully the will be only the beginning of a fruitful long-lasting partnership</p><p><br></p><p><br></p><p><strong>Axie Infinity Ranking</strong></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmZ9oKBnW4Rf1a5M8yXm5WUEf12wMbAnsCMTmpjjtYxSR9"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmYegeiu8ZrJyWSSpwsovCtKEtpV3P7A3BccikHpVgsRiM"></p><p><br></p><p><strong>Farlight 84 Ranking</strong></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmcPGBKXEoYTn9SFP3YKbgoCQkgHNu4kmNL46Uu5GDe4Nb"></p><p><br></p><p><strong>Social &amp; Stream Stats</strong></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmea6PKbkYSEeKaZ7dVegkb9xZWcwK8LZCEJhyCZ63BaB4"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmRJLuSUXXeQPdCWodMKQZQHDJku2qsFVMgBDQmVVNN33q"></p><p><br></p><p><br></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmUbUNeh5Gk22ztTmqZa2saHRmHfvuXZ2Hq6hXUvthLCEo"></p><p><br></p><p><strong>Farlight 84 Shop</strong></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmcFf4Xd8yJ799sPzTV6JaQ2L9kPzmsKJ8iFbniube4MvK"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmVdHfZ69a3RUbt9TeBMUwKteiyCeHhKZJiy6CZqCaFDgt"></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmVBYQ1jA7eHF9w4YbpERp7TXxjfsmtejFMMEaRq5otkGn"></p><p><br></p><p><br></p>',
    value: "550000000",
    createdAt: new Date("2023-07-14T19:24:54.400Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Send Betty to EVO 2023",
    user: "0xdFbe67b7b01952571d9F54B89eB582beD901688b",
    round: "compete",
    description:
      '<p _msttexthash="33631273" _msthash="191">Title: Send Betty to EVO 2023</p><p _msttexthash="33631273" _msthash="191">Funds Requested: 2300 USDC</p><p _msttexthash="33631273" _msthash="191">TLDR: I want to attend my very first EVO World Tournament in Las Vegas.</p><p _msttexthash="33631273" _msthash="191">Description:</p><p _msttexthash="33631273" _msthash="191">TOURNAMENT INFORMATION</p><p _msttexthash="33631273" _msthash="191">EVO 2023</p><p _msttexthash="33631273" _msthash="191">August 4 – August 6 in Las Vegas</p><p _msttexthash="33631273" _msthash="191">EVO is the world’s largest and most well-known fighting game tournament.</p><p _msttexthash="33631273" _msthash="191">I will be participating in the Street Fighter 6 division of the competition.</p><p _msttexthash="33631273" _msthash="191">The tournament will be a double elimination format.</p><p _msttexthash="33631273" _msthash="191">The first day is qualifying pools, the second day is top 8 qualifiers, and then the third day is the top 8 for the games with the highest number of registrants.</p><p _msttexthash="33631273" _msthash="191">For me, this is my first time going to an overseas tournament as a young and aspiring player. The tournament has had a special place in the hearts of many players and has shaped the culture of the fighting game community. I want to be able to experience this and have a chance to show my skills beyond the Japan community for the first time and be able to meet the amazing people who come to the tournament from all over the world. This will also be an essential part of my career to prove my place in not just Street Fighter, but also as a female gamer.</p><p _msttexthash="33631273" _msthash="191">This year’s EVO is bound to have some of the highest numbers if not the highest in all EVO’s history, especially with the release of Street Fighter 6 and its sweeping success on live streaming platform.</p><p _msttexthash="33631273" _msthash="191">CREDENTIALS</p><p _msttexthash="33631273" _msthash="191">I am a streamer and part of G-STAR, an Japanese all-female streamer group with special supporters who are esports veterans. I have hit Master rank in Street Fighter 6.</p><p _msttexthash="33631273" _msthash="191">TWITTER FOLLOWERS</p><p _msttexthash="33631273" _msthash="191">1,900 followers</p><p _msttexthash="33631273" _msthash="191"><a href="https://twitter.com/xxBetty_" rel="noopener noreferrer" target="_blank">https://twitter.com/xxBetty_</a></p><p _msttexthash="33631273" _msthash="191">TWITCH FOLLOWERS</p><p _msttexthash="33631273" _msthash="191">4,700 followers</p><p _msttexthash="33631273" _msthash="191"><a href="https://www.twitch.tv/xxbetty96" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/xxbetty96</a></p><p _msttexthash="33631273" _msthash="191">ACHIEVEMENTS</p><p _msttexthash="33631273" _msthash="191">Featured on “Iispo,” a TV show on the popular Fuji TV channel discussing the esports industry</p><p _msttexthash="33631273" _msthash="191">Won the “Iispo” all female Street Fighter 6 tournament which was broadcast on Fuji TV</p><p _msttexthash="33631273" _msthash="191">Master Rank Juri</p><p _msttexthash="33631273" _msthash="191">EVO Japan top 300 placement</p><p _msttexthash="33631273" _msthash="191">TARGET AUDIENCE</p><p _msttexthash="33631273" _msthash="191">The target audience are interested in esports and in the fighting game community, especially players who are getting into Street Fighter 6 who may be younger or aspiring players. Also, with Nouns being a T2 team that is traditionally focused on other more popular titles, Nouns moving into the Fighting Game Community is sure to get a lot of attention from players.</p><p _msttexthash="33631273" _msthash="191">SPONSOR BENEFITS</p><p _msttexthash="33631273" _msthash="191">I will strongly promote your brand on my social pages and on my live streams. I will represent Nouns 100% of the time in public at EVO. I will wear the Nouns merchandise during tournaments in a way where it is visible to many people. Considering that there are already over 9,000 entrants this year, there are sure to be a lot of eyes in both the venue and on the live stream who will have a chance to see our Nouns branding.</p><p _msttexthash="33631273" _msthash="191">For reference, last year’s EVO had over 8,000 participants. The live stream had a peak viewership of over 62,000 viewers and an average viewership of over 24,000 viewers.</p><p _msttexthash="33631273" _msthash="191">BUDGET</p><p _msttexthash="33631273" _msthash="191">Airfare and other expenses 2,300 USDC</p><p _msttexthash="33631273" _msthash="191">Participation fees, food fees, and other fees not covered by the 2,300 USDC for lodging and travel</p><p _msttexthash="33631273" _msthash="191">ROI</p><p _msttexthash="33631273" _msthash="191">Since Nouns merch will be worn at the tournament, people will become interested in Nouns and those who are interested will buy some of our new products we are rolling out, which in turn will increase the spread of Nouns branding power.</p><p _msttexthash="33631273" _msthash="191">Even if I don’t make it to top place or top 8, even making it out of pools or into top 64 or 128 is a huge accomplishment and word of mouth will also help to spread Nouns Esports’ influence.</p><p _msttexthash="33631273" _msthash="191">PARTNERSHIP DETAILS</p><p _msttexthash="33631273" _msthash="191">EVO 2023 is the only tournament overseas that I have decided to try and apply for, so because of this I would like to propose a contract from around July 30th, 2023, right before the tournament, to August 6th, 2023, the last day of the tournament.</p><p _msttexthash="33631273" _msthash="191">However, if the opportunity arises, I am interested in working with Nouns Esports to be able to participate in more tournaments around the world as a representative for Nouns, I would like to be able to potentially be considered for a longer-term contract in the future. I believe with support from Nouns Esports I can grow ever further as a player and I can become an even stronger player that will give a better performance than before and grow the Nouns Esports brand in Japan and in the fighting game community.</p><p _msttexthash="33631273" _msthash="191"><br></p><p _msttexthash="33631273" _msthash="191"><br></p><p><img src="https://lh5.googleusercontent.com/rzSKDCoBiEpKIHRHJRjzBewus_3VbdWlUxfod8sIXONw7XUoS3LdDDh9Tr8cbHn_EJU4Wn02jhTrLAB4I2UZw-QXLVaxpjTaGC77rJkKnxfLzS1PcRN5lprdRpzcKjCvHkqgXmVT4-s2bD3UnQmK-J8"></p><p><img src="https://lh5.googleusercontent.com/sBpuyFWyYxRzeX519SB5qf6MZ7a7Yt6ZUerrvpYvHILD-p5pLuSu2-zpzkZ53jGVtG7gjbqXmU5W1G4zikkbIPu35xCFapk6syM8FDFXIJXvFwZgBrvrF-FrZ_QZa5PFm-RkTE9B1sGrDPZUqavC2Ek"></p><p><br></p><p><br></p>',
    value: "2300000000",
    createdAt: new Date("2023-07-10T04:53:53.015Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Send Betty to EVO 2023",
    user: "0xdFbe67b7b01952571d9F54B89eB582beD901688b",
    round: "compete",
    description:
      '<p>Title: Send Betty to EVO 2023</p><p>Funds Requested: 2300 USDC</p><p>TLDR: I want to attend my very first EVO World Tournament in Las Vegas.</p><p>Description:</p><p>TOURNAMENT INFORMATION</p><p>EVO 2023</p><p>August 4 – August 6 in Las Vegas</p><p>EVO is the world’s largest and most well-known fighting game tournament.</p><p>I will be participating in the Street Fighter 6 division of the competition.</p><p>The tournament will be a double elimination format.</p><p>The first day is qualifying pools, the second day is top 8 qualifiers, and then the third day is the top 8 for the games with the highest number of registrants.</p><p>For me, this is my first time going to an overseas tournament as a young and aspiring player. The tournament has had a special place in the hearts of many players and has shaped the culture of the fighting game community. I want to be able to experience this and have a chance to show my skills beyond the Japan community for the first time and be able to meet the amazing people who come to the tournament from all over the world. This will also be an essential part of my career to prove my place in not just Street Fighter, but also as a female gamer.</p><p>This year’s EVO is bound to have some of the highest numbers if not the highest in all EVO’s history, especially with the release of Street Fighter 6 and its sweeping success on live streaming platform.</p><p>CREDENTIALS</p><p>I am a streamer and part of G-STAR, an Japanese all-female streamer group with special supporters who are esports veterans. I have hit Master rank in Street Fighter 6.</p><p>TWITTER FOLLOWERS</p><p>1,900 followers</p><p><a href="https://twitter.com/xxBetty_" rel="noopener noreferrer" target="_blank">https://twitter.com/xxBetty_</a></p><p>TWITCH FOLLOWERS</p><p>4,700 followers</p><p><a href="https://www.twitch.tv/xxbetty96" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/xxbetty96</a></p><p>ACHIEVEMENTS</p><p>Featured on “Iispo,” a TV show on the popular Fuji TV channel discussing the esports industry</p><p>Won the “Iispo” all female Street Fighter 6 tournament which was broadcast on Fuji TV</p><p>Master Rank Juri</p><p>EVO Japan top 300 placement</p><p>TARGET AUDIENCE</p><p>The target audience are interested in esports and in the fighting game community, especially players who are getting into Street Fighter 6 who may be younger or aspiring players. Also, with Nouns being a T2 team that is traditionally focused on other more popular titles, Nouns moving into the Fighting Game Community is sure to get a lot of attention from players.</p><p>SPONSOR BENEFITS</p><p>I will strongly promote your brand on my social pages and on my live streams. I will represent Nouns 100% of the time in public at EVO. I will wear the Nouns merchandise during tournaments in a way where it is visible to many people. Considering that there are already over 9,000 entrants this year, there are sure to be a lot of eyes in both the venue and on the live stream who will have a chance to see our Nouns branding.</p><p>For reference, last year’s EVO had over 8,000 participants. The live stream had a peak viewership of over 62,000 viewers and an average viewership of over 24,000 viewers.</p><p>BUDGET</p><p>Airfare and other expenses 2,300 USDC</p><p>Participation fees, food fees, and other fees not covered by the 2,300 USDC for lodging and travel</p><p>ROI</p><p>Since Nouns merch will be worn at the tournament, people will become interested in Nouns and those who are interested will buy some of our new products we are rolling out, which in turn will increase the spread of Nouns branding power.</p><p>Even if I don’t make it to top place or top 8, even making it out of pools or into top 64 or 128 is a huge accomplishment and word of mouth will also help to spread Nouns Esports’ influence.</p><p>PARTNERSHIP DETAILS</p><p>EVO 2023 is the only tournament overseas that I have decided to try and apply for, so because of this I would like to propose a contract from around July 30th, 2023, right before the tournament, to August 6th, 2023, the last day of the tournament.</p><p>However, if the opportunity arises, I am interested in working with Nouns Esports to be able to participate in more tournaments around the world as a representative for Nouns, I would like to be able to potentially be considered for a longer-term contract in the future. I believe with support from Nouns Esports I can grow ever further as a player and I can become an even stronger player that will give a better performance than before and grow the Nouns Esports brand in Japan and in the fighting game community.</p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmdzcTJ1d1daMAoTX79YmFLrGz62dgX7R1rzNopj4h2Smc" style="cursor: nesw-resize;" width="-83" height="-83"></p><p><br></p><p><br></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmci6mySS4MW9cNccwSPgkYgaHY5W7HUWjWvcdSP9bRw4T"></p><p><br></p><p><br></p>',
    value: "2300000000",
    createdAt: new Date("2023-07-21T18:12:44.936Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Mojak - Circuito Estadual Fortnite",
    user: "0x7Aad263162cbdCc89D13858588f5AbD4b359139C",
    round: "compete",
    description:
      "<p>The Circuito Estadual Fortnite Tournament is sponsored by Light S/A - https://www.newage.gg/v3.0/campeonato/fortnite/8317 and is a tournament brought by The Federation of the State of Rio de Janeiro for Electronic Sports - FERJEE.</p><p><br></p><p>Mojak and his squad are already qualified for the in-person stage, which will take place on October 5th (semifinals) and October 6th (finals). </p><p><br></p><p>Mojak suggests playing both the semifinal and final matches wearing the Nouns Esports uniform/noggles to represent the team during the tournament. To do so, he requests a payment of a $200 bonus in case they win the tournament, a.k.a securing the first-place position.</p><p><br></p><p>No payment is due if they do not secure the first place.</p><p><br></p><p><br></p><p>Sincerely,</p><p><br></p><p>Bright - Contributor</p><p><br></p><p>Discord: brightspark.</p><p><br></p>",
    value: "200000000",
    createdAt: new Date("2023-10-03T22:18:05.080Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "nouns.fe ! - Professional Female CS2 Team Competing in ESL Impact & More ⌐◨-◨",
    user: "0xFD27AC8c65cfAB3B4b46e0740c7e47FB82F7Ef1D",
    round: "compete",
    description:
      '<h1><strong>Hello Nouns! ⌐◨-◨&nbsp;</strong></h1><h2>We are currently a top #7 NA CS2 team (based on the female rankings) looking for representation &amp; support!&nbsp;</h2><p><br></p><p>We would make a great addition to the DAO because of our unique perspective &amp; goal to keep the vibes positive, team leaders with experience in DAOs, and an overall open mind for growth within the Nounish ethos. We believe that the best rosters are #1 for a reason, one of those being they have very minimal roster changes, and access to resources provided by organizations like Nouns. We aim to be the first female team with no roster changes since the formation of the team as 5. This would not only provide the best possible results, but also improve the personal connection between the audience and Nouns. Our motto is “Win Together, Lose Together, Org Together.”</p><p><br></p><p>Nouns would be represented by us alongside other names entering ESL Impact &amp; the growing Female CS2 scene such as G2, FURIA, Ninjas in Pyjamas, MIBR, FlyQuest, ENCE, GamerLegion, potentially Heroic, and more (names that are legendary within Valve Majors &amp; Grand Finals around the world).</p><p><br></p><p>To put it into perspective, the Nouns ECL CS2 team is currently #34 in the world,</p><p>&amp; our team is currently #39 in the world on the female rankings, and actively closing that gap despite only having our full 5 roster for 1.5 months.</p><p><br></p><p>With Noun’s org support (we are the only contender for ESL Impact without it), hidden: false, would bring us to the next level competitively. We are already scrimming &amp; performing well against teams who are not only currently playing in the current ESL Impact season, but also ranked top #5 in NA and have org support with additional resources (such as a coach budget). We are also willing to be self-sufficient in management, and the ROI/level of growth for us and Nouns will only consistently increase with the amount of financial support &amp; resources provided by the DAO, and with time.</p><p><br></p><p><strong>TOTAL INDIVIDUAL VIEWERSHIP OF OUR TEAM SO FAR (GAMING CONTENT):</strong> 82,236+</p><p><strong>TOTAL FOLLOWERS OF OUR TEAM:</strong> 5,713+</p><p><br></p><p><strong>COMPETING IN THESE EVENTS EVERY MONTH/YEAR ROUND:</strong></p><ul><li><u>ESL Impact Cash Cup Tournaments [2x a month]</u></li></ul><p>\t\t\t\t\t-Streamed by Community (200-2k views each stream)</p><p>\t\t\t\t\t-$1000 Prize Pool</p><ul><li><u>ESL Impact Seasons 5+ [2x a year]</u></li></ul><p>\t\t\t\t\t-Streamed by ESL Officials &amp; Community (200,000+ Views just for playing the online season after qualifying, with an additional 364,000+ views for LAN)</p><p>\t\t\t\t\t-$123,000 Prize Pool</p><ul><li><u>ESL Impact Katowice [1x a year]</u></li></ul><p>\t\t\t\t\t-Streamed by ESL Officials &amp; Community (240,000+ Views For Group Stage)</p><p>\t\t\t\t\t-$100,000 Prize Pool</p><ul><li><u>SGGP Season [TBD, 1+ times a year]</u></li></ul><p>\t\t\t\t\t-Streamed by Super Girl Gamer Pro Officials (22,000+ Views)</p><p>\t\t\t\t\t-$5,000 Prize Pool</p><ul><li><u>ESEA League Season [4x a year]</u></li></ul><p>\t\t\t\t\t-Streamed by Community&nbsp;</p><p>\t\t\t\t\t-$6,000 Prize Pool for our current division</p><ul><li><u>We will also play any and all qualifiers for any female &amp; co-ed tournaments we can find.</u></li></ul><p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbhusrHBwSggrpE3CEYX5YftokfNehpcabxDuKPbfP7BR"></p><p>(2023 calendar from ESL for female Counter-Strike, estimated similar calendar for 2024)</p><p><br></p><p><strong>TOTAL YEARLY PRIZE POOL: </strong>$235,000</p><p><strong>ESTIMATED TOTAL MONTHLY VIEWS ON NOUNS: </strong>20,000 to 70,000+&nbsp;</p><p>(With evidence of numbers growing, increasing based off season qualification &amp; performance. Even just repping Nouns would immediately put us as first-choice for community casters to stream our games.)</p><p><br></p><p><strong>TEAM PLACEMENTS:&nbsp;</strong></p><ul><li>ESL Impact (All Women) NA Fall Cash Cup 3 - 28th of October 2023 -<strong> 1st Place&nbsp;</strong></li><li>ESL Impact (All Women) NA Summer Cash Cup 2 - <strong>2nd Place</strong></li><li>Season 47 ESEA IM <strong>(4-1)</strong></li><li>Team Ranked <strong>NA #7</strong></li><li>2023 ESL Impact &amp; SGGP CS2 - <strong>Top 5</strong> in Qualifiers</li></ul><p><br></p><p><strong>Despite our core being together for most of this year, we have only had a full 5 dedicated roster for 1.5 months, as we wanted to be sure we had a roster worth investing our own time &amp; energy into. Since then, we’ve achieved the above results, and respected community casters in the female esports scene have voiced that they’d be ‘very surprised’ if we don’t qualify for the next ESL Impact season.&nbsp;</strong></p><p><br></p><p><strong>PLAYER INDIVIDUAL EXPERIENCE:</strong></p><ul><li>ESL Impact Season 3 2023 NA Open Qualifier <strong>1st place&nbsp;</strong></li><li>ESEA Main/ADV Coaching - Cohesion</li><li>ESL Impact Season 2 (qualified &amp; played under Reversal)</li><li>ESL Impact Season 3 (qualified &amp; played under Byte)</li><li>8x Lan Experience, including <strong>3rd Place</strong> in Dreamhack Dallas BYOC 2019 &amp; <strong>3-4th Place</strong>&nbsp; Fragadelphia 17 Fullerton</li><li>2020 NACE Starleague State Showdown <strong>1st Place</strong></li><li>DreamHack Winter Showdown 2020 NA Qualifier <strong>1st Place</strong>&nbsp;</li></ul><p><br></p><p><br></p><p><strong>OPPORTUNITIES FOR REVENUE/ROI:</strong></p><p><strong>Overall: esports, entertainment, community growth, &amp; apparel</strong></p><ul><li><u>Sponsorships/Ads via total viewership </u><strong><u>[guaranteed]</u></strong></li></ul><p>\t\t\t\t\t\t\t-We are currently scheduling a meeting with a potential brand sponsorship that we could bring to Nouns, our team is also affiliated with @TJExclusives and is in contact with other brands as well, and will prioritize working with sponsors that share Nounish values &amp; visions for long-term growth.</p><p><br></p><ul><li><u>Prize Pool Winnings </u><strong><u>[based off results &amp; salary amount, willing to negotiate]</u></strong></li></ul><p>\t\t\t\t\t\t\t-Agreeable percentage from LAN events winnings </p><p>\t\t\t\t\t\t\t-Agreeable percentage from online events winnings </p><p>\t\t\t\t\t\tnote: if we are not being paid a salary, no online winnings are due to Nouns. </p><ul><li><u>Content Creation</u> from individuals &amp; as a roster, tailored for individual channels &amp; official Nouns channels to promote social media growth <strong>[guaranteed, with additional financial support from Nouns increasing growth velocity]</strong></li></ul><p><br></p><ul><li><u>Strengthening &amp; forwarding the Nounish Ethos </u><strong><u>[guaranteed]</u></strong></li></ul><p>\t\t\t\t\t\t\t-Supporting the consistently growing female scene will not only improve diversity within the Nouns community, but will also open Nouns to a new audience (and potential brand sponsorships) who are passionate about equality &amp; the LGBTQ+ community.&nbsp;</p><p><br></p><p>\t\t\t\t\t\t\t-Thinking bigger, we want ESL Impact Women’s finals to be played on the big stage alongside the CO-ED main finals which would be hundreds of thousands (if not millions) of eyes on Nouns with more open doors of opportunity to capitalize on it. Could easily be added before/after the showmatch before the IEM Finals, this would open up potential for the female scene to have stickers, support from other large tournament organizers, ETC.</p><p><br></p><ul><li><u>Repping Nounish </u><strong><u>⌐◨-◨ </u></strong><u>elements</u> in-game and IRL, with potential to help sell merch online &amp; at LAN events. <strong>[guaranteed]</strong></li></ul><p><br></p><ul><li><u>Partnering with ESL to host workshops at LAN centers</u> (like Dreamhack) for youth groups &amp; minority groups getting into eSports/Competitive Counter-Strike for the first time. <strong>[based off results &amp; financial support from Nouns]</strong></li></ul><p><br></p><ul><li><u>Multi/Co-stream on Noun’s sponsored streaming channels</u>, where we could host community tournaments with a buy-in, play 10mans with community members, make informative competitive content, show matches, ETC <strong>[Based off financial support from Nouns]&nbsp;</strong></li></ul><p><br></p><p><strong>TIMEFRAME: </strong>3 months of support in the beginning to show Nouns we are able to provide results with the resources provided by the DAO, with potential for a high ROI long-term proposal revisited after every league season (when we qualify). The current proposal amount covers 3 months of support for the roster, which would include:&nbsp;</p><p><u>November:</u></p><ul><li>2x ESL Impact Cash Cups<strong> </strong>(<strong>$1,500</strong> Potential Winnings)<strong>&nbsp;</strong></li></ul><p><u>December:</u>&nbsp;</p><ul><li>2x ESL Impact Cash Cups (<strong>$1,500</strong> Potential Winnings)&nbsp;</li><li>TBA: ESL Impact Katowice Qualifiers</li><li>ESEA IM League Playoffs (<strong>$2,000</strong> potential winnings)</li></ul><p><u>January</u></p><ul><li>2x ESL Impact Cash Cups (<strong>$1,500</strong> Potential Winnings)</li><li>TBA: ESL Impact Katowice Qualifier&nbsp;</li></ul><p><u>TBA</u>: ESL Impact Season 5 Qualifiers&nbsp;</p><p><br></p><p><strong>CURRENT ASK-&nbsp;</strong></p><p><strong>++++++</strong>Coach Salary ($50/Month)&nbsp;</p><p>- We have multiple coaches who have experience in ESL Challenger League &amp; Advanced League that we are going to be trialing for a few practices. We would also love if Semphis has any coach recommendations.</p><p><br></p><p><strong>++++++</strong>Industry Standard Practice Tools ($111/Total Monthly) including:&nbsp;</p><p>-REFRAG ($79): Practice Server, NADR, Crossfire Warmup, Re-Strat (ability to form &amp; record strats, and play against your own strats), hidden: false, Scrim hosting vs better enemies, Aim Training&nbsp;</p><p>-ExitLag: Better Server Routing for Online Competitive Play ($26) (Ping is a huge limiting factor in CS2 with pros complaining weekly. With ExitLag/EliteGamer Server Routing programs, we are able to lower our ping by 10-30, which makes a huge difference.)</p><p>-PRACC Demo Viewer ($6): for efficiently reviewing both professional demos and ours.</p><p><br></p><p><strong>++++++</strong>League Fees (Roughly $31 Monthly)</p><p>- ESEA League fees, currently in IM (4-1)</p><p>- all other ESL Impact female teams are competing in the ESEA league, and we are currently in the top 3 best performing out of the female rosters in all divisions.</p><p><br></p><p><strong>++++++</strong>Player Salary($150 Per Player Monthly)</p><p>- We are shooting for the low end of the full-time scalable budget, which would allow our players to have more emotional, physical, financial space to focus on qualifiers for the next ESL Impact Season (just like top competing female teams), hidden: false, but we are also willing to re-submit the proposal at the basic necessities part-time budget (outlined below), hidden: false, and revisit after 3 months based off results, season qualifiers, &amp; content creation views.</p><p>- We were previously offered a 100/player salary from a much smaller organization, at a time where we had less results and no confirmed 5th player. We believe this is partly because of the potential long-term ROI of professional female CS2.</p><p><br></p><p><strong><img src="https://ipfs.backend.prop.house/ipfs/QmRaa3fncsT58ote5mpGQ5pkY4vFDJpDMFsXJ4KVPr9tS4"></strong></p><p><br></p><p><strong>TOTAL: </strong>$2,826 for 3 months of support</p><p><strong>TOTAL POTENTIAL WINNINGS: </strong>$6,500</p><p><strong>TOTAL POTENTIAL VIEWERSHIP (estimate): </strong>66,000+ views on social media, and 9,000+ views from official match Twitch streams</p><p><br></p><p>(doesn’t include potential brand sponsorship deals, other sources of revenue listed/etc)&nbsp;</p><p>&nbsp;&nbsp;&nbsp;&nbsp;</p><p>&nbsp;In conclusion, partnership with our roster is a unique and affordable opportunity for Nouns to expand its branding, fill in the gaps of diversity, and promote inclusivity within the passionate CS2 community &amp; growing audience. This is a low-risk + potential high return entry into the growing female eSports pro scene, and we’d love to represent Nouns as part of it.</p><p><br></p><p>Here are some examples of the names we’d want to go by, to stick with the Nouns brand but also differentiate from the Nouns ECL team for HLTV/Liquipedia purposes. Let us know which one(s) yall like most <strong>⌐◨-◨&nbsp;</strong></p><ul><li>nouns.c5</li><li>nouns c5&nbsp;</li><li>nouns.fe</li><li>nouns prism</li><li>nouns cyclone</li><li>Nouns Jade</li><li>Nouns Lux</li><li>Nouns Terra</li><li>Nouns Onyx</li><li>Nouns Wisp</li><li>Nouns Nyx</li><li>open to suggestions from the nouns members!</li></ul><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmepLsenNsPJtn7kJimNSnXnqWMwW6TS5rfLGiU8s8Yz57" width="421" height="252.5987182315002" style=""></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmWvNV5Gb96q9MHbTek4pBQmtJirbRAT2pdZJuvWzCGp8b" width="423" height="237.93221779584056" style=""></p><p><br></p><p><br></p>',
    value: "2826000000",
    createdAt: new Date("2023-11-09T23:10:32.727Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      'Financial Support Proposal for Participating in the "Fortnite" International Tou',
    user: "0xCb4B53FaE032bF2Eaf00a8BbC64f3eEA0dFa685e",
    round: "compete",
    description:
      '<p>Subject: Financial Support Proposal for Participating in the "Fortnite" International Tournament</p><p><br></p><p>Dear Sir/Madam,</p><p><br></p><p>I am SeyhOo, a professional player and esports content creator, and I am delighted to offer my participation in the upcoming international tournament of the game "Fortnite" under the representation of Nouns Esports. This tournament, scheduled to take place from November 15th to 18th in Los Angeles, presents a unique opportunity for brand promotion and community engagement in the esports industry.</p><p><br></p><p>The reasons why this tournament is important to me and why I wish to participate are as follows:</p><p><br></p><p>1. Experience: I have a significant track record in "Fortnite" and have consistently performed as one of the top players in local and regional tournaments. My victories in these tournaments and continuous performance improvement have proven my ability and talent.</p><p><br></p><p>2. Target Audience: The "Fortnite" tournament attracts an enthusiastic community of game enthusiasts. This game appeals to both young and adult players, and this target community has a direct connection with Nouns Esports. By participating in this tournament, you can reach the target audience as a selected sponsor and increase brand recognition.</p><p><br></p><p>3. Support Benefits: With your financial support, I will be able to represent Nouns Esports in the tournament and introduce your brand to "Fortnite" fans. This includes placing the company logo on team jerseys, mentioning the company in social media posts, displaying the company name in tournament-related advertisements, and giving special attention to the brand in live streams and published videos.</p><p><br></p><p>I believe that my participation in this tournament under the banner of Nouns Esports will not only showcase my skills but also contribute to the growth and recognition of your brand within the esports community. I kindly request your consideration and support for this endeavor.</p><p><br></p><p>Thank you for your time and attention. I look forward to discussing this opportunity further.</p><p>Sincerely,</p>',
    value: "800000000",
    createdAt: new Date("2023-11-05T07:24:02.499Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Theblender Competing in The TFT Las Vegas Open",
    user: "0xE6443C59CE11DA3a8E47ed81f11eBFEf379C0117",
    round: "compete",
    description:
      "<p><strong>The Las Vegas Open:</strong></p><p><br></p><p>The Las Vegas Open is a esports tournament scheduled to take place from December 8th - 10th in Las Vegas, Nevada, with a total prize pool of $300,000 including $100,000 for first place. This event is expected to draw a significant audience, both in-person and online, and will feature some of the top talent in the esports industry. This is the first event of its kinds for TFT hosted by Riot Games.</p><p><br></p><p><strong>About Theblender:</strong></p><p><br></p><p>I am an emerging TFT player looking to achieve my dreams on the TFT stage. I have consistently been a Grandmaster player in TFT for multiple sets peaking at challenger in the last two sets of TFT. Along with TFT I have been part of Web3 since April of 2021 when I originally joined the BAYC.</p><p><br></p><p><br></p><p><strong>Why Sponsor Theblender:</strong></p><p><br></p><p>Sponsoring me at the Las Vegas Open can provide several benefits to Nouns Esports:</p><p><br></p><p><strong>Increased Brand Exposure:</strong>&nbsp;Your sponsorship will be prominently featured on Theblender's jerseys, and social media platforms and streams, exposing your brand to a wide and engaged audience.</p><p><br></p><p><strong>Targeted Marketing:</strong>&nbsp;Nouns Esports can reach the gaming and esports communities, effectively connecting with a demographic that is passionate and loyal.</p><p><br></p><p><strong>Community Engagement:</strong>&nbsp;By supporting Theblender, Nouns Esports can demonstrate its commitment to the gaming community, earning respect and loyalty from potential customers and partners.</p><p><br></p><p><br></p><p><strong>Funding Request:</strong></p><p><br></p><p>I am seeking sponsorship from Nouns Esports for Theblender at the Las Vegas Open. I kindly request financial support in the amount of $1,000 USDC to cover travel expenses, accommodation, and event registration fees.</p><p>\t</p><p>\t</p><p><br></p><p><strong>Benefits to Nouns Esports:</strong></p><p><br></p><p>In return for your sponsorship, Nouns Esports can expect:</p><p><br></p><p><strong>Branding and Promotion:</strong>&nbsp;Prominent placement of Nouns Esports logo on Theblender's uniforms, and social media channels. Including 20 hours of streaming a week leading up to the event. </p><p><br></p><p><strong>Content Creation:</strong>&nbsp;Theblender will provide updates from the event with videos and interviews of top TFT players as I network with the biggest names in TFT.</p><p><br></p><p><strong>Recognition and Thanks:</strong>&nbsp;Public acknowledgment and gratitude from Theblender during the event, highlighting Nouns Esports as a valued sponsor.</p><p><br></p><p><strong>Long-Term Partnership:</strong>&nbsp;The opportunity to discuss a longer-term partnership beyond this event, potentially including additional tournaments and daily streaming.</p><p><br></p><p><br></p><p>I am eager to be a proxy for Nouns Esports in TFT and gaming as a whole. As a passionate WEB3 enthusiast I would love to share my story within the gaming community trying to break down the walls many people in the community's have about WEB3.</p><p><br></p><p>Thank you for considering our proposal. I am excited about the potential of this partnership and would be honored to represent Nouns Esports at the Las Vegas Open.</p><p><br></p><p>Thank you</p><p>Theblender</p>",
    value: "1000000000",
    createdAt: new Date("2023-11-13T23:59:04.923Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Team Gosu qualified for the LAN of Apex Legends (New proposal)",
    user: "0x8A94523F0b1ff29C612b1629EAC3D41F34cf02c1",
    round: "compete",
    description:
      '<p><strong>Description</strong></p><p><strong>What:</strong></p><p>We are team gosu for the Apex Legends South America region. We just finished playing the qualifiers for the LAN and I can happily say that we qualify.</p><p><strong>Results:</strong></p><p>https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2/south-america</p><p>We are looking for an organization to be part of and represent; but in the case we dont find one we will have to cover for the coach, substitute and team manager (flights, hotel and food). And if we go a few days before it will be for the bootcamp too</p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmZYoLFyZ5RjSjEZF81BvbA52qiSactgDdrpFYPtDFdK2D"></p><p>$1,000,000 USD are spread among the participants as seen below:</p><p>https://twitter.com/PlayApexEsports/status/1655611108361740288</p><p>Who:</p><p>Players</p><p>• PANIC (Argentina)</p><p>https://twitter.com/panic_x1</p><p>https://www.twitch.tv/panic_o1</p><p>https://www.youtube.com/@PANIC_x</p><p>https://liquipedia.net/apexlegends/PANIC</p><p>• Renatricky (Argentina)</p><p>https://twitter.com/renazera1</p><p>https://www.twitch.tv/renatricky</p><p>https://www.youtube.com/@renatricky9092</p><p>https://liquipedia.net/apexlegends/Renatricky</p><p>• Zillach (Chile)</p><p>https://twitter.com/Zillach_</p><p>https://www.twitch.tv/zillachfps</p><p>https://www.youtube.com/@zillach8890</p><p>https://liquipedia.net/apexlegends/Zillach</p><p>• Substitute JayceeTower (Argentina)</p><p>https://twitter.com/JayceeTower</p><p>https://www.youtube.com/@jayceetower</p><p>https://liquipedia.net/apexlegends/JayceeTower</p><p>Coach/Analyst</p><p>• Stressado (Brazil)</p><p>https://twitter.com/1Stressado</p><p>https://www.instagram.com/stressadofps</p><p>https://liquipedia.net/apexlegends/Stressado</p><p>Team Manager</p><p>• Agoscialfa (Argentina living in Ireland)</p><p>https://twitter.com/Agoscialfa</p><p>https://www.twitch.tv/agoscialfa</p><p>https://www.instagram.com/agoscialfa</p><p><strong>When:</strong></p><p>15 to 19 of AUGUST 2023 in London, UK</p><p><strong>How:</strong></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmUjnauHJqV7KJVb8YY54rxRFjrAQQQ5eoQTCzyKshEGnf"></p><p>As we demonstrate above in the image we are a diverse team in nationality, age and culture. What we want to bring with this is diversity to the organization, relevance worldwide, awakening curiosity about the South American region and showing the potential that we have as Latin Americans.</p><p>Following what was said in the comments, we readjusted the value of our proposal to $3.000,00, we believe that with some cuts we can cover our expenses with this value.</p><p>We also note that we believe that this project, in addition to being international, is long term, being a great opportunity for media and competition at a high level.</p><p>PS: In addition, regarding the division of winnings, we propose 15% of the prize pool...</p><p>We understand that this is a big project and we are open to negotiations.</p><p>If you want more information or contact, this is the contact in the discord of our manager agoscialfa#3213</p><p>Thanks for this opportunity</p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmW2UdN9gt2TLqX67AQQKbvHSmho4i5dA9F4bs5CwhJAAB"></p>',
    value: "3000000000",
    createdAt: new Date("2023-07-30T09:44:47.716Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Partnership Opportunity: Funding the Future of Esports - Dota 2",
    user: "0x2fEbC642Ce3912f7B324BA02B9bB5A7893c29508",
    round: "compete",
    description:
      "<p>Dear Nouns,</p><p><br></p><p>I hope this letter finds you and the entire team at Nouns in excellent health and high spirits. I would like to express my sincere gratitude for the work and significant impact you have made in the field of esports.</p><p><br></p><p>My name is Ricardo, and I am an avid player and fan of Dota 2. I am reaching out to you today with the hope of discussing a funding opportunity for a Dota 2 team project that I am developing. With your reputation and proven success in the esports scene, I am convinced that Nouns would be the ideal partner to help bring this project to life.</p><p><br></p><p>I would like to provide an overview of the Dota 2 team project that I am planning and the goals we aim to achieve. The primary objective is to form a highly competitive team that can represent Nouns in major Dota 2 tournaments worldwide. Additionally, we are committed to cultivating an engaged community and inspiring aspiring players to pursue a career in the professional Dota 2 scene.</p><p><br></p><p>Our strategic approach will involve identifying and recruiting promising talent from the amateur scene, providing them with professional training, technical support, and the best possible conditions to enhance their skills. Furthermore, we are focused on establishing partnerships with relevant brands and sponsors, aiming to build a solid and sustainable infrastructure for our team.</p><p><br></p><p>We recognize that funding is essential for the success and growth of the project. Therefore, we are seeking a partnership with Nouns to obtain the necessary financial support to invest in training infrastructure, equipment, tournament travel, operational expenses, and salaries for the players and coaching staff.</p><p><br></p><p>By supporting our Dota 2 team project, you will be aligning yourself with a passionate, determined, and dedicated team striving for excellence in esports. Additionally, the return on investment can be significant, considering the rapid growth and global popularity of esports.</p><p><br></p><p>I am available to discuss further details about the project and answer any questions you may have. I am also open to scheduling a meeting to present a more comprehensive and detailed proposal about the project.</p><p><br></p><p>I sincerely appreciate your consideration and look forward to the possibility of collaborating with Nouns. With your support, I firmly believe that we can achieve great results in the world of esports.</p><p><br></p><p>Best regards,</p><p><br></p><p>Ricardo</p>",
    value: "5000000000",
    createdAt: new Date("2023-05-11T03:29:20.428Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports NBA2K",
    user: "0x6816e460F014Dab50e4406305e62523A74d5da4d",
    round: "compete",
    description:
      '<p>Hey this is me Extreme again, making  a new proposal, first time I made one it was also first time I introduced Nouns with a 2K scene and the proposal was the first to ever pass in "compete" category, hopefully Nouns legacy can still be continued, but this is a big question because the team I am about to show have way bigger requirements for funding, but also providing way more than I could ever.</p><p><br></p><p>I also didn\'t put the right amount in funds request because the numbers could be different or negotiable, more discussions can be made in the discord proposal chat.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmSaZ8kT78ciQKCyW63y6bRWMfuyxZnBreFGFUXcv9Nbuf"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmQf71SbhKBvqVvXg91cgPMaAcnQw9X9invikqFhQUbKB5"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmaEjFcATiWC3xxLpMCGhapjL1CoszcR47euucgYDA66Qj"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmPeCCAfXM3TURkWuYkG2GdxSXfzn6Ns4JkY37AindZdaB"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXqekrR4XN8S8Bb1h8m879rUnWHXSuRxGnqrmbCTAemVW"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXYyTdcXdkKsTSnsMEfpbbVHq5hjE53o197s4J4GwpVMn"></p><p>(CP Per split - means calculated potential winnings per one split period, numbers could be bigger depending on how many seasons leagues do (usually 3-4seasons per year from one big league 4x1500 prize and there are multiple leagues))</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYA26k7u9jMZWCbHNF3MDtS612ksDPjJtSxjQoMLsFvmf"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVd6D46B8jAKhgkzNw4WX7B4pjHE83kjXsGuDLqJRqjMV"></p><p><br></p><p><br></p>',
    value: "1000000",
    createdAt: new Date("2023-12-08T20:21:11.328Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Team Gosu qualified for the LAN of Apex Legends (New proposal)",
    user: "0x80100c6558dEeAe5545f87379aF2d3CF1fbb941C",
    round: "compete",
    description:
      '<p><strong>What:</strong></p><p>We are team gosu for the Apex Legends South America region. We just finished playing the qualifiers for the LAN and I can happily say that we qualify.</p><p><br></p><p>Results:</p><p><a href="https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2/south-america" rel="noopener noreferrer" target="_blank">https://battlefy.com/apex-legends-global-series-year-3/pro-league-split-2/south-america</a></p><p><br></p><p>We are looking for an organization to be part of and represent; but in the case we dont find one we will have to cover for the coach, substitute and team manager (flights, hotel and food). And if we go a few days before it will be for the bootcamp too</p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/Qmb8TtN18pef5pyjubeaDjrBx7q6pxqZ8XfU8e3V2SKMMn"></p><p><br></p><p>$1,000,000 USD are spread among the participants as seen below:</p><p><a href="https://twitter.com/PlayApexEsports/status/1655611108361740288" rel="noopener noreferrer" target="_blank">https://twitter.com/PlayApexEsports/status/1655611108361740288</a></p><p><br></p><p><strong>Who:</strong></p><p>Players</p><p>•\tPANIC (Argentina)</p><p><a href="https://twitter.com/panic_x1" rel="noopener noreferrer" target="_blank">https://twitter.com/panic_x1</a></p><p><a href="https://www.twitch.tv/panic_o1" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/panic_o1</a></p><p><a href="https://www.youtube.com/@PANIC_x" rel="noopener noreferrer" target="_blank">https://www.youtube.com/@PANIC_x</a></p><p><a href="https://liquipedia.net/apexlegends/PANIC" rel="noopener noreferrer" target="_blank">https://liquipedia.net/apexlegends/PANIC</a></p><p><br></p><p>•\tRenatricky (Argentina)</p><p><a href="https://twitter.com/renazera1" rel="noopener noreferrer" target="_blank">https://twitter.com/renazera1</a></p><p><a href="https://www.twitch.tv/renatricky" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/renatricky</a></p><p><a href="https://www.youtube.com/@renatricky9092" rel="noopener noreferrer" target="_blank">https://www.youtube.com/@renatricky9092</a></p><p><a href="https://liquipedia.net/apexlegends/Renatricky" rel="noopener noreferrer" target="_blank">https://liquipedia.net/apexlegends/Renatricky</a></p><p><br></p><p>•\tZillach (Chile)</p><p><a href="https://twitter.com/Zillach_" rel="noopener noreferrer" target="_blank">https://twitter.com/Zillach_</a></p><p><a href="https://www.twitch.tv/zillachfps" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/zillachfps</a></p><p><a href="https://www.youtube.com/@zillach8890" rel="noopener noreferrer" target="_blank">https://www.youtube.com/@zillach8890</a></p><p><a href="https://liquipedia.net/apexlegends/Zillach" rel="noopener noreferrer" target="_blank">https://liquipedia.net/apexlegends/Zillach</a></p><p><br></p><p>•\tSubstitute JayceeTower (Argentina)</p><p><a href="https://twitter.com/JayceeTower" rel="noopener noreferrer" target="_blank">https://twitter.com/JayceeTower</a></p><p><a href="https://www.youtube.com/@jayceetower" rel="noopener noreferrer" target="_blank">https://www.youtube.com/@jayceetower</a></p><p><a href="https://liquipedia.net/apexlegends/JayceeTower" rel="noopener noreferrer" target="_blank">https://liquipedia.net/apexlegends/JayceeTower</a></p><p><br></p><p>Coach/Analyst</p><p>•\tStressado (Brazil)</p><p><a href="https://twitter.com/1Stressado" rel="noopener noreferrer" target="_blank">https://twitter.com/1Stressado</a></p><p><a href="https://www.instagram.com/stressadofps" rel="noopener noreferrer" target="_blank">https://www.instagram.com/stressadofps</a></p><p><a href="https://liquipedia.net/apexlegends/Stressado" rel="noopener noreferrer" target="_blank">https://liquipedia.net/apexlegends/Stressado</a></p><p><br></p><p>Team Manager</p><p>•\tAgoscialfa (Argentina living in Ireland)</p><p><a href="https://twitter.com/Agoscialfa" rel="noopener noreferrer" target="_blank">https://twitter.com/Agoscialfa</a></p><p><a href="https://www.twitch.tv/agoscialfa" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/agoscialfa</a></p><p><a href="https://www.instagram.com/agoscialfa/" rel="noopener noreferrer" target="_blank">https://www.instagram.com/agoscialfa</a></p><p><br></p><p><strong>When:</strong></p><p>12 to 16 of July 2023 in London, UK</p><p><br></p><p><strong>How:</strong></p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmWyPcSpZKZvdq9kwEYmijiE7si4mje9RGogamU9yfZ5r6"></p><p>As we demonstrate above in the image we are a diverse team in nationality, age and culture. What we want to bring with this is diversity to the organization, relevance worldwide, awakening curiosity about the South American region and showing the potential that we have as Latin Americans.</p><p><br></p><p>Following what was said in the comments, we readjusted the value of our proposal to $3.000,00, we believe that with some cuts we can cover our expenses with this value.</p><p>We also note that we believe that this project, in addition to being international, is long term, being a great opportunity for media and competition at a high level.</p><p><br></p><p>PS: In addition, regarding the division of winnings, we propose 15% of the prize pool...</p><p>We understand that this is a big project and we are open to negotiations.</p><p><br></p><p>If you want more information or contact, this is the contact in the discord of our manager agoscialfa#3213</p><p><br></p><p>Thanks for this opportunity</p><p><br></p><p><img src="https://prophouse.mypinata.cloud/ipfs/QmVf5LsSvUVGhtR4dWE6VMaFvhLe5gXwb7F972DW88q5UM"></p><p><br></p><p><br></p>',
    value: "3000000000",
    createdAt: new Date("2023-05-11T21:33:56.852Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Origins + Frosty @DreamHack Open ft. Fortnite - Sweden",
    user: "0xAb0DA035ACd82943C62054bDf04745479Fd027A4",
    round: "compete",
    description:
      "<p><img src=\"https://prophouse.mypinata.cloud/ipfs/QmeCg6b9XGmP7SZgjY8WNLPcKGNZ2rMS7f7r22VFWfdVGH\"></p><h1><br></h1><h1>Dear voters,</h1><p>We are seeking funding support for the players Origins and Frosty to participate in Dreamhack Sweden https://dreamhack.com/summer/fortnite/, an event held in Jönköping from Aug 13th to 15th. This funding will cover part of the expenses such as airplane tickets, accommodation, transportation, food, event tickets, and a manager to ensure a smooth and successful experience.</p><p>Origins and Frosty are top-tier players in the esports community, boasting a combined follower count of over 650,000 on their social media platforms:</p><p><strong>Frosty:</strong></p><p>https://twitter.com/yfrostyx?s=21&amp;t=iFDSwd_bPYgcodIft8bspA</p><p>https://instagram.com/vinicius.frosty?igshid=NTc4MTIwNjQ2YQ==</p><p>https://www.youtube.com/channel/UC03D8yx1iIKPtfDroE1qbwA</p><p><strong>Origins:</strong></p><p>https://www.twitch.tv/originsbtw</p><p>https://twitter.com/originsbtw</p><p>https://www.youtube.com/channel/UCjWvOanRUHh2EhcRYINxfQw/featured</p><p>They have also achieved remarkable accomplishments individually, with Origins currently holding the title of the best no build player in Brazil, and Frosty standing among the top players in their field.</p><p>Dreamhack Sweden is scheduled to take place from Aug 13th to 15th, making it a time-sensitive opportunity. We kindly request a prompt response within the next two days to secure the necessary arrangements for the event.</p><p>Origins and Mojak recently had a chance to qualify for the Gamers8 Riyadh tournament in Saudi Arabia. Unfortunately, they faced numerous challenges during the qualifiers. Their drop location was limited and shared with another duo who did not follow the agreed-upon strategy, ultimately compromising Origins and Mojak's performance. Additionally, on the one map they decided to deviate from the strategy, they managed to score 80 points, showcasing their true potential. However, due to the timing, it was too late to secure the qualification. We see this opportunity to compete at Dreamhack Sweden as a second chance for Origins and an opportunity for redemption, now with Frosty as his duo.</p><p>To enable Origins and Frosty's participation, we are seeking funding in the amount of 3,500 USDC. While this amount will not cover all the incurred expenses, we are committed to covering the remaining costs ourselves if we receive the support of Nouns Esports. Here is a breakdown of the expected expenses:</p><p>Airplane tickets: $3,500</p><p>Food: $60 x 2 per day</p><p>Transportation: $200</p><p>Hotel: $973</p><p>Dreamhack Sweden event tickets: $85 x 2 + taxes</p><p>Manager: $400</p><p>In return for Nouns Esports' funding support, Origins and Frosty are committed to promoting and showcasing the brand extensively on their social media platforms. They will create engaging content, including videos and posts, before and during and right after the event, highlighting their journey and experience as representatives of Nouns Esports. This content will be designed to reach their combined follower base of over 650,000 and increase brand visibility.</p><p>It is important to note that the requested budget does not cover all expenses. However, with your assistance, we aim to represent Nouns Esports with excellence at Dreamhack Sweden and secure a spot to compete at Gamers8 Riyadh, Saudi Arabia in Aug.</p><p>We sincerely appreciate your consideration and support for this endeavor. The opportunity to represent Nouns Esports at such a renowned event would not only showcase the skill and dedication of Origins and Frosty but also strengthen the brand presence and recognition of Nouns Esports within the esports community.</p><p>Given the time-sensitive nature of this request, we kindly ask for a response within the next two days. Thank you very much for your attention and consideration. We eagerly await the opportunity to represent Nouns Esports on the international stage.</p><p><strong>Sincerely,</strong></p><p><strong>bright spark#1084</strong></p><p><br></p><p><br></p>",
    value: "3500000000",
    createdAt: new Date("2023-07-31T14:36:26.557Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Theblender for TFT Las Vegas Open",
    user: "0xE6443C59CE11DA3a8E47ed81f11eBFEf379C0117",
    round: "compete",
    description:
      "<p><strong>The Las Vegas Open:</strong></p><p><br></p><p>The Las Vegas Open is a esports tournament scheduled to take place from December 8th - 10th in Las Vegas, Nevada, with a total prize pool of $300,000 including $100,000 for first place. This event is expected to draw a significant audience, both in-person and online, and will feature some of the top talent in the esports industry. This is the first event of its kinds for TFT hosted by Riot Games.</p><p><br></p><p><strong>About Theblender:</strong></p><p><br></p><p>I am an emerging TFT player looking to achieve my dreams on the TFT stage. I have consistently been a Grandmaster player in TFT for multiple sets peaking at challenger in the last two sets of TFT. Along with TFT I have been part of Web3 since April of 2021 when I originally joined the BAYC. </p><p><br></p><p><br></p><p><strong>Why Sponsor Theblender:</strong></p><p><br></p><p>Sponsoring me at the Las Vegas Open can provide several benefits to Nouns Esports:</p><p><br></p><p><strong>Increased Brand Exposure:</strong> Your sponsorship will be prominently featured on Theblender's jerseys, and social media platforms and streams,  exposing your brand to a wide and engaged audience.</p><p><br></p><p><strong>Targeted Marketing:</strong> Nouns Esports can reach the gaming and esports communities, effectively connecting with a demographic that is passionate and loyal. </p><p><br></p><p><strong>Community Engagement:</strong> By supporting Theblender, Nouns Esports can demonstrate its commitment to the gaming community, earning respect and loyalty from potential customers and partners.</p><p><br></p><p><br></p><p><strong>Funding Request:</strong></p><p><br></p><p>I am seeking sponsorship from Nouns Esports for Theblender at the Las Vegas Open. I kindly request financial support in the amount of $1,000 USDC to cover travel expenses, accommodation, and event registration fees.</p><p><br></p><p><strong>Benefits to Nouns Esports:</strong></p><p><br></p><p>In return for your sponsorship, Nouns Esports can expect:</p><p><br></p><p><strong>Branding and Promotion:</strong> Prominent placement of Nouns Esports logo on Theblender's  uniforms, and social media channels.</p><p><br></p><p><strong>Content Creation:</strong> Theblender will provide updates from the event with videos and interviews of top TFT players as I network with the biggest names in TFT.</p><p><br></p><p><strong>Recognition and Thanks:</strong> Public acknowledgment and gratitude from Theblender during the event, highlighting Nouns Esports as a valued sponsor.</p><p><br></p><p><strong>Long-Term Partnership:</strong> The opportunity to discuss a longer-term partnership beyond this event, potentially including additional tournaments and daily streaming.</p><p><br></p><p><br></p><p>I am eager to be a proxy for Nouns Esports in TFT and gaming as a whole. As a passionate WEB3 enthusiast I would love to share my story within the gaming community trying to break down the walls many people in the community's have about WEB3. </p><p><br></p><p>Thank you for considering our proposal. I am excited about the potential of this partnership and would be honored to represent Nouns Esports at the Las Vegas Open.</p><p><br></p><p>Thank you</p><p>Theblender</p>",
    value: "1000000000",
    createdAt: new Date("2023-10-22T00:51:19.564Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns at DPC SA tour 3",
    user: "0xC5C0153910e7a03A4D26243Ce90409a031e5Aa4C",
    round: "compete",
    description:
      "<p>We started our story in January 2023, a Stack formed by a group of friends with a dream to grow in the Dota 2 scenario and get great results. We entered the DPC SA tour 2 through the open Qualifier and never had financial support from any org, we had no help from a coach, everything was achieved through our effort, 1 manager / analyst and 5 players.</p><p>We stayed in 4 place in tour 2 of DPC SA, competing for a tiebreaker for 3 place. During this trajectory we had some changes in the lineup!</p><p><br></p><p>Current roster</p><p><br></p><p>1 Benny</p><p>2 Ryu new promise rank 30</p><p>3 Tavo</p><p>4 Lth</p><p>5 Wij</p><p><br></p><p>Our lineup has 4 experienced players where everyone played a good time in division 1 and Tavo who came to play an international for Pain Gaming.</p><p>We want to represent Nouns Sports this tour 3, from May 2023 until the Roster lock open in December 2023! We will play all tournaments representing Nouns in the SA with the same commitment.</p><p>Today we use the name of x5 Gaming and below I will leave a link to know a little more of our work.</p><p><br></p><p>https://liquipedia.net/dota2/Dota_Pro_Circuit/2023/2/South_America/Division_II</p><p><br></p><p>https://twitter.com/x5gamingdota</p><p><br></p><p>Discord: CaioGordo #0916</p><p><br></p><p><br></p>",
    value: "5000000000",
    createdAt: new Date("2023-05-11T00:42:26.854Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Brazilian top 100 Valorant Team",
    user: "0x880499039E3026AEf9d1E3B8ED096954cdC97F02",
    round: "compete",
    description:
      "<p>We plan to put more effort on our current job knowing that we have a good organization such as NOUNS behind it all. We are trying our best to be good placed on the following ''VALORANT Challengers Brasil'', and ''Série A GamersClub'', both championships give a huge notoriety and a good prize pool for the players.</p><p><br></p><p>Our roster has 6 players: </p><p><br></p><p>Desire (me) - 17yo - ''I got 2nd place at the second qualify at Série A GamerClub, losing only to C9 drakoNz's team ''vítimas do rdo'',  (1st place on Grand Finals), hidden: false, got qualified to Elite Cup but unfortunally my team disbanded before the end of the competition. State champion of Maranhão. I played my whole life with +65 ping. There is my VLR profile (https://www.vlr.gg/player/25683/desire)'' 732RR peak; </p><p><br></p><p>Torment - 19yo - The ranked beast in Brazil, currently going through the first competitive experience. 952RR peak;</p><p><br></p><p>Panqueca - 21yo - ''IGLing since CSGO for 2/3 years, but never went through serious projects'' 631RR peak;</p><p><br></p><p>Mdg  - 19yo - ''I played 3 months on Cerberus E-Sports, won 2 presencial championships for UERJ ( University from Rio de Janeiro), hidden: false, played Aorus League and also played for Cruzeiro in CSGO at B Series'' 832RR peak;</p><p><br></p><p>Props - 17 yo- ''Got to the Closed Qualify in Série A, received an AOC Monitor at MP3 presencial championship being MVP of it'' 875RR peak;</p><p><br></p><p>Relaxed (coach) - 22yo - ''Top 6 South America in PUBG as captain, elected the best capitain at Pro League (2nd place), hidden: false, have a degree in Occupational Therapy with an elective in sports psychology, Regional Champion in CSGO presencially (Vale do Paraíba)''.</p><p><br></p><p>We would like to be payed $500 each one ($3000 all), hidden: false, to represent NOUNS on the following championships.</p>",
    value: "3000000000",
    createdAt: new Date("2023-05-24T18:25:22.521Z"),
    hidden: false,
    published: true,
  },
  // Builders Build
  {
    title: "Lets stream shall we??",
    user: "0x9051b3C1716fB28044cfddb9f7296Ca59d579302",
    round: "builders-build",
    description:
      '<p>Yo! <a href="https://twitter.com/BojangleGuy" rel="noopener noreferrer" target="_blank">BojangleGuy</a> here!</p><p><br></p><p>I have been a gamer my entire life. Watching Nouns build a successful esports team has been incredible to watch and inspiring to say the least. I have always wanted to attempt streaming myself playing games I love and ultimately doing something I have done for as long as I can remember. </p><p><br></p><p>With a recent update to streamlabs making it seamless to stream on X I decided it was time to finally give this dream of mine a shot. Being able to stream to a community of people who follow me for gaming and web3 felt like it made sense. Taking inspiration from Nouns Esports and their journey I realized it doesn\'t hurt to try. Who knows, maybe I will be the next Shroud or Dr. Disrespect. </p><p><br></p><p>It would be an honor to be awarded the Nouns Esports PFP as a reminder of why I started this journey and what is possible when you simply try. </p><p><br></p><p>GG</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmX3WWsvaKdvpsGidtge6dW9NUPgzXnDnJgALzUWvrJJYz"></p><p><br></p>',
    value: "0",
    createdAt: new Date("2023-12-08T04:30:17.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports Brasil - Highlights ⚡",
    user: "0x2b5DF72691d1d3AE1b057159EF6E0e6428398F33",
    round: "builders-build",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmZoc65PNznZnhyfewwqhBoAaiHJTSsu5SXG42BwzuEeXU" style="" width="687" height="458.225021579708"></p><p><br></p><p>Nouns Esports Brasil</p><p><strong>Local Content -&gt; Global Impact</strong></p><p><br></p><p>After realizing the big opportunity of onboarding millions of fans from <strong>Brazil (3rd Largest Esports Audience in the world)</strong> and, also seeing that in Brazil <strong>only 5% of its 240M inhabitants understand English</strong>, we understood the value of starting a dedicated effort in Nouns Esports Brasil.</p><p><br></p><p>Even with a relatively fresh start - only about 4-months ago - Nouns Esports BR has already made a real impact on the whole Nouns Esports community. Here are a few numbers and highlights:</p><p><br></p><p>- Brawl Stars World Finals (World Championship)</p><p>- Brawl Stars ESL Snapdragon Pro Series Finals </p><p>- Nouns Gaming Day IRL event</p><p>- More than 4.1k people tuned in for our Twitter/X Spaces with Dota Brazilian Community</p><p>- IRL Noggles totem digital display</p><p>- More than half-million impressions on a new account (512k+)</p><p>- 1359 followers on Twitter</p><p><br></p><p>![](https://i.imgur.com/leieE9i.png)</p><p><br></p><p>Description</p><p><br></p><p>Our proposal is to produce a commemorative video with Nouns Esports Brasil 2023 highlights!</p><p><br></p><p>This well-produced video will contain various impactful moments from the Brasil initiative, ranging from tournaments to a 3-month bootcamp in Europe, and a 200+ people IRL event hosted in a football stadium, among others.</p><p><br></p><p>![](http://i.imgur.com/t551AHG.gif)</p><p><br></p><p>*Watch our <strong>Road 2 Worlds</strong> episode [here](https://twitter.com/NounsEsportsBR/status/1719007360323104794)*</p><p><br></p><p>Being one of the winners would be really special to the whole team who has been working hard behind the scenes to expand even more the reach, competitiveness (and commercial potential) of Nouns Esports in general. </p><p><br></p><p>Our team is grateful for all the support so far and it would be an honor to be awarded the Builder NFT as a sign of the work that has been done and to our commitment to the future.</p><p><br></p><p><br></p><p>[João Borges](https://twitter.com/joaocsb), hidden: false, [TheBower](https://twitter.com/thebower_), hidden: false, [JP](https://twitter.com/eusou_jp) &amp; [Hirano](https://twitter.com/hiranonft).</p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2023-12-13T20:06:33.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Hope I win!",
    user: "0x6fB5d14b61e595e6f34BAF952c5d3e60e45883b0",
    round: "builders-build",
    description:
      '<p><strong>My Journey with Nouns Esports:</strong></p><p><br></p><p>My name is Peter, better known online as <a href="https://twitter.com/Peterpandam" rel="noopener noreferrer" target="_blank">Peterpandam</a>.</p><p><br></p><p>I discovered Nouns Esports through their Dota Team in 2022 and started as a contributor after learning more about the organization. Later I played key roles in Nouns Esports initiatives such as <a href="https://nouns.wtf/vote/119" rel="noopener noreferrer" target="_blank">Prop 119</a> and <a href="https://nouns.wtf/vote/263" rel="noopener noreferrer" target="_blank">Prop 263</a>.</p><p><br></p><p><strong>Why I want to win this NFT:</strong></p><p><br></p><p>I see the potential of blockchain in creating equal opportunities. It allows us to bypass intermediaries, benefiting the esports industry that has been scarred down by profit-seeking opportunists.</p><p><br></p><p>Esports teams and other digital IPs struggle to truly understanding fans due to the scattered nature of digital communities. But, there\'s a solution—tokenization through blockchain protocols.</p><p><br></p><p><strong>Identify, Target, Reward: </strong>Tokenization helps pinpoint and incentivize our fans while gaining insights that can help tailor more engaging campaigns.</p><p><br></p><p>In effect, tokenization leads to more meaningful interactions with fans.</p><p><br></p><p>To me, receiving one of the first five NFTs would be a great honor that recognizes my dedication to the organization. This NFT would serve as a badge of pride and a testimony to my beliefs in the potential of our team.</p><p><br></p><p>Thank you for considering my proposal. ⌐◨-◨</p><p><br></p>',
    value: "0",
    createdAt: new Date("2023-12-10T15:31:07.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Bringing Web3 eSports Mainstream",
    user: "0x6f75C02C01BE1B1cAb4b5Ec56C0D78b758Fe40d3",
    round: "builders-build",
    description:
      "<p><strong>The Goal:</strong></p><p>\tCurrently the majority of eSports team, league, and revenue ownership is concentrated within a small group of elite organizations which monopolize the scene from top to bottom. The potential of web3 is to give ordinary people some of the opportunities which are normally reserved for these organizations in web2.  My goal is to help create and foster a DAO governance based system for deploying decentralized leagues and tournaments - allowing anyone to fractionalize teams, automate revenue flow, and engage fans and the community in ways that only web3 can facilitate.  In doing so fan participation and experience can also be enhanced.</p><p><br></p><p><strong>The Guy:</strong></p><p>\tMy handle is Requiem and I have been in crypto since I began mining bitcoin in 2013 and a gamer ever since i could game.  Since 2021 I have become deeply embedded in the web3 sphere, particularly on the Solana blockchain but also Ethereum and Avalanche. I have a passion for building community and creating genuine connections in the space and I'd like to try and use my skills to drive the web3 eSports space forward because I think it's important.  I have like 6 thousand hours in Dota 2 and I'm still bad at it.</p><p><br></p><p><strong>The Why:</strong></p><p>\tI think we have an amazing opportunity right now to change the face of eSports as we know it.  Instead of something that some people participate in while others simply watch, we can make it a wholistic scene where the whole community can have meaningful involvement in every aspect.  Both Web3 and eSports are in very early stages of life compared to where they will go, and if we can show people that they're better together I think the buy-in will be tremendous.  There is no better organization to drive this forward than Nouns and Nouns eSports. Winning this pfp would be a significant statement of faith in my ability to help Nouns eSport move this forward!</p>",
    value: "0",
    createdAt: new Date("2023-12-10T17:26:38.000Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "NOUNS FE CS2 TEAM TO CO-OWN BUILDERS NFT ⌐◨-◨ (prev. prophouse compete winners) ",
    user: "0xFD27AC8c65cfAB3B4b46e0740c7e47FB82F7Ef1D",
    round: "builders-build",
    description:
      '<h1>[ <a href="https://twitter.com/nounsfe" rel="noopener noreferrer" target="_blank"><strong>nouns.fe</strong></a><strong>  here ⌐◨-◨ ]</strong></h1><ul><li><a href="https://twitter.com/lunariFPS" rel="noopener noreferrer" target="_blank">lunari</a></li><li><a href="https://twitter.com/RiceRage" rel="noopener noreferrer" target="_blank">Rice</a></li><li><a href="https://twitter.com/asheszu" rel="noopener noreferrer" target="_blank">ashe</a></li><li><a href="https://twitter.com/1Raynee" rel="noopener noreferrer" target="_blank">raynee</a></li></ul><p><br></p><p>We are the builders &amp; previous esports prophouse winners, currently integrating into the Nounish community through Content Creation, the female CS2 team, supporting other Nouns rosters, and also applying for &amp; supporting the Nouncraft project. We enjoy seeing this vibrant community thrive, not only within our own discord servers, but out at gaming LAN events, tournaments, content platforms, and more.</p><p><br></p><p><span style="letter-spacing: 0.02em; color: var(--brand-black);">Interacting in the Nouns community the past few weeks/months has been a treat, and we hope to continue to do so with Builder support! </span></p><p><br></p><p><strong>Why we want to win this PFP: </strong></p><p>We are self-sufficient, mutually beneficial creatives with a lotta love to give. Receiving this NFT for the team would be a great honor &amp; lasting proof of our dedication to forwarding Nounish &amp; inclusive narratives within the esports scene. </p><p><br></p><p>It\'s worth noting that we would love to help host Nouns booths at LAN events with meet &amp; greets, 1v1s with Nouns roster members, hosting workshops for those interested in becoming a competitors, &amp; informing those interested in DAOs (this idea was included in our passed proposal). We also love to promote inclusivity by supporting the growth of the female eSports scene overall, and minority gamers within the Nounish community :) </p><p><br></p><p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmWUjYrHs7hYwB8TitUi2t8CXdVKg7WuTense2fTazVmbA" style="" width="265" height="265"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2023-12-10T21:12:49.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Veel-Tark x Nouns Esports: A New Dimension in Team Strategy",
    user: "0x42e62e421bEdf2469826879Ec1a0574d7D3ccA26",
    round: "builders-build",
    description:
      '<p>We at NFT-Crap propose a unique venture to integrate the Veel-Tark framework into Nouns Esports. This initiative aims to elevate the esports experience through our specialized gamified approach.</p><p><br></p><p>The Concept:</p><p>Veel-Tark, our immersive gamified platform, offers a unique value proposition in the esports realm. By incorporating role-playing and strategic missions, similar to an escape room experience, it facilitates enhanced teamwork, creative problem-solving, and dynamic strategy formulation.</p><p><br></p><p>Impact on Esports:</p><ul><li>Team Synergy: Interactive missions boost communication and collaboration among players.</li><li>Strategic Edge: Gamified scenarios encourage innovative thinking, crucial for competitive gaming.</li><li>Community Engagement: Unique experiences foster deeper connections with the Nouns community.</li></ul><p>Experience a slice of this concept through our existing Veel-Tark adventure: <a href="https://oncyber.io/veel_tark_escape_room" rel="noopener noreferrer" target="_blank">Veel-Tark Escape Room Experience</a>.</p><p><br></p><p>Closing Thoughts:</p><p>This integration signifies more than technological innovation; it\'s about bringing a new level of engagement and strategic depth to Nouns Esports. We believe Veel-Tark\'s approach aligns perfectly with the spirit of Nouns, offering a fresh, engaging angle to esports.</p><p><br></p><p>Looking forward to exploring this exciting opportunity with you. We are a CC0 project. </p><p><br></p><h2>Slogan</h2><p>We Build.</p><h2>Concept</h2><p>The Game to work better.</p><h2>Pillars</h2><p>Craft. Art as a driver.</p><p>Learn. Humans play to learn.</p><p>Remix: Feel free to copy it and make it better.</p><p><br></p><p><br></p><p><br></p><p>Here what we are building 0_0 <a href="https://app.charmverse.io/veel-tark/nft-crap-3054954182727383" rel="noopener noreferrer" target="_blank">https://app.charmverse.io/veel-tark/nft-crap-3054954182727383</a></p><p><br></p><p>Best regards,</p>',
    value: "0",
    createdAt: new Date("2023-12-11T20:11:39.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "From Bali to Beyond: Nouns Esports Player Manager NFT Proposal",
    user: "0x18Bf24b7F782Ab629181ADA264A44ce1bB090C3c",
    round: "builders-build",
    description:
      "<h1><strong>Who?</strong></h1><p>Hello everyone; My name is DoublA or Mike and I have had the pleasure of being the manager of the DotA team and now I'm the overall player manager for nouns esports. I'll include a nicely labeled photo from this years' International to show you what I look like. On the subject of TI, its been a huge blast traveling with the team across the world whether it was Seattle or earlier in the year in Bali and just making sure that everything goes smoothly (very often it doesn't, but I wouldn't have a job if it always was smooth sailing). It's been a lot of fun interacting with people in the nouns community; either through the Friday contributor calls or even better in person at one of the many events nouns esports participates in.</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmR3VBS57osoDdPgerdvNvHEupjaHDdH5WcyQzxfPyyH2e\" style=\"\" width=\"603\" height=\"339.0377880031779\"></p><p><br></p><h1>Why?</h1><p>Full honesty, I'm not very endemic to the web3 space, but during this last year while I have been working for nouns, I've begun learning through osmosis. I have never owned a NFT before, but when this opportunity presented itself, I knew I had to write a proposal. With this NFT, I would have a mark of validation and pride for my past and future work in this organization. More importantly and most simply, it would mean a lot for someone who is a big fan of nouns esports.</p><p><br></p><p>Thank you,</p><p>DoublA</p><p><br></p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2023-12-11T23:54:43.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns in our game!",
    user: "0xF67a1fC909B90b7405E59E8Fe3569252fdF1D290",
    round: "builders-build",
    description:
      "<p><strong>The Game:</strong></p><p>We have built an arcade style fighting game called Stumble upon Rumble. It's a real-time multiplayer game with gameplay happening in servers of up to 30 players. It's a very social experience, with players spectating each others fights, chatting with another, and playing mini-games.</p><p><br></p><p>Like many in Nouns Esports, we care a lot about real competition in games. Most (mobile) games today have opted for special characters, items and upgrades that make the player stronger, just so they can milk as much money out of the players as possible. We hate this development, and instead are opting for a 100% skill-based multiplayer without any way to pay your way to victory. While the game is relatively simple, the skill cap is very high and that's why it would be very well suited for a competitive scene!</p><p><br></p><p>To facilitate this, we also have Player-to-Player cash fights in the game. Basically letting all players compete like e-sports players with real stakes on the line.</p><p><br></p><p>See our Epic Games page for more: https://store.epicgames.com/en-US/p/stumble-upon-rumble-52275d</p><p><br></p><p><br></p><p><strong>Integrating Nouns</strong></p><p>We love how Nouns can already be seen in some many different industries and places. As gamers, we'd love to see Nouns be represented directly in gaming titles. While the first Nouns skin in Fortnite may be some time away, we'd love to get it started by integrating Nouns in our own game as a cosmetic. That's why we've made a pixelart version of the iconic Nouns glasses and made it a cosmetic that can be worn on top of any other character in our game.</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmWuyh5FkMcYMNMFr1PKFJxbciGfbHkgCD2yur1cXYd2mr\"><img src=\"https://ipfs.backend.prop.house/ipfs/QmUK3CNBvpEkePSRfJ2uqj5VGKRAYdhXjavSH69BGoqkZi\"><img src=\"https://ipfs.backend.prop.house/ipfs/QmQknQrmDeNmFeDqGmNGDbti6qDkk5k6NfbjtZeALYAw12\"></p><blockquote>What the Nouns glasses look like on our different characters.</blockquote><p><br></p><p><strong>Why </strong></p><p>We would really like to be closer with Nouns Esports and the Nouns community. Being acknowledged as Nouns builders would mean a lot to us, and motivate us to continue the inclusion of Nouns in everything we do. </p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2023-12-12T14:45:59.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Art Contest 2024 Proposal",
    user: "0x9444b0D4C3f7ed7731d93867e347748721EE1f0e",
    round: "builders-build",
    description:
      '<p>The Purpose:</p><ul><li>To Grow Brand Awareness: Utilize the contest as a platform to showcase the unique identity of Nouns and its community. This event will serve to highlight the achievements of the past year and reinforce the brand’s presence in the artistic and broader community.</li></ul><p>The Goal:</p><ul><li>Community Engagement and Empowerment: The primary goal is to actively involve the community in a creative endeavor, allowing them to express their connection to Nouns. This will foster a stronger sense of belonging and ownership within the community.</li><li>Showcasing Talent: To uncover and celebrate the artistic talents within the Nouns community, providing them with a stage to share their work and stories.</li></ul><p>The How:</p><ul><li>Art Contest Announcement: Launch the contest with clear communication across all Nouns platforms, emphasizing the opportunity for artists to showcase their talent and win attractive prizes.</li><li>Guidelines and Theme: Set forth easy-to-follow guidelines and an inspiring theme that resonates with the Nouns ethos. This can include various art forms to ensure wide participation.</li><li>Engaging Prizes: Offer enticing prizes, such as $1,000 US and exclusive Nouns Merch, to motivate participation.</li><li>Judging and Community Involvement: Implement a transparent judging process, possibly involving community votes, to select winners.</li></ul><p><img src="https://ipfs.backend.prop.house/ipfs/QmUGynLvo1vcCnhWDKAdbuJDdLs5qmvPjaGU7zpWrBNu1L"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2023-12-12T16:06:38.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Mini-Artisanals for Nouns Esports ",
    user: "0x2941022347348828A24a5ff33c775D67691681e9",
    round: "builders-build",
    description:
      '<h1>Overview</h1><p><br></p><p>Nouns is a movement. A movement of passionate strangers voting on how to share resources. It\'s rolling up your sleeves and trying something. It\'s not traditional marketing. Nothing about it has the mass-produced vibe. Our project captures that essence of passion-based effort. <strong>We are making small, physical art pieces for collectors, fans, and Nouns supporters.</strong></p><p><br></p><h1>Who are we?</h1><p><br></p><p>A DOTA 2 spectator and web3 dude married a League of Legends support main of 7 years and DOTA 2 won out. It\'s now so central to our evenings that our dog is conditioned to fall asleep to the sweet sound of DOTA games, her favorite lullabies being from NA casters.</p><p><br></p><p>Our first IRL Nouns Esports experience was at the DOTA 2 Arlington Major, where I got to meet Brax after DMing for a bit. It was amazing to see the intersection of web3 and esports, the marriage of our two primary passions. It was invigorating and exciting. See, look how happy we are:</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUP9RXkga8fYYfxLXrDUsjDHzHUwxaE3REM1RysXQQnUB"></p><p><br></p><p>Shortly after Arlington, Vicki realized she wanted to take a break from work and do art, a lifelong passion. She began intensely crafting goodies in a variety of mediums. Oftentimes, she\'d disappear for a couple days, completely in flow state, and emerge with a new set of custom work. This happened the week leading up to The International, the largest DOTA 2 tournament of the year, which was within driving distance this year.</p><p><br></p><p>Powered by passion and Noun\'s unexpected-but-hype climb during the group stages, she made dozens of earrings out of clay and resin. </p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmaQXgDYejS9bZYfD6of1J5d7AfVKDbBcXvPANBxCjGDqk" style="" width="580" height="705.7966247139589"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUfdNvcRE1Ups2yEqA343jpJFrcvhJGHvNPGwgkEWzy98"></p><p><br></p><p>The pieces that passed QA were placed in individual packaging and then packed to come with us to Seattle, where we immediately began handing them out to the amazing folks at the turbo event.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUZi8Vn4yYiuxtuWqsigE7oiGXmwYS3sQHW2pYBuK2Rdj"></p><p><br></p><p>We were honored to give earrings away to Ricky (rkryptic) and to do an art swap with Necrolytus (the amazing artist who made the tango earrings from the previous picture). We happened to sit next to Brennan, Sasquatch, ppd, and other amazing folks involved with Nouns Esports. At one point, Vicki found Gunnar and gave him a large bag of earrings for the team.</p><p><br></p><p>The entire experience was fulfilling, and scratches an itch we have as a couple to be involved in a larger way than purely spectating and being a consumer. At last, we experienced firsthand how rewarding it is to go ham on a project and be a part of the Nouns tribe, if even for a few days.</p><p><br></p><p>We\'re fortunate to have the means to continue making different kinds of art. We have several ideas, and are currently investing in silicon molds that will allow us to make Nouns Esports keycaps. (Coincidentally, the molds are arriving today.) We\'d like to coordinate with the Nouns Esports Discord mods, and likely other DOTA 2 endeavors adjacent to Nouns Esports, to give these away and amplify the brand.</p><p><br></p><h1>Timeline</h1><p><br></p><p>We\'ll be immediately experimenting with a combination of resin, clay, keycap fixtures, regular and alcohol inks, etc. The first stage is usually wild experimentation, and then taking a look at what worked best, then dialing in on that. To be honest, we\'ll be doing this no matter what, just as we did with the Nouns Esports earrings for TI.</p><p><br></p><p>According to the brand guidelines, the red glasses are for DOTA, so we\'ll likely start there, but are excited to expand beyond that.</p><p><br></p><p>After we get a solid pilot batch, we plan to reach out to folks like Sasquatch, ppd, and Brennan to see how we can best get these to fans in a fun, giveaway style. That part is a bit to-be-determined, to be honest, which is very aligned with the web3 vibe. We like being nimble and doing our part, and figuring out the details as we go.</p><p><br></p><p>After seeing how the online giveaways work, we\'d be excited to see what we can do in meat space. At least one of us will be going to ETHDenver, and I foresee us flying out to at least one DOTA major in 2024, where we can hand them out.</p><p><br></p><h1>Impact</h1><p><br></p><p>We want to be a part of this thing! We\'re wanting to lean into this, especially after giving it a go and having the feeling of inspiration hit the warm fuzzy feeling of fulfillment. Count us in!</p><p><br></p><p>Sincerely,</p><p><br></p><p>mikedotexe.⌐◨-◨</p><p><br></p><p>and Vicki:</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmdzqGqhe1bJjptG9WVbVvVG6H6JfNqc8ZyRYprCECKe5Z" style="cursor: nwse-resize;" width="226" height="301.328387605042"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2023-12-13T19:54:05.000Z"),
    hidden: false,
    published: true,
  },

  // Genesis X
  {
    title: "Darmani",
    user: "0xC4e5a6f23627CDD311b282704c470C015872b403",
    round: "genesis-x",
    description:
      "<p>I’m an up and coming red fox from Mexico City with something to prove for my country, and on a path to become the best version of myself that I can be. I’d love to attend and maybe be able to demonstrate what my region’s made of!</p>",
    value: "0",
    createdAt: new Date("2024-01-17T00:56:17.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Vityee",
    user: "0x6E4Ab2fB89CB0942b7525a79981E0C9D40847925",
    round: "genesis-x",
    description:
      "<p>Hi there, i'm Vityee a french peach player from Lyon, France.</p><p><br></p><p>Why would I attend Genesis X ?</p><p> </p><p>I discovered Melee and smash bros at the same time, a little by chance on YouTube with documentaries relating the history of the 5 gods of Melee. What I liked most about these documentaries was not so much the competitive aspect as the community aspect, the crowds, the atmosphere, the encounters, the rivalries ect.. !</p><p><br></p><p>This discovery led me to give the game a try, first of all online, before discovering my local scene and becoming an active member. Today, I'm happy to be able to count some of the best encounters I've made in my life among the community!</p><p><br></p><p>Now I tend to get involved in organizing within my local scene and some aspects of the European scene with, for example, the organization of online singles and doubles tournaments or more recently as a TO of Arcamelee 4.</p><p><br></p><p>The question now is how I could represent Nouns Esports at this tournament,</p><p><br></p><p>I wouldn't presume to say that I could represent it at the highest level of the competition, but I could make myself available on site and help the tournament run smoothly by offering myself as a TO and represent Nouns Esports as an important player on the Melee scene that supports numerous events.</p><p><br></p><p>I've already had the opportunity to travel outside France for the Fête 3 , which was an incredible experience, and I'd love to have the chance to travel outside Europe to experience the atmosphere that originally made me discover and love this community.|</p><p><br></p><p>Thanks you all for reading !</p><p>Take care,</p><p><br></p><p>Jordane \"Vityee\" Chevillot</p><p><br></p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmesDh3tK1PqQDFKE9WvCszp5JSMfSfuzhfcCZYsoLAoGc\"></p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-01-20T14:51:30.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Colbol X Nouns at Genesis X",
    user: "0xc7E49b53671A36323256380Ad4beD5FDc90842Fe",
    round: "genesis-x",
    description:
      '<p>Hello, My name is Colin “Colbol” Green and I am an old-school Melee player from the South-Eastern United States. I began my Melee journey back in 2006 when I was only 13 years old and I quickly became one of the best players in my home state of Florida. From there my career took me to many places as I peaked at once being ranked one of the top 10 players in the world on the Melee rankings. I am also one of only 9 players to appear on every single top 100 ranking since its inception in 2013.</p><p><br></p><p><img src="https://lh7-us.googleusercontent.com/JuLzCp1-cKgHTZ0SZuPLFw-P26YwDlcFPYFQjxrIIepIWEWpvQGuj5FqygTQGgNsBWvqBZhOdAkB-VTP7DL3ckU13FOjGxpFll0H_IhbVWqxL9kGSIONLVFmBq_Ko9CT5Hq1IGikqN1-ZDGMz2NipqY" width="912" height="1044.1566579634464" style=""> </p><p><br></p><p>In the modern era of melee I am now the best player in the state of Georgia where I still compete on a regional level to which I won over 300 in-state events uncontested. I think I would be a great choice to represent the Nouns brand since I am very familiar with Nouns and their work in the melee scene. I interacted greatly with Nouns while I played and commentated at Tipped Off 14 this past year which was sponsored directly by Nouns Esports. I love Nouns’ passion for our community and their continued support of both tournaments and not players through Prop House. </p><p><img src="https://lh7-us.googleusercontent.com/H5NX8ZTymqKzbx5dSER1e1rQn7_1qN9SO4mHn-S77ygEnrZusSRXjU-0vWbLIc5Uh42Xeq0sKuKdhqBHTvTMVShRLYMFZZL7FBLeF__fSZLSzEkAKbNBQo8mJqI_m4J84dF5W9VmtP_eQEplZSI8VfU" width="915" height="512.9609706038135" style=""></p><p><br></p><p>I would greatly appreciate this opportunity to travel as outside of Tipped Off, there are no majors in our region of the country and Genesis is the ultimate player experience every year and consistently provides the most stacked competition.</p><p><br></p><p>Thank You for Your Consideration,</p><p><br></p><p>Colin "Colbol" Green</p><p><br></p><p> </p>',
    value: "0",
    createdAt: new Date("2024-01-22T15:34:15.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Gorgi",
    user: "0x6949346B91Af70884dE0DaEdFc3EC918B5355add",
    round: "genesis-x",
    description:
      "<p><strong><u>Background</u></strong></p><p>Hello everyone, my name is Ashot and I go by the tag \"Gorgi\". </p><p><br></p><p>I am the only melee player in Armenia, with my career starting back in 2021 when I was 14. I quickly learned that there is no scene in the region due to a multitude of reasons, so Slippi is my only way to play Melee, and even that is a rough call since the distance between me and more populated scenes like Europe is quite big. This year I feel like I am ready to represent my country at an IRL supermajor. This will not only be my first major, but also my first offline tournament ever.</p><p><br></p><p><strong><u>Results</u></strong></p><p>I am currently ranked #1 in the CIS region with competitors from Russia, Ukraine, Uzbekistan etc., my lowest rank ever was #2 since the first iteration of our rankings in 2021. I regularly attend online EU tourneys as well and, more often than not, give some of the strongest EU players a run for their money. You can also see me at the #3 spot on Slippi's Ranked Leaderboard, and I am “1st in Asia” there too.</p><p><br></p><p><strong><u>Conclusion and Socials</u></strong></p><p>I would love to travel and show my skills to the world, as well as represent Nouns Esports both at the event and on social media - Twitter: https://twitter.com/gorgi222 and Twitch: https://twitch.tv/gorgi222. Btw, remember that tweet about Toph's crushed balls? Yeah I'm the author behind it, so another reason to vote for me!</p><p><br></p><p>Shnorhakal em!</p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-01-22T18:16:54.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Falco",
    user: "0xCEe75E6aEceBe22Ff85a01a5d8947f446De6506b",
    round: "genesis-x",
    description: "<p>Falco falco falco falco falco falco falco falco falco</p>",
    value: "0",
    createdAt: new Date("2024-01-22T19:03:36.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Faust x Nouns for Genesis X",
    user: "0xf6beb068849A9944EEeb95bA7814Bd0ad41396C2",
    round: "genesis-x",
    description:
      '<p>To Nouns &amp; the voting public,</p><p><br></p><p>My name is Jacob Fischer and I am a Jigglypuff main from Toronto, Canada. In 2023, I took a risk and decided to dedicate the Spring and Fall to Melee and I was ranked #38 in the world for my efforts. I want your help to keep that momentum going in 2024.</p><p><br></p><p><strong><u>My Resume:</u></strong></p><p><br></p><ol><li>Ranked Top 40 in the world.</li><li>Wins on Jmook, Aklo, Spark, Ginger, Colbol and Pipsqueak in 2023.</li><li>Ranked Top 5 in Canada</li><li>Top Three Jigglypuff player in the world.</li><li>Second Highest Debut on the Top 100 (and the highest player still unfunded).</li></ol><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbaovJkWuQRX944fKNsUBmk2dpnRSqyLkKuYdBZTJTLKE"></p><p><br></p><p>I would love to represent the team and the voters here at Genesis. You can follow my socials on twitch and twitter @FaustSSBM. Thank you for your consideration.</p><p><br></p><p>-Jacob</p>',
    value: "0",
    createdAt: new Date("2024-01-24T19:18:58.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Send NYC falco main Ant on first ever trip to the west coast",
    user: "0xCEe75E6aEceBe22Ff85a01a5d8947f446De6506b",
    round: "genesis-x",
    description:
      '<p>If offered the opportunity to attend Genesis X, I would make frequent posts promoting the brand while taking the opportunity to play <strong>as much melee as physically possible. </strong></p><p><br></p><p>twitter- antssbm<img src="https://ipfs.backend.prop.house/ipfs/QmS6fwWLSBS3pmaEv6iAychxhSUtprN4nVu1dpwfkFaEWa"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-25T14:10:35.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "mvlvchi @ Genesis X WOULD BE ????",
    user: "0x5ae58d4591B03A04BaFFbd7813637a5CB320987E",
    round: "genesis-x",
    description:
      "<p>Genesis is my favorite tournament series of all time, however; it's also the one that is most difficult for me to afford.</p><p>I haven't been to California since the first time I attended Genesis 6. One of, if not the most memorable tournaments for me because I beat my first ever top 100 player (ARMY)! This was also considered by many at the time (me and my friends?) to be the first semblance of a breakout tournament!</p><p><br></p><p>Since then I have improved tremendously and would love to take this opportunity to be able to showcase that??????</p><p><br></p><p>Thank you for reading this, and if you vote for me, I promise your support will not be wasted??<img src=\"https://ipfs.backend.prop.house/ipfs/QmWH4Nn9HWbahzGTQ3yaeW9YnMQi4Ts6vo2i4pqEz1QLTa\"></p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-01-25T19:29:25.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "iLOVEBROOKLYN99 -> GENESIS X",
    user: "0x281fa30D01E428C65db7B0454427730cBF17Cb77",
    round: "genesis-x",
    description:
      '<p>My name is Tristan, and I’m exclusive to the NYC and Long Island melee scenes but I’m lookin to make big waves at Genesis with Nouns Esports! This would not only be my first super major, but my first out of state tournament ever, so it would be incredible to rep Nightclub alongside the king of NY himself. This tournament series has been my absolute favorite to spectate every year, and I really hope to be competing there soon. Thanks for reading and vote for me!! </p><p><br></p><p>My best win:</p><p><a href="https://youtu.be/laC01JeYvtE?si=FNRQBCM0MxhPGld5" rel="noopener noreferrer" target="_blank">https://youtu.be/laC01JeYvtE?si=FNRQBCM0MxhPGld5&amp;t=770s</a></p><p><br></p><p>Catch me on twitter and twitch at: </p><p><a href="https://twitter.com/notaklo" rel="noopener noreferrer" target="_blank">https://twitter.com/ilovemelee99</a></p><p><a href="https://m.twitch.tv/ilovebrooklyn99" rel="noopener noreferrer" target="_blank">https://twitch.tv/ilovebrooklyn99</a></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZDe2GJFryq9WhYFP1nihqgGhaH7JzhaNwKmJSYVNJTLe"></p><p>(I’m on the left) </p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-25T20:39:53.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Fable",
    user: "0x5Bd2A3e9337De006b33CF46707B71e93cA717424",
    round: "genesis-x",
    description:
      '<p>Hi I\'m Fable and I currently live in Texas. It\'s always been difficult for me to travel out of state, which is why I have only been to tournaments in Texas since I moved here. Being able to go to my first Genesis and compete against more talent would be a dream come true, and if I do well this would be a huge chance for me to finally get in the top 100 as I was just shy of it this past year.</p><p><br></p><p><strong><u>Resume:</u></strong></p><p><br></p><ol><li>Ranked 131st on the official <a href="https://etossed.github.io/rankings.html" rel="noopener noreferrer" target="_blank">ETop 200 2023™</a></li><li>Ranked 6th in Texas</li><li><a href="http://fablessb.com" rel="noopener noreferrer" target="_blank">http://fablessb.com</a></li><li>Beat Ludwig to hold the <a href="https://twitter.com/FableSSB/status/1664776659143208960/video/1" rel="noopener noreferrer" target="_blank">Mario Party Superstars World Record</a></li><li>3-0d Hungrybox</li></ol><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmPyGDEJZkcSJFvViWwQdYZP96GJARzuLYWzucYCRE5jDk"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-25T22:34:36.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "S2J to Genesis ( and other potential events)",
    user: "0x982E252fB07F5dB4682422d3b135Db7A5093DE7e",
    round: "genesis-x",
    description:
      '<p>As the current #16 best player, my goal for next year is to be Mr #3 or top 10 minimum. Getting this sponsorship would greatly help me with this and allow me to go to more events and showcase more strong Melee falcon play. Please vote if you guys have faith ?</p><p><br></p><p>Sincerely,  </p><p>s2j King of New York</p><p><img src="https://ipfs.backend.prop.house/ipfs/QmWb3uLLLZw5hrr7ixfmm3G9HcQQe15DVGd2rd3aNJRABz"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-26T22:17:17.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Let salami cook",
    user: "0x45E7b80e9790C5c5dF0B5D8Ff1efF7e773ED938D",
    round: "genesis-x",
    description:
      '<p>i have been grinding my ass off and i know i deserve this sponsorship. i will make this organization very proud. i guarantee that i will do my very best and run with this opportunity. i have been hit with some sudden moving cost to get away from my unhealthy home life and i would like to make genesis a less stressful trip by making up some of that cost.<img src="https://ipfs.backend.prop.house/ipfs/QmWVxGZTRz9ZBnFCh7es1LM4xoWDKah5wmLhFzJSTmfnMW"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-17T00:56:17.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "chase for genesis",
    user: "0x7d8674fb70d6C5BdA60dB7546a784B14bc66bEEe",
    round: "genesis-x",
    description:
      '<p>Hi my name is chase I’m an ultimate player from SoCal. I started competing offline in early 2022 and quickly took over the SoCal power ranking and now the global Lumirank. I would love a chance to compete under Noun esports I am one of the most ambitious players in the scene right now and I would absolutely take full advantage of such a great opportunity. I am one of the most active ultimate players and streamers having some of the highest attendance of any ultimate player at Lumirank events, locals, and even wifi brackets. I also am one of the most consistent streamers in ultimate building up a pretty decent following and amazing community. If I could go to a major without having to worry about the stress of not having a sponsor all of my time would go into preparing for my bracket and practicing. I believe i am the perfect candidate for a trial sponsorship like this and I would love a chance to prove it.</p><p><img src="https://ipfs.backend.prop.house/ipfs/Qmcw3z5Ld3K2WFSvjAGsHSritQFDx2tf4QS58sRs6Fjp4i"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-26T22:42:11.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "[Example] Aklo",
    user: "0xD1762d9c571538D5DD4830ef2095B3F71e0C17c3",
    round: "genesis-x",
    description:
      '<p>Hey, I\'m Aklo and I am a player for Nouns Esports.</p><p><br></p><p>I\'d like to attend GENESIS X because I believe I have a good shot at winning the whole thing, and I can represent Nouns Esports at the highest stage of Melee competition. I\'ll post on social media about my progress at the event while competing. </p><p><br></p><p>Socials:</p><p>Twitter: <a href="https://twitter.com/notaklo" rel="noopener noreferrer" target="_blank">https://twitter.com/notaklo</a></p><p>Twitch: <a href="https://www.twitch.tv/notaklo" rel="noopener noreferrer" target="_blank">https://www.twitch.tv/notaklo</a></p><p><br></p><p>GLHF!</p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYZnunLLUmujLdJ6Dj1Miu6NU26Xa1XEjZGdp4HqQ5jKm"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-17T01:08:50.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "TOP 100 & BLACK & NOT CISHET?!?! Affirmiate action wya?",
    user: "0x5ae58d4591B03A04BaFFbd7813637a5CB320987E",
    round: "genesis-x",
    description:
      "<p>It would be an absolute honor to get to work with nouns esports even if it is just for one tournament ??.</p><p><br></p><p>Genesis is one of my favorite tournament series of all time and I would love an opportunity to be able to go to this once more to show everybody why I deserve the spot. God Bless????</p><p><br></p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-01-17T01:36:24.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Smash's New Rising Star in videography, me Professor Kay",
    user: "0x7B9666e1C2c19f47C03A530B5EEF4e248a15A494",
    round: "genesis-x",
    description:
      '<p>Hello my name is Kay Wajsfelner or Professor Kay as the scene is more well to know me. I am an Esports videographer who has been apart of the community since I was in high school. Over the past year, I have honed my craft filming my senior thesis documentary about the Smash Ultimate player ApolloKage and now that that documentary has wrapped filming I am embarking on my post grad journey of becoming an esports videographer. My first major of the year was LMBM in January and the highlight video I made for that event pulled some serous attention. Look all those blue checkmarks. So please Noun Esports consider me to be one of your representatives at Genesis 10. I will be your exclusive videographer for the event and even make content about the players competing. Thank you for your consideration.</p><p><br></p><p>Pitch Video: https://youtu.be/utN6Hg99jAI</p><p><br></p><p>2024 Videography Reel: https://youtu.be/7ZFgZGOiaLk </p><p><br></p><p>LMBM Highlight video: https://x.com/Professor_Kay_/status/1745114975859826974?s=20</p><p><br></p><p>ApolloKage Doc: https://youtu.be/2_fQjVBo8QA?si=FG4_QWHp7XfivEHY</p><p><br></p><p>Picture of me being goofy on stage (Have since upgraded my camera to a Sony FX30):</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/Qmeiboh5wJD1UEjoD8uMQqdpgyJ2hkvK4MpWsdUE9x8gLb"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-17T02:46:04.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: 'Max "maxi" Inzunza',
    user: "0x26a4Fb9513ed8BF74840c691F2965FF147485f55",
    round: "genesis-x",
    description:
      "<p>Hi, I'm Maxi a 20 year old up and coming SoCal fox who was previously ranked #3 in San Diego with offline wins over kurv, khalid, nut, Android 0, casper, bimbo, and more. I also have online wins over bbb, mekk, and bbatts. I frequent SoCal locals and have a very strong passion for melee and competition.   This opportunity would be very special to me because I've never competed in a Genesis before and would love to showcase my abilities in melee and as a personality. I've traveled and done well at a few out of region events like Double Down 2022 and Smash Factor X, but I don't get to travel often due to my financial situation and being a university student. If I could have the chance to compete for Nouns, it would genuinely change my life and I won't disappoint. Thank u 4 reading <img src=\"https://discord.com/assets/6e72cca8dcf91e01fac8.svg\"></p>",
    value: "0",
    createdAt: new Date("2024-01-17T04:10:43.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Salt",
    user: "0xb2277afFECb1b2b061acAC920A373F501237908e",
    round: "genesis-x",
    description:
      '<p>Hello Nouns Esports and everyone who will read this, I am writing this proposal for a chance to represent Nouns at Genesis X!</p><p><br></p><p>My resume includes:</p><ol><li>Ranked 14th best player in the world</li><li>Arguably the best Captain Falcon in the World</li><li>Multiple tourney wins (Low Tide City 2023, Rise n Grind 2023, Luminosity Makes Moves Miami 2023, BEMI 2023)</li><li>Multiple Top 8, Top 12, and Top 16 placements at Majors</li><li>I bring the HYPE!!!</li></ol><p><br></p><p>I really hope that you will seriously consider me in representing Nouns Esports!</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYrnxxwhwhkQg68anEQcR4DH3M7WV8giStqXeb8kU55QX"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-17T12:04:43.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "THE SCHMIXTAPE",
    user: "0xD2302C6dB1B54f9bfa61328951Dca5D547991E9C",
    round: "genesis-x",
    description:
      '<p>I\'m THE SCHMIXTAPE and I am ultimate player from Sweden.</p><p><br></p><p>I\'ve been competing since 2016 and have been improving a lot every year. Currently I\'m ranked #1 in Sweden and have been ranked #1 in Stockholm since 2021. Despite only having a few opportunities to travel outside of my country I have still managed to get some great wins last year like Nitox, Big Chungus, NaetorU, MazeBeans and more! On top of that I\'ve also already managed to get 5th at a superregional this year at Smashborg Winter Seasonal. In bracket I rarely get upset and consistently give top players a run for their money.</p><p><br></p><p>I also have a decently sized twitter where a lot of big european names follow me so I\'d be sure to keep them all updated about my  performance as I compete at the event.</p><p><br></p><p>If you want to see an unkown talent get some big upsets then I\'m definitely the guy for you!</p><p><br></p><p>Twitter: <a href="https://twitter.com/SCHMIXTAPE" rel="noopener noreferrer" target="_blank">https://twitter.com/SCHMIXTAPE</a></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXsA19eNEbFHqkLumvEtfVwVJNXvA6AnmwX2PEuPwtaXi"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-17T14:43:52.000Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "Dutch player Happymealz wants to represent top level Dutch Melee at GX!",
    user: "0x97350C11a21658E5a02c5C08FFF11F3A0e5710Fa",
    round: "genesis-x",
    description:
      '<p><strong>Jillis "Happymealz" Pieters for GX!</strong></p><p><br></p><p>A little backstory: as an 18 year old kid, when I had only been playing for about a year and wasn\'t even ranked in my country yet, I knew I wanted to experience competing at an American super major. I worked for half a year and gathered the money to travel to Genesis 5. Travelling there by myself was a great adventure and I\'ll never forget it. However, besides Plup complimenting me on my mid-shortens, I drowned in my first round of pools and vowed that I would return as a good player one day.</p><p><br></p><p>In the 7 years I\'ve now been playing I can actually come back to prove what I could not back then: my Fox has become shnasty. Don\'t believe me? Check out <a href="https://twitter.com/_happymealz/status/1673345373534932993?t=1sBCghxrMA3LdZVNNukT6w&amp;s=19" rel="noopener noreferrer" target="_blank">my combo video</a>.</p><p>I think it would be quite poetic to return to Genesis X as a top Dutch player after having travelled there as a young grasshopper in 2018 who had no results to show for himself.</p><p><br></p><p><br></p><p><br></p><p><strong>Melee as Visual Art</strong></p><p><br></p><p>Besides competing at a high level in Europe, I\'m also actively creating Melee art for my community. As a fourth-year Audiovisual Design student, I have a lot of experience in filmmaking and interactive installation building. You may have seen some of my recent work on Twitter:</p><p><br></p><p><u>Battlefield brought to the Real World</u></p><p><a href="https://twitter.com/_happymealz/status/1707027550893941187?t=QJeID8rVf1nCUYTF32vRLg&amp;s=19" rel="noopener noreferrer" target="_blank">https://twitter.com/_happymealz/status/1707027550893941187?t=QJeID8rVf1nCUYTF32vRLg&amp;s=19</a></p><p><br></p><p><u>The latest Dutch PR as a venue-installation</u></p><p><a href="https://twitter.com/_happymealz/status/1743657336328093933?t=J3zMqY5dwWdcgvoihzGotA&amp;s=19" rel="noopener noreferrer" target="_blank">https://twitter.com/_happymealz/status/1743657336328093933?t=J3zMqY5dwWdcgvoihzGotA&amp;s=19</a></p><p><br></p><p><u>Some more.. content?</u></p><p><a href="https://twitter.com/_happymealz/status/1403012223535099904?t=b8nD6ERybhggJBodvZou7g&amp;s=19" rel="noopener noreferrer" target="_blank">https://twitter.com/_happymealz/status/1403012223535099904?t=b8nD6ERybhggJBodvZou7g&amp;s=19</a></p><p><br></p><p>I would love to put my creative ability to use at GX as well. For example by creating content for the players on the Nouns roster, making a mini doc about their runs (and my own) at the event, interviewing players (including my European friends and their perspective as long-distance competitors) and adequately capturing the storylines that would otherwise be lost to the sands of time could be another way I\'d love to contribute and make it worth your while to sponsor me for this event.</p><p><br></p><p><br></p><p><strong>EU loves Teams</strong></p><p><br></p><p>A final thing I\'d love to mention is doubles. Last summer I worked a summer job to go to GOML 2023 and compete with top UK Sheik max in doubles. We made it all the way to top 16 and I believe we could very well do even better this year, showing the power of European teams play!</p><p><br></p><p>An opportunity like this would be a dream come true, a full circle moment for the kid that went to America by himself in 2018 and a great opportunity to make a beautiful film capturing the community\'s essence.</p><p><br></p><p>I hope you\'ll consider me and allow me this chance. &lt;3</p><p><br></p><p><br></p><p><br></p><p>xoxo</p><p><u>Happymealz, the Fox&nbsp;from&nbsp;Rotterdam</u></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmQ5AgHET68dDVoArXtcC9DTs8R2Eg7U4WecwtTqNnR1Xi"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmagBr91QwvyAEwjCmbkMkhpTGGYaZG48bn7obeU3c7FMQ"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUvnbHUt7wRagq6GymEwZigYKdm4XBSHKqpZq32juQdqa"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-01-17T22:24:19.000Z"),
    hidden: false,
    published: true,
  },
  // Gaming Art Contest

  {
    title: "SuperNouns ",
    user: "0x50B04C83310D07B53441B0b2435F31353137e876",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmcK9DACEmKbnzXA1L2SRSQDbJVgL9wnC5L5Uanu74LtXL"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-11T02:06:59.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Reina of Nouns!",
    user: "0x91AC22521b72B89905406a2d366E9db7567C95a0",
    round: "gaming-art-contest",
    description:
      "<p><img src=\"https://ipfs.backend.prop.house/ipfs/QmcZKAJmW6DihzTr15Kq2i7a3Mf6maeRXCzEA8pXzn1Rvb\"></p><p><br></p><p>:) I've been enjoying alot of tekken 8 lately and I've thought about Reina wearing a nouns jacket! &lt;3</p>",
    value: "0",
    createdAt: new Date("2024-02-17T08:22:20.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "NOUNISH-MON??",
    user: "0xA09AA75da763D4aEB692672897C057786Cdd258B",
    round: "gaming-art-contest",
    description:
      '<p><strong>"Who needs legendary monster when you\'ve got legendary NOGGLES?"</strong></p><p><br></p><p>In the enchanting realm of Noggle-dex, Instead of cataloging MONSTER species, it chronicles an array of quirky Noggle characters, each with its own eccentricities and funny descriptions. From mischievous Nogglemon to stoic Noggletron warriors, every entry offers a glimpse into their unique world. So, embark on a whimsical journey through the Noggle-dex, where each character brings laughter and surprises in equal measure!</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXa7qkdr2uyd4aeKd1NvQrX4jLdzLCTJEYH47yE5mn66o"></p><p><br></p><p><strong>artist background : </strong>As a self-taught 3D artist residing in Bangkok, I am dedicated to honing my craft and developing a unique artistic style. By day, I apply my analytical skills as a data analyst at a local university. However, when the evening arrives, I transform into a freelance 3D artist, exploring the depths of creativity and imagination. My passion for art transcends boundaries, and I am committed to delivering captivating visual experiences through my work.</p><p><a href="https://twitter.com/SDangpad" rel="noopener noreferrer" target="_blank"><strong>twitter</strong></a> <a href="https://linktr.ee/trvkc" rel="noopener noreferrer" target="_blank"><strong>my arts</strong></a></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-17T13:25:22.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Reina of Nouns!",
    user: "0x6dCD04134F7AC91954d42591A64F938F0e0C11ee",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmYeLkcYghV4qkRBeMY12Z352EoLJwzbLWK8JsvbREHfo3"></p><p><br></p><p>Been playing alot of Tekken 8 lately and I\'ve thought of drawing reina with Noggles and Nouns jacket! :D</p>',
    value: "0",
    createdAt: new Date("2024-02-17T17:20:54.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Noun Fighter",
    user: "0xD629D12f41D9D68E7a89508124b3232119c77C39",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmXBnhYY5pPX78TEWkgymWaUaUDoT6LneUnvwoGPxr1npY"></p><p><br></p><p>this is 2D art with a touch of painting as the background to make the character even pop out and ready to fight! also im gonna quote tweet the whole timelapse on my twitter for this work so enjoy!</p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-17T19:46:55.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Gamer Quack",
    user: "0x3ee43dEa08C357C3D0Bf93339cc6D69FAE0Cf18f",
    round: "gaming-art-contest",
    description:
      '<p>Quack is sporting his noggles while gearing up for all his favorite games! </p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmTJDLkhCRxrJ6B3NiWqzY8HEpJqMX6cZbrgnBuY7V7AqL"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-17T21:51:45.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Rare Item",
    user: "0x08455093F238541CcEDa910Ba9a50074E8cCcA92",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmVcNzdDw6qmDaMdsmmXZskkvHqcfBz7E1j3ToMCxaDRt7"></p><p>Steve will get a rare item in the form of glasses to fight the Elder Dragon in the Elder World</p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-18T03:55:12.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports Animated",
    user: "0x5a560302E3F3c369BE2380b930C3a2545C9f100a",
    round: "gaming-art-contest",
    description:
      '<p>This is an animation with hand-drawn frames that give it a real feel.</p><p><br></p><p>I go by OUTKAST or OK. Primarily an artist on Solana. This is my first time entering a contest on ETH.</p><p><br></p><p>I love gaming and have a lot of respect for what the Nouns Esports team does in including everyone, practicing their craft, and grinding with the team.</p><p><br></p><p>I incorporated your logo + my style to give it a unique feel.</p><p><br></p><p>I hope you enjoy my submission!</p><p><br></p><p>p.s. this animation has sfx, but I couldn\'t drop a video file so I did a gif instead.</p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbKGhDNHSujAJeqJtURW29DuDWtKoFcfx1Eprkjk1movp"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-18T06:32:19.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Entropy-  A Nouns Super Hero",
    user: "0xa848b020CBb3e26C99C901115ea68D6741DE4BC6",
    round: "gaming-art-contest",
    description:
      '<h1>Entropy- Our very own Super Hero of the Nouniverse</h1><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/Qma922wkCyASi8pHCGy3pQasBYp3DHjcoAYXoZNtUDC9ru"></p><p><br></p><h1><strong>Backstory &amp; lore </strong></h1><p><br></p><p>In the Nouniverse, where the impossible is just a suggestion, Entropy\'s origin story is as peculiar as the world he inhabits. Once an ordinary scientist named Alex Grayson, his life took a tragic turn when an experiment in dimensional travel went awry, resulting in a catastrophic explosion that left him scarred and bereft of hope.</p><p><br></p><p>But fate had other plans for Alex when, amidst the wreckage of his laboratory, he discovered a peculiar pair of noggles – a bizarre artifact of unknown origin, its lenses shimmering with an otherworldly glow. Driven by desperation and curiosity, Alex donned the noggles, unaware of the strange power they held.</p><p><br></p><p>As he adjusted the noggles over his eyes, a surge of energy coursed through his body, transforming him into Entropy – a being with the ability to peer into the fabric of reality itself. But with this newfound power came a heavy burden, as Entropy realized that he was now bound to the Nouniverse, forever disconnected from the world he once knew.</p><p><br></p><p>Determined to make the most of his strange abilities, Entropy embraced his new identity and set out to protect the Nouniverse from threats both mundane and otherworldly. But despite his heroic efforts, he could never shake the feeling of loneliness and longing for the life he had lost.</p><p><br></p><h1>Character design process</h1><p><br></p><p>The creation of Entropy began with a pencil sketch, aiming to craft a character that not only captivates but also inspires audiences to adopt new behaviours. </p><p><br></p><p>Our focus was on designing a character with modular elements, including evolving weapons, powers, and skins, allowing for long-term growth and engagement. </p><p><br></p><p>To ensure fan obsession, we sought to incorporate the <strong>noggles</strong> in a fun &amp; iconic manner, akin to the leaf village\'s headband in Naruto. </p><p><br></p><p>Few questions, we asked ourselves was-</p><p><br></p><ol><li>Can we inspire people with this new character &amp; induce new behaviours in people?</li><li>How can we expand the Nouns IP with creative storytelling &amp; gaming?</li><li>How can we incorporate <strong>"noggles" </strong>in a fun way &amp; drive fan obsession. </li></ol><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYctXW4aCDScLt44HbApvUD9DWAqUHN6Bf9Mjudy9fmgo"></p><p><br></p><p>We went with red and black because they evoke a sense of power, mystery, &amp; intensity, perfectly reflecting Entropy\'s enigmatic nature and his role as a guardian of the Nouniverse. The striking contrast between the two colors adds visual impact &amp; ensures Entropy stands out amidst the chaos of his surroundings.</p><p><br></p><p>As we refined the character design, we paid close attention to every detail, ensuring that each element served a purpose in conveying Entropy\'s persona and abilities. From the sleek lines of his costume to the intricate design of his modular weapons, every aspect was carefully crafted to inspire awe and fascination in audiences.</p><p><br></p><p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVGnA7XaE2wPa8XzV75hytcJhcSLzeJCv7nVsuDU1LYFE"></p><p><br></p><p>We experimented with different backgrounds, but ultimately stuck with <strong>Pink Flames. </strong>They represent the chaotic energy that pulses through the fabric of this vibrant world, serving as a visual metaphor for the unpredictable challenges that Entropy faces in his quest to maintain order.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/Qma922wkCyASi8pHCGy3pQasBYp3DHjcoAYXoZNtUDC9ru"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-18T06:59:34.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "WINNER WINNER CHICKEN DINNER!",
    user: "0x614ab6edb88FEC7E6CD5E9ba83Ffc6d5a88D975F",
    round: "gaming-art-contest",
    description:
      '<p><strong>TEAMWORK MAKES THE DREAM WORK! </strong>⌐◨-◨</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmPnd7ayCPYp5VYrmfyYLkjeA9wJtQAXkS46wBiY1VAhta"></p><p><br></p><p><br></p><p><strong>About me</strong></p><p>X: <a href="http://www.twitter.com/8rrx0_" rel="noopener noreferrer" target="_blank">8rr</a></p>',
    value: "0",
    createdAt: new Date("2024-02-18T07:01:31.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Together We Noun",
    user: "0x4eF8B65D8f005f367d3b91d1006CF082aF985c43",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmfLqGX64J1JjFqFYkt2bEpruEtjXTsthZPxss7dGgeLg1"></p><p><br></p><p><strong>Technologies</strong></p><p><br></p><ul><li>Xencelabs Drawing Tablet</li><li>Adobe Photoshop</li><li>ChatGPT-4</li><li>DALL-E</li><li>Rogue Roasters Coffee</li></ul><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmdejhWnG1YP8VDTrGaQTuFMrWag4EiE9mVXmBfFAuZgao"></p><p><br></p><p><strong>Final Stats</strong></p><p><br></p><ul><li>100 Photoshop Layers (24 Groups)</li><li>158 Images Generated in DALL-E, out of which only 14 were used in the final document</li></ul><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-12T06:37:27.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nounsports",
    user: "0xBfF4938839990d212Ba6320579E6C76D328895E7",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmTG9SKA2NYbaXgHHLHmg7e5LxeCvS7Pi7sFY9jPLYFRw4"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-18T09:55:38.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: 'Art Design for "Aetherr: Birth of the Mystical Element" ',
    user: "0x8a2c7291FF23a6C625C664D30DC79F4c99ca5ba8",
    round: "gaming-art-contest",
    description:
      '<h1><strong>Story</strong></h1><p>"In a distant future, a mysterious red eyeglass serves not only as an object but as a nexus bridging reality and virtuality. With mystical power, it guides the flow of elemental forces."</p><p><br></p><p><br></p><h1><strong>Character </strong></h1><p>Aetherr, an extraordinary being, evolves from the elemental source empowered by the eyeglass. His form emits streaks of purple light, embodying elemental power. </p><p><br></p><p>Aetherr isn\'t alone; he\'s accompanied by two loyal companions, Sparkee and Shadee. Infused with elemental life, they too wear the enigmatic red eyeglasses, serving as bridges to the elemental realm.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmSJj55nkapc4FCRHzRK5Xjdra364PjxHeoQC5sgL45eYE"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXcZvHu2mrDthM61jEvZCsTUJUwgcEeevLBsyVYDW5poi"></p><p><br></p><p>In this world of unknowns and adventures, Aetherr and his companions face various challenges. Yet, they believe in trust and unity to overcome all obstacles, exploring their future.</p><p><br></p><p>The red eyeglass and elemental power intertwine, opening the gateway to a mysterious world. This is a tale of courage, friendship, and exploration, a legend of strength and hope."</p><p><br></p><p>⌐◨-◨</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUTuDXJ3AVPDGZoGzW2TqokiPFpiKQvLXxh3zFqTrPr26"></p>',
    value: "0",
    createdAt: new Date("2024-02-18T14:54:47.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "What is the game?",
    user: "0x4F4bD77781cEeE4914B6bC16633D5437eaBCa5D3",
    round: "gaming-art-contest",
    description:
      '<p>Pixel art ⌐◨-◨! inspired by Super Smash Bros.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXNCT6FMvwA5cmMkciBvVsGNDWvSDiwuGuz8SGxZ3A8iT"></p><p><br></p><p>another touch</p><p><img src="https://ipfs.backend.prop.house/ipfs/QmSJXJyuFhvbPDhHT1vFCo6ddYU5dhPcrbT52ctCkZK2Nj"></p><p><br></p><p>by <a href="https://twitter.com/Fuyu256S" rel="noopener noreferrer" target="_blank">fuyu256.⌐◨-◨</a></p>',
    value: "0",
    createdAt: new Date("2024-02-18T16:13:04.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Super Mario 3D Land and Room",
    user: "0x7AB1e448115Ef0991C6FdA4Ea78F1E73693A7fF4",
    round: "gaming-art-contest",
    description:
      "<p>It's impossible not to feel a wave of nostalgia and wonder when you watch Super Mario. <span style=\"letter-spacing: 0.02em; color: var(--brand-black);\">It is more than just 3D art, It's a journey into the heart of gaming's most beloved universe, where the past meets the present with creativity and industry development And as long as there are hearts to beat and dreams to chase, the spirit of Super Mario will live on, forever etched into the very fabric of our souls.</span><img src=\"https://ipfs.backend.prop.house/ipfs/QmYZqdH8FyabmxoFo6eTB5EP79N3oAnBeJYfr9xS48ns69\"></p><p><br></p><p><strong>Small info about artist: my name is Beqa, 14 years old, from Georgia. I'm self-taught 3D artist with 2 years of experience, I'm working in Blender software and using Photoshop for post processing. I love creating NFTs and connecting with new people.</strong></p>",
    value: "0",
    createdAt: new Date("2024-02-18T18:29:06.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Bandanoggles ⌐◨-◨",
    user: "0x7f75a3C1b2DAa4845b145d7176337c571eD7250F",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmY6kvC43dVoJtk2UsNZqYZbVUiV4EpBPixRzW2neQKPQE" width="800" height="800" style=""></p><p><br></p><p>The <strong>Nouns Esports</strong> proliferation avatar! Nouns Bandanoggles is a <strong>WIP</strong> (Work In Progress) that will take longer to perfect. Taking it slow will allow for the chance to exuberate his personality and distinguish originality. </p><p><br></p><p>Of course, who wouldn\'t want our <strong>\'Esport Skinned\'</strong> avatar to be prepared for any battle, race, or treasure hunt?</p>',
    value: "0",
    createdAt: new Date("2024-02-18T18:29:44.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Reeling in the Nouns",
    user: "0x42312E05ABAb129398891759CaFf9C80aAD7298A",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmTreuGwN6RVuUB5wtN3MGvmXnMAb218o1SsrYjs8Uc6PD"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-18T19:49:32.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Good Game, Nouns!",
    user: "0x2a575AE7B5760314643E81dCa7815D12e342cEA2",
    round: "gaming-art-contest",
    description:
      '<p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmW98qcn6CHyYPQE4p9YNBNrevza87zYLUXCP3VwLuAuBB" style="letter-spacing: 0.02em; color: var(--brand-black);"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUp91MXGg11ehHTwnzwaGVB5B2Ni9ZjWxWvq6Czg1Y8eB" width="680" height="680" style=""></p><p>This is the original idea of what I planned it should be.</p><p><br></p><p>Thank you :)</p><p><br></p><p>https://twitter.com/hpovalt</p>',
    value: "0",
    createdAt: new Date("2024-02-18T22:26:04.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "NOUNS GAMING ",
    user: "0xfA9Ff5581cC458D3ba3983308F93417E5Fde2013",
    round: "gaming-art-contest",
    description:
      '<p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmfY2w5fkeewByNAX2iWaJ9bV2oXk5zTauHb43WpkFfHCc"></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-18T23:15:59.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Sword ",
    user: "0xA54747703c07F97D8Ce06D3014442E200C7e89a3",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmSfSjTMYrgH82oyHWqgVP5Eaz43wCX5iX4Y3Lqj16EEsM"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T00:09:30.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "nouns esports ",
    user: "0x48D5b92B8Fa9FeDe28A5ec21A40CaAdeB22f578B",
    round: "gaming-art-contest",
    description:
      '<p>"Dominate the digital arena with Nouns Esports - where passion meets precision</p><p><br></p><p>Step into the world of competitive gaming with VeVe - where nouns, esports, and gamers unite for an unforgettable experience</p><p><br></p><p>Dive into the world of competitive gaming with Nouns Esports and dominate in Dota 2! Level up your skills now<img src="https://ipfs.backend.prop.house/ipfs/QmbXYW6Kb4RMYA6Z8T2N91wZ6pFJ2odoQqtH24HKNdHMRp"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbXYW6Kb4RMYA6Z8T2N91wZ6pFJ2odoQqtH24HKNdHMRp"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T01:07:03.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports",
    user: "0x25FbB8FA27182e811ACb8bA778eB79DBdF62f5C9",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmTy5xfLK5DX5b8K41eACyQ6GB3wCHuP5148Bt4BYRVyqs"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-14T18:58:19.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Mavia ⌐◨-◨",
    user: "0x706866088c98DdCA42a025AF59Aa63FDef079fa5",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmNnasSfo8PLhjqmG4KKbho2obSQrPkT4VPguJfAK69AQw"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmNnasSfo8PLhjqmG4KKbho2obSQrPkT4VPguJfAK69AQw"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T01:08:25.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns Esports",
    user: "0x48D5b92B8Fa9FeDe28A5ec21A40CaAdeB22f578B",
    round: "gaming-art-contest",
    description:
      '<p>"Dominate the digital arena with Nouns Esports - where passion meets precision</p><p><br></p><p>Step into the world of competitive gaming with VeVe - where nouns, esports, and gamers unite for an unforgettable experience</p><p><br></p><p>Dive into the world of competitive gaming with Nouns Esports and dominate in Dota 2! Level up your skills now<img src="https://ipfs.backend.prop.house/ipfs/QmbXYW6Kb4RMYA6Z8T2N91wZ6pFJ2odoQqtH24HKNdHMRp"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T01:10:47.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Heart of Gaming ",
    user: "0xCecd746bc0f17185651ff16316A14Ca06784aD4b",
    round: "gaming-art-contest",
    description:
      '<p>This piece celebrates the genuine essence of gaming, highlighting its capacity to cultivate camaraderie, forge lasting friendships, and establish meaningful connections that inspire a lifelong dedication to advancing a global vision and touching hearts through gaming. In collaboration with Nouns Esports, I am honored to present this piece, dedicated to upholding the authentic spirit of gaming, while ensuring it remains enjoyable and exhilarating for all involved.</p><p><br></p><p>Heart of Gaming, 2024</p><p>3D Artwork by <a href="twitter.com/isthis__ivan" rel="noopener noreferrer" target="_blank">Ivan</a><img src="https://ipfs.backend.prop.house/ipfs/QmdPYfArwfaRs58FoWFqtLJQa7jSuXyAtjnE8YMvP8mAoD"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T01:15:02.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Noun ・PókemonUnite",
    user: "0x75F1bb75aAE69C07bE1C711AD054acE1498991Aa",
    round: "gaming-art-contest",
    description:
      "<p>Twitter/X: @Weeb_Neet01</p><p>I made this bc I love pokemon unite and this team so much. I drew Bruv and ADESu bc they are the members who stay in nouns more time. I very proud of them and I'm a fan so, well this is my art proposal. I drew them cute bc they ARE cute and also it's my style. Hope u like it &lt;3</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmbppCeTALJU5uEETYDNAJfmqDXbSZ1WoLkhrpcgzDjgpH\"></p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-02-19T02:16:56.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "ATIRATH - Nounish Warrior",
    user: "0x7368B89C3e1EFd216EA271a0e1E1F0e0d7Df085b",
    round: "gaming-art-contest",
    description:
      '<p>This Character named "Atirath" from Sanskerta which is mean Warrior.</p><p><br></p><p>Dive into Nounish world to play survival game with Atirath. </p><p><br></p><p>Futuristic body, with strong hand and magical power.</p><p><br></p><p>:*</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmeVNsB1tqfE1BzpFjX9S3rDGZYDoj6GhasdiXfaMSATCA"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T03:21:12.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Stand together",
    user: "0xa87Daa2Bc3bd0eCca4C9111776BAB2c9d44D6c6B",
    round: "gaming-art-contest",
    description:
      '<p> <img src="https://ipfs.backend.prop.house/ipfs/QmYo53VjEbTHA9cqZSXqNC2v6ejN6bopb4T3jYYeLmSEhY"></p><p><br></p><p>Process:</p><p><img src="https://ipfs.backend.prop.house/ipfs/Qma35kNJHkiM69qHJCBa9QyuAhT3fsv6HPdM2UXhe2cwtR"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T04:04:09.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Noun Gaming",
    user: "0x29933A3fdc20F02CF0413F7bBd72C578B78e5344",
    round: "gaming-art-contest",
    description:
      '<p>This is a pixel art piece inspired by few of the most iconic childhood games that surely brings nostalgic vibes.<img src="https://ipfs.backend.prop.house/ipfs/QmTDk2uDkGC7frVMKmKdGHWh9xVD5JavuvPPHYcLGkQC9o"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T04:51:30.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Watch out these Noggles!!",
    user: "0x515c39ECBbE88c19C8cCf21cFf73C69E19E62A5c",
    round: "gaming-art-contest",
    description:
      '<p> <img src="https://ipfs.backend.prop.house/ipfs/QmV3NVsXngsfJMRi6CRHaTiDqCwWcedznxJYdTXNcZ99Jf"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmV3NVsXngsfJMRi6CRHaTiDqCwWcedznxJYdTXNcZ99Jf"></p><p>Our heros are on the quest to collect all the precious Noggles…</p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:01:21.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "toward noun Esport ",
    user: "0x2f3562bc7ef612e6Cc8E7b907C52684DaF9F4EEa",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmUE853Ad1yns6UAUCbYjK6iBtxx5e5EihJfCFAAUh5aYb"></p><p><br></p><p>I\'m trying to bring a MOBA game character. And Nintendo and Sega and other studios coming together is very challenging for me to create art.</p><p><br></p><p>Because the character values of each character are very different and in the end I was able to fuse everything together and this is the work that I really like.<img src="https://ipfs.backend.prop.house/ipfs/Qma2xs33K9ipVgQrfwnc63ABZSVv5FqDPFf7L7QiqRGjpG"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVMLq49oGwTrqotEwN4fWDDbiUKYAAkCVnBunsNCRbnPq"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmcUKEKnmoAMQ75Fd2u1vNhFYyoobWeNSC7yjmeRkzabSd"></p><p><br></p><p>This is process the great work</p><p>Because I posted the wrong original picture that was completely finished, in fact the completely finished picture is this one.  Hopefully the judges will use this picture instead.</p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:11:51.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "nouns.good.grind",
    user: "0x9F771E64ecCda78E1aFD1277C0C5744091A0DFAC",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmWC5TUJYFA4zCvuN2uVcFzYg6ix31vfk7ZLSkTzshzEeV"></p><p><br></p><p>it is a 10 sec gif, it might load a little</p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:21:39.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "NOUNS [NFTrans] glitched Queens",
    user: "0x3856022A0209D2706460Ef2989f04e7cF8076C36",
    round: "gaming-art-contest",
    description:
      '<p>NFTrans serves glitchart realness every where it goes|:</p><p><br></p><p>https://nftrans.tez.page/</p><p>https://github.com/nftrans/dossier</p><p><br></p><p>meet this lofi mix of AI, Glitch and digital art-crafting:</p><p><br></p><p>abstract, cute, fun and colorful nouns Queens and the random Unicorn</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYzECrmwWdm5NqxdhEjoFB8TKHoCg4s8msy5aUKjRM3PZ"></p><p><br></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZtx3aJAsUEZVfMWdk7d84mCXdwWURvk7HnYvoEsXhS8D"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbARBtWKxabCoodbionME47pZGYCvUFJLBBRFNrG6qLws"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-15T19:54:31.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Indian witcher With Noggles",
    user: "0x8513A856a88e63374286d0116C192733444894C0",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmTJw2hzRuj423QPGPHZY5v25uw1xZrRNmXiEdJukq2xuY"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:25:02.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Supportive people support people.",
    user: "0xfc92B5FAA50350d8dD1AeF8573c50fAa51eb9260",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmTYYfKmLSfKRsaFA5NpLCENg5th4mry35G18pHTk1XXZw"></p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:33:08.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Ready Player Nouns ⌐◨-◨",
    user: "0xcF4F8fD76f0A37521aE2aC54C17d3893F0C7Fe73",
    round: "gaming-art-contest",
    description:
      "<p>Esports isn't just about pixel-perfect plays and championship glory (though those are pretty awesome too).  It's about the bonds forged in shared strategies, the laughs echoing through late-night practice sessions, and the high fives after epic comebacks.</p><p><br></p><p>Forget the sidelines, step into the arena! Esports isn't just for spectator mode anymore. Get yourself ready because you might be the next player nouns!</p><p><br></p><p>*This art was made by using procreate </p><p><br></p><p>Twitter : @shqkkk</p><p><br></p><p>Thanks!<img src=\"https://ipfs.backend.prop.house/ipfs/Qmekh9Leb3QWKVU5VLaNAac9WmoJEVjCHi7rKVcwjx78LU\"></p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-02-19T05:36:10.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Gotta Catch Them All",
    user: "0xBA8e0841CD9a95c80ccBD502B08F73F8e30f2186",
    round: "gaming-art-contest",
    description:
      '<p>Hi! My name is April and I made this illustration.</p><p><br></p><p>This illustration is inspired by pokemon. All the characters made was a mix between pokemon character and nouns.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmU11vkWikFLWxipJ9Nu1RKnfjzpyPGnjhBhrhn6GJcFz9"></p><p><br></p><p><br></p><p>See the progress from sketch to finish here.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVtrUBYjVQq4qDiXixe8D5rFv46wCESRtQ8aHRMiy4SmH"></p><p><br></p><p><br></p><p><br></p><p><br></p><p>Email : Id.0xaprilia@gmail.com</p><p>Instagram :&nbsp;<a href="https://instagram.com/0xaprilia?igshid=NTc4MTIwNjQ2YQ==" rel="noopener noreferrer" target="_blank">https://instagram.com/0xaprilia?igshid=NTc4MTIwNjQ2YQ==</a></p><p>Twitter :&nbsp;<a href="https://twitter.com/0xaprilia?s=21&amp;t=uanNnzJ966dovoMvsfjjjw" rel="noopener noreferrer" target="_blank">https://twitter.com/0xaprilia?s=21&amp;t=uanNnzJ966dovoMvsfjjjw</a></p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:50:39.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "We all love these games. It's one of the treasure of our memories",
    user: "0x839A81383BC848aDbed6BEe2643e829fd2413e1E",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmZma1EPEQp4Ui7mMmXx6JcTQvVr2HdS9GFgJ2RiGWhXs3"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmXqZxraBfSdBr7XEsbEQs9wYrZZmaxdNBKRRzFNizKmM1"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUnFwqKUwwVT6TKPvsPw9ttHRSfGJdduwdUzUY2Q8X4Bs"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmQNkj15ToE9BYhDmsVXixamgB1QgRxXspZtmnCwEChCFG"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmWkyj57oBjuxeSs6EbZimuSp9WbPryATo4U5qU44dewsM"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmU1ycJKKqQrtvGmbXhndAtvpi1LdTFyXJv2iNCd7BEEwY"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmeZobMeU1xTErTiW4LPxLBAZ54BRVTMAZtmJxn29545wN"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZ4hrBtjV89LZp2dZiJgxLxRVpfFxRKhCg5HCH692NYTf"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVPfqmBYDqg1ccM8URZhQvtPJSyMeY6soDy7SpWaogkd3"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYbW75UgMt9ctabe3zY6drRyXxtVW8MtXUoA2Ca3QePct"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmY8BZrJbX3f4HYAsNVxR7aK67rhMc5Yi5V2Si6vXrUj2o"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:51:48.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Steve rocking +999 ATK Noggles",
    user: "0xc4b2C37885DD5a56089fc36357153F87cF78c978",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmfDWGQb3DuTjWhUvjgHuJkURaYgbc17FJPc7aNS7dfZis"></p><p><strong>3D Rendering</strong></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmNfkuvokpuHBTNvyExDa2WqTmsZ8RkYUyhgchEaqwcxdi"></p><p><strong>Viewport Preview</strong></p>',
    value: "0",
    createdAt: new Date("2024-02-19T05:56:00.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Gamer",
    user: "0x7b6b3e7e86103243C112FdB2BEaA3F4565077086",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/Qmbazf69RjJ36PQPwq4vCwYWKvYzw5cyb4iY3e4eattB3Y"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-16T02:54:28.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Minecraft & Nouns Esport",
    user: "0xDbeD670B666495a4A2207D6d95dB47E6843748Fa",
    round: "gaming-art-contest",
    description:
      '<p><span style="letter-spacing: 0.02em; color: var(--brand-black);">- Create an exceptional natural landscape with mountains, valleys, and rivers.</span></p><p>- Design a character using various skins and clothing in the block-based setting</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVoeJA2Gtsjwd47SudcgLvTUBK985Y565wWAwwbYR7bbk"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-16T05:38:10.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Nouns GTA",
    user: "0x91eEBD7c34a1143863eD0E2256C8224CCc5C0512",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmVxoRB6sYka691npHKeRarUWgUyYB44xHav7v3ET1H7LD"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-16T05:44:01.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "RED DEAD REDEMPTION",
    user: "0xC66b3FAd5AccbD8888F65b5dcaA7a8b9cB562586",
    round: "gaming-art-contest",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmZaa3t2e6LufMvFFqPgsrE3mXJVrJWALUE9Sd3E5QwcxW"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-16T05:48:41.000Z"),
    hidden: false,
    published: true,
  },

  // Collision
  {
    title:
      "Chaler Is Looking to make content, commentate and rep the UK at collusion",
    user: "0xE9b362c5497Ea845a12e0dE59E062B7523106ADb",
    round: "collision-2024",
    description:
      '<p><strong><u>Chaler wants to make cool stuff in America</u></strong></p><p><br></p><p>Yo my name is Josh but you might know me as Chaler the YouTube guy. I have been a part of the melee scene for 8 years but I am yet to ever travel to the hub of melee in the world the USA. Mainly because as you might know I am not that great at the video game so why travel all that way when I could go around Europe.</p><p>However things have changed!</p><p>In the past year I have been chasing my dream of doing YouTube full time and have made many many videos on melee, its competitive history and goings on.</p><p>So now I want to finally make the trek to the US to connect with people I have never met in person and make content that I could only make from attending events like this, for example.</p><p><br></p><p>Vlogs: I have ideas for interesting vlogs that I could make attending events that people care about rather than my uk locals which while really cool doesn\'t grab the broad range of people.&nbsp;</p><p><br></p><p>On the ground Docs: I am in a period of change for my channel where I will undoubtedly be doing more large scale documentaries (Hopefully my first is live by the time you can vote) so being able to go and meet these people I have been documenting and getting real interviews with them sounds like a dream come true as well as better content for you guys.</p><p><br></p><p>if you want an example of any of these style of videos go check out the<a href="https://www.youtube.com/@ChalerYT/videos" rel="noopener noreferrer" target="_blank"> channel</a> or maybe you have already watched my stuff and just don\'t know it. <a href="https://www.youtube.com/watch?v=BrMwna7sQiU&amp;t=425s" rel="noopener noreferrer" target="_blank">&nbsp;Doc</a> <a href="https://www.youtube.com/watch?v=tefmQsilUQU&amp;t=2s" rel="noopener noreferrer" target="_blank">&nbsp;Vlog</a></p><p><br></p><p><img src="https://lh7-us.googleusercontent.com/Zw4kFtyO8y4GpaASxhU2ki28ARAmOTRDHtIG06mNidQ1YBMucEo2rSCW5otGLlrBOO4WlG3KDRT_tvmWztOtGvmYuQ8_iD3Rsboc5U7FjE2hd3486d04Y5TKOQ-VHCX5aIOEz5VRjOSdIAMlYN2QHFQ"></p><p><img src="https://lh7-us.googleusercontent.com/jD0lNTEvUe8Rb-uEyEdGE0BZIuyBSr-56M5C3x5W66aaZTJQ_E4K4yzQL6mhJIsF-jA50KN-S4Puw9WNkVAShRztAHqrhAWH7DMj4NgORp3ky9w-a2BE6VbPuS82NFoCql2bFPWqS-YZouu6Axc1TKE"></p><p><br></p><p><strong>Commentary</strong></p><p><br></p><p>Over the past year I have really been pushing my commentary, taking notes from great commentators in Europe and doing the best I can to be both entertaining and informative.</p><p>I really feel my commentary has reached a solid level in this time so I would love the chance to commentate in front of more people as a opportunity like<a href="https://www.youtube.com/watch?v=YaXxV9GK76U" rel="noopener noreferrer" target="_blank"> Fete</a> only comes around ever so often in Europe.</p><p><br></p><p><strong>Competing</strong></p><p><br></p><p>So yeah I\'m not the best I don\'t have any crazy wins or anything like that but if you are a real stats nerd would it not be fun to compare the peak of average in the UK vs the American field? Idk just stacking on whatever I can here and being as transparent as I can be that competition while not being the main focus anymore is 100% something I still enjoy and take seriously so I would love to see how I hold up.</p><p>This opportunity would genuinely mean the world to me and I promise to deliver as much as I physically can from this one trip. So if you vote for me please let me know (also its my birthday on the date of collusion... so that\'s fun if that influences you at all)&nbsp;&nbsp;</p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-26T18:20:31.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "meleesadposts",
    user: "0xcEb0b073a97CD5bB48E876ef415Dfe8f4DC03cb0",
    round: "collision-2024",
    description:
      "<p>hello i am meleesadposts. I have been playing melee for 8 years and i have started taking it more seriously than ever. Now that I have graduated college, I have had more time than ever to obsess over this beautiful game. Going to collision would help my improvement as a player immensely. I've been living in the middle of basically nowhere for some time and have little to no access to top level talent to play. I spend hours daily playing and this opportunity would make it even more worth it. This game means the world to me and this experience would be priceless. I want to push my Donkey Kong to the limit!</p><p><br></p><p>On top of that, I promise to bring you some awesome content surrounding the event afterwards o7 </p><p><br></p><p><br></p>",
    value: "0",
    createdAt: new Date("2024-02-27T23:04:28.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Salt X Nouns",
    user: "0xb2277afFECb1b2b061acAC920A373F501237908e",
    round: "collision-2024",
    description:
      '<p><strong>Hey everyone! I\'m once again signing up for the Nouns Prop House to be able to represent Nouns at Collision!</strong></p><p><br></p><p><strong>My resume includes: </strong></p><ol><li><strong>Ranked 14th best player in the world </strong></li><li><strong>Arguably the best Captain Falcon in the World </strong></li><li><strong>Multiple tourney wins (Low Tide City 2023, Rise n Grind 2023, Luminosity Makes Moves Miami 2023, BEMI 2023) </strong></li><li><strong>Multiple Top 8, Top 12, and Top 16 placements at Majors </strong></li><li><strong>I bring the HYPE!!! </strong></li></ol><p><br></p><p><strong>Thank you again to Nouns for this awesome opportunity! Good luck to everyone who signed up and may the one with the most votes win!</strong></p><p><br></p><p><strong><span class="ql-cursor">﻿﻿</span></strong><img src="https://ipfs.backend.prop.house/ipfs/QmYrnxxwhwhkQg68anEQcR4DH3M7WV8giStqXeb8kU55QX"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-28T21:38:16.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Salt X Nouns",
    user: "0xC705519E6Ae96264693844f5B3E58bAbB3E8D9c5",
    round: "collision-2024",
    description:
      '<p><strong>Hey everyone! I\'m once again signing up for the Nouns Prop House to be able to represent Nouns at Collision!</strong></p><p><br></p><p><strong>My resume includes:</strong></p><ol><li><strong>Ranked 14th best player in the world</strong></li><li><strong>Arguably the best Captain Falcon in the World</strong></li><li><strong>Multiple tourney wins (Low Tide City 2023, Rise n Grind 2023, Luminosity Makes Moves Miami 2023, BEMI 2023)</strong></li><li><strong>Multiple Top 8, Top 12, and Top 16 placements at Majors</strong></li><li><strong>I bring the HYPE!!!</strong></li></ol><p><br></p><p><strong>Thank you again to Nouns for this awesome opportunity! Good luck to everyone who signed up and may the one with the most votes win!</strong></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYrnxxwhwhkQg68anEQcR4DH3M7WV8giStqXeb8kU55QX"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-29T05:33:08.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Salt X Nouns",
    user: "0xC705519E6Ae96264693844f5B3E58bAbB3E8D9c5",
    round: "collision-2024",
    description:
      '<p><strong>Hey everyone! I\'m once again signing up for the Nouns Prop House to be able to represent Nouns at Collision!</strong></p><p><br></p><p><strong>My resume includes: </strong></p><ol><li><strong>Ranked 14th best player in the world </strong></li><li><strong>Arguably the best Captain Falcon in the World </strong></li><li><strong>Multiple tourney wins (Low Tide City 2023, Rise n Grind 2023, Luminosity Makes Moves Miami 2023, BEMI 2023) </strong></li><li><strong>Multiple Top 8, Top 12, and Top 16 placements at Majors </strong></li><li><strong>I bring the HYPE!!! </strong></li></ol><p><br></p><p><strong>Thank you again to Nouns for this awesome opportunity! Good luck to everyone who signed up and may the one with the most votes win!</strong></p><p><br></p><p><strong><span class="ql-cursor">﻿</span></strong><img src="https://ipfs.backend.prop.house/ipfs/QmYrnxxwhwhkQg68anEQcR4DH3M7WV8giStqXeb8kU55QX"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-02-29T05:39:16.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "ANT FOR NOUNS AT COLLISION",
    user: "0x35D1E729A0304eF5D3E6a14D97C8c1fB90d0d1e5",
    round: "collision-2024",
    description:
      '<p>I’m a spacies main who started playing in 2019, and would love the opportunity to play the best in the world at Collision this year. Watching a Nouns legend every week at the nightclub weekly in NYC has influenced me and made me want to take the game more seriously and play as much as I can, especially at big events like Collision. I would happily wear Nouns merch and complete any sponser obligations while playing the best game ever made. </p><p><img src="https://ipfs.backend.prop.house/ipfs/Qmcyr7mJiB5b8p9mHW11sghecqVDSi2HxGWM7Bw6pW6EAM"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-03-01T21:23:07.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Justus",
    user: "0x88acD7b35a35a1D6D0e9BA057768E49f78b7739d",
    round: "collision-2024",
    description:
      "<p>My birthday is during Collision and I’d love to go, I have less opportunity to travel and it’s also during spring break, I work at a school so it’s really hard to get time off! Thanks</p><p><br></p><p> -Justus</p>",
    value: "0",
    createdAt: new Date("2024-03-02T00:50:38.000Z"),
    hidden: false,
    published: true,
  },

  // Battle of bc
  {
    title: "Get VOx to BoBC!!",
    user: "0xF3F4ddE743D7c87b1019A6C793977205d58602E6",
    round: "battle-of-bc-2024",
    description:
      "<p>Im VOx, a puff player from upstate new york. Ive never ben to a major, and its a goal of mine for a while. if you want to see this mediocre puff at bobc you should vote for me </p>",
    value: "0",
    createdAt: new Date("2024-03-09T19:16:35.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Slippi Part Timer Hits the Main Stage",
    user: "0xF5d3400a6383F06e2b4993837ce73b50fe5bA920",
    round: "battle-of-bc-2024",
    description:
      "<p>upon stumbling back into Smash Bros Melee back in 2014, the game has been a constant in my life. In 2020, there was the release of the rollback net code client, Slippi, which as allowed me to hone my skillset to a formidable level. Having logged in over 30,000 matches over 3 years, I’ve had the wonderful experience of making many friends and testing my skill against high level competition</p>",
    value: "0",
    createdAt: new Date("2024-03-15T12:07:52.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "(Paladin) I want to see if my practice is paying off!",
    user: "0xe6498AA51662Ba1396B8bd12C81FAA618c60Bf61",
    round: "battle-of-bc-2024",
    description:
      '<p>Hey, I\'m Hrant "Paladin" Hanissian, a fox player from TN, I am actively ranked #2 in the state under Grab who is currently ranked 64th in the world. I started playing melee when I was 12 after watching Mango play Armada at MLG 2014 and have been hooked ever since. The majority of my gaming has taken place online through tools like smashladder so in person events are still pretty new to me despite how long I\'ve been in the scene so this opportunity would mean a lot.</p><p><br></p><p>The majority of my impact on the scene has been online as well, I\'m currently a moderator of the central Melee Online discord, I try and help make the scene a better place just trying to eliminate instances of toxicity that take place! Through this opportunity I\'ve also met a lot of inspiring people that also volunteer their time to aid the scene and foster a better community and a positive place to find games.</p><p><br></p><p> I\'ve been reassessing my approach to competing and changing my methods of conscious practice. I would love the opportunity to apply my practice at a major! Last year I placed around 33rd-49th at the majors I was able to attend and think I have what it takes to push past that given more opportunities. I am not able to travel as often as I would like, as a current full time student, and would love to see what I am capable of given more opportunities to compete. </p><p><br></p><p>I also have a cat named Rufus that I adore.</p><p><br></p><p>Thank you,</p><p>Hrant</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmRaJSQ8eabWDZFnFQ4zw6jLdCgDpvQJq3n44w261oxbae"><img src="https://ipfs.backend.prop.house/ipfs/QmXVQS1YP9v7pV9H5F2LBqANQQMj8a31eaBxSogAXnD8Tj" style="" width="465" height="381.6623376623377"><img src="https://ipfs.backend.prop.house/ipfs/QmWHTRPwZjYeHCbYAc3WgAtSefXyzR2MuERDasop5rhkoW" style="" width="286" height="381.3268286026201"></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZGGgSPDV1ghL9b9wEHJSzHXxhgeski4kxnFBLGj26xGQ" style="" width="292" height="355.6247362869198"><img src="https://ipfs.backend.prop.house/ipfs/QmVmiGYehVuTy5awu6wJVjWicn8bGQUsWJ1oNSP3yoTmED" style="" width="613" height="348.42840289429535"></p><p><br></p><p><br></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-03-09T20:31:23.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "meleesadposts",
    user: "0xcEb0b073a97CD5bB48E876ef415Dfe8f4DC03cb0",
    round: "battle-of-bc-2024",
    description:
      "<p>donkey kong wants to go to canada. if you vote for me and i get in, ill make a couple great youtube vids out of the experience!</p><p><br></p><p>One video aims to be a spiritual successor to the \"Slime on the Scene\" series. I have had this drafted up for a while and have a couple bits planned for players that are all confirmed to be at BoBC! </p><p><br></p><p>Another will be a general vlog of my time at the major as well. I thought it would be really exciting to try to catch every close off stream set and document the ground floor of melee tournaments (for example: Jackzilla Big House/Genesis stream) which isn't shown a lot.</p><p><br></p><p>I also really want make a video interviewing some 0-2ers as well LOL</p><p><br></p><p>I also really value the time i get at majors, and the practice I get there is infinitely valuable to me. I get like 4 hours of sleep at majors because the practice I get there is just unrivaled.  Your support would be appreciated. My recent slew of Melee performances have demonstrated a lot improvement, and I wan't to continue it here and hopefully return the favor by bringing you laughs.</p>",
    value: "0",
    createdAt: new Date("2024-03-09T21:49:31.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "jaye 4 bobc",
    user: "0x995A51c0965d9Ea85b80cb363e1335c6EFa576f8",
    round: "battle-of-bc-2024",
    description:
      "<p>i go 0-2 at my dallas local because i dont l-cancel but u never know i could make a run………..</p><p><br></p><p>i studied swagonomics at the school of hard knox and graduated magna cum laude so nouns hit my line..</p>",
    value: "0",
    createdAt: new Date("2024-03-09T22:22:59.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Vote for CJ",
    user: "0x937E691D54c6cBbF68C00004a625F510069aB8C2",
    round: "battle-of-bc-2024",
    description:
      "<p>Been playing melee for 20 years and I’m seasoned…but I almost exclusively play for the clips. Trying to go to BOBC5 without tapping in to my 401k. You probably won’t vote in the actual election, but I hope you still vote for me here. Love you all. </p>",
    value: "0",
    createdAt: new Date("2024-03-09T23:20:54.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "hello i am spark.",
    user: "0x12402eaCBf96784d273d006775b0498f0E11A872",
    round: "battle-of-bc-2024",
    description:
      "<p>hello i am spark. i am now an unsponsored gamer which means the vibes are off. send help. begging u lowkey. i understand that i have had many opportunities in my day and that there are many other wonderful gamers who are likely more deserving of this opportunity, but i would still like to throw my hat in the ring. please forgive my gluttony in this regard. thank u.</p>",
    value: "0",
    createdAt: new Date("2024-03-10T12:29:38.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "give salami money",
    user: "0x45E7b80e9790C5c5dF0B5D8Ff1efF7e773ED938D",
    round: "battle-of-bc-2024",
    description:
      '<p><img src="https://ipfs.backend.prop.house/ipfs/QmXfZgcq6D7KGu1MYypD27yQBKzbEYgqZfXTQaNzhimbgZ"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-03-10T19:07:50.000Z"),
    hidden: false,
    published: true,
  },
  {
    title:
      "Wintersalamander for BoBc cuz I want to experience my first major while explorin",
    user: "0x808388c6461Fa51D2a0F6a26c0AF118D5412C2B6",
    round: "battle-of-bc-2024",
    description:
      "<p>I got kicked out of my house, so I am currently backpacking through America, but getting to see Canada would be really cool too. I have lost track of how long I've been watching pro melee but at least by 2016 I was. I have played at regionals in the past, but I've gotten a lot better at melee since I last competed. It would be cool to see how I fare at a major, and getting to watch top level sets in person would be crazy. I mainly play fox but have a secondary marth as well.</p>",
    value: "0",
    createdAt: new Date("2024-03-11T13:30:46.000Z"),
    hidden: false,
    published: true,
  },
  {
    title: "Get Wizzy to BOBC",
    user: "0x21185e92559737c5fc7BdF8b4b930714f92735FF",
    round: "battle-of-bc-2024",
    description:
      '<p>Vote for me if you want to see the most insane sickest coolest super great super duper amazing insane level Falcon gameplay!!!!<img src="https://ipfs.backend.prop.house/ipfs/QmdfzCo22bvbZTTGw1ZEYNVeMuvicswNyjePpM76xW8GTJ"></p><p><br></p><p><br></p>',
    value: "0",
    createdAt: new Date("2024-03-14T02:06:03.000Z"),
    hidden: false,
    published: true,
  },
];

let count = 0;
let ipfsBackend = 0;
let mypinata = 0;
let google7 = 0;
let google5 = 0;

// 2: https://lh5.googleusercontent.com/
// 4: https://lh7-us.googleusercontent.com
// 61: https://prophouse.mypinata.cloud/
// 116: https://ipfs.backend.prop.house/

const key: Record<string, string> = {};

proposals.forEach((proposal) => {
  const images = [
    proposal.description.match(
      /https:\/\/ipfs.backend.prop.house\/ipfs\/[a-zA-Z0-9]*/g
    ) ?? [],
    proposal.description.match(
      /https:\/\/lh7-us.googleusercontent.com\/[a-zA-Z0-9-_]*/g
    ) ?? [],
    proposal.description.match(
      /https:\/\/lh5.googleusercontent.com\/[a-zA-Z0-9-_]*/g
    ) ?? [],
    proposal.description.match(
      /https:\/\/prophouse.mypinata.cloud\/ipfs\/[a-zA-Z0-9]*/g
    ) ?? [],
  ];

  images[0].forEach(async (image) => {
    count++;
    ipfsBackend++;

    const data = await fetch(
      `https://ipfs.io/ipfs/${image.split("/ipfs/")[1]}`
    );

    if (!data.ok) console.log(image);

    const buffer = await data.arrayBuffer();

    const type = await fileTypeFromBuffer(buffer);

    fs.writeFileSync(
      `./apps/website/archive/prop-house/output/images/${
        image.split("/ipfs/")[1]
      }.${type?.ext}`,
      Buffer.from(buffer)
    );
  });

  images[1].forEach((image) => {
    count++;
    google7++;

    console.log(image);
  });

  images[2].forEach((image) => {
    count++;
    google5++;

    console.log(image);
  });

  images[3].forEach(async (image) => {
    count++;
    mypinata++;

    const data = await fetch(
      `https://ipfs.io/ipfs/${image.split("/ipfs/")[1]}`
    );

    if (!data.ok) console.log(image);

    const buffer = await data.arrayBuffer();

    const type = await fileTypeFromBuffer(buffer);

    fs.writeFileSync(
      `./apps/website/archive/prop-house/output/images/${
        image.split("/ipfs/")[1]
      }.${type?.ext}`,
      Buffer.from(buffer)
    );
  });
});

console.log("Total images: ", count);
console.log("ipfs.backend.prop.house: ", ipfsBackend);
console.log("lh7-us.googleusercontent.com: ", google7);
console.log("lh5.googleusercontent.com: ", google5);
console.log("prophouse.mypinata.cloud: ", mypinata);
