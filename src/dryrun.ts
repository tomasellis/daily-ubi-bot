import * as dotenv from "dotenv"
import { contractAddress, tokenAPI_URL } from "./config"
import { getUbiPrice } from "./ubi"
import { howManyHumansRegistered } from "./poh"
import { makeStatus, TweetData } from "./tweet"
import { ngmiMail, wagmiMail } from "./mailer"

const main = async () => {
  try {
    const quantity = await howManyHumansRegistered()

    const ubiData = await getUbiPrice(tokenAPI_URL, contractAddress) // usd , change

    const tweetData: TweetData = {
      amountOfRegistered: quantity,
      ubiChange: ubiData.usd_24h_change,
      ubiUSD: ubiData.usd,
    }

    const status = makeStatus(tweetData)
    console.log(status)
    // Send ok mail
    wagmiMail(status)
  } catch (err) {
    // Send not ok mail
    ngmiMail(err as string)
    console.log(err)
  }
}

dotenv.config()

main()
