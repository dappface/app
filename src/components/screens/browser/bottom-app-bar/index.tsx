import React, {useEffect, useCallback, useState} from 'react'
import {Animated, StatusBar} from 'react-native'
import Interactable from 'react-native-interactable'
import {Card} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {NavigationBar} from 'src/components/screens/browser/bottom-app-bar/navigation-bar'
import {PullBar} from 'src/components/screens/browser/bottom-app-bar/pull-bar'
import {SignPrompt} from 'src/components/screens/browser/bottom-app-bar/sign-prompt'
import {Wallet} from 'src/components/screens/wallet'
import {Color, StatusBarStyle} from 'src/const'
import {
  IDimensions,
  useBottomAppBarInitialTop,
  useBottomAppBarManager,
  useBrowserManager,
  useDimensions,
  useSafeAreaPosition,
} from 'src/hooks'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {uiHook, uiType} from 'src/redux/module/ui'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export function BottomAppBar({componentId}: IProps) {
  const bottomAppBarInitialTop = useBottomAppBarInitialTop()
  const {bottomAppBarRef, closeBottomAppBar} = useBottomAppBarManager()
  const {respondData} = useBrowserManager()
  const {screen: screenDimensions} = useDimensions()
  const safeAreaPosition = useSafeAreaPosition()

  const signRequest = useSelector(accountSelector.getSignRequest)
  const setSignRequest = accountHook.useSetSignRequest()
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const [isOpen, setIsOpen] = useState(false)
  const [statusBarStyle, setStatusBarStyle] = useState(
    StatusBarStyle.DARK_CONTENT,
  )

  const onAlert = useCallback(
    ({nativeEvent}: any) => {
      if (JSON.stringify(nativeEvent).includes('"basePosition":"enter"')) {
        setIsOpen(false)
        if (!signRequest) {
          return
        }

        respondData(signRequest.tabId, signRequest.callbackId, false)
        setSignRequest()
      } else if (
        JSON.stringify(nativeEvent).includes('"basePosition":"leave"')
      ) {
        setIsOpen(true)
      } else if (JSON.stringify(nativeEvent).includes('"top":"enter"')) {
        setStatusBarStyle(StatusBarStyle.DARK_CONTENT)
      } else if (JSON.stringify(nativeEvent).includes('"top":"leave"')) {
        setStatusBarStyle(StatusBarStyle.LIGHT_CONTENT)
      }
    },
    [respondData, setSignRequest, signRequest],
  )

  const onMore = useCallback(() => {
    setBottomDrawer({
      type: uiType.BottomDrawerType.BrowserOptions,
    })
  }, [setBottomDrawer])

  useEffect(() => {
    closeBottomAppBar()
  }, [bottomAppBarInitialTop, closeBottomAppBar])

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      {isOpen ? (
        <ShadowTouchable
          onPress={closeBottomAppBar}
          screenDimensions={screenDimensions}>
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: Color.MOSTLY_BLACK,
              position: 'absolute',
              height: screenDimensions.height,
              width: screenDimensions.width,
              opacity: position.interpolate({
                inputRange: [0, bottomAppBarInitialTop],
                outputRange: [1, 0],
              }),
            }}
          />
        </ShadowTouchable>
      ) : null}
      <StyledInteractableView
        alertAreas={[
          {
            id: 'basePosition',
            influenceArea: {top: bottomAppBarInitialTop},
          },
          {id: 'top', influenceArea: {top: safeAreaPosition.top + 1}},
        ]}
        animatedNativeDriver
        animatedValueY={position}
        boundaries={{top: safeAreaPosition.top}}
        initialPosition={{y: bottomAppBarInitialTop}}
        onAlert={onAlert}
        ref={bottomAppBarRef}
        snapPoints={[
          {y: bottomAppBarInitialTop},
          {y: screenDimensions.height / 2},
          {y: safeAreaPosition.top},
        ]}
        verticalOnly>
        <BottomSheet elevation={8} screenDimensions={screenDimensions}>
          <NavigationBar isOpen={isOpen} onMore={onMore} position={position} />
          <PullBar />
          {signRequest ? <SignPrompt /> : <Wallet componentId={componentId} />}
        </BottomSheet>
      </StyledInteractableView>
    </>
  )
}

const position = new Animated.Value(0)

interface IBottomSheetProps {
  screenDimensions: IDimensions['screen']
}

const BottomSheet = styled(Card)<IBottomSheetProps>`
  background-color: ${Color.PRIMARY};
  border-radius: 16;
  ${({screenDimensions}) => `
    height: ${screenDimensions.height};
    width: ${screenDimensions.width};
  `}
`

interface IShadowTouchableProps {
  screenDimensions: IDimensions['screen']
}

const ShadowTouchable = styled.TouchableWithoutFeedback<IShadowTouchableProps>`
  position: absolute;

  ${({screenDimensions}) => `
    height: ${screenDimensions.height};
    width: ${screenDimensions.width};
  `}
`

const StyledInteractableView = styled(Interactable.View)`
  position: absolute;
`
