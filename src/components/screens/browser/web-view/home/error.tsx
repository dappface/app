import * as React from 'react'
import { Button, Caption, Card, Headline } from 'react-native-paper'
import { CenteredColumn, Padding } from 'src/components/atoms'
import { Size } from 'src/const'

interface IProps {
  retry: () => Promise<void>
}

export const Error = ({ retry }: IProps) => (
  <Padding>
    <Card>
      <Card.Content>
        <Padding size={Size.MARGIN_8}>
          <CenteredColumn>
            <Headline>Whoops!</Headline>
            <Padding size={Size.MARGIN_8}>
              <Caption>Failed to fetch Newsfeed</Caption>
            </Padding>
            <Button icon='refresh' mode='outlined' onPress={retry}>
              retry
            </Button>
          </CenteredColumn>
        </Padding>
      </Card.Content>
    </Card>
  </Padding>
)
