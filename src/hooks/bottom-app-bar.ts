import {createContext, RefObject, useCallback, useContext, useRef} from 'react'

export const useBottomAppBarManager = () =>
  useContext(BottomAppBarManagerContext) as IBottomAppBarManager

export const BottomAppBarManagerContext = createContext<IBottomAppBarManager | null>(
  null,
)

interface IBottomAppBarManager {
  // Interactable.IInteractableView as any since there's no type for snapTo method
  bottomAppBarRef: RefObject<any>
  closeBottomAppBar: () => void
  openBottomAppBar: () => void
}

export const useInitializedBottomAppBarManager = (): IBottomAppBarManager => {
  const bottomAppBarRef = useRef<any>(null)

  const closeBottomAppBar = useCallback((): void => {
    if (!bottomAppBarRef.current) {
      return
    }
    bottomAppBarRef.current.snapTo({index: 0})
  }, [])

  const openBottomAppBar = useCallback((): void => {
    if (!bottomAppBarRef.current) {
      return
    }
    bottomAppBarRef.current.snapTo({index: 2})
  }, [])

  return {
    bottomAppBarRef,
    closeBottomAppBar,
    openBottomAppBar,
  }
}
