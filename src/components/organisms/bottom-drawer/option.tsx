import * as React from 'react'
import Ripple from 'react-native-material-ripple'
import {Subheading} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {HorizontalPadding, Row} from 'src/components/atoms'
import {Color} from 'src/const'
import styled from 'styled-components/native'

interface IProps {
  style?: any
  title: string
  iconName: string
  onPress: () => void
  disabled?: boolean
}

export const Option = ({
  style,
  title,
  iconName,
  onPress,
  disabled = false,
}: IProps) => (
  <Container onPress={onPress} disabled={disabled} style={style}>
    <HorizontalPadding>
      <Row>
        <Icon>
          <Ionicons
            name={iconName}
            size={24}
            color={
              disabled
                ? Color.TEXT.BLACK_DISABLED
                : Color.TEXT.BLACK_HIGH_EMPHASIS
            }
          />
        </Icon>
        <HorizontalPadding>
          <Subheading
            style={{
              color: disabled
                ? Color.TEXT.BLACK_DISABLED
                : Color.TEXT.BLACK_HIGH_EMPHASIS,
            }}>
            {title}
          </Subheading>
        </HorizontalPadding>
      </Row>
    </HorizontalPadding>
  </Container>
)

const HEIGHT = 56

const Container = styled(Ripple)`
  height: ${HEIGHT};
`

const Icon = styled.View`
  width: ${HEIGHT};
  height: ${HEIGHT};
  align-items: center;
  justify-content: center;
`
