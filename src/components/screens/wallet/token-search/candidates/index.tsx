import * as React from 'react'
import {FlatList} from 'react-native'
import {Item} from 'src/components/screens/wallet/token-search/candidates/item'
import {NotFound} from 'src/components/screens/wallet/token-search/candidates/not-found'
import {useTokenSearchManager} from 'src/components/screens/wallet/token-search/hooks'

export const Candidates = () => {
  const {candidates} = useTokenSearchManager()

  if (candidates.length === 0) {
    return <NotFound />
  }

  return (
    <FlatList
      data={candidates}
      keyExtractor={({address}) => address}
      renderItem={({item}) => <Item item={item} />}
    />
  )
}
