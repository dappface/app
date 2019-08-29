export interface IBookmarkManager {
  removeBookmark: (bookmarkId: string) => void
  toggleBookmark: () => void
}
