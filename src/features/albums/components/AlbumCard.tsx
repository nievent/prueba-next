import type { AlbumPreview } from '../types/album'

type AlbumCardProps = {
  album: AlbumPreview
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <a className="album-card" href={`/albums/${album.id}`} aria-label={`Abrir album: ${album.title}`}>
      <div className="album-thumbnail">
        {album.thumbnailUrl ? (
          <img src={album.thumbnailUrl} alt="" loading="lazy" />
        ) : (
          <span>Imagen no disponible</span>
        )}
      </div>
      <h3>{album.title}</h3>
    </a>
  )
}
