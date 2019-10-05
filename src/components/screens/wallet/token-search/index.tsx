import * as React from 'react'
import {Searchbar} from 'react-native-paper'
import {Padding} from 'src/components/atoms'
import {Candidates} from 'src/components/screens/wallet/token-search/candidates'
import {
  TokenSearchContext,
  useInitializedTokenSearchManager,
} from 'src/components/screens/wallet/token-search/hooks'
import {Size} from 'src/const'

export const TokenSearch = () => {
  const tokenSearchManager = useInitializedTokenSearchManager()

  return (
    <TokenSearchContext.Provider value={tokenSearchManager}>
      <Padding>
        <Searchbar
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={tokenSearchManager.onChangeText}
          placeholder='Name, symbol, contract address...'
          theme={{roundness: Size.TEXT_INPUT_MIN_HEIGHT / 2}}
          value={tokenSearchManager.searchInput}
        />
      </Padding>
      <Candidates />
    </TokenSearchContext.Provider>
  )
}
