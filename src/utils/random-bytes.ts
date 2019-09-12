import { randomBytes } from 'react-native-randombytes'

export function randomBytesAsync(length: number = 32): Promise<Uint8Array> {
  return new Promise((resolve, reject): void => {
    randomBytes(length, (error, bytes): void => {
      if (error) {
        reject(error)
        return
      }

      resolve(bytes)
    })
  })
}
