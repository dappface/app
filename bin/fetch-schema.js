const axios = require('axios')
const fs = require('fs')

const API_HOST = 'https://api.dev.dappface.com/query'
const FILE_DIST = './lib/fragment-types.json'

const fetchSchema = async () => {
  try {
    const {
      data: {data},
    } = await axios.post(
      API_HOST,
      {
        variables: {},
        query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
      },
      {
        headers: {'Content-Type': 'application/json'},
      },
    )

    const newData = {
      __schema: {
        types: data.__schema.types.filter(type => type.possibleTypes !== null),
      },
    }
    fs.writeFileSync(FILE_DIST, JSON.stringify(newData))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response.data)
  }
}

fetchSchema()
