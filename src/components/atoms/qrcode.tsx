import qrcode from 'qrcode'
import * as React from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { WebView } from 'react-native-webview'

interface IProps {
  size?: number
  value: string
}

export const QRCode = ({ value, size = 400 }: IProps) => {
  const [html, setHtml] = React.useState('')

  React.useEffect(() => {
    ;(async () => {
      const svg = await qrcode.toString(value, {
        type: 'svg'
      })
      const chunks = svg.split(' ')
      const i = 1
      const svgWithSize = [
        ...chunks.slice(0, i),
        `width="100%" height="100%"`,
        ...chunks.slice(i)
      ].join(' ')
      const code = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                margin: 0;
              }
            </style>
          </head>
          <body>
          <!-- SVG code -->
          ${svgWithSize}
          </body>
        </html>
      `
      setHtml(code)
    })()
  }, [size, value])

  return (
    <View style={{ height: size, width: size }}>
      {html ? (
        <WebView scrollEnabled={false} source={{ html }} style={{ flex: 1 }} />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}
