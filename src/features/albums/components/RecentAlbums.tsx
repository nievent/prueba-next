import { useState } from 'react'
import { readRecent } from '../utils/recentAlbums'
import '../albums.css'

export function RecentAlbums() {
  const [albums] = useState(readRecent)

  if (albums.length === 0) return null

  return (
    <section className="recent-albums" aria-labelledby="recent-albums-title">
      <header className="recent-albums-heading">
        <div><h2 id="recent-albums-title">{'Reci\u00e9n visitados'}</h2><p>Tus ultimas visitas</p></div>
        <span>{albums.length}</span>
      </header>
      <ul className="recent-albums-grid">
        {albums.map((album) => (
          <li key={album.id}>
            <a className="recent-album-card" href={`/albums/${album.id}`} aria-label={`Abrir album ${album.id}: ${album.title}`}>
              <span className="recent-album-art" aria-hidden="true"><span>{String(album.id).padStart(2, '0')}</span></span>
              <span className="recent-album-info">
                <span className="recent-album-number">{'\u00c1lbum'} {album.id}</span>
                <strong>{album.title}</strong>
              </span>
              <span className="recent-album-arrow" aria-hidden="true">{'\u2197'}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
