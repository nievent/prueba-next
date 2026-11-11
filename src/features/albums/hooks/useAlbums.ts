import { useCallback, useEffect, useRef, useState } from 'react'
import { getAlbumsByUserId } from '../services/albumsService'
import type { AlbumPreview } from '../types/album'

type AlbumsState = {
  albums: AlbumPreview[]
  isLoading: boolean
  error: string | null
}

const EMPTY_STATE: AlbumsState = { albums: [], isLoading: false, error: null }

export function useAlbums(userId: number) {
  const activeController = useRef<AbortController | null>(null)
  const requestId = useRef(0)
  const [state, setState] = useState<AlbumsState>(EMPTY_STATE)

  const loadAlbums = useCallback(async () => {
    activeController.current?.abort()

    const controller = new AbortController()
    activeController.current = controller
    const currentRequestId = ++requestId.current
    setState((current) => ({ ...current, isLoading: true, error: null }))

    try {
      const albums = await getAlbumsByUserId(userId, controller.signal)
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      setState({ albums, isLoading: false, error: null })
    } catch (cause) {
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      const error = cause instanceof Error ? cause.message : 'An unexpected error occurred.'
      setState((current) => ({ ...current, isLoading: false, error }))
    } finally {
      if (currentRequestId === requestId.current) activeController.current = null
    }
  }, [userId])

  useEffect(() => {
    void loadAlbums()
    return () => {
      requestId.current += 1
      activeController.current?.abort()
      activeController.current = null
    }
  }, [loadAlbums])

  const reload = useCallback(() => void loadAlbums(), [loadAlbums])

  return { ...state, reload }
}
