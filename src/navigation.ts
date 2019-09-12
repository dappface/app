import {Navigation} from 'react-native-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Color, NavigationEvent, Screen} from 'src/const'
import {accountType} from 'src/redux/module/account'

export const initNavigation = async (): Promise<void> => {
  const backButtonIcon = await Ionicons.getImageSource('md-arrow-back', 24)

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        backButton: {
          color: Color.TEXT.BLACK_HIGH_EMPHASIS,
          icon: backButtonIcon,
          title: '',
        },
        background: {
          color: Color.WHITE,
        },
        drawBehind: false,
        noBorder: true,
        title: {
          fontFamily: 'Roboto-Regular',
          fontSize: 20,
        },
      },
    })
    goToBrowser()
  })
}

// Roots
export const goToBrowser = (): void => {
  void Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screen.BROWSER,
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  })
}

// Modals
export const showImportAccounts = async (): Promise<void> => {
  const cancelIcon = await Ionicons.getImageSource('md-close', 24)
  void Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: Screen.WALLET.IMPORT.BASE,
            options: {
              topBar: {
                leftButtons: [
                  {
                    icon: cancelIcon,
                    id: NavigationEvent.CancelImport,
                  },
                ],
                title: {
                  text: 'Import Accounts',
                },
              },
            },
          },
        },
      ],
    },
  })
}

export const showLinks = (): void => {
  void Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: Screen.LINKS,
            options: {
              topBar: {
                title: {
                  text: 'Links',
                },
              },
            },
          },
        },
      ],
    },
  })
}

export const showSettings = (): void => {
  void Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: Screen.SETTINGS.BASE,
            options: {
              topBar: {
                title: {
                  text: 'Settings',
                },
              },
            },
          },
        },
      ],
    },
  })
}

export const showWalletScan = (props: {setTo: (to: string) => void}): void => {
  void Navigation.showModal({
    component: {
      name: Screen.WALLET.SCAN,
      passProps: props,
    },
  })
}

export const showBackup = (): void => {
  void Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: Screen.SETTINGS.BACKUP.BASE,
            options: {
              topBar: {
                title: {
                  text: 'Backup',
                },
              },
            },
            passProps: {
              isModal: true,
            },
          },
        },
      ],
    },
  })
}

// Stacks
export const pushAccountSelector = (
  componentId: string,
  props: {mnemonic: string},
): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.WALLET.IMPORT.ACCOUNT_SELECTOR,
      options: {
        topBar: {
          title: {
            text: 'Choose Accounts',
          },
        },
      },
      passProps: props,
    },
  })
}

export const pushBackup = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.SETTINGS.BACKUP.BASE,
      options: {
        topBar: {
          title: {
            text: 'Backup',
          },
        },
      },
    },
  })
}

export const pushQuiz = (
  componentId: string,
  props: {[key: string]: any},
): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.SETTINGS.BACKUP.QUIZ,
      options: {
        topBar: {
          title: {
            text: 'Quiz',
          },
        },
      },
      passProps: props,
    },
  })
}

export const pushCurrencySetting = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.SETTINGS.CURRENCY,
      options: {
        topBar: {
          title: {
            text: 'Currency',
          },
        },
      },
    },
  })
}

export const pushNetworkSetting = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.SETTINGS.NETWORK,
      options: {
        topBar: {
          title: {
            text: 'Network',
          },
        },
      },
    },
  })
}

export const pushReceive = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.WALLET.RECEIVE,
      options: {
        topBar: {
          title: {
            text: 'Receive',
          },
        },
      },
    },
  })
}

export const pushSearchEngineSetting = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.SETTINGS.SEARCH_ENGINE,
      options: {
        topBar: {
          title: {
            text: 'Search Engine',
          },
        },
      },
    },
  })
}

export const pushSend = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.WALLET.SEND,
      options: {
        topBar: {
          title: {
            text: 'Send',
          },
        },
      },
    },
  })
}

export const pushTokenSearch = (componentId: string): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.WALLET.TOKEN_SEARCH,
      options: {
        topBar: {
          title: {
            text: 'Search Tokens',
          },
        },
      },
    },
  })
}

export const pushComfirmSend = (
  componentId: string,
  props: {txParams: accountType.ITransactionParams},
): void => {
  void Navigation.push(componentId, {
    component: {
      name: Screen.WALLET.CONFIRM,
      options: {
        topBar: {
          title: {
            text: 'Confirm',
          },
        },
      },
      passProps: props,
    },
  })
}
