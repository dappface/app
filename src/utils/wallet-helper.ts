export const omitAddress = (address: string, size: number = 6): string =>
  address.slice(0, size) +
  '...' +
  address.slice(address.length - 4, address.length)
