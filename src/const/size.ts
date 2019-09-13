import {PixelRatio, Platform} from 'react-native'

const normalize = (size: number): number =>
  Platform.OS === 'ios'
    ? Math.round(PixelRatio.roundToNearestPixel(size))
    : Math.round(PixelRatio.roundToNearestPixel(size)) - 2

export const Size = {
  BORDER_RADIUS: 8,
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
  TEXT_INPUT_MIN_HEIGHT: 64,
  WORD_ITEM_HEIGHT: 36,
}
