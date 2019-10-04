import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import {ModalTemplate} from 'src/components/templates'
import {Color} from 'src/const'
import {BookmarkList} from './bookmark-list'
import {HistoryList} from './history-list'

const TabNavigator = createMaterialTopTabNavigator(
  {
    Bookmark: BookmarkList,
    History: HistoryList,
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: Color.SECONDARY,
      },
      labelStyle: {
        color: Color.TEXT.BLACK_HIGH_EMPHASIS,
      },
      style: {
        backgroundColor: Color.PRIMARY,
      },
    },
  },
)

const AppContainer = createAppContainer(TabNavigator)

interface IProps {
  componentId: string
}

export const Links = ({componentId}: IProps) => (
  <ModalTemplate componentId={componentId}>
    <AppContainer screenProps={{componentId}} />
  </ModalTemplate>
)
