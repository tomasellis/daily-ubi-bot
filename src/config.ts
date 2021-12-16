export type TwitterConfig = {
  consumer_key: string
  consumer_secret: string
  access_token_key: string
  access_token_secret: string
}

export const twitterConfig: TwitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY as string,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY as string,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN as string,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string,
}

export const currencies = ["usd"]

export const contractAddress = "0xdd1ad9a21ce722c151a836373babe42c868ce9a4"

export const joinCurrencies =
  currencies.length > 1 ? currencies.join("%2C") : currencies[0]

export const tokenAPI_URL = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddress}&vs_currencies=${joinCurrencies}&include_24hr_change=true`

export const pohAPI_URL = `https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet`
