import * as React from 'react'
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from 'react-navigation'
import { BookmarkList } from 'src/components/screens/links/bookmark-list'
import { HistoryList } from 'src/components/screens/links/history-list'
import { ModalTemplate } from 'src/components/templates'
import { Color } from 'src/const'

const TabNavigator = createMaterialTopTabNavigator(
  {
    Bookmark: BookmarkList,
    History: HistoryList
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: Color.SECONDARY
      },
      labelStyle: {
        color: Color.TEXT.BLACK_HIGH_EMPHASIS
      },
      style: {
        backgroundColor: Color.PRIMARY
      }
    }
  }
)

const AppContainer = createAppContainer(TabNavigator)

interface IProps {
  componentId: string
}

export const Links = ({ componentId }: IProps) => (
  <ModalTemplate componentId={componentId}>
    <AppContainer screenProps={{ componentId }} />
  </ModalTemplate>
)
