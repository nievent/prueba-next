import type { User } from '../types/user'

export function filterUsers(users: User[], query: string): User[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return users

  return users.filter((user) =>
    [user.name, user.username, user.email, user.address.city, user.company.name]
      .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
  )
}
