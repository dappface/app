import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import React from 'react'

import {Color, ScreenName} from 'src/const'
import {ModalTemplate} from '../templates'
import {Links} from '../screens'

export function LinksTabNavigation() {
  return (
    <ModalTemplate>
      <LinksTab.Navigator
        initialRouteName={ScreenName.LinksBookmarksScreen}
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
        <LinksTab.Screen
          name={ScreenName.LinksBookmarksScreen}
          component={Links.BookmarksScreen}
        />
        <LinksTab.Screen
          name={ScreenName.LinkHistoryScreen}
          component={Links.HistoryScreen}
        />
      </LinksTab.Navigator>
    </ModalTemplate>
  )
}

const LinksTab = createMaterialTopTabNavigator()
