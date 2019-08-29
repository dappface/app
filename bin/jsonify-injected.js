const fs = require('fs')

const INJECT_FILE = './dist/inject.js'
const INJECTED_FILE = './dist/injected.js'
const JSON_FILE_DIST = './dist/injected.json'
const UTF8 = 'utf8'

const inject = fs.readFileSync(INJECT_FILE, UTF8)
const injected = fs.readFileSync(INJECTED_FILE, UTF8)
const json = JSON.stringify({
  injected: injected.toString(),
  inject: inject.toString()
})

fs.writeFileSync(JSON_FILE_DIST, json)
