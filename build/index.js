"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_1 = __importDefault(require("twitter"));
const config_1 = require("./config");
const fetchInfoFunctions_1 = require("./fetchInfoFunctions");
const twitterBot = new twitter_1.default(config_1.botConfig);
const makeUBITweet = (ubiData) => __awaiter(void 0, void 0, void 0, function* () {
    let dayChange = ubiData.usd_24h_change.toFixed(2);
    if (dayChange >= 0) {
        return {
            status: `Marado! Marado! $ubi sigue subiendo, qué estás esperando?
            En un día cambio un ${dayChange}% y en este momento vale ${ubiData.usd}USD
            Source: coingecko.com`
        };
    }
    return { status: `Que no decaiga! El universo se balanceo y $ubi terminó cambiando un
    ${dayChange}%, pero sigue valiendo ${ubiData.usd}USD! Apurate y conseguí los tuyos :)
    Source: coingecko.com
    ` };
});
const logEm = () => __awaiter(void 0, void 0, void 0, function* () {
    //makeUBITweet(await getMyTokenPrice(tokenAPI_URL, contractAddress))
    console.log('UBI Price now:', yield fetchInfoFunctions_1.getMyTokenPrice(config_1.tokenAPI_URL, config_1.contractAddress));
    console.log('All of em:', yield fetchInfoFunctions_1.countEmAll(0, 1000));
    console.log('All of em in vouching phase:', yield fetchInfoFunctions_1.countEmFiltered(0, 1000, '{status: "Vouching"}'));
    console.log('All of em waiting to register:', yield fetchInfoFunctions_1.countEmFiltered(0, 1000, '{status: "PendingRegistration"}'));
    console.log('All of em registered:', yield fetchInfoFunctions_1.countEmFiltered(0, 1000, '{registered: true}'));
    console.log(yield fetchInfoFunctions_1.checkIfSantiParoLaQueue(0, 1000));
});
logEm();
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
//# sourceMappingURL=index.js.map