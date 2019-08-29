declare module 'eth-sig-util' {
  export interface IMsgParams {
    from: string
    data: string
  }
  export function personalSign(
    privateKey: Buffer,
    msgParams: IMsgParams
  ): string
}
