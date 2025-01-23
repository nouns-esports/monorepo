import { Scraper } from "agent-twitter-client";
import { env } from "~/env";

const scraper = new Scraper();

// await scraper.login(env.TWITTER_USERNAME, env.TWITTER_PASSWORD);
await scraper.setCookies(JSON.parse(env.TWITTER_COOKIES));

// Always reply to @nounsgg tweets
// Regularly post and quote other tweets from selected accounts (hbox, aklo, mang0, etc...)
