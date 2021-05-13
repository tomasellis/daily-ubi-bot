"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pohAPI_URL = exports.contractAddress = exports.tokenAPI_URL = exports.botConfig = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config();
const botConfig = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
exports.botConfig = botConfig;
const currencies = ['usd'];
0xDd1Ad9A21Ce722C151A836373baBe42c868cE9a4;
const contractAddress = '0xdd1ad9a21ce722c151a836373babe42c868ce9a4';
exports.contractAddress = contractAddress;
const joinCurrencies = currencies.length > 1 ? currencies.join('%2C') : currencies[0];
const tokenAPI_URL = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=${joinCurrencies}&include_24hr_change=true`;
exports.tokenAPI_URL = tokenAPI_URL;
const pohAPI_URL = 'https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet';
exports.pohAPI_URL = pohAPI_URL;
//# sourceMappingURL=config.js.map