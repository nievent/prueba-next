import { useCallback, useEffect, useRef, useState } from 'react'
import { getUserById } from '../services/usersService'
import type { User } from '../types/user'

type UserState = {
  user: User | null
  isLoading: boolean
  error: string | null
}

export function useUser(userId: number) {
  const activeController = useRef<AbortController | null>(null)
  const requestId = useRef(0)
  const [state, setState] = useState<UserState>({
    user: null,
    isLoading: true,
    error: null,
  })

  const loadUser = useCallback(async () => {
    activeController.current?.abort()

    const controller = new AbortController()
    activeController.current = controller
    const currentRequestId = ++requestId.current
    setState({ user: null, isLoading: true, error: null })

    try {
      const user = await getUserById(userId, controller.signal)
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      setState({ user, isLoading: false, error: null })
    } catch (cause) {
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      const error = cause instanceof Error ? cause.message : 'Ha ocurrido un error inesperado.'
      setState({ user: null, isLoading: false, error })
    } finally {
      if (currentRequestId === requestId.current) activeController.current = null
    }
  }, [userId])

  useEffect(() => {
    void loadUser()
    return () => {
      requestId.current += 1
      activeController.current?.abort()
      activeController.current = null
    }
  }, [loadUser])

  const reload = useCallback(() => void loadUser(), [loadUser])

  return { ...state, reload }
}
