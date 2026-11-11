import { useUser } from '../hooks/useUser'
import { UserAlbumsSection } from '../../albums/components/UserAlbumsSection'
import { TodoSection } from '../../todos/components/TodoSection'
import '../users.css'

type UserDetailPageProps = {
  userId: number
}

export function UserDetailPage({ userId }: UserDetailPageProps) {
  const { user, isLoading, error, reload } = useUser(userId)

  return (
    <div className="community-layout">
      <aside className="community-sidebar" aria-label="Navegación principal">
        <a className="company-logo" href="/" aria-label="Inicio"><img src="/favicon.ico" alt="" /></a>
        <div className="sidebar-label">ESPACIO</div>
        <a className="sidebar-link is-active" href="/" aria-current="page"><span className="sidebar-icon" aria-hidden="true">◈</span> Comunidad</a>
        <div className="account-summary"><span className="user-avatar user-avatar-small">N</span><span>Nieves</span><span className="account-chevron">⌄</span></div>
      </aside>
      <main className="community-main">
        <header className="page-header">
          <div className="breadcrumb"><a href="/">Comunidad</a><span className="breadcrumb-separator">/</span><strong>Perfil</strong></div>
          <div className="header-actions"><span className="online-status"><span /> Vista general</span><span className="user-avatar">N</span></div>
        </header>
        <section className="content-container">
          <div className="section-kicker"><span className="kicker-line" /> PERFIL DE USUARIO <span className="kicker-line" /></div>
          <div className="page-heading"><div><h1>Perfil<span className="heading-accent">.</span></h1></div></div>
          {isLoading ? (
            <div className="list-feedback" role="status"><span className="loading-spinner" />Cargando el perfil…</div>
          ) : error ? (
            <div className="list-feedback has-error" role="alert"><span className="error-symbol">!</span><div><strong>No pudimos cargar el perfil</strong><p>{error}</p><button className="retry-button" onClick={reload}>Volver a intentar <span aria-hidden="true">↗</span></button></div></div>
          ) : user === null ? (
            <div className="list-feedback is-empty"><div><strong>No encontramos este usuario</strong><p>Puede que el perfil ya no esté disponible.</p><a className="back-link" href="/">Volver al listado</a></div></div>
          ) : (
            <article className="profile-card">
              <a className="back-link" href="/">← Volver a la comunidad</a>
              <div className="profile-heading">
                <span className={`user-avatar user-avatar-color-${(user.id - 1) % 5}`} aria-hidden="true">{user.name.charAt(0)}</span>
                <div><h2>{user.name}</h2><p>@{user.username}</p></div>
              </div>
              <dl className="profile-fields">
                <div><dt>Email</dt><dd><a href={`mailto:${user.email}`}>{user.email}</a></dd></div>
                <div><dt>Ciudad</dt><dd>{user.address.city}</dd></div>
                <div><dt>Website</dt><dd><a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></dd></div>
                <div><dt>Empresa</dt><dd>{user.company.name}</dd></div>
              </dl>
              <UserAlbumsSection userId={user.id} />
              <TodoSection userId={user.id} />
            </article>
          )}
        </section>
        <footer className="site-footer">Una prueba técnica de Next Digital hecha por Nieves Ventura</footer>
      </main>
    </div>
  )
}
