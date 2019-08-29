declare module 'lib/token-list.json' {
  export interface ITokenCandidate {
    symbol: string
    address: string
    decimals: number
    name: string
    ens_address: string
    website: string
    logo: {
      src: string
      width: string
      height: string
      ipfs_hash: string
    }
    support: {
      email: string
      url: string
    }
    social: {
      blog: string
      chat: string
      facebook: string
      forum: string
      github: string
      gitter: string
      instagram: string
      linkedin: string
      reddit: string
      slack: string
      telegram: string
      twitter: string
      youtube: string
    }
  }

  const value: ITokenCandidate[]
  export default value
}
