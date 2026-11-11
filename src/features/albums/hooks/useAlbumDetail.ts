import { useCallback, useEffect, useRef, useState } from 'react'
import { getAlbumById, getPhotosByAlbumId } from '../services/albumsService'
import type { Album } from '../types/album'
import type { Photo } from '../types/photo'

type AlbumDetailState = {
  album: Album | null
  photos: Photo[]
  isLoading: boolean
  error: string | null
}

const INITIAL_STATE: AlbumDetailState = {
  album: null,
  photos: [],
  isLoading: true,
  error: null,
}

export function useAlbumDetail(albumId: number) {
  const activeController = useRef<AbortController | null>(null)
  const requestId = useRef(0)
  const [state, setState] = useState<AlbumDetailState>(INITIAL_STATE)

  const loadAlbumDetail = useCallback(async () => {
    activeController.current?.abort()

    const controller = new AbortController()
    activeController.current = controller
    const currentRequestId = ++requestId.current
    setState((current) => ({ ...current, isLoading: true, error: null }))

    try {
      const album = await getAlbumById(albumId, controller.signal)
      if (controller.signal.aborted || currentRequestId !== requestId.current) return

      if (album === null) {
        setState({ album: null, photos: [], isLoading: false, error: null })
        return
      }

      setState({ album, photos: [], isLoading: true, error: null })
      const photos = await getPhotosByAlbumId(album.id, controller.signal)
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      setState({ album, photos, isLoading: false, error: null })
    } catch (cause) {
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      const error = cause instanceof Error ? cause.message : 'An unexpected error occurred.'
      setState((current) => ({ ...current, isLoading: false, error }))
    } finally {
      if (currentRequestId === requestId.current) activeController.current = null
    }
  }, [albumId])

  useEffect(() => {
    void loadAlbumDetail()
    return () => {
      requestId.current += 1
      activeController.current?.abort()
      activeController.current = null
    }
  }, [loadAlbumDetail])

  const reload = useCallback(() => void loadAlbumDetail(), [loadAlbumDetail])

  return { ...state, reload }
}
