import * as React from 'react'
import { Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { Navigation } from 'react-native-navigation'
import { ModalTemplate } from 'src/components/templates'
import { Color } from 'src/const'
import styled from 'styled-components/native'

export interface IProps {
  componentId: string
  setTo: (to: string) => void
}

export const Scan = ({ componentId, setTo }: IProps) => {
  const onScan = (data: any) => {
    if (typeof data === 'object' && typeof data.data === 'string') {
      setTo(data.data)
    } else if (typeof data === 'string') {
      setTo(data)
    } else {
      Alert.alert('Whoops!', 'Scanning failed.')
    }
    void Navigation.dismissModal(componentId)
  }

  return (
    <ModalTemplate componentId={componentId}>
      <Container>
        <QrCodeScanner
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          captureAudio={false}
          onBarCodeRead={onScan}
        >
          <RectangleContainer>
            <Rectangle />
          </RectangleContainer>
        </QrCodeScanner>
      </Container>
    </ModalTemplate>
  )
}

const Container = styled.View`
  flex: 1;
`

const QrCodeScanner = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: stretch;
`

const RectangleContainer = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`

const Rectangle = styled.View`
  height: 200;
  width: 200;
  border-width: 5;
  border-radius: 4;
  border-color: ${Color.WHITE};
  opacity: 0.6;
  background-color: transparent;
`
