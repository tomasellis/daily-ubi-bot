import { config } from "dotenv"
import { contractAddress, tokenAPI_URL } from "./config"
import { getUbiPrice } from "./ubi"
import { countEmFiltered } from "./poh"
import { makeStatus, TweetData } from "./tweet"

const main = async () => {
  const pohInfo = await countEmFiltered(
    0,
    1000,
    "{registered: true, creationTime_lt: 1619838000}"
  ) // registered quantity
  const pohInfo2 = await countEmFiltered(
    0,
    1000,
    "{registered: true, creationTime_gte: 1619838000}"
  ) // registered quantity
  const ubiData = await getUbiPrice(tokenAPI_URL, contractAddress) // usd , change

  const tweetData: TweetData = {
    amountOfRegistered: pohInfo + pohInfo2,
    ubiChange: ubiData.usd_24h_change,
    ubiUSD: ubiData.usd,
  }

  const status = makeStatus(tweetData)
  console.log(status)
}

config()

main()
