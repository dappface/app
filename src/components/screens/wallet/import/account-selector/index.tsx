import {Wallet} from 'ethers'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {FlatList, ScrollView, View} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {Button, RadioButton, Text, Title} from 'react-native-paper'
import styled from 'styled-components/native'

import {HorizontalPadding, Padding, Row} from 'src/components/atoms'
import {ModalTemplate} from 'src/components/templates'
import {IScreenProps} from 'src/components/screens/shared'
import {AccountPath, ScreenName, Size} from 'src/const'
import {accountHook, accountType} from 'src/redux/module/account'
import {Item} from './item'

interface IParams {
  mnemonic: string
}

export function AccountSelectorScreen({
  navigation,
  route,
}: IScreenProps<IParams>) {
  const [basePath, setBasePath] = useState(AccountPath[0])
  const [candidates, setCandidates] = useState<accountType.IAccountCandidate[]>(
    [],
  )

  const {importAccountCandidates} = accountHook.useAccountManager()

  const isSelectedExist = useMemo(
    () => !!candidates.find(item => item.isSelected === true),
    [candidates],
  )

  const onPressPathFactory = useCallback(
    (path: string) => () => {
      setBasePath(path)
    },
    [],
  )

  const onPressItemFactory = useCallback(
    (a: accountType.IAccountCandidate) => () => {
      const c = candidates.map(item =>
        item.address === a.address ? {...a, isSelected: !a.isSelected} : item,
      )
      setCandidates(c)
    },
    [candidates],
  )

  const onPressRecover = useCallback((): void => {
    importAccountCandidates(route.params.mnemonic, candidates)
    navigation.navigate(ScreenName.BrowserScreen)
  }, [candidates, importAccountCandidates, route, navigation])

  const deriveAccountByIndex = useCallback(
    (i: number) => {
      const path = `${basePath}/${i}`
      const wallet = Wallet.fromMnemonic(route.params.mnemonic, path)

      return {
        address: wallet.address,
        isSelected: false,
        path: wallet.path,
        privKey: wallet.privateKey,
      }
    },
    [basePath, route],
  )

  const onPressMore = useCallback(() => {
    const {length} = candidates
    const additionals = Array.from({length: 5}).map((_, i) =>
      deriveAccountByIndex(length + i),
    )
    setCandidates([...candidates, ...additionals])
  }, [candidates, deriveAccountByIndex])

  useEffect(() => {
    const additionals = Array.from({length: 5}).map((_, i) =>
      deriveAccountByIndex(i),
    )

    setCandidates(additionals)
  }, [basePath, deriveAccountByIndex])

  return (
    <ModalTemplate text='cancel'>
      <View>
        <HorizontalPadding>
          <Title>Hd Derivation Path</Title>

          <ScrollView horizontal>
            <PathList>
              {AccountPath.map(item => (
                <PathItem
                  disabled={item === basePath}
                  key={item}
                  onPress={onPressPathFactory(item)}>
                  <Row>
                    <RadioButton.Android
                      status={item === basePath ? 'checked' : 'unchecked'}
                      value={item}
                    />
                    <DerivationPathText>{item}</DerivationPathText>
                  </Row>
                </PathItem>
              ))}
            </PathList>
          </ScrollView>
        </HorizontalPadding>
      </View>

      <View>
        <HorizontalPadding>
          <Title>Please choose accounts</Title>
        </HorizontalPadding>

        {Object.keys(candidates).length === 0 ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={candidates}
            keyExtractor={item => item.address}
            renderItem={({item, index}) => (
              <Item
                i={index}
                account={item}
                onPress={onPressItemFactory(item)}
              />
            )}
          />
        )}

        <Button mode='text' onPress={onPressMore}>
          more accounts
        </Button>
      </View>

      <Padding>
        <Button
          disabled={!isSelectedExist}
          mode='contained'
          onPress={onPressRecover}>
          recover
        </Button>
      </Padding>
    </ModalTemplate>
  )
}

const DerivationPathText = styled(Text)`
  padding-left: ${Size.MARGIN_12};
`

const PathList = styled.View`
  height: 200;
  flex-wrap: wrap;
`

const PathItem = styled(Ripple)`
  height: 36;
  border-radius: ${Size.BORDER_RADIUS};
  overflow: hidden;
`
