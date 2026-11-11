import { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../services/usersService'
import type { User } from '../types/user'

type UsersState = {
  users: User[]
  isLoading: boolean
  error: string | null
}

export function useUsers() {
  const [state, setState] = useState<UsersState>({
    users: [],
    isLoading: true,
    error: null,
  })

  const loadUsers = useCallback(async (signal?: AbortSignal) => {
    setState((current) => ({ ...current, isLoading: true, error: null }))

    try {
      const users = await getUsers(signal)
      if (!signal?.aborted) setState({ users, isLoading: false, error: null })
    } catch (cause) {
      if (signal?.aborted) return
      const error = cause instanceof Error ? cause.message : 'Ha ocurrido un error inesperado.'
      setState((current) => ({ ...current, isLoading: false, error }))
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadUsers(controller.signal)
    return () => controller.abort()
  }, [loadUsers])

  return { ...state, reload: () => void loadUsers() }
}
