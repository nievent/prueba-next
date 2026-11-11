import { useAlbums } from '../hooks/useAlbums'
import { AlbumList } from './AlbumList'
import '../albums.css'

type UserAlbumsSectionProps = {
  userId: number
}

export function UserAlbumsSection({ userId }: UserAlbumsSectionProps) {
  const { albums, isLoading, error, reload } = useAlbums(userId)

  return (
    <section className="user-albums" aria-labelledby="user-albums-title">
      <div className="albums-heading">
        <div><h2 id="user-albums-title">Albumes</h2><p>Albumes compartidos por este usuario</p></div>
        {!isLoading && !error && <span>{albums.length}</span>}
      </div>
      {isLoading ? (
        <div className="list-feedback" role="status"><span className="loading-spinner" />Cargando albumes...</div>
      ) : error ? (
        <div className="list-feedback has-error" role="alert"><span className="error-symbol">!</span><div><strong>No se pudieron cargar los albumes</strong><p>{error}</p><button className="retry-button" onClick={reload}>Volver a intentar</button></div></div>
      ) : albums.length === 0 ? (
        <div className="albums-empty">Este usuario todavia no tiene albumes.</div>
      ) : (
        <AlbumList albums={albums} />
      )}
    </section>
  )
}
