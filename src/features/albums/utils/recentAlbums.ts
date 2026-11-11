export type RecentAlbum = {
  id: number
  title: string
}

const STORAGE_KEY = 'recent-albums'
const MAX_RECENT_ALBUMS = 5

function isRecentAlbum(value: unknown): value is RecentAlbum {
  if (typeof value !== 'object' || value === null) return false

  const album = value as Record<string, unknown>
  return Number.isSafeInteger(album.id) && typeof album.title === 'string'
}

export function readRecent(): RecentAlbum[] {
  try {
    const storedAlbums = localStorage.getItem(STORAGE_KEY)
    if (!storedAlbums) return []

    const parsed: unknown = JSON.parse(storedAlbums)
    if (!Array.isArray(parsed)) return []

    const recentAlbums: RecentAlbum[] = []
    const seenIds = new Set<number>()

    for (const value of parsed) {
      if (!isRecentAlbum(value) || seenIds.has(value.id)) continue
      recentAlbums.push({ id: value.id, title: value.title })
      seenIds.add(value.id)
      if (recentAlbums.length === MAX_RECENT_ALBUMS) break
    }

    return recentAlbums
  } catch {
    return []
  }
}

export function addRecent(album: RecentAlbum): RecentAlbum[] {
  const recentAlbums = [album, ...readRecent().filter((item) => item.id !== album.id)]
    .slice(0, MAX_RECENT_ALBUMS)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentAlbums))
  } catch {
    // Keep the UI usable if browser storage is blocked or unavailable.
  }

  return recentAlbums
}
