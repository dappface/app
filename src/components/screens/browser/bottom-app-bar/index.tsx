import * as React from 'react'
import {Animated, StatusBar, StyleSheet} from 'react-native'
import Interactable from 'react-native-interactable'
import {Card} from 'react-native-paper'
import {useMappedState} from 'redux-react-hook'
import {NavigationBar} from 'src/components/screens/browser/bottom-app-bar/navigation-bar'
import {PullBar} from 'src/components/screens/browser/bottom-app-bar/pull-bar'
import {SignPrompt} from 'src/components/screens/browser/bottom-app-bar/sign-prompt'
import {Wallet} from 'src/components/screens/wallet'
import {Color, Size, StatusBarStyle} from 'src/const'
import {useBottomAppBarManager, useBrowserManager} from 'src/hooks'
import {IState} from 'src/redux/module'
import {accountHook, accountSelector} from 'src/redux/module/account'
import {uiHook, uiType} from 'src/redux/module/ui'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
}

export const BottomAppBar = ({componentId}: IProps) => {
  const {bottomAppBarRef, closeBottomAppBar} = useBottomAppBarManager()
  const {respondData} = useBrowserManager()

  const mapState = React.useCallback(
    (state: IState) => ({
      signRequest: accountSelector.getSignRequest(state),
    }),
    [],
  )
  const {signRequest} = useMappedState(mapState)
  const setSignRequest = accountHook.useSetSignRequest()
  const setBottomDrawer = uiHook.useSetBottomDrawer()

  const [isOpen, setIsOpen] = React.useState(false)
  const [statusBarStyle, setStatusBarStyle] = React.useState(
    StatusBarStyle.DARK_CONTENT,
  )

  const onAlert = React.useCallback(
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

  const onMore = React.useCallback(() => {
    setBottomDrawer({
      type: uiType.BottomDrawerType.BrowserOptions,
    })
  }, [setBottomDrawer])

  return (
    <>
      <StatusBar barStyle={statusBarStyle} />
      {isOpen ? (
        <ShadowTouchable onPress={closeBottomAppBar}>
          <Animated.View
            style={[
              styles.shadow,
              {
                opacity: position.interpolate({
                  inputRange: [0, Size.BOTTOM_APP_BAR.INITIAL_TOP],
                  outputRange: [1, 0],
                }),
              },
            ]}
          />
        </ShadowTouchable>
      ) : null}
      <Interactable.View
        alertAreas={[
          {
            id: 'basePosition',
            influenceArea: {top: Size.BOTTOM_APP_BAR.INITIAL_TOP},
          },
          {id: 'top', influenceArea: {top: Size.SCREEN.TOP + 1}},
        ]}
        animatedNativeDriver
        animatedValueY={position}
        boundaries={{top: Size.SCREEN.TOP}}
        initialPosition={{y: Size.BOTTOM_APP_BAR.INITIAL_TOP}}
        onAlert={onAlert}
        ref={bottomAppBarRef}
        snapPoints={[
          {y: Size.BOTTOM_APP_BAR.INITIAL_TOP},
          {y: Size.SCREEN.HEIGHT / 2},
          {y: Size.SCREEN.TOP},
        ]}
        style={{position: 'absolute'}}
        verticalOnly>
        <BottomSheet elevation={8}>
          <NavigationBar isOpen={isOpen} onMore={onMore} position={position} />
          <PullBar />
          {signRequest ? <SignPrompt /> : <Wallet componentId={componentId} />}
        </BottomSheet>
      </Interactable.View>
    </>
  )
}

const position = new Animated.Value(0)

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: Color.MOSTLY_BLACK,
    height: Size.SCREEN.HEIGHT,
    position: 'absolute',
    width: Size.SCREEN.WIDTH,
  },
})

const BottomSheet = styled(Card)`
  background-color: ${Color.PRIMARY};
  border-radius: 16;
  height: ${Size.SCREEN.HEIGHT};
  width: ${Size.SCREEN.WIDTH};
`

const ShadowTouchable = styled.TouchableWithoutFeedback`
  height: ${Size.SCREEN.HEIGHT};
  position: absolute;
  width: ${Size.SCREEN.WIDTH};
`
