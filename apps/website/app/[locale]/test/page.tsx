import { Vote, db, proposals as proposalsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import fs from "fs";

const data = [
  {
    title: "(Nizza) I want to Prove the Results of my Training and Experience",
    tldr: "I am an event coordinator and a strong Japanese Tekken player who is looking to make a big splash while repping Nouns.",
    body: '<p>・鉄拳のオフラインコミュニティを盛り上げるべく、鉄拳7家庭用発売から約7年間、ShotBar LUCY(@ShotBar_LUCY)にて『鉄拳対戦交流会』を主催しています。</p><p>鉄拳8発売後も、鉄拳プロプレイヤーを含め、沢山のプレイヤーの交流の場となっています。</p><p><br></p><p>・現状オンライン環境が普及してしまい、日本独自の文化、ゲームセンターでのコミュニティがどんどん無くなってきている為、みんなで積極的にオフラインで集まる事で、以前のゲームセンターのような賑わいを取り戻せるように活動しています。</p><p><br></p><p>I have been helping with the hosting of the "Tekken Battle Exchange Meet" at ShotBar LUCY (@ShotBar_LUCY) for about 7 years in order to boost the offline community of Tekken.</p><p>Even after the release of Tekken 8, it has become a place for many players, including professional Tekken players, to interact.</p><p><br></p><p>We are trying to bring back the old game center atmosphere by having offline gatherings.</p><p><br></p><p><img src="https://lh7-us.googleusercontent.com/g3xVpll1EBul_texJdfN7R9cy-UXf74ld40JRtUNvLUyDGEkLbxdhpJEEvJQPfiJOcnoONdZ487pQy0LKKOOpIPJRhOobE2SCRi_X8ZA-79KOGt9Bhl_qwR_fd9IMYPC_mqpeigoasfmKcoMvcWgYJI"></p><p>・普段のトレーニングはLUCY、Red Bull Gaming Sphere Tokyo、TZ GAME Lab銀座へ行って参加者と対戦をしたり、Cerberus|黒天(@kurotenBB)と一緒に家でトレーニングしています。</p><p>黒黒さん(kurokuro_japan)が企画したFT10イベントの際は魚群|AO(@Smily Ao)とトレーニングを行い、無事勝利する事が出来ました。</p><p>FT10の様子は私のXから観る事が出来ます。</p><p><br></p><p>I usually attend events at LUCY, Red Bull Gaming Sphere Tokyo, and TZ GAME Lab Ginza to play against other participants or train at home with Cerberus|Kuroten(@kurotenBB).</p><p><br></p><p>During the FT10 event organized by Kurokuro (kurokuro_japan), I trained with GyoGun|AO (@Smily Ao) and we were able to win the event.</p><p>You can watch the FT10 event from my X.</p><p><br></p><p><img src="https://lh7-us.googleusercontent.com/2hxKgofcAvGsIjTn50Sl9hxgdpZrOYzzmgK0_qbQ5fTACAWlAx89Gw_FoMLLu8KXN5awmUashQK5N7d_DbnGLTE72ey9iipmck1pBSCLGNhZO7I5wu2zu_HJY7eEbh5IGRRzlTSlLxms4wrVCzBLAEA"></p><p>・先日行われたMASTER CUP12(日本最大の5on5、参加チーム数153)でチームとして10位に入賞しました。</p><p><br></p><p>My best result was at a recent team tournament where we got 10th place at MASTER CUP12 (Japan\'s largest 5-on-5 tournament with 153 participating teams).</p><p><br></p><p>・鉄拳以外ではストリートファイターもプレイしています。</p><p>キャラクターはキャミィです。</p><p><br></p><p>I am also a Cammy main in Street Fighter.</p><p><br></p><p><img src="https://lh7-us.googleusercontent.com/VkLwx7cAu2Nnl986O8FbZmfraIH-cNAzsy0nRc_bcJ8i5jG2eA1ezc0rW4mIczKMRsnaXZIEIVcCmEBOpEQTAdewmTHeHx23919oXPhfxpxEEjfwdEWz9jThW_MG372gx2OURL2W8gpiqHQjmu2JrnU"><img src="https://lh7-us.googleusercontent.com/XxN3lgQBJYXJ8vXBrENGrJ2EFclWxVLEgMTbBwpTMv6AkRaqO3qKQg-p4D74fY9HAYqiezRuGMbCNu03aVLGbbRrcDjXj5fKiVqsjyLCKkzLCOE84zqOeUxeBWsy3p5S-tvAkTiGtTl7c6nYFlZh7xc"></p><p>・普段は仕事の都合で休みが取りづらい為、大会に参加する事自体が難しいです。</p><p>しかし今回のEVO JAPANは事前に日程が決まっており、当日まで準備する時間もあるので、結果も期待出来るように毎日努力しております。</p><p><br></p><p>・年齢は40歳を過ぎています。</p><p>歳を取ったプレイヤーでも、強い人がまだ居るという事を証明出来るように努力します。</p><p>(尊敬しているKNEEもそうであるように)</p><p><br></p><p>I am usually unable to take time off due to work commitments, so it is difficult for me to participate in the tournament itself.</p><p>However, this EVO JAPAN is scheduled in advance and I have time to prepare for the event, so I am doing all the training I can to get good results.</p><p><br></p><p><br></p><p>The age of the participants is over 40 years old.</p><p>I am over 40 years old, so I want to prove that there are still strong players who are old enough to play.</p><p>(As is the case with KNEE, whom I respect very much).</p><p><br></p><p><img src="https://lh7-us.googleusercontent.com/HCj14aTW2gsX6Fc8RhjCxvVTHBV7r9GlLcpRgmwyg8h5vGJ9W0ed7tMMMjHSBx04YVY3eFHqyoEJRJm_ZepOTEbz0q9LCR9TDkGJ_25e-BeaqHr6JPUnr5zZjlpeJ9AwzOTD2UNM-q6y82z54l6WdZ0"></p><p><br></p><p>・動物とファッションと音楽も好きです！よろしくお願いいたします。</p><p>I also love animals, music, and fashion. I look forward to the chance to be able to work with the team.</p><p><img src="https://lh7-us.googleusercontent.com/B3lQZ1FKZ8zUlSEtFJbiC2zRWsWiTuykH8dm_MEFkZLh8w4pJcCkB3wjOMPtUvlkCzUCeWxH298MFfoAdrT2bvciCWPjBLhe7W1aqqOguBBS9UvZQZgzMiG0wuXqUvoOHjiCsSZb_FvUCyWkIzprm7o"></p><p><img src="https://lh7-us.googleusercontent.com/dBMgUOUeAzd5rGYjSk-uE_fGgk32C5EzsK-3di4tG1f3ovM7h4wS3wjKjaoYFjVAKNuxWafIcJJ_rKSyTcZ4JMFlmioQKuaOTSDPQRJkH8dZ9mDdCNDvOdq3-85_-cJCdqwIZcguxCjONZoX0UlirH0"></p><p><br></p><p><br></p>',
    receivedAt: 1712636020,
    proposer: {
      id: "0xa236bbE13517D7FE9d613C3E0E58387a9661b9D3",
    },
    votes: [
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1713194785,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1712948230,
        votingPower: "3",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1713110062,
        votingPower: "3",
      },
    ],
  },
  {
    title: "Nice to meet you. My name is Yu Ebihara.",
    tldr: "Nice to meet you. I'd like to explain how I applied and my current grades.",
    body: '<p>I want to participate in Evo Japan, which has been a long standing dream, and test my current skills, and attract the audience through play. In order to achieve that goal, I wanted to take the chance provided by Nouns and apply.</p><p><br></p><p>I have always loved fighting games, but due to my work, I was unable to take time off on weekends and holidays to participate in tournaments as well as Evo Japan. </p><p><br></p><p>However, with the release of Street Fighter 6, I thought about what I wanted to do most, and I decided that I would like to produce results at tournaments and events. I wanted to make the scene more exciting.</p><p><br></p><p>That is why I changed my job to something that I could enjoy more while having more time off. I am now taking the initiative to participate in tournaments and events.</p><p><br></p><p>Participating in Evo Japan is my dream.</p><p><br></p><p>I would be very happy if you could help me to realize my dream.</p><p><br></p><p>CAPCOM Pro Tour 2023 World Warrior Japan #2 スト6 321th</p><p>CAPCOM Pro Tour 2023 World Warrior Japan #3 スト6 49th</p><p>CAPCOM Pro Tour 2023 World Warrior Japan #4 スト6 17th</p><p>FAVCUP 2023 SF6 SINGLE OPEN TOURNAMENT 17th</p><p>CAPCOM Pro Tour 2023 Online Premier Japan スト6 49th</p><p>4th Nagoya OJA BODY STAR SFL 2024 Tri-Out Tournament 6 winner</p><p>1st TOKYO METRO CUP STREET FIGHTER 6 Ranked 7th in general category<img src="https://ipfs.backend.prop.house/ipfs/QmcdgpNaR2ZvpqRDPQ6ytPAAE98YKNyQn5ZuQENvSxd5Zp"></p><p><br></p><p><br></p>',
    receivedAt: 1712648940,
    proposer: {
      id: "0x076fc1852c792E9e0676738D2Cb1e2A838638563",
    },
    votes: [
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1712944597,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1712948230,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1713110062,
        votingPower: "1",
      },
    ],
  },
  {
    title:
      "(Hazure Metal) I want to show the fun and power of the Kuma Shinken on the World",
    tldr: "I am Hazuremetal, Japan’s highest ranking bear player. I would be filled with joy to have the chance to be a representat",
    body: '<p>I am a practitioner of the Kuma-Shinken style from Japan who goes by the name Hazuremetal.</p><p>I used to main a rare big bodied character named Gigas in Tekken 7. I have also used Kuma as well in Tekken 7.</p><p>Since Tekken 7, I have placed well in high in the Intercontinental Fight Club Asia tournaments and have won various tournaments such as the bi-weekly Tatakai Tuesday tournaments.</p><p>I have been using Kuma as a main character in Tekken 8 and I was the second to achieve the coveted God of Destruction rank after the former world champion VARREL | Rangchu. No one else in Japan has been able to achieve this feat.</p><p>Although this ranking board is only displayed terrestrially, I believe that this gives me a good chance to surprise players with my odd and unique character and to make a big splash with my salmon-hunting style.</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmZEjvJSTRLJnCfzHKcZS2y1YEe8JXh9wtnWVv44ydcJ7C"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmW5ktyAAWeLaTjC6R8urMVcvxjVAAchDoXPy6QFm9mvV6"></p><p><br></p><p><br></p>',
    receivedAt: 1712664417,
    proposer: {
      id: "0xB5990cba011b6f86b2203D80d20DDA5007aa5B52",
    },
    votes: [
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1712944597,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1712948230,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1713110062,
        votingPower: "1",
      },
    ],
  },
  {
    title: " To the esteemed members of Nouns Esports/Nouns Esportsの皆様へ、",
    tldr: "I strongly resonate with Nouns' ethos. If given the opportunity to represent, I will do my utmost to contribute to Nouns",
    body: "<p>I have been involved in the world of esports for many years, cherishing the game of Tekken and actively participating in competitions and community activities. By taking on the role of the representative player for Nouns Esports, I am confident that I can elevate myself while contributing to the achievement of Nouns' objectives.</p><p>私は鉄拳を愛し、競技とコミュニティを通じて長年にわたりeスポーツの世界で活動してきました。</p><p>Nouns Esportsの代表選手としての活動を担当することで、私自信ステップアップしつつ、Nounsの目標達成に貢献できると確信しています。</p><p><br></p><p>Allow me to briefly introduce my background. For over 20 years, I have been playing Tekken, a game that fuels my passion and provides opportunities not only to hone my skills as a competitor but also to deepen bonds within the community. Additionally, over the past 8 years, I have served as a streamer and influencer, operating a YouTube channel with over 16,500 subscribers, where I share the joy of gaming and engage with the community.</p><p>■Youtube https://t.co/qRg5T7LTh1</p><p><br></p><p>The reason behind my determination to join Nouns Esports stems not only from my experience as a player but also from my perspective as a streamer. I have always prioritized building relationships with the community and fans, and I resonate deeply with the principles of the organization. I believe that Nouns Esports provides an excellent opportunity to leverage my experiences and values.</p><p>I particularly found this video to be very relatable as it provides a clear understanding of Nouns' philosophy. effectively </p><p><br></p><p>communicates Nouns' principles, and I resonated deeply with them.</p><p>https://www.youtube.com/watch?v=oa79nN4gMPs&amp;t=2s</p><p>私の経歴を少し紹介させていただきます。</p><p>20年以上にわたり、鉄拳をプレイし続けてきました。</p><p>このゲームは私の情熱であり、競技者としてのスキルを磨くだけでなく、コミュニティとの絆を深める機会でもありました。</p><p>また、過去8年間はストリーマーやインフルエンサーとして活動してきました。</p><p>YouTube登録者数が16500人を超えるチャンネルを運営し、コミュニティとの交流やゲームの楽しさを共有してきました。</p><p><br></p><p>Nouns Esportsの活動に参加する決意を固めた理由は、選手としての経験だけでなく、ストリーマーとしての視点からも組織の理念に共感したからです。</p><p>私は競技力だけでなく、コミュニティやファンとの関係構築にも力を入れてきました。</p><p>Nouns Esportsの活動は、そのような私の経験や価値観を活かす絶好の機会だと考えています。</p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmdZPuCU7ZUVZAd1BXJ3RSDKU269asc4nXxMm6R2KzM12t\"></p><p><br></p><p><br></p><p>Furthermore, I possess knowledge in NFTs and blockchain, enabling me to contribute to content creation related to Nouns Esports. If selected, I will actively participate in the organization's PR activities.</p><p><br></p><p>While my competitive achievements may have room for improvement, I am confident in my ability to contribute to the visibility of Nouns Esports due to my strong presence as a streamer.</p><p>私はNFTやブロックチェーンの知識も持っており、Nouns Esportsに関するコンテンツ制作も可能です。</p><p>選出された際には、組織のPR活動も含め、積極的に貢献いたします。</p><p><br></p><p>私の競技実績はまだまだ拙い部分もありますが、ストリーマーとしての拡散力は高く、</p><p>Nouns Esportsの知名度向上に貢献できる自信があります。</p><p><br></p><p>My achievements include:</p><ul><li>GALLERIA GAME CHALLENGE 2021 DOJO: 17th out of 96 participants</li><li>TEKKEN7 at EVO 2019: 129th out of 1899 participants</li><li>TEKKEN7 at EVO Japan 2018: 65th out of 1202 participants</li></ul><p><br></p><p>As the representative player for Nouns Esports, I am committed to contributing to the organization's success through competitive activities and content creation. I would be grateful for the opportunity to serve in this capacity.</p><p>私はNouns Esportsの代表選手として、競技活動やコンテンツ制作を通じて組織の成功に貢献したいと考えています。</p><p>この機会を与えていただければ幸いです。</p><p><br></p><p>Thank you for your consideration.</p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmRPhSBTifabWk8J5wanYV6QoQcKHgmCSVa1UnULr8H6cJ\"></p><p><br></p><p><br></p>",
    receivedAt: 1712675850,
    proposer: {
      id: "0x2402fe49305c6b69e6BBD943B8faae8666E9FcB3",
    },
    votes: [
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1712944597,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1713194785,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1712948230,
        votingPower: "2",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1713110062,
        votingPower: "2",
      },
    ],
  },
  {
    title: "（Zeugal）I'm a promoter of the Japanese Tekken community.",
    tldr: "I would like to help Nouns give opportunities to Japanese athletes.",
    body: '<p>My goal is to let as many people know about the opportunities that Nouns has given Japanese players, and to further develop FGC.</p><p><br></p><p>私の目標は、Nounsが日本人プレイヤーに与えたチャンスを多くの人に知ってもらい、FGC&nbsp;をさらに発展させることです。</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmevmRTXVGdL8hT6sjf1Gqfs2FSmt1dHLR7YtADaVYoE2T"></p><p><br></p><p>I have been working to spread the appeal of Tekken in Japan for over 10 years.</p><p><br></p><p>In a long history, He wrote articles about the tournament and traveled to various parts of Japan to provide live commentary and commentary.</p><p><br></p><p>私は10年以上、鉄拳の魅力を伝える活動を日本で行ってきました。</p><p><br></p><p>その中で、大会の記事を執筆したり各地の大会に実況や解説として回っていることもありました。</p><p><br></p><p>We\'ve been working with a player called Nippon Hippo to promote Tekken on YouTube for over 7 years. It has been shown over 170 times. The total number of views is well over 1 million.</p><p><br></p><p>私はヒッポというプレイヤーと協力して、YouTubeで鉄拳のプロモーションを&nbsp;7&nbsp;年以上行ってきました。上映回数は170回を超えています。総再生回数は100万回を優に超えています。</p><p><br></p><p>I chose to be active in the competitive scene because I felt that I needed a stronger influence to achieve my goals.</p><p><br></p><p>私が競技シーンで活躍することを選んだのは、自分の目標を達成するには、より強い影響力が必要だと感じたからです。</p><p><br></p><p>As a result,</p><p><br></p><p>・「EVO JAPAN 2023」25th place</p><p>・「EVO JAPAN 2020」Best8</p><p>・「EVO JAPAN 2019」17th place</p><p><br></p><p>Won Japan\'s first offline tournament in Tekken 8.</p><p><br></p><p>国内初のオフライン大会でも優勝しました。</p><p><br></p><p>In team competitions, he and his trusted teammates won numerous awards, including the MASTERCUP.</p><p><br></p><p>チーム競技では、信頼できるチームメイトでマスターカップを含む数多くの賞を受賞しました。</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmbAHP55FsUTiYUE2U6LdMkpHpbuQoz55XTqKuh1fEsVvK"></p><p><br></p><p>Currently, we hold competitive exchange events several times a month at our esports facility in an effort to revitalize the community.</p><p><br></p><p>現在は月に数回、eスポーツ施設で競技交流イベントを開催し、コミュニティの活性化に努めています。</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVDqvXWqGc355i1gup5WFRitFeqtFM6Q8VNkdkcKKUQSk"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmYVrrcN7LDtuYHzoRqUBZFT7W285sZKHuqNdby4U3iNKu"></p><p><br></p><p>Thank you nouns and blvkhvnd for giving me this opportunity.</p><p><br></p><p>I left the team at the beginning of this year and am looking for a place to further my activities. We would appreciate your cooperation.</p><p><br></p><p>今年初めにチームを辞めて、さらに活動できる場所を探しています。ご協力をよろしくお願いいたします。</p><p><img src="https://ipfs.backend.prop.house/ipfs/QmVEgmsJMVpW8XvrjBtYxUbdfcyfrKDfraQp5ihVSiy7hA"></p>',
    receivedAt: 1712708985,
    proposer: {
      id: "0xBaB0F74efb8Bad5B340019B27ce2aE51fCf78E98",
    },
    votes: [
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1712944597,
        votingPower: "2",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1712948230,
        votingPower: "2",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1713110062,
        votingPower: "2",
      },
    ],
  },
  {
    title: "Ready to Game",
    tldr: "Let’s go to EVO Japan with Nouns Esports & BLVKHVND",
    body: '<p>I\'m really exited for this one jiji</p><p><br></p><p>Hellooo my name is Lucy, I am 19 years old, I was born in Argentina but I have lived in México since I was a baby, I speak perfect Spanish and English.</p><p><br></p><p>I play Street Fighter 6, where I am silver 4, I am around 8000 LP, soon silver 5 I hope haha, I also play Tekken 7 but I wouldn’t advise you to make me play that&nbsp;hahaha still learning.</p><p><br></p><p>I competed at Arata tournament 2023 for a trip to EVO 2023, I placed 94th.</p><p><br></p><p>I\'m still rocking basic experience, but I\'m all about soaking up knowledge like a sponge. I\'m really looking to learn, meet fellow gamers, and soak in the gaming world.</p><p><br></p><p>Joining your crew would be epic. Your team\'s dedication to crushing it in the gaming world resonates with me big time. Representing Nouns Esports &amp; BLVKHVND at EVO Japan would be an unreal opportunity.</p><p><br></p><p>Thanks for considering me!! I’m hyped to show what I\'ve got and learn even more along the way :)</p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmcrRqbrUDNe4wXCnzEgHCr1KPpH4FV9CcBgn77ME6kLuK"></p><p><br></p><p>this is my X (I am really new at X): <a href="https://twitter.com/lulilimoncito" rel="noopener noreferrer" target="_blank">https://twitter.com/lulilimoncito</a></p><p><br></p>',
    receivedAt: 1712712683,
    proposer: {
      id: "0x711e320ba5E8F96834aC9A6A17BE5a79CA90D950",
    },
    votes: [],
  },
  {
    title: "Hi this is Jumbo ^^",
    tldr: "Ready to make México proud at EVO japan!",
    body: "<p>Hiii, I’m Aurora (but everybody calls me Jumbo), a 20 year old Street Fighter enthusiast hailing from México. I got so exited to see that I could go to EVO Japan event with Nouns Esports &amp; BLVKHVND.</p><p><br></p><p>I play Street Fighter 6, I’ve battled my way to Silver 5 rank with 8,200 LP aprox.</p><p>I participated in the Arata tournament back in 2023 for a trip to EVO 2023. I may not have snagged the top spot, but landing in 81st place is pretty gratifying haha</p><p><br></p><p>I'm stoked about the opportunity to represent Nouns Esports &amp; BLVKHVND. Your team's commitment to gaming excellence is a perfect match for my passion and dedication. I can't wait to step onto the EVO Japan stage and show the world what I've got.</p><p><br></p><p>Thanks for considering my application! You won’t regret getting me :)) Let's make México proud at EVO Japan!</p><p><br></p><p><img src=\"https://ipfs.backend.prop.house/ipfs/QmdPgmfWLUBGnHThnnASVNTBJC1pHrrsH2UqdR2R4kyiMb\"></p><p><br></p><p><br></p>",
    receivedAt: 1712713743,
    proposer: {
      id: "0x88Ec2723644250155cD083F3aF7A2Cae1DEb2c4c",
    },
    votes: [],
  },
  {
    title: "少年 e-spopia",
    tldr: "shonen e-spopia",
    body: '<p><img src="https://ipfs.backend.prop.house/ipfs/QmU5xJJT2ms8kW4CDq8VmZVSmp1pPKfpELpvQYXyq5d43o"></p><p><br></p><p>新潟在住の鉄拳プロゲーマー</p><p>少年です。　　米EVOではルーザーズ11勝し、33位の結果を残しています。</p><p><br></p><p>コミュニティ大会で3度の優勝をしています。</p>',
    receivedAt: 1712761941,
    proposer: {
      id: "0xCFB953c4E80d572d32A58CEc6232ac1E09C56af2",
    },
    votes: [
      {
        voter: {
          id: "0xd75cCA4D0CC46bf0D3A5dc9cC40d133d80A6F322",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0xE3ff24a97BFB65CAdEF30F6Ad19a6EA7E6F6149d",
        },
        receivedAt: 1712944597,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x87a0Dee820326C2CAcbB37F54FF849Db5fd3A5f9",
        },
        receivedAt: 1712948230,
        votingPower: "1",
      },
      {
        voter: {
          id: "0x2993284dd36A836f0d83856c2b4586C6Daf008EC",
        },
        receivedAt: 1713110062,
        votingPower: "1",
      },
    ],
  },
] as const;

const votes: Omit<Vote, "id">[] = [];

const round = "evo-";

export default async function Test() {
  for (const p of data) {
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

  return <div></div>;
}
