import {Dimensions, PixelRatio, Platform} from 'react-native'
import {deviceHelper} from 'src/utils'

const SCREEN = {
  BOTTOM: deviceHelper.hasBezel() ? 34 : 0,
  HEIGHT: Dimensions.get('window').height,
  TOP: 44,
  WIDTH: Dimensions.get('window').width,
}
const appBarHeight = 48 + SCREEN.BOTTOM

const normalize = (size: number): number =>
  Platform.OS === 'ios'
    ? Math.round(PixelRatio.roundToNearestPixel(size))
    : Math.round(PixelRatio.roundToNearestPixel(size)) - 2

export const Size = {
  BORDER_RADIUS: 8,
  BOTTOM_APP_BAR: {
    HEIGHT: appBarHeight,
    INITIAL_TOP: SCREEN.HEIGHT - appBarHeight,
  },
  BUTTON_HEIGHT: 36,
  FONT: {
    EXTRA_SMALL: normalize(12),
    INPUT_TEXT: 16,
    LARGE: normalize(20),
    MEDIUM: normalize(17),
    XX_LARGE: normalize(30),
  },
  ICON_BUTTON_WIDTH: 42,
  LIST_ITEM_HEIGHT: 40,
  /* tslint:disable:object-literal-sort-keys */
  MARGIN_2: 2,
  MARGIN_4: 4,
  MARGIN_8: 8,
  MARGIN_12: 12,
  MARGIN_16: 16,
  MARGIN_20: 20,
  MARGIN_32: 32,
  MARGIN_40: 40,
  MARGIN_64: 64,
  MARGIN_80: 80,
  /* tslint:enable:object-literal-sort-keys */
  SCREEN,
  TEXT_INPUT_MIN_HEIGHT: 64,
  WORD_ITEM_HEIGHT: 36,
}
