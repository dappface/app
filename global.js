import {URL, URLSearchParams} from 'whatwg-url'
import {Buffer} from 'buffer'
import process from 'process'

global.Buffer = Buffer
global.URL = URL
global.URLSearchParams = URLSearchParams
global.process = process
