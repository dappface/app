import { Url } from 'src/const'
import { httpClient } from 'src/utils'

export const getRate = async (currency: string): Promise<string> => {
  const { data } = await httpClient.get(
    `${Url.COINMARKETCAP}/v1/ticker/ethereum/`,
    {
      params: { convert: currency }
    }
  )
  return data[0][`price_${currency.toLowerCase()}`]
}

// declare var crypto: {
//   createHmac: (
//     algorism: string,
//     key: string,
//     options?: any
//   ) => { update: (data: string) => { digest: (encoding?: string) => string } }
// }

// interface IApiKeys {
//   apiKey: string
//   apiSecret: string
// }

// interface IBitFlyerHeaders {
//   'ACCESS-KEY': string
//   'ACCESS-TIMESTAMP': string
//   'ACCESS-SIGN': string
// }

// interface ICoincheckHeaders {
//   'ACCESS-KEY': string
//   'ACCESS-NONCE': string
//   'ACCESS-SIGNATURE': string
// }

// type Headers = IBitFlyerHeaders | ICoincheckHeaders

// export const getHeaders = (
//   exchange: Exchange.ExchangeType,
//   path: string,
//   { apiKey, apiSecret }: IApiKeys
// ): Headers | void => {
//   switch (exchange) {
//     case 'bitFlyer': {
//       const timestamp: string = Date.now().toString()
//       const method: string = 'GET'
//       const text: string = timestamp + method + path
//       const sign: string = crypto
//         .createHmac('sha256', apiSecret)
//         .update(text)
//         .digest('hex')
//       return {
//         'ACCESS-KEY': apiKey,
//         'ACCESS-SIGN': sign,
//         'ACCESS-TIMESTAMP': timestamp
//       }
//     }
//     case 'coincheck': {
//       const timestamp: string = Date.now().toString()
//       const text: string = timestamp + Url[exchange] + path
//       return {
//         'ACCESS-KEY': apiKey,
//         'ACCESS-NONCE': timestamp,
//         'ACCESS-SIGNATURE': crypto
//           .createHmac('sha256', apiSecret)
//           .update(text)
//           .digest('hex')
//       }
//     }
//     default:
//       break
//   }
// }

// export const get = (
//   exchange: Exchange.ExchangeType,
//   path: string,
//   apiKeys: IApiKeys
// ): Promise<{ data: any }> | void => {
//   const headers: Headers | void = getHeaders(exchange, path, apiKeys)
//   if (headers) {
//     return httpClient.get(Url[exchange] + path, { headers })
//   }
// }

// export const getBalances = async (
//   exchange: Exchange.ExchangeType,
//   apiKeys?: IApiKeys
// ): Promise<any[] | void> => {
//   if (exchange === 'zaif') {
//     return
//   }
//   const newApiKeys: IApiKeys =
//     apiKeys || (Exchange.getByName(exchange) as IApiKeys)
//   try {
//     const res = await get(exchange, Path.balance[exchange], newApiKeys)
//     if (res) {
//       return res.data
//     }
//   } catch (error) {
//     throw new Error('Failed to fetch balances. Retry!')
//   }
// }
