import { useMemo, useState } from 'react'
import { UserList } from '../components/UserList'
import { RecentAlbums } from '../../albums/components/RecentAlbums'
import { UserSearch } from '../components/UserSearch'
import { useUsers } from '../hooks/useUsers'
import { filterUsers } from '../utils/filterUsers'
import '../users.css'

export function UsersPage() {
  const { users, isLoading, error, reload } = useUsers()
  const [query, setQuery] = useState('')
  const filteredUsers = useMemo(() => filterUsers(users, query), [users, query])

  return (
    <div className="community-layout">
      <aside className="community-sidebar" aria-label="Navegación principal">
        <a className="company-logo" href="/" aria-label="Inicio"><img src="/favicon.ico" alt="" /></a>
        <div className="sidebar-label">ESPACIO</div>
        <a className="sidebar-link is-active" href="/" aria-current="page"><span className="sidebar-icon" aria-hidden="true">◈</span> Comunidad</a>
        <div className="account-summary"><span className="user-avatar user-avatar-small">N</span><span>Nieves</span><span className="account-chevron">⌄</span></div>
      </aside>
      <main className="community-main">
        <header className="page-header"><div className="breadcrumb"><span>Espacio</span><span className="breadcrumb-separator">/</span><strong>Comunidad</strong></div><div className="header-actions"><span className="online-status"><span /> Vista general</span><span className="user-avatar">N</span></div></header>
        <section className="content-container">
          <div className="section-kicker"><span className="kicker-line" /> PRUEBA TÉCNICA <span className="kicker-line" /></div>
          <div className="page-heading"><div><h1>La red social<span className="heading-accent">.</span></h1></div><div className="member-total"><span className="total-number">{isLoading ? '—' : users.length.toString().padStart(2, '0')}</span><span>miembros<br />en la comunidad</span></div></div>
          <div className="people-toolbar"><div><h2>Personas</h2><p>Descubre quién forma parte</p></div><UserSearch value={query} onChange={setQuery} /></div>
          <RecentAlbums />
          {isLoading ? <div className="list-feedback" role="status"><span className="loading-spinner" />Cargando la comunidad…</div> : error ? (
            <div className="list-feedback has-error" role="alert"><span className="error-symbol">!</span><div><strong>No pudimos conectar</strong><p>{error}</p><button className="retry-button" onClick={reload}>Volver a intentar <span aria-hidden="true">↗</span></button></div></div>
          ) : <UserList users={filteredUsers} />}
          {!isLoading && !error && filteredUsers.length > 0 && <p className="list-summary">Mostrando <strong>{filteredUsers.length}</strong> {filteredUsers.length === 1 ? 'persona' : 'personas'}{query && <> para <strong>“{query}”</strong></>}</p>}
        </section>
        <footer className="site-footer">Una prueba técnica de Next Digital hecha por Nieves Ventura</footer>
      </main>
    </div>
  )
}
