const axios = require('axios')
const fs = require('fs')

const TOKEN_LIST_URL =
  'https://raw.githubusercontent.com/MyEtherWallet/ethereum-lists/master/tokens/tokens-eth.json'
const FILE_DIST = './lib/token-list.json'

const fetchAndWriteToken = async () => {
  try {
    const {data: tokenList} = await axios.get(TOKEN_LIST_URL)
    fs.writeFileSync(FILE_DIST, JSON.stringify(tokenList))
  } catch (e) {
    console.error(e)
  }
}

fetchAndWriteToken()
