import axios from "axios"

export const getUbiPrice = async (
  URL: string,
  contractAddress: string
): Promise<{ usd: number; usd_24h_change: number }> => {
  const res = await axios.get(URL)
  return res.data[contractAddress]
}
