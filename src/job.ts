import {
  contractAddress,
  tokenAPI_URL,
  twitterConfig,
  TwitterConfig,
} from "./config"
import { getUbiPrice } from "./ubi"
import { howManyHumansRegistered } from "./poh"
import { sendTweet, TweetData } from "./tweet"
import { ngmiMail, wagmiMail } from "./mailer"

const main = async (twitterConfig: TwitterConfig) => {
  try {
    const quantity = await howManyHumansRegistered()
    const ubiData = await getUbiPrice(tokenAPI_URL, contractAddress) // usd , change

    const tweetData: TweetData = {
      amountOfRegistered: quantity,
      ubiChange: ubiData.usd_24h_change,
      ubiUSD: ubiData.usd,
    }

    sendTweet(tweetData, twitterConfig)

    console.log("Properly sent tweet, nice job")
    // ok mail
    wagmiMail()
  } catch (err) {
    console.log("Complete failure:", err)
    // this ain't ok mail
    ngmiMail(err as string)
  }
}

main(twitterConfig)
