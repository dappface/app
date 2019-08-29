import * as React from 'react'
import { Button } from 'react-native-paper'
import { Padding } from 'src/components/atoms'
import { IWordListManager } from 'src/components/screens/settings/backup/quiz/hooks'
import { Size } from 'src/const'
import { IDimensions, useDimensions } from 'src/hooks'
import styled from 'styled-components/native'

interface IProps {
  isUsedFactory: IWordListManager['isUsedFactory']
  mnemonicList: string[]
  toggleFactory: IWordListManager['toggleFactory']
}

export const WordPool = ({
  isUsedFactory,
  mnemonicList,
  toggleFactory
}: IProps) => {
  const dimensions = useDimensions()
  return (
    <Container dimensions={dimensions}>
      {mnemonicList.map(word => (
        <Padding
          key={word}
          size={isUsedFactory(word) ? Size.MARGIN_4 + 0.5 : Size.MARGIN_4}
        >
          <Button
            mode={isUsedFactory(word) ? 'text' : 'outlined'}
            onPress={toggleFactory(word)}
            uppercase={false}
          >
            {word}
          </Button>
        </Padding>
      ))}
    </Container>
  )
}

interface IContainerProps {
  dimensions: IDimensions
}

const Container = styled.View<IContainerProps>`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${({ dimensions }) => dimensions.window.width - Size.MARGIN_16 * 2};
  justify-content: center;
`
