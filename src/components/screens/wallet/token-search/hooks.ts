import Fuse from 'fuse.js'
import {ITokenCandidate} from 'lib/token-list.json'
import {createContext, useCallback, useContext, useMemo, useState} from 'react'
import {Navigation} from 'react-native-navigation'
import {useMappedState} from 'redux-react-hook'
import {IState} from 'src/redux/module'
import {tokenHook, tokenSelector} from 'src/redux/module/token'

export const useTokenSearchManager = () =>
  useContext(TokenSearchContext) as ITokenSearchManager

export interface ITokenSearchManager {
  candidates: ITokenCandidate[]
  onChangeText: (str: string) => void
  onSelectFactory: (token: ITokenCandidate) => () => void
  searchInput: string
}

export function useInitializedTokenSearchManager(
  componentId: string,
): ITokenSearchManager {
  const mapState = useCallback(
    (state: IState) => ({
      initialCandidates: tokenSelector.getTokenCandidates(state),
    }),
    [],
  )
  const {initialCandidates} = useMappedState(mapState)
  const {addToken} = tokenHook.useTokenManager()

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
      Navigation.pop(componentId)
    },
    [addToken, componentId],
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
