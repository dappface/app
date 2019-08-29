declare module 'react-native-securerandom' {
  export function generateSecureRandom(length: number): Promise<Uint8Array>
}
