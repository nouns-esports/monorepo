// @ts-ignore
import TurndownService from "turndown";
import fs from "fs";

const turndownService = new TurndownService();

turndownService.addRule("break", {
  filter: "br",
  replacement: function (content: any) {
    return content;
  },
});

turndownService.addRule("bullet", {
  filter: "p",
  replacement: function (content: any, node: any, options: any) {
    if (content.includes("- ")) {
      return `\n${options.bulletListMarker} ${content.replace("\\- ", "")}`;
    }

    return `\n${content}\n`;
  },
});

const markdown = turndownService.turndown(
  `<p><strong>Jillis "Happymealz" Pieters for GX!</strong></p><p><br></p><p>A little backstory: as an 18 year old kid, when I had only been playing for about a year and wasn\'t even ranked in my country yet, I knew I wanted to experience competing at an American super major. I worked for half a year and gathered the money to travel to Genesis 5. Travelling there by myself was a great adventure and I\'ll never forget it. However, besides Plup complimenting me on my mid-shortens, I drowned in my first round of pools and vowed that I would return as a good player one day.</p><p><br></p><p>In the 7 years I\'ve now been playing I can actually come back to prove what I could not back then: my Fox has become shnasty. Don\'t believe me? Check out <a href="https://twitter.com/_happymealz/status/1673345373534932993?t=1sBCghxrMA3LdZVNNukT6w&amp;s=19" rel="noopener noreferrer" target="_blank">my combo video</a>.</p><p>I think it would be quite poetic to return to Genesis X as a top Dutch player after having travelled there as a young grasshopper in 2018 who had no results to show for himself.</p><p><br></p><p><br></p><p><br></p><p><strong>Melee as Visual Art</strong></p><p><br></p><p>Besides competing at a high level in Europe, I\'m also actively creating Melee art for my community. As a fourth-year Audiovisual Design student, I have a lot of experience in filmmaking and interactive installation building. You may have seen some of my recent work on Twitter:</p><p><br></p><p><u>Battlefield brought to the Real World</u></p><p><a href="https://twitter.com/_happymealz/status/1707027550893941187?t=QJeID8rVf1nCUYTF32vRLg&amp;s=19" rel="noopener noreferrer" target="_blank">https://twitter.com/_happymealz/status/1707027550893941187?t=QJeID8rVf1nCUYTF32vRLg&amp;s=19</a></p><p><br></p><p><u>The latest Dutch PR as a venue-installation</u></p><p><a href="https://twitter.com/_happymealz/status/1743657336328093933?t=J3zMqY5dwWdcgvoihzGotA&amp;s=19" rel="noopener noreferrer" target="_blank">https://twitter.com/_happymealz/status/1743657336328093933?t=J3zMqY5dwWdcgvoihzGotA&amp;s=19</a></p><p><br></p><p><u>Some more.. content?</u></p><p><a href="https://twitter.com/_happymealz/status/1403012223535099904?t=b8nD6ERybhggJBodvZou7g&amp;s=19" rel="noopener noreferrer" target="_blank">https://twitter.com/_happymealz/status/1403012223535099904?t=b8nD6ERybhggJBodvZou7g&amp;s=19</a></p><p><br></p><p>I would love to put my creative ability to use at GX as well. For example by creating content for the players on the Nouns roster, making a mini doc about their runs (and my own) at the event, interviewing players (including my European friends and their perspective as long-distance competitors) and adequately capturing the storylines that would otherwise be lost to the sands of time could be another way I\'d love to contribute and make it worth your while to sponsor me for this event.</p><p><br></p><p><br></p><p><strong>EU loves Teams</strong></p><p><br></p><p>A final thing I\'d love to mention is doubles. Last summer I worked a summer job to go to GOML 2023 and compete with top UK Sheik max in doubles. We made it all the way to top 16 and I believe we could very well do even better this year, showing the power of European teams play!</p><p><br></p><p>An opportunity like this would be a dream come true, a full circle moment for the kid that went to America by himself in 2018 and a great opportunity to make a beautiful film capturing the community\'s essence.</p><p><br></p><p>I hope you\'ll consider me and allow me this chance. &lt;3</p><p><br></p><p><br></p><p><br></p><p>xoxo</p><p><u>Happymealz, the Fox&nbsp;from&nbsp;Rotterdam</u></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmQ5AgHET68dDVoArXtcC9DTs8R2Eg7U4WecwtTqNnR1Xi"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmagBr91QwvyAEwjCmbkMkhpTGGYaZG48bn7obeU3c7FMQ"></p><p><br></p><p><img src="https://ipfs.backend.prop.house/ipfs/QmUvnbHUt7wRagq6GymEwZigYKdm4XBSHKqpZq32juQdqa"></p><p><br></p><p><br></p>`
);

fs.writeFileSync(
  "./apps/website/archive/prop-house/pokemon-artwork.md",
  markdown
);

const test = `**Objective:** Nouns Esports is on a quest to create a distinctive new brand and Intellectual Property (IP).

**Your Mission:** Unleash your imagination and experiment with ideas that resonate with the heart of gaming and esports.

We're looking for submissions that:
* Are deeply rooted in the gaming and esports universe featuring character based models.
* These characters should proudly sport 'Noggles' ⌐◨-◨ – a signature accessory in our envisioned world.
* Feel free to draw inspiration from popular games, incorporating unique features like specialized weapons, innovative clothing, etc. However, ensure originality to avoid any copyright infringements.

Here is some nounish [artwork](https://nouns.gg/artwork-tweet) we have commissioned over the years that you can use to draw inspiration from.`;

console.log(test.toString());
