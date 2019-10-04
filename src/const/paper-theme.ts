import {Colors, DefaultTheme} from 'react-native-paper'

import {Color} from './color'
import {Size} from './size'

export const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: Colors.pink600,
    primary: Color.SECONDARY,
  },
  fonts: {
    light: 'Roboto-Light',
    medium: 'Roboto-Medium',
    regular: 'Roboto-Regular',
    thin: 'Roboto-Thin',
  },
  roundness: Size.BORDER_RADIUS,
}
