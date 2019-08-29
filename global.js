import buffer from 'buffer'
import process from 'process'

global.Buffer = buffer.Buffer
global.process = process

__PROFILE__ = true
__UMD__ = false

if (typeof btoa === 'undefined') {
  global.btoa = str =>
    Buffer.from(str).toString('base64')
}
