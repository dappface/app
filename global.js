import {Buffer} from 'buffer'
import process from 'process'
// eslint-disable-next-line import/no-extraneous-dependencies
import {URL, URLSearchParams} from 'whatwg-url'

global.Buffer = Buffer
global.URL = URL
global.URLSearchParams = URLSearchParams
global.process = process
