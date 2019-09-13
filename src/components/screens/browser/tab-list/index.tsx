import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {TabItem} from 'src/components/screens/browser/tab-list/tab-item'
import {Color, Size} from 'src/const'
import {browserSelector} from 'src/redux/module/browser'
import styled from 'styled-components/native'

export function TabList() {
  const activeTabId = useSelector(browserSelector.getActiveTabId)
  const tabs = useSelector(browserSelector.getTabs)

  if (!tabs) {
    return null
  }

  if (tabs.length === 1 && !tabs[0].url) {
    return null
  }

  return (
    <Container>
      <FlatList
        horizontal
        contentContainerStyle={styles.contentContainer}
        data={tabs}
        extraData={[activeTabId]}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <TabItem tab={item} />}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: Size.MARGIN_4,
  },
})

const Container = styled.View`
  background-color: ${Color.PRIMARY};
`
