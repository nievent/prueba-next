import { useEffect } from 'react'
import { useAlbumDetail } from '../hooks/useAlbumDetail'
import { addRecent } from '../utils/recentAlbums'
import '../albums.css'

type AlbumDetailPageProps = {
  albumId: number
}

export function AlbumDetailPage({ albumId }: AlbumDetailPageProps) {
  const { album, photos, isLoading, error, reload } = useAlbumDetail(albumId)

  useEffect(() => {
    if (album) addRecent({ id: album.id, title: album.title })
  }, [album])

  return (
    <main className="album-detail-page">
      <a className="company-logo" href="/" aria-label="Inicio"><img src="/favicon.ico" alt="" /></a>
      <section className="album-detail-content">
        {isLoading ? (
          <div className="list-feedback" role="status"><span className="loading-spinner" />Cargando album...</div>
        ) : error ? (
          <div className="list-feedback has-error" role="alert">
            <span className="error-symbol">!</span>
            <div><strong>No se pudo cargar el album</strong><p>{error}</p><button className="retry-button" onClick={reload}>Volver a intentar</button></div>
          </div>
        ) : album === null ? (
          <div className="list-feedback is-empty"><div><strong>No encontramos este album</strong><p>El album puede no estar disponible.</p><a className="back-link" href="/">Volver a la comunidad</a></div></div>
        ) : (
          <>
            <header className="album-detail-heading">
              <div><p className="section-kicker">ALBUM</p><h1>{album.title}</h1></div>
              <a className="back-link" href={`/users/${album.userId}`}>Volver al usuario</a>
            </header>
            {photos.length === 0 ? (
              <div className="list-feedback is-empty"><div><strong>Este album no tiene fotos</strong><p>Vuelve mas tarde para ver nuevas fotos.</p></div></div>
            ) : (
              <div className="photo-grid">
                {photos.map((photo) => (
                  <figure className="photo-card" key={photo.id}>
                    <img src={photo.url} alt={photo.title} loading="lazy" />
                    <figcaption>{photo.title}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}
