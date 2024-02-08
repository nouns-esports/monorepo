type Nodee = { type?: string; content?: Nodee[] };

function iterateObject(obj: { type?: string; content?: Nodee[] }) {
  if (obj.hasOwnProperty("type")) {
    if (obj.content && Array.isArray(obj.content)) {
      obj.content.forEach((innerObj) => iterateObject(innerObj));
    }
  } else {
    console.log(obj);
  }
}

const json = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "It bears repeating: NOUNS STAY WINNING! DPC dominance, ECL wins, Top 8 finishes. Let's go! ",
        },
      ],
    },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 2 },
      content: [{ type: "text", text: "Play of the Week" }],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 10,
          self_thread: { id_str: "1638280301980930073" },
          possibly_sensitive: false,
          created_at: "2023-03-21T20:43:56.000Z",
          display_text_range: [0, 215],
          entities: {
            hashtags: [],
            urls: [
              {
                display_url: "pog.nouns.gg/nounsesports/c…",
                expanded_url:
                  "https://pog.nouns.gg/nounsesports/contest/weekly-play",
                indices: [50, 73],
                url: "https://t.co/7qRjPFUSrs",
              },
            ],
            user_mentions: [],
            symbols: [],
          },
          id_str: "1638280301980930073",
          text: "Think you have pro gamer moves?  🎯 \n\nHead over to https://t.co/7qRjPFUSrs and submit your best plays, in any game, today! \n\nWe’ll announce the winner every Monday! 📆 \n\nThe top-voted play will receive $25 USDC!  💸",
          user: {
            id_str: "1252630927668203521",
            name: "Nouns Esports ⌐◨-◨",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1632459357546766338/wjJU5Tfa_normal.jpg",
            screen_name: "nounsesports",
            verified: false,
            is_blue_verified: true,
          },
          edit_control: {
            edit_tweet_ids: ["1638280301980930073"],
            editable_until_msecs: "1679433236000",
            is_edit_eligible: false,
            edits_remaining: "5",
          },
          conversation_count: 5,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1638280301980930073",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "We're rolling out POTW with " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "http://pog.nouns.gg/",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "POG",
        },
        {
          type: "text",
          text: "! Details in the tweet above. Submit your gaming highlight for a chance to win $25 USDC each week! ",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Any game, doesn't matter, let's see those hype moments!",
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 2 },
      content: [{ type: "text", text: "Team Updates" }],
    },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 3 },
      content: [{ type: "text", text: "DotA 2 " }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [{ type: "text", text: "Important news update:" }],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 113,
          self_thread: { id_str: "1637885523418021888" },
          possibly_sensitive: false,
          created_at: "2023-03-20T18:35:13.000Z",
          display_text_range: [0, 269],
          entities: {
            hashtags: [
              { indices: [240, 251], text: "ESLProTour" },
              { indices: [252, 258], text: "Dota2" },
              { indices: [259, 269], text: "nounsDotA" },
            ],
            urls: [],
            user_mentions: [],
            symbols: [],
            media: [
              {
                display_url: "pic.twitter.com/cZKbO5tgpt",
                expanded_url:
                  "https://twitter.com/nounsesports/status/1637885523418021888/video/1",
                indices: [270, 293],
                url: "https://t.co/cZKbO5tgpt",
              },
            ],
          },
          id_str: "1637885523418021888",
          text: "Less than a year ago we had the idea to support esports teams, and now we just got invited to compete with the best in the world for a $1,000,000 prize pool.\n\nIn April, we'll be traveling to EU ✈️ to compete in DreamLeague Season 19. ⌐◨-◨\n\n#ESLProTour #Dota2 #nounsDotA https://t.co/cZKbO5tgpt",
          user: {
            id_sttr: "1252630927668203521",
            name: "Nouns Esports ⌐◨-◨",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1632459357546766338/wjJU5Tfa_normal.jpg",
            screen_name: "nounsesports",
            verified: false,
            is_blue_verified: true,
          },
          edit_control: {
            edit_tweet_ids: ["1637885523418021888"],
            editable_until_msecs: "1679339113000",
            is_edit_eligible: false,
            edits_remaining: "5",
          },
          mediaDetails: [
            {
              additional_media_info: {},
              display_url: "pic.twitter.com/cZKbO5tgpt",
              expanded_url:
                "https://twitter.com/nounsesports/status/1637885523418021888/video/1",
              ext_media_availability: { status: "Available" },
              ext_media_stats: { view_count: 3274 },
              indices: [270, 293],
              media_url_https:
                "https://pbs.twimg.com/ext_tw_video_thumb/1637885075889987586/pu/img/Kh2VeKxCWac5WmbZ.jpg",
              original_info: { height: 2160, width: 3840 },
              sizes: {
                large: { h: 1152, resize: "fit", w: 2048 },
                medium: { h: 675, resize: "fit", w: 1200 },
                small: { h: 383, resize: "fit", w: 680 },
                thumb: { h: 150, resize: "crop", w: 150 },
              },
              type: "video",
              url: "https://t.co/cZKbO5tgpt",
              video_info: {
                aspect_ratio: [16, 9],
                duration_millis: 27750,
                variants: [
                  {
                    bitrate: 2176000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/1280x720/2qzihuyEVV7TyMUd.mp4?tag=14",
                  },
                  {
                    content_type: "application/x-mpegURL",
                    url: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/pl/qnRo5Db-0O9rLjQN.m3u8?tag=14&container=fmp4",
                  },
                  {
                    bitrate: 832000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/640x360/8FONrfTg30SaVDHA.mp4?tag=14",
                  },
                  {
                    bitrate: 10368000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/1920x1080/Z9vvvkqA2kkkoGcu.mp4?tag=14",
                  },
                  {
                    bitrate: 256000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/480x270/6aptuAryEvApkaqH.mp4?tag=14",
                  },
                ],
              },
            },
          ],
          photos: [],
          video: {
            aspectRatio: [16, 9],
            contentType: "media_entity",
            durationMs: 27750,
            mediaAvailability: { status: "available" },
            poster:
              "https://pbs.twimg.com/ext_tw_video_thumb/1637885075889987586/pu/img/Kh2VeKxCWac5WmbZ.jpg",
            variants: [
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/1280x720/2qzihuyEVV7TyMUd.mp4?tag=14",
              },
              {
                type: "application/x-mpegURL",
                src: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/pl/qnRo5Db-0O9rLjQN.m3u8?tag=14&container=fmp4",
              },
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/640x360/8FONrfTg30SaVDHA.mp4?tag=14",
              },
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/1920x1080/Z9vvvkqA2kkkoGcu.mp4?tag=14",
              },
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1637885075889987586/pu/vid/480x270/6aptuAryEvApkaqH.mp4?tag=14",
              },
            ],
            videoId: { type: "tweet", id: "1637885523418021888" },
            viewCount: 3274,
          },
          conversation_count: 7,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1637885523418021888",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "LFG! Congrats to the team for all their hard work and dedication in order to get selected! ",
        },
      ],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 737,
          possibly_sensitive: false,
          created_at: "2023-03-20T11:00:05.000Z",
          display_text_range: [0, 277],
          entities: {
            hashtags: [
              { indices: [143, 157], text: "RiyadhMasters" },
              { indices: [216, 227], text: "ESLProTour" },
            ],
            urls: [
              {
                display_url: "pro.eslgaming.com/tour/dota2/how…",
                expanded_url:
                  "http://pro.eslgaming.com/tour/dota2/how-it-works/#eptranking",
                indices: [251, 274],
                url: "https://t.co/tqyYNDUBw3",
              },
            ],
            user_mentions: [
              {
                id_str: "1532693504413028354",
                indices: [132, 142],
                name: "Gamers8 Esports",
                screen_name: "Gamers8GG",
              },
            ],
            symbols: [],
            media: [
              {
                display_url: "pic.twitter.com/3ZjTWkzBLC",
                expanded_url:
                  "https://twitter.com/ESLDota2/status/1637770982000582656/photo/1",
                indices: [275, 298],
                url: "https://t.co/3ZjTWkzBLC",
              },
            ],
          },
          id_str: "1637770982000582656",
          text: "We have SO many fantastic teams locked in for DreamLeague Season 19! 😱\n\nWho do you think will come out on top and win a slot in the @gamers8gg #RiyadhMasters? 🤔\n\nRemember, you can find out all the details on our new #ESLProTour ranking system here 👇\n\nhttps://t.co/tqyYNDUBw3 https://t.co/3ZjTWkzBLC",
          user: {
            id_str: "1124889985",
            name: "ESL Dota2",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1622959126421680129/3Lg4k80d_normal.jpg",
            screen_name: "ESLDota2",
            verified: true,
            highlighted_label: {
              description: "ESL",
              badge: {
                url: "https://pbs.twimg.com/profile_images/1096051467943845893/ntWFecC7_bigger.jpg",
              },
              url: { url: "https://twitter.com/ESL", url_type: "DeepLink" },
              user_label_type: "BusinessLabel",
              user_label_display_type: "Badge",
            },
            is_blue_verified: true,
          },
          edit_control: {
            edit_tweet_ids: ["1637770982000582656"],
            editable_until_msecs: "1679311805000",
            is_edit_eligible: true,
            edits_remaining: "5",
          },
          mediaDetails: [
            {
              display_url: "pic.twitter.com/3ZjTWkzBLC",
              expanded_url:
                "https://twitter.com/ESLDota2/status/1637770982000582656/photo/1",
              ext_media_availability: { status: "Available" },
              indices: [275, 298],
              media_url_https:
                "https://pbs.twimg.com/media/FrqIBzJWYAEvYSZ.jpg",
              original_info: {
                height: 1080,
                width: 1920,
                focus_rects: [
                  { x: 0, y: 0, w: 1920, h: 1075 },
                  { x: 276, y: 0, w: 1080, h: 1080 },
                  { x: 343, y: 0, w: 947, h: 1080 },
                  { x: 546, y: 0, w: 540, h: 1080 },
                  { x: 0, y: 0, w: 1920, h: 1080 },
                ],
              },
              sizes: {
                large: { h: 1080, resize: "fit", w: 1920 },
                medium: { h: 675, resize: "fit", w: 1200 },
                small: { h: 383, resize: "fit", w: 680 },
                thumb: { h: 150, resize: "crop", w: 150 },
              },
              type: "photo",
              url: "https://t.co/3ZjTWkzBLC",
            },
          ],
          photos: [
            {
              backgroundColor: { red: 204, green: 214, blue: 221 },
              cropCandidates: [
                { x: 0, y: 0, w: 1920, h: 1075 },
                { x: 276, y: 0, w: 1080, h: 1080 },
                { x: 343, y: 0, w: 947, h: 1080 },
                { x: 546, y: 0, w: 540, h: 1080 },
                { x: 0, y: 0, w: 1920, h: 1080 },
              ],
              expandedUrl:
                "https://twitter.com/ESLDota2/status/1637770982000582656/photo/1",
              url: "https://pbs.twimg.com/media/FrqIBzJWYAEvYSZ.jpg",
              width: 1920,
              height: 1080,
            },
          ],
          conversation_count: 57,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1637770982000582656",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Nouns have been nothing short of amazing this past week with the DPC Tour 2 Season in full swing. Here's a stat:",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "22-0. That was the score of Game 2 in their match against B8. Sorry, Dendi. Legendary performance by Nouns!",
        },
      ],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 110,
          created_at: "2023-03-18T21:40:47.000Z",
          display_text_range: [0, 210],
          entities: {
            hashtags: [],
            urls: [],
            user_mentions: [
              {
                id_str: "1252630927668203521",
                indices: [36, 49],
                name: "Nouns Esports ⌐◨-◨",
                screen_name: "nounsesports",
              },
              {
                id_str: "1204082438185668608",
                indices: [55, 67],
                name: "B8 Esports",
                screen_name: "B8esportsGG",
              },
            ],
            symbols: [],
          },
          id_str: "1637207446203539456",
          text: "The first real DPC shut-out game as @nounsesports beat @B8esportsGG 22-0.\n\n(There was a game [6524804129] between Lava and Infinity which had an abandon at 7mins with a 1-0 score that's technically one but xd!)",
          user: {
            id_str: "169165191",
            name: "Ben Steenhuisen",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1404899416381825031/mfkNRYYe_normal.jpg",
            screen_name: "Noxville",
            verified: false,
            is_blue_verified: false,
          },
          edit_control: {
            edit_tweet_ids: ["1637207446203539456"],
            editable_until_msecs: "1679177447000",
            is_edit_eligible: true,
            edits_remaining: "5",
          },
          conversation_count: 8,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1637207446203539456",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Wildcard Gaming went down next in a crisp 2-0 victory! A quick check of the leaderboard sees Nouns on top! #nounsstaywinning",
        },
      ],
    },
    {
      type: "figure",
      attrs: {
        src: null,
        file: null,
        alt: null,
        title: null,
        blurDataURL: null,
        float: "none",
        width: null,
      },
      content: [
        {
          type: "image",
          attrs: {
            src: "https://storage.googleapis.com/papyrus_images/706548c02d59df9c1ceb46585aae2c2c.png",
            alt: null,
            title: null,
            blurdataurl: null,
            nextheight: null,
            nextwidth: null,
          },
        },
        { type: "figcaption" },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Today, we have a match against Team DogChamp. We're just going to take it one game at a time as we look to secure a spot in the Berlin Major. ",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [{ type: "text", text: "Good luck to the team!" }],
    },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 3 },
      content: [{ type: "text", text: "CS:GO " }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Nouns are putting in work as they prepare for RMR! A couple losses against Strife and MIBR, but solid wins against EG White, TeamOne, and DNA in ECL 44 & CCT NA action! ",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Be sure to tune in today as they look to rebound in a rematch against Strife! ",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Check out the chopped up highlights from ACE NA Masters, courtesy of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/hamtaro1H",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "hamtaro1H",
        },
        { type: "text", text: "!  " },
      ],
    },
    {
      type: "youtube",
      attrs: {
        videoId: "jt9W2p6d6OU",
        alt: null,
        title: null,
        blurDataURL: null,
        float: "none",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [{ type: "text", text: "Oh, btw, just a small announcement:" }],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 325026,
          possibly_sensitive: false,
          created_at: "2023-03-22T16:35:07.000Z",
          display_text_range: [0, 200],
          entities: {
            hashtags: [],
            urls: [],
            user_mentions: [],
            symbols: [],
            media: [
              {
                display_url: "pic.twitter.com/iTtguRHJ0S",
                expanded_url:
                  "https://twitter.com/CSGO/status/1638580074126659584/video/1",
                indices: [201, 224],
                url: "https://t.co/iTtguRHJ0S",
              },
            ],
          },
          id_str: "1638580074126659584",
          text: "Today we're excited to announce Counter-Strike 2. Counter-Strike 2 is an overhaul to every system, every piece of content, and every part of the C-S experience. First, let's talk about smoke grenades: https://t.co/iTtguRHJ0S",
          user: {
            id_str: "353780675",
            name: "CS2",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1606750479836647425/1qsSFQOn_normal.jpg",
            screen_name: "CounterStrike",
            verified: true,
            verified_type: "Business",
            is_blue_verified: false,
          },
          edit_control: {
            edit_tweet_ids: ["1638580074126659584"],
            editable_until_msecs: "1679504707000",
            is_edit_eligible: true,
            edits_remaining: "5",
          },
          mediaDetails: [
            {
              additional_media_info: {},
              display_url: "pic.twitter.com/iTtguRHJ0S",
              expanded_url:
                "https://twitter.com/CSGO/status/1638580074126659584/video/1",
              ext_media_availability: { status: "Available" },
              ext_media_stats: { view_count: 7870677 },
              indices: [201, 224],
              media_url_https:
                "https://pbs.twimg.com/ext_tw_video_thumb/1638579917783965696/pu/img/m37oVV_H0I9qpm29.jpg",
              original_info: { height: 1080, width: 1920 },
              sizes: {
                large: { h: 1080, resize: "fit", w: 1920 },
                medium: { h: 675, resize: "fit", w: 1200 },
                small: { h: 383, resize: "fit", w: 680 },
                thumb: { h: 150, resize: "crop", w: 150 },
              },
              type: "video",
              url: "https://t.co/iTtguRHJ0S",
              video_info: {
                aspect_ratio: [16, 9],
                duration_millis: 76633,
                variants: [
                  {
                    content_type: "application/x-mpegURL",
                    url: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/pl/aP5lJE6uRTpkrgjm.m3u8?tag=12&container=fmp4",
                  },
                  {
                    bitrate: 832000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/vid/640x360/o35QTzvMARHkZ3eH.mp4?tag=12",
                  },
                  {
                    bitrate: 2176000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/vid/1280x720/0OxOfrfrWi37j6Xi.mp4?tag=12",
                  },
                  {
                    bitrate: 256000,
                    content_type: "video/mp4",
                    url: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/vid/480x270/JcHWw7K2DeDfUJUq.mp4?tag=12",
                  },
                ],
              },
            },
          ],
          photos: [],
          video: {
            aspectRatio: [16, 9],
            contentType: "media_entity",
            durationMs: 76633,
            mediaAvailability: { status: "available" },
            poster:
              "https://pbs.twimg.com/ext_tw_video_thumb/1638579917783965696/pu/img/m37oVV_H0I9qpm29.jpg",
            variants: [
              {
                type: "application/x-mpegURL",
                src: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/pl/aP5lJE6uRTpkrgjm.m3u8?tag=12&container=fmp4",
              },
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/vid/640x360/o35QTzvMARHkZ3eH.mp4?tag=12",
              },
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/vid/1280x720/0OxOfrfrWi37j6Xi.mp4?tag=12",
              },
              {
                type: "video/mp4",
                src: "https://video.twimg.com/ext_tw_video/1638579917783965696/pu/vid/480x270/JcHWw7K2DeDfUJUq.mp4?tag=12",
              },
            ],
            videoId: { type: "tweet", id: "1638580074126659584" },
            viewCount: 7870677,
          },
          conversation_count: 9256,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1638580074126659584",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "center" },
      content: [
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "CS:GO 2 confirmed!!! LFG!",
        },
      ],
    },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 3 },
      content: [{ type: "text", text: "Pokémon Unite" }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "First, we'd like to thank and bid farewell to the incredible ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/redmaw_",
                target: "_blank",
                class: "dont-break-out dont-break-out",
              },
            },
          ],
          text: "Redmaw",
        },
        { type: "text", text: "!" },
      ],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 171,
          self_thread: { id_str: "1637591416615608320" },
          created_at: "2023-03-19T23:06:33.000Z",
          display_text_range: [0, 230],
          entities: {
            hashtags: [],
            urls: [],
            user_mentions: [
              {
                id_str: "1434976578857996289",
                indices: [56, 64],
                name: "Redmaw ⌐◨-◨",
                screen_name: "redmaw_",
              },
            ],
            symbols: [],
          },
          id_str: "1637591416615608320",
          text: "Today we are parting ways with our Pokémon Unite Player @redmaw_ \nWe are thankful for all the work he put into the team. The memories of the last UCS Season and the joy you brought to the team is something we will cherish forever.",
          user: {
            id_str: "1252630927668203521",
            name: "Nouns Esports ⌐◨-◨",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1632459357546766338/wjJU5Tfa_normal.jpg",
            screen_name: "nounsesports",
            verified: false,
            is_blue_verified: true,
          },
          edit_control: {
            edit_tweet_ids: ["1637591416615608320"],
            editable_until_msecs: "1679268993000",
            is_edit_eligible: false,
            edits_remaining: "5",
          },
          conversation_count: 12,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1637591416615608320",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "And we'd like to welcome " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/Sixsiesexsi",
                target: "_blank",
                class: "dont-break-out dont-break-out",
              },
            },
          ],
          text: "Sixsies",
        },
        { type: "text", text: " to the team!" },
      ],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 181,
          self_thread: { id_str: "1637926550971756546" },
          possibly_sensitive: false,
          created_at: "2023-03-20T21:18:15.000Z",
          display_text_range: [0, 90],
          entities: {
            hashtags: [],
            urls: [],
            user_mentions: [
              {
                id_str: "1312800334792855552",
                indices: [73, 85],
                name: "Sixsies",
                screen_name: "Sixsiesexsi",
              },
            ],
            symbols: [],
            media: [
              {
                display_url: "pic.twitter.com/ZgyULB4V68",
                expanded_url:
                  "https://twitter.com/nounsesports/status/1637926550971756546/photo/1",
                indices: [91, 114],
                url: "https://t.co/ZgyULB4V68",
              },
            ],
          },
          id_str: "1637926550971756546",
          text: "We would like to welcome our newest addition to the Pokémon Unite Team:\n\n@Sixsiesexsi ⌐◨-◨ https://t.co/ZgyULB4V68",
          user: {
            id_str: "1252630927668203521",
            name: "Nouns Esports ⌐◨-◨",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1632459357546766338/wjJU5Tfa_normal.jpg",
            screen_name: "nounsesports",
            verified: false,
            is_blue_verified: true,
          },
          edit_control: {
            edit_tweet_ids: ["1637926550971756546"],
            editable_until_msecs: "1679348895000",
            is_edit_eligible: false,
            edits_remaining: "5",
          },
          mediaDetails: [
            {
              display_url: "pic.twitter.com/ZgyULB4V68",
              expanded_url:
                "https://twitter.com/nounsesports/status/1637926550971756546/photo/1",
              ext_media_availability: { status: "Available" },
              indices: [91, 114],
              media_url_https:
                "https://pbs.twimg.com/media/FrsVXRhacAAadF7.jpg",
              original_info: {
                height: 3375,
                width: 3375,
                focus_rects: [
                  { x: 0, y: 0, w: 3375, h: 1890 },
                  { x: 0, y: 0, w: 3375, h: 3375 },
                  { x: 0, y: 0, w: 2961, h: 3375 },
                  { x: 252, y: 0, w: 1688, h: 3375 },
                  { x: 0, y: 0, w: 3375, h: 3375 },
                ],
              },
              sizes: {
                large: { h: 2048, resize: "fit", w: 2048 },
                medium: { h: 1200, resize: "fit", w: 1200 },
                small: { h: 680, resize: "fit", w: 680 },
                thumb: { h: 150, resize: "crop", w: 150 },
              },
              type: "photo",
              url: "https://t.co/ZgyULB4V68",
            },
          ],
          photos: [
            {
              backgroundColor: { red: 204, green: 214, blue: 221 },
              cropCandidates: [
                { x: 0, y: 0, w: 3375, h: 1890 },
                { x: 0, y: 0, w: 3375, h: 3375 },
                { x: 0, y: 0, w: 2961, h: 3375 },
                { x: 252, y: 0, w: 1688, h: 3375 },
                { x: 0, y: 0, w: 3375, h: 3375 },
              ],
              expandedUrl:
                "https://twitter.com/nounsesports/status/1637926550971756546/photo/1",
              url: "https://pbs.twimg.com/media/FrsVXRhacAAadF7.jpg",
              width: 3375,
              height: 3375,
            },
          ],
          conversation_count: 25,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1637926550971756546",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "What's next for the squad with the new line-up? ",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "Saturday (tomorrow), you can tune in to the " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://battlefy.com/pok%C3%A9mon-unite-championship-series/aeos-cup-open-qualifier-europe/640cad6909823110d414a25b/info?infoTab=details",
                target: "_blank",
                class: "dont-break-out",
              },
            },
          ],
          text: "Aeos Cup Open Qualifier - Europe",
        },
        {
          type: "text",
          text: "! Top 16 teams will qualify, and Nouns are looking to cement a strong seeding. Watch with our very own coach, ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/xBlaineHS",
                target: "_blank",
                class: "dont-break-out",
              },
            },
          ],
          text: "xBlaine",
        },
        { type: "text", text: ": " },
      ],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "en",
          favorite_count: 44,
          self_thread: { id_str: "1638852193544552448" },
          possibly_sensitive: false,
          created_at: "2023-03-23T10:36:25.000Z",
          display_text_range: [0, 223],
          entities: {
            hashtags: [{ indices: [186, 199], text: "PokemonUnite" }],
            urls: [],
            user_mentions: [
              {
                id_str: "1252630927668203521",
                indices: [172, 185],
                name: "Nouns Esports ⌐◨-◨",
                screen_name: "nounsesports",
              },
            ],
            symbols: [],
            media: [
              {
                display_url: "pic.twitter.com/zPwxpgNZb2",
                expanded_url:
                  "https://twitter.com/xBlaineHS/status/1638852193544552448/photo/1",
                indices: [224, 247],
                url: "https://t.co/zPwxpgNZb2",
              },
            ],
          },
          id_str: "1638852193544552448",
          text: "Bored on Saturday?\nNo one to watch the Aoes Cup Qualifier with?\nSame!\n\nJoin me Saturday, March 25th 2023\n12:00 PM CET on my Twitch stream!\n\nGonna do a viewing party of all @nounsesports #PokemonUnite games.\n\nsee ya there :) https://t.co/zPwxpgNZb2",
          user: {
            id_str: "2323649756",
            name: "xBlaine ⌐◨-◨",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1587955630077263874/pwGZUTih_normal.jpg",
            screen_name: "xBlaineHS",
            verified: false,
            is_blue_verified: false,
          },
          edit_control: {
            edit_tweet_ids: ["1638852193544552448"],
            editable_until_msecs: "1679569585000",
            is_edit_eligible: false,
            edits_remaining: "5",
          },
          mediaDetails: [
            {
              display_url: "pic.twitter.com/zPwxpgNZb2",
              expanded_url:
                "https://twitter.com/xBlaineHS/status/1638852193544552448/photo/1",
              ext_media_availability: { status: "Available" },
              indices: [224, 247],
              media_url_https:
                "https://pbs.twimg.com/media/Fr5ejnYXsAA6Si5.jpg",
              original_info: {
                height: 512,
                width: 512,
                focus_rects: [
                  { x: 0, y: 225, w: 512, h: 287 },
                  { x: 0, y: 0, w: 512, h: 512 },
                  { x: 0, y: 0, w: 449, h: 512 },
                  { x: 0, y: 0, w: 256, h: 512 },
                  { x: 0, y: 0, w: 512, h: 512 },
                ],
              },
              sizes: {
                large: { h: 512, resize: "fit", w: 512 },
                medium: { h: 512, resize: "fit", w: 512 },
                small: { h: 512, resize: "fit", w: 512 },
                thumb: { h: 150, resize: "crop", w: 150 },
              },
              type: "photo",
              url: "https://t.co/zPwxpgNZb2",
            },
          ],
          photos: [
            {
              backgroundColor: { red: 204, green: 214, blue: 221 },
              cropCandidates: [
                { x: 0, y: 225, w: 512, h: 287 },
                { x: 0, y: 0, w: 512, h: 512 },
                { x: 0, y: 0, w: 449, h: 512 },
                { x: 0, y: 0, w: 256, h: 512 },
                { x: 0, y: 0, w: 512, h: 512 },
              ],
              expandedUrl:
                "https://twitter.com/xBlaineHS/status/1638852193544552448/photo/1",
              url: "https://pbs.twimg.com/media/Fr5ejnYXsAA6Si5.jpg",
              width: 512,
              height: 512,
            },
          ],
          conversation_count: 6,
          news_action_type: "conversation",
          isEdited: false,
          isStaleEdit: false,
        },
        tweetId: "1638852193544552448",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [{ type: "text", text: "Good luck!" }],
    },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 3 },
      content: [{ type: "text", text: "Super Smash Bros. Melee - Aklo" }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Another tournament, another Top 8 finish! Congrats to Aklo as he placed 7th in ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.start.gg/tournament/the-coinbox-54-melee/event/melee-singles",
                target: "_blank",
                class: "dont-break-out dont-break-out",
              },
            },
          ],
          text: "Coinbox #54",
        },
        { type: "text", text: ". " },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://storage.googleapis.com/papyrus_images/f3c5545e27f70af928dcdb6b97b3ead6.png",
        alt: "",
        title: null,
        blurdataurl:
          "data:image/png;base64,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",
        nextheight: 1200,
        nextwidth: 800,
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "Twitter: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/NotAklo",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@NotAklo",
        },
        { type: "text", text: " | Instagram: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.instagram.com/ssbmaklo/",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@ssbmaklo",
        },
        { type: "text", text: " | Twitch: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.twitch.tv/Aklo214",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@Aklo214",
        },
        { type: "text", text: " | Coaching: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://metafy.gg/@aklo/sessions",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@aklo",
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 3 },
      content: [{ type: "text", text: "Taki’s Corner" }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Noggles Cup this Saturday and Sunday with our very own ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/soy_takii",
                target: "_blank",
                class: "dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "takizinha",
        },
        { type: "text", text: "! Team registration on " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "http://start.gg",
                target: "_blank",
                class: "dont-break-out",
              },
            },
          ],
          text: "start.gg",
        },
        {
          type: "text",
          text: "! 11-12 teams currently registered! Come to our ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://discord.com/channels/967723007403507742/1037501873936138250",
                target: "_blank",
                class: "dont-break-out",
              },
            },
          ],
          text: "Discord",
        },
        {
          type: "text",
          text: " for help with registering, to coordinate, and vibe. ",
        },
      ],
    },
    {
      type: "twitter",
      attrs: {
        pos: 0,
        ast: null,
        tweetData: {
          __typename: "Tweet",
          lang: "pt",
          favorite_count: 75,
          self_thread: { id_str: "1637940559607132168" },
          possibly_sensitive: false,
          created_at: "2023-03-20T22:13:55.000Z",
          display_text_range: [0, 233],
          entities: {
            hashtags: [],
            urls: [],
            user_mentions: [
              {
                id_str: "1252630927668203521",
                indices: [210, 223],
                name: "Nouns Esports ⌐◨-◨",
                screen_name: "nounsesports",
              },
              {
                id_str: "1535632980244320256",
                indices: [224, 232],
                name: "NounsBR",
                screen_name: "nounsbr",
              },
            ],
            symbols: [],
            media: [
              {
                display_url: "pic.twitter.com/3gaUgUBvfl",
                expanded_url:
                  "https://twitter.com/soy_takii/status/1637940559607132168/photo/1",
                indices: [233, 256],
                url: "https://t.co/3gaUgUBvfl",
              },
            ],
          },
          id_str: "1637940559607132168",
          text: "NOGGLES CUP \ncampeonato cenário inclusivo de valorant! \n\nATUALIZAÇÕES 🚨\nDia 25/03 e 26/03\nHorário 13h formato md3\nPremiação em dólares \n1º lugar U$650,00 \n2º lugar U$200,00\n3º ligar U$150,00\nMáximo de times 16\n@nounsesports @nounsbr https://t.co/3gaUgUBvfl",
          user: {
            id_str: "828747860770435073",
            name: "takizinha ⌐◨-◨",
            profile_image_url_https:
              "https://pbs.twimg.com/profile_images/1623810261013479425/obTz_KVv_normal.jpg",
            screen_name: "soy_takii",
            verified: false,
            is_blue_verified: true,
          },
          edit_control: {
            initial_tweet_id: "1637939381020270601",
            edit_tweet_ids: ["1637939381020270601", "1637940559607132168"],
            editable_until_msecs: "1679351954000",
            is_edit_eligible: false,
            edits_remaining: "4",
          },
          mediaDetails: [
            {
              display_url: "pic.twitter.com/3gaUgUBvfl",
              expanded_url:
                "https://twitter.com/soy_takii/status/1637940559607132168/photo/1",
              ext_media_availability: { status: "Available" },
              indices: [233, 256],
              media_url_https:
                "https://pbs.twimg.com/media/FrshLxbWcAkdomF.jpg",
              original_info: {
                height: 910,
                width: 910,
                focus_rects: [
                  { x: 0, y: 268, w: 910, h: 510 },
                  { x: 0, y: 0, w: 910, h: 910 },
                  { x: 112, y: 0, w: 798, h: 910 },
                  { x: 455, y: 0, w: 455, h: 910 },
                  { x: 0, y: 0, w: 910, h: 910 },
                ],
              },
              sizes: {
                large: { h: 910, resize: "fit", w: 910 },
                medium: { h: 910, resize: "fit", w: 910 },
                small: { h: 680, resize: "fit", w: 680 },
                thumb: { h: 150, resize: "crop", w: 150 },
              },
              type: "photo",
              url: "https://t.co/3gaUgUBvfl",
            },
          ],
          photos: [
            {
              backgroundColor: { red: 204, green: 214, blue: 221 },
              cropCandidates: [
                { x: 0, y: 268, w: 910, h: 510 },
                { x: 0, y: 0, w: 910, h: 910 },
                { x: 112, y: 0, w: 798, h: 910 },
                { x: 455, y: 0, w: 455, h: 910 },
                { x: 0, y: 0, w: 910, h: 910 },
              ],
              expandedUrl:
                "https://twitter.com/soy_takii/status/1637940559607132168/photo/1",
              url: "https://pbs.twimg.com/media/FrshLxbWcAkdomF.jpg",
              width: 910,
              height: 910,
            },
          ],
          conversation_count: 3,
          news_action_type: "conversation",
          isEdited: true,
          isStaleEdit: false,
          previous_counts: {
            favorite_count: 10,
            quote_count: 0,
            reply_count: 2,
            retweet_count: 1,
          },
        },
        tweetId: "1637940559607132168",
      },
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "Twitter: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/soy_takii",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@soy_takii",
        },
        { type: "text", text: " | Instagram: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.instagram.com/soy_taki/",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@soy_taki",
        },
        { type: "text", text: " | TikTok: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.tiktok.com/@soy_takii",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@soy_takii",
        },
        { type: "text", text: " | Twitch: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.twitch.tv/soy_taki",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@soy_taki",
        },
        { type: "text", text: " " },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 2 },
      content: [{ type: "text", text: "Contributor Updates" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://pog.nouns.gg/",
                        target: "_blank",
                        class: "dont-break-out",
                      },
                    },
                  ],
                  text: "POG",
                },
                {
                  type: "text",
                  text: " now has grid view! Lots of great development occurring, appreciate all the hard work from rocketman and team! Be sure to create your account or connect your wallet and upload your clips today to test it out. ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "figure",
      attrs: {
        src: null,
        file: null,
        alt: null,
        title: null,
        blurDataURL: null,
        float: "none",
        width: null,
      },
      content: [
        {
          type: "image",
          attrs: {
            src: "https://storage.googleapis.com/papyrus_images/e13ba5663a969103aa6f7a4b461950e9.png",
            alt: null,
            title: null,
            blurdataurl: null,
            nextheight: null,
            nextwidth: null,
          },
        },
        { type: "figcaption" },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  text: "Nouns Esports in the metaverse. If you're interested, drop by the ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://discord.com/channels/967723007403507742/1088183083687219220",
                        target: "_blank",
                        class: "dont-break-out dont-break-out",
                      },
                    },
                  ],
                  text: "metaverse",
                },
                {
                  type: "text",
                  text: " channel to discuss and buidl! Anyone is welcome, ideas are fine, builders are greatly appreciated! Or just swing by and watch esports: ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "http://hyperfy.io/esports",
                        target: "_blank",
                        class: "dont-break-out",
                      },
                    },
                  ],
                  text: "hyperfy.io/esports",
                },
                { type: "text", text: "! " },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  text: "Sasquatch, Mach, Maty, and others are collaborating on the next DotA & CS:GO on-chain proposal. Definitely would like your feedback as it nears completed draft form. This proposal will be crucial toward continue building our legacy as a Tier One org! ",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  text: "If you're a contributor or supporter, make sure you ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://discord.com/channels/967723007403507742/1084986315717759058",
                        target: "_blank",
                        class: "dont-break-out dont-break-out",
                      },
                    },
                  ],
                  text: "grab roles in Discord",
                },
                { type: "text", text: "! " },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  text: "Smash Club and In-House Leagues! Reach out to Peter if you're interested in supporting either of these projects",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  text: "OVER 10,000 mints! We've extended the free mint a few times because we want to give everyone a chance to grab it, so be sure to grab it today at ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "http://mint.nouns.gg",
                        target: "_blank",
                        class: "dont-break-out",
                      },
                    },
                  ],
                  text: "mint.nouns.gg",
                },
                { type: "text", text: "! " },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                {
                  type: "text",
                  text: "We host a weekly Contributor Call on Fridays at 3PM EST on our ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "http://discord.gg/nounsesports",
                        target: "_blank",
                        class:
                          "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
                      },
                    },
                  ],
                  text: "Discord",
                },
                {
                  type: "text",
                  text: ". Everyone is welcome! Drop by if you would like to discuss these ideas, get team updates, and more! ",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                { type: "text", text: "Lastly, check out our " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://www.notion.so/Contributor-Dashboard-776148bfb6164afea843ee59ff559236",
                        target: "_blank",
                        class:
                          "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
                      },
                    },
                  ],
                  text: "Contributor Dashboard",
                },
                { type: "text", text: " for all things Nouns Esports " },
              ],
            },
          ],
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 2 },
      content: [{ type: "text", text: "The Week Ahead" }],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "Mar 24th" },
                { type: "text", text: " - Nouns vs  DogChamp (DOTA)" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "Mar 24th" },
                { type: "text", text: " - Nouns vs Strife (CSGO)" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "Mar 25th" },
                {
                  type: "text",
                  text: " - Nouns in Aeos Cup Qualifier (UNITE)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "Mar 28th" },
                { type: "text", text: " - Nouns vs TSM (DOTA)" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: "left" },
              content: [
                { type: "text", marks: [{ type: "bold" }], text: "Mar 31st" },
                { type: "text", text: " - Nouns vs Shopify Rebellion (DOTA)" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Things change and events are added/removed throughout the week, be sure to subscribe to our ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://calendar.google.com/calendar/embed?src=2gl6iku9kcb2qjdrtgdthgng3s%40group.calendar.google.com&ctz=Pacific%2FHonolulu",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "Google Calendar",
        },
        {
          type: "text",
          text: " to keep up and get notifications for when things go live! ",
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { textAlign: "left", level: 2 },
      content: [{ type: "text", text: "Meme of the Week" }],
    },
    {
      type: "figure",
      attrs: {
        src: null,
        file: null,
        alt: null,
        title: null,
        blurDataURL: null,
        float: "none",
        width: null,
      },
      content: [
        {
          type: "image",
          attrs: {
            src: "https://storage.googleapis.com/papyrus_images/e00c492c87ff8c833f768d35de4c6238.jpg",
            alt: null,
            title: null,
            blurdataurl:
              "data:image/png;base64,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",
            nextheight: 1490,
            nextwidth: 1170,
          },
        },
        { type: "figcaption" },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "Be sure to submit your memes in the " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://discord.com/channels/967723007403507742/1070534072612421662",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "#meme",
        },
        { type: "text", text: " channel on Discord to be featured here! " },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          text: "Thanks for tuning in to another installment of Nouns Esports Weekly! ⌐◨-◨ Be sure to follow us on Twitter ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/nounsesports",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@nounesports",
        },
        { type: "text", text: " & Instagram " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://www.instagram.com/nouns_esports",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@nouns_esports",
        },
        { type: "text", text: ". Follow me on Twitter: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://twitter.com/boosh0x",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
          ],
          text: "@boosh0x",
        },
        { type: "text", text: ". " },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        { type: "text", text: "We publish on: " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://paragraph.xyz/",
                target: "_blank",
                class: "dont-break-out dont-break-out",
              },
            },
          ],
          text: "https://paragraph.xyz/",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [{ type: "text", text: "Much love, ⌐◨-◨ out. " }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "left" },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://paragraph.xyz/@nounsesports/subscribe",
                target: "_blank",
                class:
                  "dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out dont-break-out",
              },
            },
            { type: "underline" },
          ],
          text: "https://paragraph.xyz/@nounsesports/subscribe",
        },
        { type: "text", text: " " },
      ],
    },
    { type: "paragraph", attrs: { textAlign: "left" } },
  ],
};

iterateObject(json);
