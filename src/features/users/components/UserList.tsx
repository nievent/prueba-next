import type { User } from '../types/user'
import { UserCard } from './UserCard'

type UserListProps = { users: User[] }

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="list-feedback is-empty">
        <span className="empty-symbol" aria-hidden="true">⌕</span>
        <div><strong>No encontramos a nadie</strong><p>Prueba con otro nombre, ciudad o empresa.</p></div>
      </div>
    )
  }

  return <div className="people-grid">{users.map((user) => <UserCard key={user.id} user={user} />)}</div>
}
