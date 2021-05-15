import Twitter from "twitter"
import { TwitterConfig } from "./config"

export type TweetData = {
  ubiUSD: number
  ubiChange: number
  amountOfRegistered: number
}

export const makeStatus = (data: TweetData) =>
  `$ubi is ${data.ubiUSD.toFixed(2)} USD right now. (${data.ubiChange >= 0 ? '+'+data.ubiChange.toFixed(1) : data.ubiChange.toFixed(1)}%)

${data.amountOfRegistered} humans are receiving UBI 💧
`

export const sendTweet = (data: TweetData, twitterConfig: TwitterConfig) => {
  const bot = new Twitter(twitterConfig)

  bot.post(
    "statuses/update",
    { status: makeStatus(data) },
    function (error, tweet, response) {
      if (error) console.error(error)

      console.log("tweet body", tweet) // Tweet body.

      console.log("response", response) // Raw response object.
    }
  )
}
