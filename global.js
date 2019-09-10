import { URL, URLSearchParams } from 'whatwg-url'
import { Buffer } from 'buffer'
import process from 'process'

global.Buffer = Buffer
global.URL = URL
global.URLSearchParams = URLSearchParams
global.process = process

__PROFILE__ = true
__UMD__ = false

if (typeof btoa === 'undefined') {
  global.btoa = str => Buffer.from(str).toString('base64')
}
