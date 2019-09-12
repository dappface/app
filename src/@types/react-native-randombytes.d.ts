declare module 'react-native-randombytes' {
  function randomBytes(length: number): Uint8Array

  function randomBytes(
    length: number,
    cb: (error: Error | undefined, bytes: Uint8Array) => void,
  ): void

  export {randomBytes}
}
