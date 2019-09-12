import {useCallback, useReducer} from 'react'
import {createSelector} from 'reselect'

export interface IWordListManager {
  clear: () => void
  index: number
  isEmpty: boolean
  isFilled: boolean
  isUsedFactory: (word: string) => boolean
  move: (index: number) => void
  remove: (index: number) => void
  toggleFactory: (word: string) => () => void
  wordList: string[]
}

export const useWordListManager = (): IWordListManager => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const isEmpty = isEmptySelector(state)
  const isFilled = isFilledSelector(state)
  const isUsedFactory: IWordListManager['isUsedFactory'] = word =>
    isUsedSelectorFactory(word)(state)

  const clear = useCallback<IWordListManager['clear']>(() => {
    dispatch({
      type: ActionType.Clear,
    })
  }, [dispatch])

  const move = useCallback<IWordListManager['move']>(
    (index: number) => {
      dispatch({
        payload: {index},
        type: ActionType.Move,
      })
    },
    [dispatch],
  )

  const remove = useCallback<IWordListManager['remove']>(
    (index: number) => {
      dispatch({
        payload: {index},
        type: ActionType.Remove,
      })
    },
    [dispatch],
  )

  const toggleFactory = useCallback<IWordListManager['toggleFactory']>(
    (word: string) => () => {
      dispatch({
        payload: {word},
        type: ActionType.Toggle,
      })
    },
    [dispatch],
  )

  return {
    clear,
    index: state.index,
    isEmpty,
    isFilled,
    isUsedFactory,
    move,
    remove,
    toggleFactory,
    wordList: state.wordList,
  }
}

const wordListSelector = (state: IState) => state.wordList

const isEmptySelector = createSelector(
  wordListSelector,
  (wordList: string[]): boolean =>
    wordList.findIndex(item => item !== '') === -1,
)

const isFilledSelector = createSelector(
  wordListSelector,
  (wordList: string[]): boolean => wordList.indexOf('') === -1,
)

const isUsedSelectorFactory = (word: string) =>
  createSelector(
    wordListSelector,
    (wordList: string[]): boolean => wordList.indexOf(word) !== -1,
  )

interface IState {
  index: number
  wordList: string[]
}

const initialState = {
  index: 0,
  wordList: Array.from({length: 12}, () => ''),
}

enum ActionType {
  Clear = 'clear',
  Move = 'move',
  Remove = 'remove',
  Toggle = 'toggle',
}

type Actions = IClear | IMove | IRemove | IToggle

const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case ActionType.Clear:
      return initialState
    case ActionType.Move:
      return {...state, index: action.payload.index}
    case ActionType.Remove:
      return {
        ...state,
        index: action.payload.index,
        wordList: state.wordList.map((item, i) =>
          i === action.payload.index ? '' : item,
        ),
      }
    case ActionType.Toggle: {
      const i = state.wordList.indexOf(action.payload.word)
      return {
        ...state,
        index:
          i === -1
            ? state.index === state.wordList.length - 1
              ? state.wordList.findIndex(item => item === '')
                ? state.wordList.findIndex(item => item === '')
                : state.index
              : state.index + 1
            : i,
        wordList:
          i === -1
            ? state.wordList.map((item, ii) =>
                ii === state.index ? action.payload.word : item,
              )
            : state.wordList.map((item, ii) => (ii === i ? '' : item)),
      }
    }
    default:
      return state
  }
}

interface IClear {
  type: ActionType.Clear
}

interface IMove {
  payload: {index: number}
  type: ActionType.Move
}

interface IRemove {
  payload: {index: number}
  type: ActionType.Remove
}

interface IToggle {
  payload: {word: string}
  type: ActionType.Toggle
}
