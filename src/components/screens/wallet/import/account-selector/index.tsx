import {Wallet} from 'ethers'
import * as React from 'react'
import {FlatList, ScrollView, View} from 'react-native'
import Ripple from 'react-native-material-ripple'
import {Navigation} from 'react-native-navigation'
import {Button, RadioButton, Text, Title} from 'react-native-paper'
import {HorizontalPadding, Padding, Row} from 'src/components/atoms'
import {Item} from 'src/components/screens/wallet/import/account-selector/item'
import {ModalTemplate} from 'src/components/templates'
import {AccountPath, Size} from 'src/const'
import {accountHook, accountType} from 'src/redux/module/account'
import styled from 'styled-components/native'

interface IProps {
  componentId: string
  mnemonic: string
}

export const AccountSelector = ({componentId, mnemonic}: IProps) => {
  const [basePath, setBasePath] = React.useState(AccountPath[0])
  const [candidates, setCandidates] = React.useState<
    accountType.IAccountCandidate[]
  >([])

  const {importAccountCandidates} = accountHook.useAccountManager()

  const isSelectedExist = React.useMemo(
    () => !!candidates.find(item => item.isSelected === true),
    [candidates],
  )

  const onPressPathFactory = React.useCallback(
    (path: string) => () => {
      setBasePath(path)
    },
    [],
  )

  const onPressItemFactory = React.useCallback(
    (a: accountType.IAccountCandidate) => () => {
      const c = candidates.map(item =>
        item.address === a.address ? {...a, isSelected: !a.isSelected} : item,
      )
      setCandidates(c)
    },
    [candidates],
  )

  const onPressRecover = React.useCallback((): void => {
    importAccountCandidates(mnemonic, candidates)
    Navigation.dismissModal(componentId)
  }, [candidates, componentId, importAccountCandidates, mnemonic])

  const deriveAccountByIndex = React.useCallback(
    (i: number) => {
      const path = `${basePath}/${i}`
      const wallet = Wallet.fromMnemonic(mnemonic, path)

      return {
        address: wallet.address,
        isSelected: false,
        path: wallet.path,
        privKey: wallet.privateKey,
      }
    },
    [basePath, mnemonic],
  )

  const onPressMore = React.useCallback(() => {
    const {length} = candidates
    const additionals = Array.from({length: 5}).map((_, i) =>
      deriveAccountByIndex(length + i),
    )
    setCandidates([...candidates, ...additionals])
  }, [candidates, deriveAccountByIndex])

  React.useEffect(() => {
    const additionals = Array.from({length: 5}).map((_, i) =>
      deriveAccountByIndex(i),
    )

    setCandidates(additionals)
  }, [basePath, deriveAccountByIndex])

  return (
    <ModalTemplate componentId={componentId} text='cancel'>
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
