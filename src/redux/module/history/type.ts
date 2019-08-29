export interface IHistoryManager {
  addHistory: (tabId: string, title: string | undefined, url: string) => void
  removeHistory: (historyId: string) => void
}
