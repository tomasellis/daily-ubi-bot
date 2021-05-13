import Twitter from 'twitter'
import { botConfig, contractAddress, tokenAPI_URL} from './config'
import { countEmAll, countEmFiltered, getMyTokenPrice, checkIfSantiParoLaQueue } from './fetchInfoFunctions'
const twitterBot = new Twitter(botConfig)

const makeUBITweet = async (ubiData: any) => {
    let dayChange = ubiData.usd_24h_change.toFixed(2)
    if (dayChange>=0){
        return {
            status: `Marado! Marado! $ubi sigue subiendo, qué estás esperando?
            En un día cambio un ${dayChange}% y en este momento vale ${ubiData.usd}USD
            Source: coingecko.com`
        }
    }
    return {status: `Que no decaiga! El universo se balanceo y $ubi terminó cambiando un
    ${dayChange}%, pero sigue valiendo ${ubiData.usd}USD! Apurate y conseguí los tuyos :)
    Source: coingecko.com
    `}
}

const logEm = async () => {
    //makeUBITweet(await getMyTokenPrice(tokenAPI_URL, contractAddress))
    console.log('UBI Price now:', await getMyTokenPrice(tokenAPI_URL, contractAddress))
    console.log('All of em in vouching phase:', await countEmFiltered(0,1000, '{status: "Vouching"}'))
    console.log('All of em waiting to register:', await countEmFiltered(0,1000,'{status: "PendingRegistration"}'))
    console.log('All of em registered:', await countEmFiltered(0,1000,'{registered: true}'))
    console.log(await checkIfSantiParoLaQueue(0,1000))
}

logEm()
// twitterBot.post('statuses/update', {status: 'Hello Twitter this is a test!'},  function(error, tweet, response) {
//     if(error) console.error(error);
//     console.log('tweet body', tweet);  // Tweet body.
//     console.log('response', response);  // Raw response object.
// });


/*
twitterBot.get('statuses/user_timeline', {count: 200, screen_name: 'santisiri'},  function(error, tweet, response) {
    if(error) console.error(error);
    const onlyDates = tweet.map((tweet: any) => {
        return [
            [`${(new Date(tweet.created_at)).getDate()}-${((new Date(tweet.created_at)).getHours() + 2)}:${(new Date(tweet.created_at)).getMinutes()}`],
            tweet.text
        ]
    })
}); 
*/