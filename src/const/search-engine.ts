export enum SearchEngine {
  Bing = 'bing',
  DuckDuckGo = 'duckDuckGo',
  Google = 'google',
  Yahoo = 'yahoo'
}

interface ISearchEngine {
  [key: string]: string
  name: string
  url: string
}

interface ISearchEngines {
  [key: string]: ISearchEngine
}

export const SearchEngines: ISearchEngines = {
  [SearchEngine.Bing]: {
    name: 'Bing',
    url: 'https://www.bing.com/search?q='
  },
  [SearchEngine.DuckDuckGo]: {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q='
  },
  [SearchEngine.Google]: {
    name: 'Google',
    url: 'https://www.google.com/search?q='
  },
  [SearchEngine.Yahoo]: {
    name: 'Yahoo',
    url: 'https://search.yahoo.com/search?p='
  }
}
