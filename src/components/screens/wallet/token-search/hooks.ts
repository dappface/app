import {useNavigation} from '@react-navigation/core'
import Fuse from 'fuse.js'
import {ITokenCandidate} from 'lib/token-list.json'
import {createContext, useCallback, useContext, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'

import {ScreenName} from 'src/const'
import {tokenHook, tokenSelector} from 'src/redux/module/token'

export const useTokenSearchManager = () =>
  useContext(TokenSearchContext) as ITokenSearchManager

export interface ITokenSearchManager {
  candidates: ITokenCandidate[]
  onChangeText: (str: string) => void
  onSelectFactory: (token: ITokenCandidate) => () => void
  searchInput: string
}

export function useInitializedTokenSearchManager(): ITokenSearchManager {
  const initialCandidates = useSelector(tokenSelector.getTokenCandidates)
  const {addToken} = tokenHook.useTokenManager()
  const navigation = useNavigation()

  const fuse = useMemo(
    () =>
      new Fuse(initialCandidates, {
        keys: ['address', 'name', 'symbol'],
      }),
    [initialCandidates],
  )

  const [candidates, setCandidates] = useState(initialCandidates)
  const [searchInput, setSearchInput] = useState('')

  const onChangeText: ITokenSearchManager['onChangeText'] = useCallback(
    s => {
      setSearchInput(s)
      setCandidates(s !== '' ? fuse.search(s) : initialCandidates)
    },
    [fuse, initialCandidates],
  )

  const onSelectFactory: ITokenSearchManager['onSelectFactory'] = useCallback(
    t => () => {
      addToken(t)
      navigation.navigate(ScreenName.BrowserScreen)
    },
    [addToken, navigation],
  )

  return {
    candidates,
    onChangeText,
    onSelectFactory,
    searchInput,
  }
}

export const TokenSearchContext = createContext<
  ITokenSearchManager | undefined
>(undefined)
