import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import {ModalTemplate} from 'src/components/templates'
import {Color} from 'src/const'
import {BookmarkList} from './bookmark-list'
import {HistoryList} from './history-list'

interface IProps {
  componentId: string
}

export function Links({componentId}: IProps) {
  return (
    <ModalTemplate componentId={componentId}>
      <Tab.Navigator
        initialRouteNmae='Bookmark'
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: Color.SECONDARY,
          },
          labelStyle: {
            color: Color.TEXT.BLACK_HIGH_EMPHASIS,
          },
          style: {
            backgroundColor: Color.PRIMARY,
          },
        }}>
        <Tab.Screen name='Bookmark' component={BookmarkList} />
        <Tab.Screen name='History' component={HistoryList} />
      </Tab.Navigator>
    </ModalTemplate>
  )
}

const Tab = createMaterialTopTabNavigator()
