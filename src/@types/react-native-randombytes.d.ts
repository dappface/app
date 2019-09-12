declare module 'react-native-randombytes' {
  export function randomBytes(length: number): Uint8Array

  export function randomBytes(
    length: number,
    cb: (error: Error | undefined, bytes: Uint8Array) => void,
  ): void
}
