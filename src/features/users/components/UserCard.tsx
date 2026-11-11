import type { User } from '../types/user'

type UserCardProps = { user: User }

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="person-card">
      <div className="person-card-header">
        <span className={`user-avatar user-avatar-color-${(user.id - 1) % 5}`} aria-hidden="true">
          {user.name.charAt(0)}
        </span>
      </div>
      <h3><a className="person-card-link" href={`/users/${user.id}`} aria-label={`Ver el perfil de ${user.name}`}>{user.name}</a></h3>
      <p className="user-handle">@{user.username}</p>
      <div className="person-card-divider" />
      <div className="person-detail"><span className="detail-symbol" aria-hidden="true">✉</span><a href={`mailto:${user.email}`}>{user.email}</a></div>
      <div className="person-detail"><span className="detail-symbol" aria-hidden="true">⌖</span><span>{user.address.city}</span></div>
      <div className="company-name"><span className="company-symbol" aria-hidden="true">✳</span>{user.company.name}</div>
    </article>
  )
}
