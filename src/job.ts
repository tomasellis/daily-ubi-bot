import {contractAddress, tokenAPI_URL, twitterConfig, TwitterConfig} from './config'
import {getUbiPrice} from './ubi'
import {countEmFiltered} from './poh'
import {sendTweet, TweetData} from './tweet'

const main = async (twitterConfig: TwitterConfig) => {
    const pohInfo = await countEmFiltered(0,1000,'{registered: true}') // registered quantity
    const ubiData = await getUbiPrice(tokenAPI_URL, contractAddress) // usd , change

    const tweetData: TweetData = {
        amountOfRegistered: pohInfo,
        ubiChange: ubiData.usd_24h_change,
        ubiUSD: ubiData.usd
    }

    sendTweet(tweetData, twitterConfig)

}

main(twitterConfig)
