import {useNavigation} from '@react-navigation/core'
import React, {useCallback, useEffect, useState} from 'react'
import {Alert} from 'react-native'
import {Button} from 'react-native-paper'
import TouchID from 'react-native-touch-id'
import {useSelector} from 'react-redux'

import {Padding} from 'src/components/atoms'
import {WordList} from 'src/components/organisms'
import {ModalTemplate} from 'src/components/templates'
import {BiometryType, ScreenName, Size} from 'src/const'
import {accountSelector} from 'src/redux/module/account'

export {QuizScreen} from 'src/components/screens/settings/backup/quiz'

export interface IProps {
  componentId: string
  isModal?: boolean
}

export function BackupScreen({componentId, isModal = false}: IProps) {
  const mnemonic = useSelector(accountSelector.getMnemonic) as string
  const [mnemonicList, setMnemonicList] = useState<string[]>([])
  const navigation = useNavigation()

  const onPressUnlock = useCallback(async () => {
    try {
      const biometryType = await TouchID.isSupported()
      if (
        // @ts-ignore
        ![BiometryType.FACE_ID, BiometryType.TOUCH_ID].includes(biometryType)
      ) {
        throw new Error('TouchID/FaceID does not supported')
      }
      await TouchID.authenticate('')
      setMnemonicList(mnemonic.split(' '))
    } catch (error) {
      if (error.name === 'LAErrorUserCancel') {
        Alert.alert('Whoops!', 'Authentication failed. Try again!')
      } else {
        Alert.alert('Whoops!', error.message)
      }
    }
  }, [mnemonic])

  const onPressWrittenDown = useCallback(() => {
    navigation.navigate(ScreenName.SettingsBackupQuizScreen)
  }, [navigation, isModal])

  useEffect(() => {
    setTimeout(() => {
      Alert.alert(
        'Screenshots are not secure',
        `If you take a screenshot, \
your backup may be viewed by other apps. \
You can make a safe backup with physical paper and a pen.`,
        [{text: 'I understand'}],
      )
    }, 1000)
  }, [])

  return (
    <ModalTemplate disabled={!isModal} text='cancel'>
      <Padding verticalSize={Size.MARGIN_8}>
        <WordList words={mnemonicList} />
      </Padding>

      <Padding verticalSize={Size.MARGIN_8}>
        {mnemonicList.length === 0 ? (
          <Button mode='text' onPress={onPressUnlock}>
            unlock
          </Button>
        ) : (
          <Button mode='contained' onPress={onPressWrittenDown}>
            I have written it down
          </Button>
        )}
      </Padding>
    </ModalTemplate>
  )
}
