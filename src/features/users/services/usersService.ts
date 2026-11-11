import type { User } from '../types/user'

const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users'

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error('No se pudo cargar el listado de usuarios.')
  }

  return (await response.json()) as User[]
}

export async function getUserById(id: number, signal?: AbortSignal): Promise<User | null> {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`, { signal })

  if (response.status === 404) return null
  if (!response.ok) throw new Error('No se pudo cargar el usuario.')

  const user = (await response.json()) as User
  return user.id === id ? user : null
}
