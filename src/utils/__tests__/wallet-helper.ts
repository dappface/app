import * as wHelper from 'src/utils/wallet-helper'

describe('walletHelper', () => {
  describe('omitAddress', () => {
    const address = '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    it('should return ommited address with 6 characters before ... by default', () => {
      const result = wHelper.omitAddress(address)
      expect(result).toBe('0xXXXX...XXXX')
    })

    it('should return omitted address with specified characters before ...', () => {
      const result = wHelper.omitAddress(address, 1)
      expect(result).toBe('0...XXXX')
    })
  })
})
