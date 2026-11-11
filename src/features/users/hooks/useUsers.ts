import { useCallback, useEffect, useRef, useState } from 'react'
import { getUsers } from '../services/usersService'
import type { User } from '../types/user'

type UsersState = {
  users: User[]
  isLoading: boolean
  error: string | null
}

export function useUsers() {
  const activeController = useRef<AbortController | null>(null)
  const requestId = useRef(0)
  const [state, setState] = useState<UsersState>({
    users: [],
    isLoading: true,
    error: null,
  })

  const loadUsers = useCallback(async () => {
    activeController.current?.abort()

    const controller = new AbortController()
    activeController.current = controller
    const currentRequestId = ++requestId.current
    setState((current) => ({ ...current, isLoading: true, error: null }))

    try {
      const users = await getUsers(controller.signal)
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      setState({ users, isLoading: false, error: null })
    } catch (cause) {
      if (controller.signal.aborted || currentRequestId !== requestId.current) return
      const error = cause instanceof Error ? cause.message : 'Ha ocurrido un error inesperado.'
      setState((current) => ({ ...current, isLoading: false, error }))
    } finally {
      if (currentRequestId === requestId.current) activeController.current = null
    }
  }, [])

  useEffect(() => {
    void loadUsers()
    return () => {
      requestId.current += 1
      activeController.current?.abort()
      activeController.current = null
    }
  }, [loadUsers])

  const reload = useCallback(() => void loadUsers(), [loadUsers])

  return { ...state, reload }
}
