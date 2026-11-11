import type { Album, AlbumPreview } from '../types/album'
import type { Photo } from '../types/photo'

const API_URL = 'https://jsonplaceholder.typicode.com'

async function getFirstPhotoThumbnail(albumId: number, signal: AbortSignal): Promise<string | null> {
  const query = new URLSearchParams({ albumId: String(albumId), _limit: '1' })

  try {
    const response = await fetch(`${API_URL}/photos?${query.toString()}`, { signal })
    if (!response.ok) return null

    const photos = (await response.json()) as Photo[]
    return photos[0]?.thumbnailUrl ?? null
  } catch (cause) {
    if (signal.aborted) throw cause
    return null
  }
}

export async function getAlbumsByUserId(userId: number, signal: AbortSignal): Promise<AlbumPreview[]> {
  const response = await fetch(`${API_URL}/users/${userId}/albums`, { signal })

  if (!response.ok) {
    throw new Error('No se pudieron cargar los albumes.')
  }

  const albums = (await response.json()) as Album[]
  return Promise.all(albums.map(async (album) => ({
    ...album,
    thumbnailUrl: await getFirstPhotoThumbnail(album.id, signal),
  })))
}

export async function getAlbumById(id: number, signal: AbortSignal): Promise<Album | null> {
  const response = await fetch(`${API_URL}/albums/${id}`, { signal })

  if (response.status === 404) return null
  if (!response.ok) throw new Error('No se pudo cargar el album.')

  const album = (await response.json()) as Album
  return album.id === id ? album : null
}

export async function getPhotosByAlbumId(albumId: number, signal: AbortSignal): Promise<Photo[]> {
  const query = new URLSearchParams({ albumId: String(albumId) })
  const response = await fetch(`${API_URL}/photos?${query.toString()}`, { signal })

  if (!response.ok) {
    throw new Error('No se pudieron cargar las fotos del album.')
  }

  return (await response.json()) as Photo[]
}
